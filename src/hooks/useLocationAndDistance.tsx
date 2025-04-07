// useLocationAndDistance.js
import { useState, useEffect } from 'react';
import { Platform, PermissionsAndroid, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { getDistance } from 'geolib';

export const useLocationAndDistance = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [targetLocation, setTargetLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [distance, setDistance] = useState(null);

  const defaultLocation = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          Alert.alert('Permission Denied', 'Using default location.');
          setCurrentLocation(defaultLocation);
          setLoading(false);
        }
      } else {
        getCurrentLocation();
      }
    };

    const getCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
          setLoading(false);
        },
        error => {
          Alert.alert('Error', 'Could not get location. Using default.');
          setCurrentLocation(defaultLocation);
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };

    requestLocationPermission();
  }, []);


  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setTargetLocation(coordinate);

    if (currentLocation) {
      const dist = getDistance(
        {
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
        },
        {
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
        }
      ) / 1000;
      setDistance(dist.toFixed(2));
      // Alert.alert('Distance', `${dist.toFixed(2)} km`);
    }
  };

  const handleReset = () => {
    setTargetLocation(null);
    setDistance(null);
  };

  return {
    loading,
    currentLocation,
    targetLocation,
    distance,
    handleMapPress,
    handleReset,
  };
};
