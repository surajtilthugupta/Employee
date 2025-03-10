import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput, Switch } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { deleteEmployee } from '../features/employeeSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EmployeeFilterList = ({ setEditingEmployee }) => {
  const employees = useSelector(state => state.employees.employees);
  const dispatch = useDispatch();

  // State for filters
  const [filters, setFilters] = useState({
    search: '',
    department: '',
    showActive: true,
  });

  // Load filters from AsyncStorage when component mounts
  useEffect(() => {
    const loadFilters = async () => {
      try {
        const savedFilters = await AsyncStorage.getItem('employeeFilters');
        if (savedFilters) {
          setFilters(JSON.parse(savedFilters));
        }
      } catch (error) {
        console.log('Error loading filters:', error);
      }
    };
    loadFilters();
  }, []);

  // Save filters to AsyncStorage whenever filters change
  useEffect(() => {
    const saveFilters = async () => {
      try {
        await AsyncStorage.setItem('employeeFilters', JSON.stringify(filters));
      } catch (error) {
        console.log('Error saving filters:', error);
      }
    };
    saveFilters();
  }, [filters]);

  // Function to update filters
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Filter Employees based on criteria
  const filteredEmployees = employees.filter(emp => {
    return (
      emp.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      (filters.department === '' || emp.department === filters.department) &&
      (filters.showActive ? emp.status === 'Active' : true)
    );
  });

  return (
    <View style={styles.container}>
      {/* Filter UI */}
      <View style={styles.filterContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search by name"
          value={filters.search}
          onChangeText={text => handleFilterChange('search', text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Filter by Department"
          value={filters.department}
          onChangeText={text => handleFilterChange('department', text)}
        />

        <View style={styles.switchContainer}>
          <Text>Show Active Only</Text>
          <Switch
            value={filters.showActive}
            onValueChange={value => handleFilterChange('showActive', value)}
          />
        </View>
      </View>

      {/* Employee List */}
      <FlatList
        data={filteredEmployees}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.card, item.status === 'Active' ? styles.activeCard : styles.inactiveCard]}>
            {/* Profile Image */}
            {item.profilePicture && (
              <Image source={{ uri: item.profilePicture }} style={styles.profileImage} />
            )}

            {/* Employee Info */}
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.text}>📧 {item.email}</Text>
              <Text style={styles.text}>📞 {item.phone}</Text>
              <Text style={styles.text}>🏢 {item.department}</Text>
              <Text style={styles.text}>💼 {item.designation}</Text>
              <Text style={styles.text}>📅 Joining: {item.joiningDate}</Text>
              <Text style={styles.salary}>💰 ${item.salary}</Text>
              <Text style={styles.text}>🆔 Employee ID: {item.employeeId}</Text>

              {/* Status Indicator */}
              <Text
                style={[
                  styles.status,
                  item.status === 'Active' ? styles.active : styles.inactive,
                ]}
              >
                {item.status}
              </Text>
            </View>

            {/* Edit & Delete Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => setEditingEmployee(item)}
              >
                <Ionicons name="create-outline" size={20} color="#fff" />
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => dispatch(deleteEmployee(item.id))}
              >
                <Ionicons name="trash-outline" size={20} color="#fff" />
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 10,
  },
  filterContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#eee',
    padding: 8,
    borderRadius: 8,
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
    borderLeftWidth: 5,
  },
  activeCard: {
    borderLeftColor: '#4CAF50',
    backgroundColor: '#E8F5E9',
  },
  inactiveCard: {
    borderLeftColor: '#D32F2F',
    backgroundColor: '#FFEBEE',
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignSelf: 'center',
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#ddd',
  },
  infoContainer: {
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  text: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  salary: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginTop: 5,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#1976D2',
    padding: 10,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: '#D32F2F',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default EmployeeFilterList;
