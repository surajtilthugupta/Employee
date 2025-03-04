import React from 'react';
import { View, Text, Button, FlatList, Image, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { deleteEmployee } from '../features/employeeSlice';

const EmployeeList = ({ setEditingEmployee }) => {
  const employees = useSelector(state => state.employees.employees);
  const dispatch = useDispatch();

  return (
    <FlatList
      data={employees}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          {/* Display Profile Picture if available */}
          {item.profilePicture ? (
            <Image source={{ uri: item.profilePicture }} style={styles.profileImage} />
          ) : null}

          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.text}>Email: {item.email}</Text>
          <Text style={styles.text}>Phone: {item.phone}</Text>
          <Text style={styles.text}>Department: {item.department}</Text>
          <Text style={styles.text}>Designation: {item.designation}</Text>
          <Text style={styles.text}>Joining Date: {item.joiningDate}</Text>
          <Text style={styles.text}>Salary: {item.salary}</Text>
          <Text style={styles.text}>Employee ID: {item.employeeId}</Text>
          <Text style={styles.text}>Status: {item.status}</Text>

          <View style={styles.buttonContainer}>
            <Button title="Edit" onPress={() => {
              console.log('Editing Employee:', item);
              setEditingEmployee(item);
            }} />
            <Button title="Delete" onPress={() => dispatch(deleteEmployee(item.id))} color="red" />
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 5,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    alignSelf: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  text: {
    fontSize: 14,
    marginBottom: 3,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default EmployeeList;
