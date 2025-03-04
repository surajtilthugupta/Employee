import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { deleteEmployee } from '../features/employeeSlice';

const EmployeeCard = ({ employee }) => {
  const dispatch = useDispatch();

  return (
    <View>
      {employee.profilePicture && <Image source={{ uri: employee.profilePicture }} style={{ width: 50, height: 50 }} />}
      <Text>{employee.name}</Text>
      <Text>{employee.email}</Text>
      <Text>{employee.phone}</Text>
      <Text>{employee.department}</Text>
      <Text>{employee.designation}</Text>
      <Text>{employee.salary}</Text>
      <Text>{employee.status}</Text>
      <Button title="Delete" onPress={() => dispatch(deleteEmployee(employee.id))} />
    </View>
  );
};

export default EmployeeCard;
