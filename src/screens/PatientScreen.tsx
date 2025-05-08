import React, { useState } from 'react';
import {
  View, Button, FlatList, Modal, StyleSheet,
  TextInput, Text, Platform, TouchableOpacity
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAppointments } from '../context/AppointmentContext';
import uuid from 'react-native-uuid';
import AppointmentCard from '../components/AppointmentCard';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Color from '../assets/Color';
import { FONT_FAMILY } from '../assets/FontFamily';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),

  age: Yup.number()
    .required('Age is required')
    .positive('Age must be a positive number')
    .integer('Age must be an integer')
    .max(120, 'Age must be less than or equal to 120'),

  disease: Yup.string()
    .required('Disease is required'),

  date: Yup.date()
    .required('Date is required')
    .test('is-future', 'No past date allowed', value => new Date(value) > new Date())
    .nullable(),
});

export default function PatientScreen() {
  const { appointments, addAppointment } = useAppointments();
  const [modalVisible, setModalVisible] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.submitButton} onPress={() => setModalVisible(true)} >
          <Text style={styles.submitButtonText}>Add Appointment</Text>
        </TouchableOpacity>

        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <AppointmentCard item={item} />}
        />
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Formik
              initialValues={{ name: '', age: '', disease: '', date: null }}
              validationSchema={validationSchema}
              onSubmit={(values, { resetForm }) => {
                addAppointment({ id: uuid.v4(), ...values });
                resetForm();
                setModalVisible(false);
              }}
            >
              {({ handleChange, handleSubmit, values, errors, touched, setFieldValue }) => (
                <>
                  <View style={styles.crossButton}>
                    <Text style={styles.modalTitle}>New Appointment</Text>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                      <Icon name="xmark" size={25} color={"black"} />
                    </TouchableOpacity>
                  </View>
                  <TextInput
                    placeholder="Enter Your Name"
                    onChangeText={handleChange('name')}
                    value={values.name}
                    style={styles.input}
                    placeholderTextColor={Color.dark_grey}
                  />
                  {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

                  <TextInput
                    placeholder="Enter Your Age"
                    onChangeText={handleChange('age')}
                    value={values.age}
                    keyboardType="numeric"
                    style={styles.input}
                    placeholderTextColor={Color.dark_grey}
                  />
                  {touched.age && errors.age && <Text style={styles.error}>{errors.age}</Text>}

                  <TextInput
                    placeholder="Enter Your Disease"
                    onChangeText={handleChange('disease')}
                    value={values.disease}
                    style={styles.input}
                    placeholderTextColor={Color.dark_grey}
                  />
                  {touched.disease && errors.disease && <Text style={styles.error}>{errors.disease}</Text>}

                  <TouchableOpacity onPress={() => setShowPicker(true)}>
                    <TextInput
                      placeholder="Select Date"
                      value={values?.date ? moment(values.date).format('YYYY-MM-DD h:mm A') : ''}
                      editable={false}
                      style={styles.input}
                      placeholderTextColor={Color.dark_grey}
                    />
                  </TouchableOpacity>

                  {touched.date && errors.date && <Text style={styles.error}>{errors.date}</Text>}

                  <DateTimePickerModal
                    isVisible={showPicker}
                    mode={ 'datetime'}
                    onConfirm={(dateTime) => {
                      setShowPicker(false);
                      setFieldValue('date', dateTime);
                    }}
                    onCancel={() => setShowPicker(false)}
                    minimumDate={values?.date ?? new Date()}
                    date={values?.date ?? new Date()}
                  />

                  <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Color.white,

  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: Color.white,
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  input: {
    borderWidth: 0.3,
    marginBottom: 10,
    color: Color.black,
    paddingVertical: 8,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    fontSize: 12
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
    fontSize: 16,
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD
  },
  crossButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center'
  }
});
