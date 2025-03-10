import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import EmployeeFilterList from './EmployeeFilterList';

const EmployeeScreen = () => {
  const { employees } = useSelector(state => state.employees);
  return (
    <View style={{ flex: 1 }}>
      <EmployeeFilterList setEditingEmployee={employees} />
    </View>
  );
};

export default EmployeeScreen;


