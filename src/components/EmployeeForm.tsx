import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, Alert, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addEmployee, updateEmployee } from '../features/employeeSlice';
import { launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';

const EmployeeForm = ({ editingEmployee, setEditingEmployee, onClose }) => {

  console.log("editingEmployee:", editingEmployee);
  console.log("setEditingEmployee:", setEditingEmployee);
  
  
  const dispatch = useDispatch();

  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('');
  const [designation, setDesignation] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [salary, setSalary] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [status, setStatus] = useState('Active');
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    if (editingEmployee) {
      setId(editingEmployee.id);
      setName(editingEmployee.name || '');
      setEmail(editingEmployee.email || '');
      setPhone(editingEmployee.phone || '');
      setDepartment(editingEmployee.department || '');
      setDesignation(editingEmployee.designation || '');
      setJoiningDate(editingEmployee.joiningDate || '');
      setSalary(editingEmployee.salary || '');
      setEmployeeId(editingEmployee.employeeId || '');
      setStatus(editingEmployee.status || 'Active');
      setProfilePicture(editingEmployee.profilePicture || null);
    }
  }, [editingEmployee]);

  const pickImage = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        Alert.alert('Cancelled', 'Image selection was cancelled');
      } else if (response.errorMessage) {
        Alert.alert('Error', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setProfilePicture(response.assets[0].uri);
      }
    });
  };

  const handleSubmit = () => {
    if (!name || !email || !phone || !department || !designation) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    const employeeData = {
      id: id ?? Date.now(),
      name,
      email,
      phone,
      department,
      designation,
      joiningDate,
      salary,
      employeeId,
      status,
      profilePicture,
    };

    if (id) {
      dispatch(updateEmployee(employeeData));
      setEditingEmployee(null);
    } else {
      dispatch(addEmployee(employeeData));
    }

    resetForm();
    setEditingEmployee(null);
    onClose();
  };

  const resetForm = () => {
    setId(null);
    setName('');
    setEmail('');
    setPhone('');
    setDepartment('');
    setDesignation('');
    setJoiningDate('');
    setSalary('');
    setEmployeeId('');
    setStatus('Active');
    setProfilePicture(null);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
      <Text style={styles.label}>Full Name</Text>
      <TextInput style={styles.input} placeholder="Enter Name" value={name} onChangeText={setName} />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} placeholder="Enter Email" value={email} onChangeText={setEmail} keyboardType="email-address" />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput style={styles.input} placeholder="Enter Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

      <Text style={styles.label}>Department</Text>
      <Picker selectedValue={department} onValueChange={setDepartment} style={styles.picker}>
        <Picker.Item label="Select Department" value="" />
        <Picker.Item label="HR" value="HR" />
        <Picker.Item label="Engineering" value="Engineering" />
        <Picker.Item label="Marketing" value="Marketing" />
      </Picker>

      <Text style={styles.label}>Designation</Text>
      <TextInput style={styles.input} placeholder="Enter Designation" value={designation} onChangeText={setDesignation} />

      <Text style={styles.label}>Joining Date</Text>
      <TextInput style={styles.input} placeholder="YYYY-MM-DD" value={joiningDate} onChangeText={setJoiningDate} />

      <Text style={styles.label}>Salary</Text>
      <TextInput style={styles.input} placeholder="Enter Salary" value={salary} onChangeText={setSalary} keyboardType="numeric" />

      <Text style={styles.label}>Employee ID</Text>
      <TextInput style={styles.input} placeholder="Enter Employee ID" value={employeeId} onChangeText={setEmployeeId} />

      <Text style={styles.label}>Profile Picture</Text>
      {profilePicture && <Image source={{ uri: profilePicture }} style={styles.image} />}
      <Button title="Upload Profile Picture" onPress={pickImage} />

      <Text style={styles.label}>Status</Text>
      <Picker selectedValue={status} onValueChange={setStatus} style={styles.picker}>
        <Picker.Item label="Active" value="Active" />
        <Picker.Item label="Inactive" value="Inactive" />
      </Picker>

      <Button title={id ? 'Update Employee' : 'Add Employee'} onPress={handleSubmit} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
    color: 'black',
  },
  picker: {
    height: 50,
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
});

export default EmployeeForm;
