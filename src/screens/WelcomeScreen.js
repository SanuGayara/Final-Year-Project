import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/pet-logo.png')} style={styles.logo} />
      <View style={styles.textContainer}>
      <Text style={styles.text}>WELCOME{'\n'} TO PET'S{'\n'}LIFE{'\n'}</Text>
    </View>
      
      <View style={styles.overlayContainer}>

      <View View style={styles.buttonContainer}>
        
        <Pressable 
          style={({ pressed }) => [styles.button, { backgroundColor: pressed ? 'white' : 'black' }]} 
          onPress={() => navigation.navigate('LoginScreen')}
        >
          <Text style={styles.buttonText}>Pet Owner</Text>
        </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#8F474A",
    paddingBottom: 70,
  },
  logo: {
    width: 250,  
    height: 200, 
    marginTop: 80, 
    position: 'absolute',
    top: 60, // Adjust the vertical position
    zIndex: 2,
  },
  textContainer: {
    position: 'absolute',
    top: 320, // Adjusted to ensure text is visible
    alignItems: 'center',
    zIndex: 3,
  },
  text: {
    fontSize: 60, 
    fontWeight: 'bold', 
    fontFamily: 'sans-serif',  
    color: '#8F474A', 
    textAlign: 'center',
    marginTop: 100,
    
  },

  
  overlayContainer: {
    position: 'absolute',
    top: 250,
    left: 0,
    right: 0,
    bottom: -40,
    backgroundColor: '#F5E8D6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    zIndex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignItems: 'center',
    gap: 20,
    zIndex: 2,
  },
  button: {
    padding: 25,
    borderRadius: 20,
    marginBottom: 80,
    width: 150,
    alignItems: 'center',
  },
  buttonText: {
    color: '#8F474A',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
