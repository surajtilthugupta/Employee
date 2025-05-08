import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import AppNavigator from './src/navigation/AppNavigator';
import store, { persistor } from './src/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import messaging from '@react-native-firebase/messaging';
import { Alert, View } from 'react-native';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { AppointmentProvider } from './src/context/AppointmentContext';
import PatientScreen from './src/screens/PatientScreen';
import DoctorScreen from './src/screens/DoctorScreen';
import Icon from 'react-native-vector-icons/FontAwesome6';
const App = () => {

  useEffect(() => {
    // Request permission
    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      if (
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL
      ) {
        console.log("Notification permission granted.");
        getFCMToken();
      } else {
        console.log("Notification permission denied.");
      }
    };

    // Get FCM Token
    const getFCMToken = async () => {
      const token = await messaging().getToken();
      console.log("FCM Token:", token);
      // Send this token to your backend if needed
    };

    requestUserPermission();

    // Listen for foreground messages
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert("New Notification", remoteMessage.notification?.body);
    });

    return unsubscribe;
  }, []);
  const Tab = createBottomTabNavigator();
  return (
    //<Provider store={store}>
    //  <PersistGate loading={null} persistor={persistor}>
    //    <AppNavigator />
    //  </PersistGate>
    //</Provider>
    <AppointmentProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Patient"
            component={PatientScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="add" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen name="Doctor" component={DoctorScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="user-doctor" size={size} color={color} />
              ),
            }} />
        </Tab.Navigator>
      </NavigationContainer>
    </AppointmentProvider>
  );
};

export default App;
