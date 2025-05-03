import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const CustomButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.customButton} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      
      <Image source={require('../../assets/img1.png')} style={styles.imageTopRight} />
      <Image source={require('../../assets/img2.png')} style={styles.imageMiddleLeft} />
      <Image source={require('../../assets/img3.png')} style={styles.imageBottomRight} />

      <View style={styles.buttonContainer}>
      <CustomButton title="Profile" onPress={() => navigation.navigate('ProfileScreen')} />
      <CustomButton title="Appointment Schedule" onPress={() => navigation.navigate('AppointmentScreen')} />
      <CustomButton title="Patient Records" onPress={() => navigation.navigate('PatientScreen')} />
      <CustomButton title="AI Vet" onPress={() => navigation.navigate('AIScreen')} />
      <CustomButton title="Emergency Contact" onPress={() => navigation.navigate('EmergencyScreen')} />

      </View>
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5E8D6',
    position: 'relative',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    zIndex: 1, // Ensures buttons are in front
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  customButton: {
    width: '60%', // Button width
    height: 55, // Button height
    backgroundColor: '#8F474A', // Button color
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10, // Rounded corners
    marginVertical: 35, // Space between buttons
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },

  imageTopRight: {
    position: 'absolute',
    top: 40,
    right: -20,
    width: 250,
    height: 200,
    zIndex: 1,
  },
  imageMiddleLeft: {
    position: 'absolute',
    left: -10,
    top: '45%',
    transform: [{ translateY: -25 }], // Centers the image at 50%
    width: 250,
    height: 250,
    zIndex: 1,
  },
  imageBottomRight: {
    position: 'absolute',
    bottom: -50,
    right: -45,
    width: 300,
    height: 250,
    zIndex: 1,
  },
});

export default HomeScreen;
