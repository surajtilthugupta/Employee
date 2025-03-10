import React, { useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { useSelector } from 'react-redux';
import FilterComponent from './FilterComponent';

const EmployeeScreen = () => {
  const { employees } = useSelector(state => state.employees);
  const [filteredEmployees, setFilteredEmployees] = useState(employees);
  console.log("EmployeeScreen",employees);
  

  return (
    <View>
      {/* Pass Redux employees to filter and update the filtered list */}
      <FilterComponent employees={employees} setFilteredEmployees={setFilteredEmployees} />

      {/* Display filtered employees */}
      <FlatList
        data={filteredEmployees}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Text>{item.name} - {item.department} - {item.isActive ? 'Active' : 'Inactive'}</Text>
        )}
      />
    </View>
  );
};

export default EmployeeScreen;


