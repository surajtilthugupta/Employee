import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useSelector, useDispatch } from 'react-redux';
import { deleteEmployee } from '../features/employeeSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EmployeeFilterList = ({ setEditingEmployee }) => {
  const employees = useSelector(state => state.employees.employees);
  const dispatch = useDispatch();

  // Extract unique departments for Picker
  const uniqueDepartments = ['All', ...new Set(employees.map(emp => emp.department))];

  // State for filters
  const [filters, setFilters] = useState({
    search: '',
    department: 'All',
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

  // Clear filters
  const handleClearFilters = () => {
    setFilters({ search: '', department: 'All', showActive: true });
  };

  // Filter Employees based on criteria
  const filteredEmployees = employees.filter(emp => {
    return (
      emp.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      (filters.department === 'All' || emp.department === filters.department) &&
      (filters.showActive ? emp.status === 'Active' : emp.status === 'Inactive')
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
          placeholderTextColor={'#999'}
        />

        {/* Picker for Department Selection */}
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Department</Text>
          <Picker
            selectedValue={filters.department}
            onValueChange={(value) => handleFilterChange('department', value)}
            style={styles.picker}
          >
            {uniqueDepartments.map((dept, index) => (
              <Picker.Item key={index} label={dept} value={dept} />
            ))}
          </Picker>
        </View>

        {/* Active/Inactive Toggle */}
        <View style={styles.switchContainer}>
          <Text>{filters.showActive ? 'Active Employees' : 'Inactive Employees'}</Text>
          <Switch
            value={filters.showActive}
            thumbColor={filters.showActive ? '#4CAF50' : '#f44336'}
            trackColor={{ true: '#4CAF50', false: '#f44336' }}
            onValueChange={value => handleFilterChange('showActive', value)}
          />
        </View>

        {/* Apply and Clear Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.applyButton} onPress={() => { }}>
            <Text style={styles.buttonText}>Apply Filters</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.clearButton} onPress={handleClearFilters}>
            <Text style={styles.buttonText}>Clear Filters</Text>
          </TouchableOpacity>
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
                  styles.statusStyle,
                  item.status === 'Active' ? styles.active : styles.inactive,
                ]}
              >
                {item.status}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5', padding: 10 },
  filterContainer: { padding: 10, backgroundColor: '#fff', borderRadius: 10, marginBottom: 10 },
  input: { backgroundColor: '#eee', padding: 8, borderRadius: 8, marginBottom: 10 },
  pickerContainer: { backgroundColor: '#eee', borderRadius: 8, marginBottom: 10 },
  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 5, paddingLeft: 5,color:'#333' },
  picker: { height: 50, width: '100%', color: '#333' },
  switchContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5,color:'#333' },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10,color:'#333' },
  applyButton: { backgroundColor: '#1976D2', padding: 10, borderRadius: 8, flex: 1, marginRight: 5 },
  clearButton: { backgroundColor: '#D32F2F', padding: 10, borderRadius: 8, flex: 1, marginLeft: 5 },
  card: { backgroundColor: '#fff', padding: 15, marginVertical: 10, borderRadius: 12, elevation: 4, borderLeftWidth: 5 },
  activeCard: { borderLeftColor: '#4CAF50', backgroundColor: '#E8F5E9' },
  inactiveCard: { borderLeftColor: '#D32F2F', backgroundColor: '#FFEBEE' },
  profileImage: { width: 90, height: 90, borderRadius: 45, alignSelf: 'center', marginBottom: 10 },
  infoContainer: { alignItems: 'center' },
  name: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  text: { fontSize: 14, color: '#555', marginTop: 2 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  statusStyle: { fontSize: 15, fontWeight: 'bold', marginTop: 5 },
  active: { color: 'green' },
  inactive: { color: 'red' },
  salary: { fontSize: 16, fontWeight: 'bold', color: '#4CAF50', marginTop: 5 },

});

export default EmployeeFilterList;

