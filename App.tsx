import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import AppNavigator from './src/navigation/AppNavigator';
import store, { persistor } from './src/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

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
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
