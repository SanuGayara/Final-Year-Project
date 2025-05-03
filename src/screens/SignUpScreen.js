import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = async () => {
        if (!name || !email || !password || !confirmPassword) {
            alert("Please fill in all fields");
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const response = await fetch("http://192.168.8.175/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullName: name,
                    email: email,
                    password: password,
                    type: 2, // Always customer
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Registration successful!");
                navigation.navigate("LoginScreen");
            } else {
                alert(data.message || "Registration failed");
            }
        } catch (err) {
            console.error("Sign-up error:", err);
            alert("An error occurred. Please try again.");
        }
    };


    return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.formTitleContainer}>
          <Text style={styles.formTitle}>Create Account</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          placeholderTextColor="#ccc"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          placeholderTextColor="#ccc"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#ccc"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.signupText}>Already have an account? Login</Text>
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
        padding: 50,
      },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
      },
    formContainer: {
        width: 400,
        height:720,
        backgroundColor: '#F5E8D6',
        padding: 20,
        borderRadius: 50,
        alignItems: 'center',
        elevation: 5,  
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4, 
        marginTop: 30, 
        zIndex: 0,  
       
    },
    formTitleContainer: {
        width: 170, 
        height: 60, 
        backgroundColor: '#8F474A', 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 50, 
        marginBottom: 30, 
    },
    
    formTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10,
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
    button: {
        width: '70%',
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
      
      
});

export default SignUpScreen;
