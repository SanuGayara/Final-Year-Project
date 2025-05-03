import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, ScrollView, TouchableOpacity, Image, StyleSheet, Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const OwnerDetailsScreen = () => {
  const navigation = useNavigation();
  const [ownerInfo, setOwnerInfo] = useState({ fullName: '', email: '', phone: '' });
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = 'http://192.168.8.175/api';

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${API}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (res.ok) {
        setOwnerInfo(data.user || {});
        setPets(data.pets || []);
      } else {
        Alert.alert("Error", data.message || "Failed to fetch profile");
      }
    } catch (err) {
      console.error('Fetch error:', err);
      Alert.alert("Error", "Could not load profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (section, field, value, index = null) => {
    if (section === 'owner') {
      setOwnerInfo({ ...ownerInfo, [field]: value });
    } else if (section === 'pet') {
      const updatedPets = [...pets];
      updatedPets[index][field] = value;
      setPets(updatedPets);
    }
  };

  const pickImage = async (index) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      const updatedPets = [...pets];
      updatedPets[index].photo = result.assets[0].uri;
      setPets(updatedPets);
    }
  };

  const addPet = () => {
    setPets([...pets, {
      name: '', age: '', breed: '', species: '', gender: '', healthInfo: '', photo: null
    }]);
  };

  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem('token');

    try {
      // Update owner
      const ownerRes = await fetch(`${API}/auth/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(ownerInfo),
      });

      if (!ownerRes.ok) {
        const errData = await ownerRes.json();
        throw new Error(errData.message || "Failed to update owner");
      }

      // Add pets
      for (let pet of pets) {
        if (!pet._id) {
          const petRes = await fetch(`${API}/pets`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(pet),
          });

          if (!petRes.ok) {
            const errData = await petRes.json();
            throw new Error(errData.message || "Failed to add pet");
          }
        }
      }

      Alert.alert("Success", "Details updated successfully.");
      navigation.navigate('ProfileScreen');
    } catch (err) {
      console.error('Submit error:', err.message);
      Alert.alert("Error", err.message);
    }
  };

  return (
      <ScrollView style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={40} color="#8F474A" />
          </TouchableOpacity>
        </View>

        <Text style={styles.header}>Owner Details</Text>
        <TextInput
            placeholder='Full Name'
            value={ownerInfo.fullName}
            onChangeText={(text) => handleInputChange('owner', 'fullName', text)}
            style={styles.input}
        />
        <TextInput
            placeholder='Email'
            value={ownerInfo.email}
            onChangeText={(text) => handleInputChange('owner', 'email', text)}
            style={styles.input}
            keyboardType='email-address'
        />
        <TextInput
            placeholder='Phone'
            value={ownerInfo.phone}
            onChangeText={(text) => handleInputChange('owner', 'phone', text)}
            style={styles.input}
            keyboardType='phone-pad'
        />

        <Text style={styles.header}>Pet Details</Text>
        {pets.map((pet, index) => (
            <View key={index} style={styles.petContainer}>
              <Text style={styles.petHeader}>Pet {index + 1}</Text>
              <TextInput placeholder="Name" value={pet.name} onChangeText={(text) => handleInputChange('pet', 'name', text, index)} style={styles.input} />
              <TextInput placeholder="Species" value={pet.species} onChangeText={(text) => handleInputChange('pet', 'species', text, index)} style={styles.input} />
              <TextInput placeholder="Breed" value={pet.breed} onChangeText={(text) => handleInputChange('pet', 'breed', text, index)} style={styles.input} />
              <TextInput placeholder="Age" value={pet.age?.toString()} onChangeText={(text) => handleInputChange('pet', 'age', text, index)} style={styles.input} />
              <TextInput placeholder="Gender" value={pet.gender} onChangeText={(text) => handleInputChange('pet', 'gender', text, index)} style={styles.input} />
              <TextInput placeholder="Health Info" value={pet.healthInfo} onChangeText={(text) => handleInputChange('pet', 'healthInfo', text, index)} style={styles.input} />

              <TouchableOpacity onPress={() => pickImage(index)} style={styles.uploadButton}>
                <Text style={styles.buttonText}>Upload Pet Image</Text>
              </TouchableOpacity>
              {pet.photo && <Image source={{ uri: pet.photo }} style={styles.petImage} />}
            </View>
        ))}

        <TouchableOpacity onPress={addPet} style={styles.addButton}>
          <Text style={styles.buttonText}>Add Pet</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSubmit} style={styles.saveButton}>
          <Text style={styles.buttonText}>Save Details</Text>
        </TouchableOpacity>
      </ScrollView>
  );
};

// 🔧 Styles
const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#F5E8D6' },
  topBar: { marginBottom: 20 },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: '#8F474A', marginBottom: 15 },
  input: {
    borderBottomWidth: 1, borderBottomColor: '#8F474A',
    padding: 10, marginBottom: 12, fontSize: 16, color: '#333'
  },
  petContainer: {
    backgroundColor: '#FFDAB9', padding: 15, borderRadius: 10, marginBottom: 20
  },
  petHeader: { fontWeight: 'bold', fontSize: 18, color: '#8F474A', marginBottom: 10 },
  uploadButton: {
    backgroundColor: '#8F474A', padding: 10, borderRadius: 5,
    alignSelf: 'center', marginBottom: 10
  },
  petImage: {
    width: 100, height: 100, alignSelf: 'center',
    borderRadius: 50, borderWidth: 2, borderColor: '#8F474A', marginTop: 10
  },
  addButton: {
    backgroundColor: '#8F474A', padding: 15,
    borderRadius: 5, marginBottom: 20
  },
  saveButton: {
    backgroundColor: 'black', padding: 15,
    borderRadius: 5
  },
  buttonText: {
    color: 'white', textAlign: 'center', fontWeight: 'bold'
  },
});

export default OwnerDetailsScreen;
