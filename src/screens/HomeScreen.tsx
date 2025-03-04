
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeList from '../components/EmployeeList';

const HomeScreen = () => {
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setIsFormVisible(true);
  };

  const handleFormClose = () => {
    setIsFormVisible(false);
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setIsFormVisible(true); 
  };
  return (
    <View style={styles.container}>
      {isFormVisible ? (
        <EmployeeForm 
          editingEmployee={editingEmployee} 
          setEditingEmployee={setEditingEmployee}
          onClose={handleFormClose}
            
        />
      ) : (
        <ScrollView>
          <EmployeeList setEditingEmployee={handleEditEmployee}  />
        </ScrollView>
      )}

      {!isFormVisible && (
        <TouchableOpacity style={styles.addButton} onPress={handleAddEmployee}>
          <Icon name="add" size={30} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007bff',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // For Android shadow
  },
});

export default HomeScreen;

