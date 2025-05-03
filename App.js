import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import PetOwnerScreen from './src/screens/PetOwnerScreen';
import VetScreen from './src/screens/VetScreen'; 
import HomeScreen from './src/screens/HomeScreen';
import AIScreen from './src/screens/AIScreen';
import NotificationScreen from './src/screens/NotificationScreen';
import VetProfileScreen from './src/screens/VetProfileScreen';
import TabScreen2 from './src/navigators/TabScreen2';
import TabScreen from './src/navigators/TabScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import OwnerDetailsScreen from './src/screens/OwnerDetailsScreen';
import AppointmentScreen from './src/screens/AppointmentScreen';
import PatientScreen from './src/screens/PatientScreen';

import EmergencyScreen from './src/screens/EmergencyScreen';



const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen}/>
        <Stack.Screen name="TabScreen" component={TabScreen} />
        <Stack.Screen name="PetOwnerScreen" component={PetOwnerScreen} />
        <Stack.Screen name="TabScreen2" component={TabScreen2} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="AIScreen" component={AIScreen} />
        <Stack.Screen name="VetProfileScreen" component={VetProfileScreen} />
        <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
        <Stack.Screen name="VetScreen" component={VetScreen} />
        <Stack.Screen name="OwnerDetailsScreen" component={OwnerDetailsScreen} />

        
        
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="AppointmentScreen" component={AppointmentScreen} />
        <Stack.Screen name="PatientScreen" component={PatientScreen} />
        
        <Stack.Screen name="EmergencyScreen" component={EmergencyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;



