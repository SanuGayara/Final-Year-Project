import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../screens/HomeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import VetProfileScreen from '../screens/VetProfileScreen';
import MessageScreen from '../screens/AIScreen';

const Tab = createBottomTabNavigator();

const TabsScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 60,
          padding: 5,
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#f0f0f0',
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen} // Replace with actual component
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationScreen} // Replace with actual component
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="bell" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="VetProfile"
        component={VetProfileScreen} // Replace with actual component
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="user" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="AI Chatbot"
        component={MessageScreen} // Replace with actual component
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="comments" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabsScreen;
