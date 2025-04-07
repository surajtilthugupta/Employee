import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeList from '../components/EmployeeList';
import EmployeeScreen from '../components/EmployeeScreen';
import MapScreen from '../screens/MapScreen';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={({ navigation }) => ({
            title: 'Home',
            headerRight: () => (
              <TouchableOpacity
                style={{ marginRight: 15 }}
                onPress={() => navigation.navigate('Map')}
              >
                <Ionicons name="map-outline" size={24} color="#000" />
              </TouchableOpacity>
            ),
          })}  />
        <Stack.Screen name="EmployeeForm" component={EmployeeForm} />
        <Stack.Screen name="EmployeeList" component={EmployeeList} />
        <Stack.Screen name="EditEmployee" component={EmployeeForm} />
        <Stack.Screen name='FilterEmployee' component={EmployeeScreen} />
        <Stack.Screen name="EmployeeFilter" component={EmployeeList} />
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
