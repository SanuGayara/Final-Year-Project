import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const SearchScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { data = [] } = route.params || {};
  const [searchText, setSearchText] = useState('');

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#F5E8D6' }}>
     
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 30, }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={50} color="#8F474A" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
          <Ionicons name="person-circle" size={50} color="#8F474A" />
        </TouchableOpacity>
      </View>

      
      <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#8F474A', borderRadius: 5, padding: 10, margin: 20 }}>
        <Ionicons name="search" size={20} color="#8F474A" style={{ marginRight: 10 }} />
        <TextInput
          placeholder="Search pets..."
          value={searchText}
          onChangeText={setSearchText}
          style={{ flex: 1 }}
        />
      </View>

      {/* Search Results */}
      {filteredData.length > 0 ? (
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ddd' }}>
              <Text style={{ color: '#8F474A', fontWeight: 'bold' }}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={{ textAlign: 'center', color: '#8F474A', marginTop: 20 }}>No matching results found.</Text>
      )}
    </View>
  );
};

export default SearchScreen;
