import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const [ownerInfo, setOwnerInfo] = useState({});
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOwnerData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      const res = await fetch('http://192.168.8.175/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setOwnerInfo(data.user || {});
        setPets(data.pets || []);
      } else {
        alert(data.message || 'Failed to load profile');
      }
    } catch (err) {
      console.error('Profile fetch error:', err);
      alert('Something went wrong while fetching profile.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOwnerData();
  }, []);

  if (loading) {
    return (
        <View style={[styles.container, { justifyContent: 'center' }]}>
          <ActivityIndicator size="large" color="#8F474A" />
        </View>
    );
  }

  return (
      <ScrollView style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
            <Ionicons name="arrow-back" size={50} color="#8F474A" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerDetailsScreen', { ownerInfo, pets })}>
            <Ionicons name="person-circle" size={50} color="#8F474A" />
          </TouchableOpacity>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Owner's Information</Text>
          <Text style={styles.infoText}>Full Name: {ownerInfo.fullName || 'N/A'}</Text>
          <Text style={styles.infoText}>Email: {ownerInfo.email || 'N/A'}</Text>
          <Text style={styles.infoText}>Phone: {ownerInfo.phone || 'N/A'}</Text>
          {/* Add custom fields if present */}
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Pet Information</Text>
          {pets.length > 0 ? (
              pets.map((pet, index) => (
                  <View key={index} style={styles.petContainer}>
                    <Text style={styles.petTitle}>Pet {index + 1}</Text>
                    <Text style={styles.infoText}>Name: {pet.name || 'N/A'}</Text>
                    <Text style={styles.infoText}>Age: {pet.age || 'N/A'}</Text>
                    <Text style={styles.infoText}>Breed: {pet.breed || 'N/A'}</Text>
                    <Text style={styles.infoText}>Gender: {pet.gender || 'N/A'}</Text>
                    {pet.photo && <Image source={{ uri: pet.photo }} style={styles.petImage} />}
                  </View>
              ))
          ) : (
              <Text style={styles.noPetText}>No pets added yet</Text>
          )}
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('OwnerDetailsScreen', { ownerInfo, pets })} style={styles.editButton}>
          <Text style={styles.buttonText}>Edit Details</Text>
        </TouchableOpacity>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: '#F5E8D6',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 18,
    marginVertical: 5,
    color: '#333',
  },
  petContainer: {
    backgroundColor: '#F9F1E7',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  petTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  petImage: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 50,
  },
  noPetText: {
    textAlign: 'center',
    color: 'gray',
    marginBottom: 20,
  },
  editButton: {
    width: '45%',
    height: 55,
    backgroundColor: '#8F474A',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProfileScreen;
