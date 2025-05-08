import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const stored = await AsyncStorage.getItem('appointments');
        if (stored) {
          setAppointments(JSON.parse(stored));
        }
      } catch (e) {
        console.error('Failed to load appointments', e);
      }
    };
    loadAppointments();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  const addAppointment = (appointment) => {
    setAppointments([...appointments, { ...appointment, status: 'Pending' }]);
  };

  const updateAppointment = (id, newStatus, reason = '') => {
    setAppointments(prev =>
      prev.map(app => app.id === id ? { ...app, status: newStatus, reason } : app)
    );
  };

  return (
    <AppointmentContext.Provider value={{ appointments, addAppointment, updateAppointment }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => useContext(AppointmentContext);
