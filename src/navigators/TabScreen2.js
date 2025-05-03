import React from 'react'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../screens/HomeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import VetProfileScreen from '../screens/VetProfileScreen'; 
import AIScreen from '../screens/AIScreen';



const Tab = createBottomTabNavigator(); 

  const TabsScreen2 = () => { 

    return (    
       <Tab.Navigator       
       screenOptions={{         
       tabBarActiveTintColor: '#8F474A',
       tabBarInactiveTintColor: 'gray',
       tabBarStyle: {           
        height: 70,           
        padding: 5,           
        backgroundColor: '#F5E8D6',           
        borderTopWidth: 1,           
        borderTopColor: '#8F474A',
         },         
         headerShown: false,
      }} 
    >       
       <Tab.Screen        
       name="Home"         
       component={HomeScreen}          
       options={{          
         tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
       }}      
   />      
       <Tab.Screen
        name="Notifications"         
        component={NotificationScreen}         
        options={{           
          tabBarIcon: ({ color, size }) => <Icon name="bell" size={size} color={color} />,
       }}       
    />       
    
       <Tab.Screen         
       name="Vet Profile"        
       component={VetProfileScreen}        
       options={{           
        tabBarIcon: ({ color, size }) => <Icon name="user" size={size} color={color} />,
       }}       
    />       
       <Tab.Screen         
       name="AI Vet"         
       component={AIScreen}          
       options={{           
        tabBarIcon: ({ color, size }) => <Icon name="comments" size={size} color={color} />,
       }}      
    /> 
        

 
      </Tab.Navigator> 
      ); 
    }; 
    
    export default TabsScreen2;   