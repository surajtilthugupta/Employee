
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://67c49168c4649b9551b3fdd6.mockapi.io/ExpenseTracker';

// 🔄 Async Thunks
export const fetchExpenses = createAsyncThunk(
  'expense/fetchExpenses',
  async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
  }
);

export const addExpense = createAsyncThunk(
  'expense/addExpense',
  async (expenseData) => {
    const response = await axios.post(BASE_URL, expenseData);
    return response.data;
  }
);

export const updateExpense = createAsyncThunk(
    
  'expense/updateExpense',
  async ({ id, data }) => {
    console.log("updateExpense",id, data);

    const response = await axios.put(`${BASE_URL}/${id}`, data);
    return response.data;
  }
);

export const deleteExpense = createAsyncThunk(
  'expense/deleteExpense',
  async (id) => {
    await axios.delete(`${BASE_URL}/${id}`);
    return id;
  }
);

// ✅ Slice
const expenseSlice = createSlice({
  name: 'expense',
  initialState: {
    expenses: [],
    loading: false,
    error: null,
  },
  reducers: {}, // No need for manual reducers
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.expenses = action.payload;
        state.loading = false;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //  ADD
      .addCase(addExpense.fulfilled, (state, action) => {
        state.expenses.push(action.payload);
      })

      // UPDATE
      .addCase(updateExpense.fulfilled, (state, action) => {
        const index = state.expenses.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.expenses[index] = action.payload;
        }
      })

      //  DELETE
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.expenses = state.expenses.filter(item => item.id !== action.payload);
      });
  },
});

export default expenseSlice.reducer;
