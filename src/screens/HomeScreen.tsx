
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EmployeeList from '../components/EmployeeList';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <EmployeeList route={navigation} />
      <TouchableOpacity style={styles.addButton} onPress={() => { navigation.navigate('EmployeeForm') }}>
        <Icon name="add" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.filterButton} onPress={() => { navigation.navigate('FilterEmployee') }}>
        <Icon name="filter-alt" size={30} color="white" />
      </TouchableOpacity>
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
    elevation: 5,
  },
  filterButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#007bff',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  }
});

export default HomeScreen;

