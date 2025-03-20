import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const EmergencyScreen = ({ navigation }) => {
  const [ownerInfo, setOwnerInfo] = useState({ name: '', phone: '', email: '' });
  const [petInfo, setPetInfo] = useState({ name: '', breed: '', age: '', gender: '' });
  const [emergencyDetails, setEmergencyDetails] = useState({
    type: 'Injury',
    symptoms: '',
    onset: '',
    firstAid: '',
    contactMethod: 'Phone',
    urgency: 'Critical',
  });
  const [image, setImage] = useState(null);

  const handleInputChange = (section, field, value) => {
    if (section === 'owner') setOwnerInfo({ ...ownerInfo, [field]: value });
    else if (section === 'pet') setPetInfo({ ...petInfo, [field]: value });
    else setEmergencyDetails({ ...emergencyDetails, [field]: value });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.All, allowsEditing: true, aspect: [4, 3], quality: 1 });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const handleSubmit = () => {
    console.log('Emergency Report:', { ownerInfo, petInfo, emergencyDetails, image });
    Alert.alert('Emergency Alert Sent!', "The vet will be notified immediately.");
    navigation.goBack();
  };

  return (
    <ScrollView style={{ padding: 20, backgroundColor: '#F8EDEB' }}>

      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Ionicons name="arrow-back" size={50} color="#8F474A" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('OwnerDetailsScreen', { ownerInfo, pets })}>
          <Ionicons name="person-circle" size={50} color="#8F474A" />
        </TouchableOpacity>
      </View>

      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' }}>Emergency Form</Text>

      <Text style={{ fontWeight: 'bold' }}>Owner Info</Text>
      <TextInput placeholder='Full Name' value={ownerInfo.name} onChangeText={(text) => handleInputChange('owner', 'name', text)} style={styles.input} />
      <TextInput placeholder='Phone Number' value={ownerInfo.phone} onChangeText={(text) => handleInputChange('owner', 'phone', text)} style={styles.input} keyboardType='phone-pad' />
      <TextInput placeholder='Email (Optional)' value={ownerInfo.email} onChangeText={(text) => handleInputChange('owner', 'email', text)} style={styles.input} keyboardType='email-address' />

      <Text style={{ fontWeight: 'bold' }}>Pet Info</Text>
      <TextInput placeholder='Pet Name' value={petInfo.name} onChangeText={(text) => handleInputChange('pet', 'name', text)} style={styles.input} />
      <TextInput placeholder='Breed/Species' value={petInfo.breed} onChangeText={(text) => handleInputChange('pet', 'breed', text)} style={styles.input} />
      <TextInput placeholder='Age' value={petInfo.age} onChangeText={(text) => handleInputChange('pet', 'age', text)} style={styles.input} />
      <TextInput placeholder='Gender' value={petInfo.gender} onChangeText={(text) => handleInputChange('pet', 'gender', text)} style={styles.input} />

      <Text style={{ fontWeight: 'bold' }}>Emergency Details</Text>
      <Picker selectedValue={emergencyDetails.type} onValueChange={(value) => handleInputChange('emergency', 'type', value)}>
        <Picker.Item label='Injury' value='Injury' />
        <Picker.Item label='Sudden Illness' value='Sudden Illness' />
        <Picker.Item label='Poisoning' value='Poisoning' />
        <Picker.Item label='Other' value='Other' />
      </Picker>

      <TextInput placeholder='Symptoms' value={emergencyDetails.symptoms} onChangeText={(text) => handleInputChange('emergency', 'symptoms', text)} style={styles.input} />
      <TextInput placeholder='Time of Onset' value={emergencyDetails.onset} onChangeText={(text) => handleInputChange('emergency', 'onset', text)} style={styles.input} />
      <TextInput placeholder='Any First Aid Given?' value={emergencyDetails.firstAid} onChangeText={(text) => handleInputChange('emergency', 'firstAid', text)} style={styles.input} />
      
      <TouchableOpacity onPress={pickImage} style={styles.button}><Text style={styles.buttonText}>Upload Photo (Optional)</Text></TouchableOpacity>
      {image && <Text style={{ textAlign: 'center' }}>✅ Photo Uploaded</Text>}

      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}><Text style={styles.buttonsubmitText}>Submit Emergency</Text></TouchableOpacity>
      
     
    </ScrollView>
  );
};

const styles = {
  input: { borderWidth: 1, 
    borderColor: '#8F474A', 
    padding: 10, 
    marginVertical: 5, 
    borderRadius: 5 
  },
  button: { 
    backgroundColor: '#8F474A', 
    padding: 10, 
    marginVertical: 10, 
    alignItems: 'center', 
    borderRadius: 5, 
    width:200 ,
    justifyContent: 'center', 
    alignSelf: 'center',
    

  },
  buttonText: { 
    color: 'black', 
    fontWeight: 'bold' 
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButton: {
    width: '45%', // Same width for a uniform look
    height: 55,
    backgroundColor: 'black', // New color for submit
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 20,
    
  },
  buttonsubmitText: {
    color:'#8F474A',
  }
};

export default EmergencyScreen;
