import React, { useState } from 'react';
import { View, FlatList, Button, TextInput, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import { useAppointments } from '../context/AppointmentContext';
import AppointmentCard from '../components/AppointmentCard';
import Color from '../assets/Color';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { Text } from 'react-native-gesture-handler';
import { FONT_FAMILY } from '../assets/FontFamily';

export default function DoctorScreen() {
  const { appointments, updateAppointment } = useAppointments();
  const [selectedDate, setSelectedDate] = useState(moment());
  const [reasonModal, setReasonModal] = useState({ visible: false, id: null, reason: '' });

  const appointmentsForDay = appointments.filter(app =>
    moment(app.date).isSame(selectedDate, 'day')
  );

  const handleReject = (id) => {
    setReasonModal({ visible: true, id, reason: '' });
  };

  const confirmReject = () => {
    updateAppointment(reasonModal.id, 'Rejected', reasonModal.reason);
    setReasonModal({ visible: false, id: null, reason: '' });
  };

  const handleDateSelected = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <CalendarStrip
          scrollable
          style={{
            height: 80,
            paddingTop: 10,
            paddingBottom: 10
          }}
          dayComponentHeight={50}
          calendarHeaderStyle={{ fontSize: 18 , color: Color.black}}
          selectedDate={selectedDate}
          onDateSelected={handleDateSelected}
        />
        {appointmentsForDay.length === 0 ? (
          <Text style={styles.noAppointmentsText}>No appointments for this day</Text>
        ) : (
          <FlatList
            data={appointmentsForDay}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <AppointmentCard
                item={item}
                isDoctor
                onAccept={() => updateAppointment(item.id, 'Accepted')}
                onReject={() => handleReject(item.id)}
              />
            )}
          />
        )}

      </View>
        <Modal visible={reasonModal.visible} animationType="slide" transparent>
          <View style={styles.modalBackground}>
            <View style={styles.modal}>
              <View style={styles.crossButton}>
                <Text style={styles.modalTitle}>Reason for Rejection</Text>
                <TouchableOpacity onPress={() => setReasonModal({ visible: false, id: null, reason: '' })}>
                  <Icon name="xmark" size={25} color={"black"} />
                </TouchableOpacity>
              </View>
              <TextInput
                placeholder="Enter rejection reason"
                style={styles.input}
                value={reasonModal.reason}
                onChangeText={text => setReasonModal(prev => ({ ...prev, reason: text }))}
                placeholderTextColor={Color.dark_grey}
              />
              <TouchableOpacity style={styles.submitButton} onPress={confirmReject}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.white,
  },
  input: { 
    borderColor: 'gray', 
    borderWidth: 0.5, 
    borderRadius: 5, 
    marginBottom: 10 
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modal: {
    width: '80%',
    maxHeight: '50%',
    backgroundColor: Color.white,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignContent: 'center',
    justifyContent: 'center',
    borderWidth:1
  },
  crossButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center'
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
    marginBottom: 20,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: Color.secondary,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },

  submitButtonText: {
    color: Color.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  noAppointmentsText: {
      textAlign: 'center',
      marginTop: 20,
      fontSize: 18,
      color: Color.dark_grey,
    },
});

