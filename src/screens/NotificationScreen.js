import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const NotificationScreen = () => {
  // Dummy notifications
  const notifications = [
    { id: 1, message: "Your appointment with Dr. Emily is confirmed for tomorrow at 10:00 AM." },
    { id: 2, message: "Reminder: Your pet's vaccination is due next week." },
    { id: 3, message: "New message from Dr. Emily regarding your pet's treatment plan." },
    { id: 4, message: "Your pet's test results are now available. Check your profile." },
    { id: 5, message: "Emergency: A new pet has been brought into the clinic for treatment." },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      {notifications.map((notification) => (
        <View key={notification.id} style={styles.notification}>
          <Text style={styles.notificationText}>{notification.message}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  notification: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  notificationText: {
    fontSize: 16,
    color: '#555',
  },
});

export default NotificationScreen;
