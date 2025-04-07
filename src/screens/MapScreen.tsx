// MapScreen.js
import React from 'react';
import { View, ActivityIndicator, StyleSheet, Button } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useLocationAndDistance } from '../hooks/useLocationAndDistance';

export default function MapScreen() {
  const {
    loading,
    currentLocation,
    targetLocation,
    distance,
    handleMapPress,
    handleReset,
  } = useLocationAndDistance();

  if (loading || !currentLocation) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={currentLocation}
        onPress={handleMapPress}
        showsUserLocation
      >
        {currentLocation && (
          <Marker coordinate={currentLocation} title="You" pinColor="green" />
        )}
        {targetLocation && (
          <Marker coordinate={targetLocation} title="Target" pinColor="red" />
        )}
        {currentLocation && targetLocation && (
          <Polyline
            coordinates={[currentLocation, targetLocation]}
            strokeColor="black"
            strokeWidth={3}
          />
        )}
      </MapView>

      <View style={styles.bottomPanel}>
        {distance && (
          <View style={styles.distanceBox}>
            <Button title={`Distance: ${distance} km`} disabled color="#2196f3" />
          </View>
        )}
        {targetLocation && (
          <Button title="Reset" onPress={handleReset} color="#f44336" />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomPanel: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  distanceBox: {
    marginBottom: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    elevation: 3,
  },
});

