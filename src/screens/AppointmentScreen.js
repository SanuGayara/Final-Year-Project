import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const AppointmentScreen = () => {
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('book'); // 'book' | 'reschedule' | 'cancel'
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [pets, setPets] = useState([]);

  const [formData, setFormData] = useState({
    petId: '',
    vetId: '',
    reason: '',
    time: '',
  });

  const API = 'http://192.168.8.175/api';

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem('token');
    try {
      const res = await fetch(`${API}/appointments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await res.json();
      console.log("Trying the appointment thing", token,res, data);
      setAppointments(data || []);
    } catch (err) {
      console.error('Failed to load appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  const getAppointmentsForDate = (date) => {
    return appointments.filter(
        (appt) => moment(appt.date).format('YYYY-MM-DD') === date
    );
  };

  const markedDates = appointments.reduce(
      (acc, appt) => {
        const date = moment(appt.date).format('YYYY-MM-DD');
        acc[date] = {
          marked: true,
          dotColor: appt.status === 'cancelled' ? 'red' : '#4caf50',
        };
        return acc;
      },
      { [selectedDate]: { selected: true, selectedColor: '#8F474A' } }
  );

  const loadPets = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const res = await fetch(`${API}/pets/my-pets`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();

      if (Array.isArray(data)) {
        setPets(data);
      } else {
        console.warn('🐶 Unexpected pet response:', data);
        setPets([]); // fallback to empty array
      }
    } catch (err) {
      console.error("❌ Failed to load pets", err);
      setPets([]); // fallback to empty array
    }
  };


  const openModal = (type, appointment = null) => {
    setModalType(type);
    setSelectedAppointment(appointment);
    loadPets();
    if (type === 'reschedule' && appointment) {
      setFormData({
        petId: appointment.pet?._id || '',
        vetId: appointment.vet?._id || '',
        reason: appointment.reason || '',
        time: moment(appointment.date).format('HH:mm'),
      });
    } else {
      setFormData({
        petId: '',
        vetId: '',
        reason: '',
        time: '',
      });
    }
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setFormData({
      petId: '',
      vetId: '',
      reason: '',
      time: '',
    });
    setSelectedAppointment(null);
  };

  const handleSubmit = async () => {
    if (!formData.petId) {
      Alert.alert('Missing Pet', 'Please select a pet.');
      return;
    }

    const token = await AsyncStorage.getItem('token');
    const datetime = moment(`${selectedDate} ${formData.time}`, 'YYYY-MM-DD HH:mm').toISOString();

    const payload = {
      pet: formData.petId,
      vet: '680c8389b8d57ee7e512ad97',
      reason: formData.reason,
      date: datetime,
    };

    try {
      let res;
      if (modalType === 'book') {
        res = await fetch(`${API}/appointments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      } else if (modalType === 'reschedule' && selectedAppointment) {
        res = await fetch(`${API}/appointments/${selectedAppointment._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        Alert.alert('Success', `Appointment ${modalType === 'book' ? 'booked' : 'rescheduled'} successfully.`);
        fetchAppointments();
        closeModal();
      } else {
        const errorData = await res.json();
        Alert.alert('Error', errorData.message || 'Something went wrong.');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to process the request.');
    }
  };

  const handleCancel = async (appointmentId) => {
    const token = await AsyncStorage.getItem('token');
    try {
      const res = await fetch(`${API}/appointments/${appointmentId}/cancel`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        Alert.alert('Cancelled', 'Appointment cancelled successfully.');
        fetchAppointments();
      } else {
        const errorData = await res.json();
        Alert.alert('Error', errorData.message || 'Something went wrong.');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to cancel the appointment.');
    }
  };

  return (
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Appointments</Text>
        <Text style={styles.subtext}>Select a date to see your scheduled appointments</Text>

        <Calendar
            markedDates={markedDates}
            onDayPress={(day) => setSelectedDate(day.dateString)}
            theme={{
              selectedDayBackgroundColor: '#8F474A',
              todayTextColor: '#8F474A',
              arrowColor: '#8F474A',
            }}
            style={styles.calendar}
        />

        <View style={styles.listContainer}>
          <Text style={styles.dateLabel}>
            {moment(selectedDate).format('MMMM Do, YYYY')}
          </Text>

          {loading ? (
              <ActivityIndicator size="large" color="#8F474A" />
          ) : getAppointmentsForDate(selectedDate).length > 0 ? (
              getAppointmentsForDate(selectedDate).map((appt, idx) => (
                  <View key={idx} style={styles.card}>
                    <Text style={styles.cardTitle}>{appt.pet?.name || 'Unnamed Pet'}</Text>
                    <Text style={styles.cardDetail}>
                      Time: {moment(appt.date).format('hh:mm A')}
                    </Text>
                    <Text style={[styles.cardStatus, appt.status === 'cancelled' && { color: 'red' }]}>
                      {appt.status.toUpperCase()}
                    </Text>

                    {appt.status !== 'cancelled' && (
                        <View style={styles.cardButtons}>
                          <TouchableOpacity onPress={() => openModal('reschedule', appt)} style={styles.actionBtn}>
                            <Text style={styles.btnText}>Reschedule</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                              onPress={() => handleCancel(appt._id)}
                              style={[styles.actionBtn, { backgroundColor: '#e53935' }]}
                          >
                            <Text style={styles.btnText}>Cancel</Text>
                          </TouchableOpacity>
                        </View>
                    )}
                  </View>
              ))
          ) : (
              <View>
                <Text style={styles.noAppointments}>
                  No appointments on this date.
                </Text>
                {appointments.length > 0 && (
                    <>
                      <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, color: '#333' }}>
                        But here are your other upcoming appointments:
                      </Text>

                      {appointments.map((appt, index) => (
                          <View key={index} style={[styles.card, { backgroundColor: '#fff3e0' }]}>
                            <Text style={styles.cardTitle}>{appt.pet?.name || 'Unnamed Pet'}</Text>
                            <Text style={styles.cardDetail}>
                              Time: {moment(appt.date).format('MMMM Do YYYY, hh:mm A')}
                            </Text>
                            <Text style={styles.cardDetail}>Status: {appt.status}</Text>
                          </View>
                      ))}
                    </>
                )}
              </View>

          )}
        </View>

        <TouchableOpacity onPress={() => openModal('book')} style={styles.bookBtn}>
          <Text style={styles.bookBtnText}>Book New Appointment</Text>
        </TouchableOpacity>

        {/* Appointment Modal */}
        <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>
                {modalType === 'book' ? 'Book Appointment' : 'Reschedule Appointment'}
              </Text>

              <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>Select Pet</Text>
              <View style={styles.dropdown}>
                {Array.isArray(pets) && pets.length > 0 ? (
                    pets.map((pet) => {
                      const selected = formData.petId === pet._id;
                      return (
                          <TouchableOpacity
                              key={pet._id}
                              onPress={() => setFormData({ ...formData, petId: pet._id })}
                              style={[
                                styles.dropdownItem,
                                selected && styles.dropdownItemSelected,
                              ]}
                          >
                            <Text style={[styles.dropdownItemText, selected && styles.dropdownItemTextSelected]}>
                              {pet.name}
                            </Text>
                          </TouchableOpacity>
                      );
                    })
                ) : (
                    <Text style={{ color: '#888', fontStyle: 'italic' }}>No pets found.</Text>
                )}
              </View>

              <TextInput
                  style={styles.input}
                  placeholder="Reason"
                  value={formData.reason}
                  onChangeText={(text) => setFormData({ ...formData, reason: text })}
              />
              <TextInput
                  style={styles.input}
                  placeholder="Time (e.g. 14:30)"
                  value={formData.time}
                  onChangeText={(text) => setFormData({ ...formData, time: text })}
              />

              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                  <Text style={styles.btnText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelBtn} onPress={closeModal}>
                  <Text style={styles.btnText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
  );
};

export default AppointmentScreen;


const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5E8D6',
    flex: 1,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#8F474A',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtext: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  calendar: {
    borderRadius: 10,
    elevation: 4,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  listContainer: {
    marginTop: 10,
  },
  dateLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8F474A',
    marginBottom: 6,
  },
  cardDetail: {
    fontSize: 15,
    color: '#444',
  },
  cardStatus: {
    marginTop: 8,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#4caf50',
  },
  cardButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionBtn: {
    backgroundColor: '#8F474A',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noAppointments: {
    textAlign: 'center',
    color: '#888',
    fontStyle: 'italic',
    marginTop: 20,
  },
  bookBtn: {
    backgroundColor: '#8F474A',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: 'center',
  },
  bookBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: '#fff',
    padding: 20,
    width: '90%',
    borderRadius: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#8F474A',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    marginBottom: 15,
    paddingVertical: 8,
    color: 'black',
    fontSize: 15,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  submitBtn: {
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  cancelBtn: {
    backgroundColor: '#e53935',
    padding: 10,
    borderRadius: 8,
    flex: 1,
  },
  dropdown: {
    flexDirection: 'column',
    marginBottom: 15,
  },

  dropdownItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 8,
    backgroundColor: '#f0f0f0',
  },

  dropdownItemSelected: {
    borderColor: '#8F474A',
    backgroundColor: '#EED8D4',
  },

  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },

  dropdownItemTextSelected: {
    fontWeight: 'bold',
    color: '#8F474A',
  },

});
