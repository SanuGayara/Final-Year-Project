import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill in both fields");
      return;
    }

    try {
      const response = await fetch('http://192.168.8.175/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok && data.token) {
        await AsyncStorage.setItem('token', data.token);
        await AsyncStorage.setItem('user', JSON.stringify(data.user));

        console.log("Login successful!");
        navigation.navigate('TabScreen2');
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    }
  };


  return (
    <View style={styles.container}>

      <Image source={require('../../assets/petowner-pic.png')} style={styles.image} />
      <View style={styles.formContainer}>
      
        <View style={styles.formTitleContainer}>
        <Text style={styles.formTitle}>Pet Owner</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Enter Password"
            placeholderTextColor="#ccc"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureText}
          />

          <TouchableOpacity onPress={() => setSecureText(!secureText)} style={styles.eyeIcon}>
            <Ionicons
              name={secureText ? 'eye-off' : 'eye'}
              size={24}
              color="black"
            />
          </TouchableOpacity>
          </View>

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
          <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      
      </View>
    </View>
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8F474A',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  formContainer: {
    width: 435,
    height:800,
    backgroundColor: '#F5E8D6',
    padding: 80,
    borderRadius: 50,
    alignItems: 'center',
    elevation: 5,  
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4, 
    marginTop: 550, 
    zIndex: 0,  
   
  },

  formTitleContainer: {
    width: 150, 
    height: 60, 
    backgroundColor: '#8F474A', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 50, 
    marginTop: -50,
    marginBottom: 50 
  },

  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
    textAlign: 'center', 
  },

  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#F5E8D6',
    paddingHorizontal: 15,
    marginBottom: 70,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'black',
  },

  passwordContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    backgroundColor: '#F5E8D6',
    marginBottom: 20,
  },
  passwordInput:{
    flex:1,
    height: '100%',
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000',
  },

  eyeIcon:{
    padding: 10,
  },

  forgotPasswordText:{
    color: '#8F474A',
    fontSize: 14,
    marginBottom: 50,
    textAlign: 'right',
    width: '100%',
  },

  button: {
    width: '80%',
    height: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#8F474A',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupText: {
    marginTop: 20,
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  infoContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f4a261',
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  detailText: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
  },
  
  image: {
    width: 250,  
    height: 550, 
    marginTop: 50, 
    position: 'absolute',  // Position the image absolutely
    top: -100, // Adjust the vertical position to overlap the form
    
  },
});

export default LoginScreen;