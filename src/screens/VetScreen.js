import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const VetScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
     
      
    },
});

export default VetScreen;