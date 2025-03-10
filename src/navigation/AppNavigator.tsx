import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeList from '../components/EmployeeList';
import EmployeeScreen from '../components/EmployeeScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="EmployeeForm" component={EmployeeForm} />
        <Stack.Screen name="EmployeeList" component={EmployeeList} />
        <Stack.Screen name="EditEmployee" component={EmployeeForm} />
        <Stack.Screen name='FilterEmployee' component={EmployeeScreen} />
        <Stack.Screen name="EmployeeFilter" component={EmployeeList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
