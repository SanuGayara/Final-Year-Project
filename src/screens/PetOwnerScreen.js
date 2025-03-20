import React from 'react';
import { View, Button, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';


const PetOwnerScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.container1}></View>
        <View style={styles.container2}>
          <Text style={styles.text}>Welcome to the Profile!</Text>
          <Button title="Pet Owner Login" onPress={() => navigation.navigate('LoginScreen')} />
          <Button title="Sign Up" onPress={() => navigation.navigate('SignUpScreen')} />
        </View>
      </ScrollView>
    </SafeAreaView>

    
  );
};

const styles = StyleSheet.create({

    safeContainer: {
      flex: 1,
      backgroundColor: "#8F474A",
  },
  
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#8F474A",
      paddingBottom: 70,
      
    },
    
      container1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#8F474A",
        height: 700,
        width:460,
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 100,

        
      },
      container2: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "pink",
        height: 550,
        width: 450,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        marginTop: 10, 
      },

      text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10,
      },
});

export default PetOwnerScreen;