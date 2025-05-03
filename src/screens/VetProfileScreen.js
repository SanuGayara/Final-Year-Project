import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const VetProfileScreen = () => {
  // Dummy profile data for Dr. Emily
  const profile = {
    name: 'Dr. Emily',
    email: 'dr.emily@vetclinic.com',
    specialty: 'Veterinary Surgery',
    phone: '+1234567890',
    location: '123 Pet Care Street, Pet City',
    image: 'https://example.com/dr-emily-avatar.png', // Placeholder image URL
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          source={{ uri: profile.image || 'https://example.com/default-avatar.png' }}
        />
        <Text style={styles.profileName}>{profile.name}</Text>
        <Text style={styles.profileInfo}>Email: {profile.email}</Text>
        <Text style={styles.profileInfo}>Specialty: {profile.specialty}</Text>
        <Text style={styles.profileInfo}>Phone: {profile.phone}</Text>
        <Text style={styles.profileInfo}>Location: {profile.location}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  profileName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  profileInfo: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
});

export default VetProfileScreen;
