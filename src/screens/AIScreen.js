import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AIScreen = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const API = 'http://192.168.8.175/api';

  useEffect(() => {
    fetchChatHistory();
  }, []);

  const fetchChatHistory = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const res = await fetch(`${API}/chat/my-chats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setChatHistory(data || []);
    } catch (err) {
      console.error('Failed to fetch chat history:', err);
    }
  };

  const handleSend = async () => {
    if (!message.trim()) return;
    setLoading(true);

    const token = await AsyncStorage.getItem('token');
    try {
      const res = await fetch(`${API}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ message })
      });
      const newChat = await res.json();
      setChatHistory([newChat, ...chatHistory]);
      setMessage('');
    } catch (err) {
      console.error('Failed to send message:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
      <View style={styles.container}>
        <Text style={styles.header}>🐾 AI VET Assistant</Text>
        <ScrollView style={styles.chatContainer} contentContainerStyle={{ paddingBottom: 20 }}>
          {chatHistory.map((chat, index) => (
              <View key={index} style={styles.chatBubbleWrapper}>
                <View style={styles.userBubble}>
                  <Text style={styles.userText}>{chat.message}</Text>
                </View>
                <View style={styles.aiBubble}>
                  <Text style={styles.aiText}>{chat.response}</Text>
                </View>
              </View>
          ))}
        </ScrollView>

        <View style={styles.inputWrapper}>
          <TextInput
              style={styles.input}
              placeholder="Describe your pet's symptoms..."
              value={message}
              onChangeText={setMessage}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.sendText}>Send</Text>}
          </TouchableOpacity>
        </View>
      </View>
  );
};

export default AIScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3ECE7',
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8F474A',
    textAlign: 'center',
    marginVertical: 10,
  },
  chatContainer: {
    flex: 1,
    marginVertical: 10,
  },
  chatBubbleWrapper: {
    marginBottom: 16,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#8F474A',
    padding: 12,
    borderRadius: 12,
    borderTopRightRadius: 0,
    maxWidth: '80%',
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#EDE7E3',
    padding: 12,
    borderRadius: 12,
    borderTopLeftRadius: 0,
    marginTop: 5,
    maxWidth: '90%',
  },
  userText: {
    color: '#fff',
    fontSize: 15,
  },
  aiText: {
    color: '#333',
    fontSize: 15,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  sendButton: {
    backgroundColor: '#8F474A',
    padding: 10,
    borderRadius: 8,
    marginLeft: 8,
  },
  sendText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
