import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, Button, StyleSheet } from 'react-native';
import Color from '../assets/Color';
import { FONT_FAMILY } from '../assets/FontFamily';
import moment from 'moment';

type AppointmentCardProps = {
  item: any;
  isDoctor?: boolean;
  onAccept?: () => void;
  onReject?: () => void;
};


export default function AppointmentCard({ item, isDoctor = false, onAccept, onReject }: AppointmentCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>Name: {item.name}</Text>
      <Text style={styles.details}>Age: {item.age}</Text>
      <Text style={styles.details}>Disease: {item.disease}</Text>
      <Text style={styles.details}>Date: {moment(item.date).format('YYYY-MM-DD h:mm A')}</Text>
      <Text style={styles.details}>Status: {item.status}</Text>
      {item?.reason ? <Text style={styles.details}>Reason: {item.reason}</Text> : null}
      {isDoctor && item.status === 'Pending' && (
        <View style={styles.actions}>
          <TouchableOpacity  style={styles.aceptButton} onPress={onAccept}>
            <Text style={styles.textButton}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.aceptButton} onPress={onReject}>
            <Text style={styles.textButton}>Reject</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { 
    paddingHorizontal: 15,
    paddingVertical: 10,
    margin: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Color.light_grey,
    backgroundColor: Color.white,
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  actions: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 10 
  },
  aceptButton: {
     padding: 10, 
     borderWidth: 0.5, 
     margin: 10, 
     borderRadius: 6, 
     backgroundColor:Color.secondary 
  },
  name: {
    fontSize: 18,
    color: Color.black,
    marginBottom: 8,
    fontFamily: FONT_FAMILY.POPPINS_REGULAR 
  },
  details: {
    fontSize: 14,
    color: Color.dark_grey,
    marginBottom: 4,
  },
  textButton:{
    color:Color.white
  }
});
