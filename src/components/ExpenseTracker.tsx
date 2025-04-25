
import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { PieChart } from 'react-native-svg-charts';
import { Text as SvgText } from 'react-native-svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { deleteExpense, fetchExpenses } from '../features/expenseSlice';

const ExpenseTracker = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const employee = route?.params?.employee;

  const allExpenses = useSelector(state => state?.expenses?.expenses || []);
	useEffect(() => {
		dispatch(fetchExpenses());
	}, []);

  if (!employee) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No employee selected.</Text>
      </View>
    );
  }

  const expenses = allExpenses.filter(e => e.employeeId === employee.id);

  const incomeAmount = expenses
    .filter(item => item.type === 'income')
    .reduce((sum, item) => sum + item.amount, 0);

  const expenseAmount = expenses
    .filter(item => item.type === 'expense')
    .reduce((sum, item) => sum + item.amount, 0);

  const totalAmount = incomeAmount + expenseAmount;

  const pieData = [
    {
      key: 'Income',
      amount: incomeAmount,
      svg: { fill: '#4CAF50' },
      label: 'Income',
    },
    {
      key: 'Expense',
      amount: expenseAmount,
      svg: { fill: '#F44336' },
      label: 'Expense',
    },
  ];

  const Labels = ({ slices }) =>
    slices.map((slice, index) => {
      const { pieCentroid, data } = slice;
      return (
        <SvgText
          key={index}
          x={pieCentroid[0]}
          y={pieCentroid[1]}
          fill="white"
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize={12}
          stroke="black"
          strokeWidth={0.2}
        >
          {data.label}
        </SvgText>
      );
    });

  const handleDelete = id => {
    dispatch(deleteExpense(id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense Tracker - {employee.name}</Text>

      {totalAmount > 0 ? (
        <View style={{ height: 220, marginBottom: 10 }}>
          <PieChart
            style={{ height: 200 }}
            data={pieData}
            valueAccessor={({ item }) => item.amount}
            outerRadius={'80%'}
          >
            <Labels />
          </PieChart>
        </View>
      ) : (
        <Text style={styles.noExpensesText}>No transactions yet.</Text>
      )}

      <Text style={styles.total}>
        Income: ${incomeAmount} | Expenses: ${expenseAmount}
      </Text>

      <FlatList
        data={expenses}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <View>
              <Text style={styles.expenseText}>{item.category}</Text>
              <Text style={styles.amount}>
                {item.type === 'income' ? '+' : '-'}${item.amount}
              </Text>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('AddOrUpdateExpense', {
                    employee,
                    existingExpense: item,
                  })
                }
              >
                <Ionicons name="create-outline" size={24} color="#2196F3" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Ionicons name="trash-outline" size={24} color="#F44336" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          navigation.navigate('AddOrUpdateExpense', { employee })
        }
      >
        <Ionicons name="add-circle-outline" size={22} color="#fff" />
        <Text style={styles.addText}>Add Transaction</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  total: { textAlign: 'center', fontSize: 16, marginVertical: 10 },
  noExpensesText: { textAlign: 'center', color: '#777', marginVertical: 10 },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginVertical: 6,
  },
  expenseText: { fontSize: 16, fontWeight: 'bold' },
  amount: { fontSize: 14, color: '#666' },
  actions: { flexDirection: 'row', gap: 16 },
  addButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 20,
  },
  addText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default ExpenseTracker;

