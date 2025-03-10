import React, { useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { deleteEmployee, fetchEmployees } from '../features/employeeSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const EmployeeList = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { employees, loading } = useSelector(state => state.employees);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  const handleEditEmployee = (employee) => {
    navigation.navigate('EditEmployee', { editingEmployee: employee });
  };

  return (
    <View style={styles.container}>
      {employees?.length > 0 ? (
        <FlatList
          data={employees}
          keyExtractor={(item) => item.id.toString()}
          refreshing={loading}
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
                  onPress={() => handleEditEmployee(item)}
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
      ) : (
        <View style={styles.noData}>
          <Text>No Employees Added</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Light gray background
    padding: 10,
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
    flexDirection: 'column',
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
  active: {
    backgroundColor: '#C8E6C9',
    color: '#2E7D32',
  },
  inactive: {
    backgroundColor: '#FFCDD2',
    color: '#C62828',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1976D2',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D32F2F',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  noData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EmployeeList;
