import React from 'react'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../screens/HomeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import SearchScreen from '../screens/SearchScreen'; 
import MessageScreen from '../screens/MessageScreen';



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
       name="Search"        
       component={SearchScreen} // Replace with actual component        
       options={{           
        tabBarIcon: ({ color, size }) => <Icon name="search" size={size} color={color} />,
       }}       
    />       
       <Tab.Screen         
       name="Messages"         
       component={MessageScreen} // Replace with actual component         
       options={{           
        tabBarIcon: ({ color, size }) => <Icon name="envelope" size={size} color={color} />,
       }}      
    /> 
        

 
      </Tab.Navigator> 
      ); 
    }; 
    
    export default TabsScreen2;   