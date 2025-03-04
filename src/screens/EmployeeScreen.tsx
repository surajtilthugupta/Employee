// src/screens/EmployeeScreen.js
import React, { useState } from 'react';
import { View } from 'react-native';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeList from '../components/EmployeeList';

const EmployeeScreen = () => {
  const [editingEmployee, setEditingEmployee] = useState(null);

  return (
    <View>
      <EmployeeForm editingEmployee={editingEmployee} setEditingEmployee={setEditingEmployee} />
      <EmployeeList setEditingEmployee={setEditingEmployee} />
    </View>
  );
};

export default EmployeeScreen;
