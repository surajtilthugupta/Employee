import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const FilterComponent = ({ employees, setFilteredEmployees }) => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const storedFilters = await AsyncStorage.getItem('employeeFilters');
        if (storedFilters) {
          const parsedFilters = JSON.parse(storedFilters);
          setName(parsedFilters.name || '');
          setDepartment(parsedFilters.department || '');
          setIsActive(parsedFilters.isActive || false);
          applyFilter(parsedFilters, false);
        }
      } catch (error) {
        console.error('Failed to load filters:', error);
      }
    };
    loadFilters();
  }, []);

  const applyFilter = async (filterValues = null, saveToStorage = true) => {
    const filters = filterValues ?? { name, department, isActive };

    if (saveToStorage) {
      try {
        await AsyncStorage.setItem('employeeFilters', JSON.stringify(filters));
      } catch (error) {
        console.error('Error saving filters:', error);
      }
    }

    let filteredData = employees;

    if (filters.name.trim()) {
      filteredData = filteredData.filter(emp =>
        emp.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    if (filters.department) {
      filteredData = filteredData.filter(emp => emp.department === filters.department);
    }

    if (filters.isActive !== null) {
      filteredData = filteredData.filter(emp => emp.isActive === filters.isActive);
    }

    setFilteredEmployees(filteredData);
  };

  const clearFilter = async () => {
    setName('');
    setDepartment('');
    setIsActive(false);
    setFilteredEmployees(employees);

    try {
      await AsyncStorage.removeItem('employeeFilters');
    } catch (error) {
      console.error('Error clearing filters:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter Employees</Text>

      {/* Text Input for Name */}
      <TextInput
        placeholder="Search by name"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      {/* Dropdown for Department */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={department}
          onValueChange={setDepartment}
          style={styles.picker}
        >
          <Picker.Item label="All Departments" value="" />
          <Picker.Item label="Engineering" value="Engineering" />
          <Picker.Item label="HR" value="HR" />
          <Picker.Item label="Sales" value="Sales" />
        </Picker>
      </View>

      <View style={styles.switchContainer}>
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setIsActive(true)}
        >
          <MaterialCommunityIcons
            name={isActive === true ? 'checkbox-marked' : 'checkbox-blank-outline'}
            size={24}
            color="#007bff"
          />
          <Text style={styles.checkboxLabel}>Active</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setIsActive(false)}
        >
          <MaterialCommunityIcons
            name={isActive === false ? 'checkbox-marked' : 'checkbox-blank-outline'}
            size={24}
            color="#dc3545"
          />
          <Text style={styles.checkboxLabel}>Inactive</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setIsActive(null)} // Reset filter
        >
          <MaterialCommunityIcons
            name={isActive === null ? 'checkbox-marked' : 'checkbox-blank-outline'}
            size={24}
            color="#333"
          />
          <Text style={styles.checkboxLabel}>All</Text>
        </TouchableOpacity>
      </View>

      {/* Buttons */}
      <TouchableOpacity style={styles.applyButton} onPress={() => applyFilter()}>
        <Text style={styles.buttonText}>Apply Filter</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.clearButton} onPress={clearFilter}>
        <Text style={styles.buttonText}>Clear Filter</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FilterComponent;

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    margin: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 10,
    color: '#000',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#000',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  applyButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  clearButton: {
    backgroundColor: '#dc3545',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


