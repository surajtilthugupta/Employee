import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addEmployee, updateEmployee } from '../features/employeeSlice';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import { launchImageLibrary } from 'react-native-image-picker';

const EmployeeForm = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { editingEmployee } = route.params || {};
  const [openDatePicker, setOpenDatePicker] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      department: '',
      designation: '',
      joiningDate: '',
      salary: '',
      employeeId: '',
      status: 'Active',
      profilePicture: '',
    },
  });

  useEffect(() => {
    if (editingEmployee) {
      Object.keys(editingEmployee).forEach((key) => {
        setValue(key, editingEmployee[key] || '');
      });
    }
  }, [editingEmployee, setValue]);

  const onSubmit = (data) => {
    console.log("data", data);
    
    if (editingEmployee) {
      dispatch(updateEmployee({ ...editingEmployee, ...data }));
    } else {
      dispatch(addEmployee({ id: Date.now(), ...data }));
    }

    reset();
    navigation.goBack();
  };

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
      if (response.didCancel) {
        Alert.alert('Cancelled', 'Image selection was cancelled');
      } else if (response.errorMessage) {
        Alert.alert('Error', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setValue('profilePicture', response.assets[0].uri);
      }
    });
  };

  const profilePicture = watch('profilePicture');
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        {/* Profile Picture */}
        <Text style={styles.label}>Profile Picture</Text>
        {profilePicture ? <Image source={{ uri: profilePicture }} style={styles.image} /> : null}
        <Button title="Upload Profile Picture" onPress={pickImage} />
        {/* Full Name */}
        <Text style={styles.label}>Full Name</Text>
        <Controller
          control={control}
          name="name"
          rules={{ required: 'Full Name is required' }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Enter Full Name"
              placeholderTextColor="black"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <Controller
          control={control}
          name="email"
          rules={{
            required: 'Email is required',
            pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email format' },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Enter Email"
              placeholderTextColor="black"
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
            />
          )}
        />
        {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

        {/* Phone Number */}
        <Text style={styles.label}>Phone Number</Text>
        <Controller
          control={control}
          name="phone"
          rules={{
            required: 'Phone number is required',
            pattern: { value: /^[0-9]{10}$/, message: 'Enter a valid 10-digit phone number' },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Enter Phone Number"
              placeholderTextColor="black"
              value={value}
              onChangeText={onChange}
              keyboardType="numeric"
            />
          )}
        />
        {errors.phone && <Text style={styles.error}>{errors.phone.message}</Text>}

        {/* Department Picker */}
        <Text style={styles.label}>Department</Text>
        <Controller
          control={control}
          name="department"
          rules={{ required: 'Department is required' }}
          render={({ field: { onChange, value } }) => (
            <Picker selectedValue={value} onValueChange={onChange} style={styles.picker}>
              <Picker.Item label="Select Department" value="" />
              <Picker.Item label="HR" value="HR" />
              <Picker.Item label="Engineering" value="Engineering" />
              <Picker.Item label="Marketing" value="Marketing" />
            </Picker>
          )}
        />
        {errors.department && <Text style={styles.error}>{errors.department.message}</Text>}

        {/* Designation */}
        <Text style={styles.label}>Designation</Text>
        <Controller
          control={control}
          name="designation"
          rules={{ required: 'Designation is required' }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Enter Designation"
              placeholderTextColor="black"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.designation && <Text style={styles.error}>{errors.designation.message}</Text>}

        {/* Joining Date with Date Picker */}
        <Text style={styles.label}>Joining Date</Text>
        <Controller
          control={control}
          name="joiningDate"
          rules={{ required: 'Joining Date is required' }}
          render={({ field: { onChange, value } }) => (
            <>
              <TouchableOpacity onPress={() => setOpenDatePicker(true)}>
                <TextInput
                  style={styles.input}
                  placeholder="Select Joining Date"
                  placeholderTextColor="black"
                  value={value}
                  editable={false}
                />
              </TouchableOpacity>
              <DatePicker
                modal
                open={openDatePicker}
                date={value ? new Date(value) : new Date()}
                mode="date"
                onConfirm={(date) => {
                  setOpenDatePicker(false);
                  onChange(date.toISOString().split('T')[0]); // Format YYYY-MM-DD
                }}
                onCancel={() => setOpenDatePicker(false)}
              />
            </>
          )}
        />
        {errors.joiningDate && <Text style={styles.error}>{errors.joiningDate.message}</Text>}

        {/* Salary */}
        <Text style={styles.label}>Salary</Text>
        <Controller
          control={control}
          name="salary"
          rules={{
            required: 'Salary is required',
            pattern: { value: /^[0-9]+$/, message: 'Enter a valid salary amount' },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Enter Salary"
              placeholderTextColor="black"
              value={value}
              onChangeText={onChange}
              keyboardType="numeric"
            />
          )}
        />
        {errors.salary && <Text style={styles.error}>{errors.salary.message}</Text>}

        {/* Employee ID */}
        <Text style={styles.label}>Employee ID</Text>
        <Controller
          control={control}
          name="employeeId"
          rules={{ required: 'Employee ID is required' }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Enter Employee ID"
              placeholderTextColor="black"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.employeeId && <Text style={styles.error}>{errors.employeeId.message}</Text>}

        <Text style={styles.label}>Status</Text>
        <Controller
          control={control}
          name="status"
          rules={{ required: 'Status is required' }}
          render={({ field: { onChange, value } }) => (
            <Picker selectedValue={value} onValueChange={onChange} style={styles.picker}>
              <Picker.Item label="Active" value="Active" />
              <Picker.Item label="Inactive" value="Inactive" />
            </Picker>

          )}
        />
        {errors.status && <Text style={styles.error}>{errors.status.message}</Text>}

        {/* Submit Button */}
        <Button title={editingEmployee ? 'Update Employee' : 'Add Employee'} onPress={handleSubmit(onSubmit)} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 10 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 8, borderRadius: 5, backgroundColor: 'white', color: 'black' },
  picker: { height: 50, marginBottom: 10, borderWidth: 1, borderColor: 'black', borderRadius: 5, backgroundColor: 'white', color: 'black' },
  image: { width: 100, height: 100, borderRadius: 50, marginVertical: 10 },
  error: { color: 'red', fontSize: 12 },
});

export default EmployeeForm;
