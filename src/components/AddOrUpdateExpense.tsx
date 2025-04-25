import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addExpense, updateExpense } from '../features/expenseSlice';

const AddOrUpdateExpense = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { employee, existingExpense } = route.params;

  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense'); // default

  useEffect(() => {
    if (existingExpense) {
      setCategory(existingExpense.category);
      setAmount(existingExpense.amount.toString());
      setType(existingExpense.type);
    }
  }, [existingExpense]);

  const handleSubmit = () => {
    if (!category || !amount) {
      Alert.alert('Error', 'Please enter both category and amount');
      return;
    }

    const payload = {
      id: existingExpense?.id || '',
      employeeId: employee.id,
      category,
      amount: parseFloat(amount),
      type,
    };
    const data = {
      category,
      amount: parseFloat(amount),
      employeeId: employee.id,
      type,
    };

    if (existingExpense) {
      dispatch(updateExpense({
        id: existingExpense.id,
        data,
      }));

    } else {
      dispatch(addExpense(payload));
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {existingExpense ? 'Edit Transaction' : 'Add Transaction'}
      </Text>

      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            type === 'income' && styles.toggleActive,
          ]}
          onPress={() => setType('income')}
        >
          <Text
            style={[
              styles.toggleText,
              type === 'income' && styles.toggleTextActive,
            ]}
          >
            Income
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toggleButton,
            type === 'expense' && styles.toggleActive,
          ]}
          onPress={() => setType('expense')}
        >
          <Text
            style={[
              styles.toggleText,
              type === 'expense' && styles.toggleTextActive,
            ]}
          >
            Expense
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Category (e.g. Salary, Food)"
        value={category}
        onChangeText={setCategory}
        placeholderTextColor={'#555'}
      />

      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        placeholderTextColor={'#555'}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>
          {existingExpense ? 'Update' : 'Add'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'center',
  },
  toggleButton: {
    padding: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 5,
    borderRadius: 10,
  },
  toggleActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  toggleText: {
    fontSize: 16,
    color: '#555',
  },
  toggleTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    marginVertical: 10,
    padding: 12,
    borderRadius: 10,
  },
  submitButton: {
    backgroundColor: '#4CAF00',
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddOrUpdateExpense;


