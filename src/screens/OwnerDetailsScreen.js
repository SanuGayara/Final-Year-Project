import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const OwnerDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const [ownerInfo, setOwnerInfo] = useState(route.params?.ownerInfo || { name: '', email: '', phone: '', address: '', emergencyContact: '' });
  const [pets, setPets] = useState(route.params?.pets || [{ name: '', age: '', breed: '', birthDate: '', gender: '', photo: null }]);

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
    setPets([...pets, { name: '', age: '', breed: '', birthDate: '', gender: '', photo: null }]);
  };

  const handleSubmit = () => {
    navigation.navigate('ProfileScreen', { ownerInfo, pets });
  };

  return (
    <ScrollView style={styles.container}>
        <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
          <Ionicons name="arrow-back" size={50} color="#8F474A" />
        </TouchableOpacity>
        </View>
      <Text style={styles.header}>Owner Details</Text>
      <TextInput placeholder='Full Name' value={ownerInfo.name} onChangeText={(text) => handleInputChange('owner', 'name', text)} style={styles.input} />
      <TextInput placeholder='Email' value={ownerInfo.email} onChangeText={(text) => handleInputChange('owner', 'email', text)} style={styles.input} keyboardType='email-address' />
      <TextInput placeholder='Phone' value={ownerInfo.phone} onChangeText={(text) => handleInputChange('owner', 'phone', text)} style={styles.input} keyboardType='phone-pad' />
      <TextInput placeholder='Address' value={ownerInfo.address} onChangeText={(text) => handleInputChange('owner', 'address', text)} style={styles.input} />
      <TextInput placeholder='Emergency Contact' value={ownerInfo.emergencyContact} onChangeText={(text) => handleInputChange('owner', 'emergencyContact', text)} style={styles.input} />

      <Text style={styles.header}>Pet Details</Text>
      {pets.map((pet, index) => (
        <View key={index} style={styles.petContainer}>
          <Text style={styles.petHeader}>Pet {index + 1}</Text>
          <TextInput placeholder="Pet's Name" value={pet.name} onChangeText={(text) => handleInputChange('pet', 'name', text, index)} style={styles.input} />
          <TextInput placeholder='Age' value={pet.age} onChangeText={(text) => handleInputChange('pet', 'age', text, index)} style={styles.input} />
          <TextInput placeholder='Breed' value={pet.breed} onChangeText={(text) => handleInputChange('pet', 'breed', text, index)} style={styles.input} />
          <TextInput placeholder='Date of Birth' value={pet.birthDate} onChangeText={(text) => handleInputChange('pet', 'birthDate', text, index)} style={styles.input} />
          <TextInput placeholder='Gender' value={pet.gender} onChangeText={(text) => handleInputChange('pet', 'gender', text, index)} style={styles.input} />

          {/* Upload Image Button */}
          <TouchableOpacity onPress={() => pickImage(index)} style={styles.uploadButton}>
            <Text style={styles.buttonText}>Upload Pet Image</Text>
          </TouchableOpacity>

          {/* Display Selected Image */}
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

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5E8D6',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#8F474A',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#8F474A',
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
  },
  petContainer: {
    backgroundColor: '#FFDAB9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  petHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#8F474A',
    marginBottom: 10,
  },
  uploadButton: {
    backgroundColor: '#8F474A',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignSelf: 'center',
  },
  petImage: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#8F474A',
    marginTop: 10,
  },
  addButton: {
    backgroundColor: '#8F474A',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    
  },
});

export default OwnerDetailsScreen;
