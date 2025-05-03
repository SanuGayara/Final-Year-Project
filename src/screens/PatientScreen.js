import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const PatientScreen = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const API = 'http://192.168.8.175/api';

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const res = await fetch(`${API}/medical-records/customer-records`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setRecords(data || []);
    } catch (err) {
      console.error('Failed to fetch records:', err);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (record) => {
    setSelectedRecord(record);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedRecord(null);
    setModalVisible(false);
  };

  return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Your Pet Records</Text>
        {loading ? (
            <ActivityIndicator size="large" color="#8F474A" />
        ) : records.length > 0 ? (
            records.map((rec, index) => (
                <TouchableOpacity key={index} style={styles.card} onPress={() => openModal(rec)}>
                  <Text style={styles.petName}>{rec.pet?.name} ({rec.pet?.species})</Text>
                  <Text style={styles.recordDate}>Date: {moment(rec.visitDate).format('MMMM Do, YYYY')}</Text>
                  <Text numberOfLines={2} style={styles.recordNotes}>{rec.description}</Text>
                  <Text style={styles.vetInfo}>By: {rec.vet?.fullName}</Text>
                </TouchableOpacity>
            ))
        ) : (
            <Text style={styles.noRecords}>No medical records found for your pets.</Text>
        )}

        {/* Modal for record details */}
        {selectedRecord && (
            <Modal visible={modalVisible} transparent animationType="slide">
              <View style={styles.modalBackdrop}>
                <View style={styles.modalContainer}>
                  <Text style={styles.modalTitle}>Medical Record</Text>

                  <Text style={styles.modalLabel}>Pet:</Text>
                  <Text style={styles.modalText}>
                    {selectedRecord.pet?.name} ({selectedRecord.pet?.species})
                  </Text>

                  <Text style={styles.modalLabel}>Date:</Text>
                  <Text style={styles.modalText}>
                    {moment(selectedRecord.visitDate).format('MMMM Do YYYY, hh:mm A')}
                  </Text>

                  <Text style={styles.modalLabel}>Diagnosis:</Text>
                  <Text style={styles.modalText}>{selectedRecord.diagnosis}</Text>

                  <Text style={styles.modalLabel}>Description:</Text>
                  <Text style={styles.modalText}>{selectedRecord.description}</Text>

                  <Text style={styles.modalLabel}>Treatment:</Text>
                  <Text style={styles.modalText}>{selectedRecord.treatment}</Text>

                  <Text style={styles.modalLabel}>Prescription:</Text>
                  <Text style={styles.modalText}>{selectedRecord.prescription}</Text>

                  <Text style={styles.modalLabel}>Vet:</Text>
                  <Text style={styles.modalText}>
                    {selectedRecord.vet?.fullName} ({selectedRecord.vet?.email})
                  </Text>

                  <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
        )}
      </ScrollView>
  );
};

export default PatientScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F9F4EF',
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#8F474A',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5D4037',
    marginBottom: 4,
  },
  recordDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  recordNotes: {
    fontSize: 15,
    color: '#444',
    marginBottom: 4,
  },
  vetInfo: {
    fontSize: 13,
    color: '#888',
    fontStyle: 'italic',
  },
  noRecords: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 30,
    fontStyle: 'italic',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxHeight: '90%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8F474A',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalLabel: {
    fontWeight: 'bold',
    marginTop: 10,
    color: '#555',
  },
  modalText: {
    fontSize: 15,
    color: '#333',
  },
  closeButton: {
    backgroundColor: '#8F474A',
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
