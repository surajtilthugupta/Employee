import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunk to Fetch Employees from API
export const fetchEmployees = createAsyncThunk(
  'employees/fetchEmployees',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://67c49168c4649b9551b3fdd6.mockapi.io/empolyee');
      console.log("response", response);
      return response.data; // Returns data to extraReducers


    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);
export const addEmployeeToAPI = createAsyncThunk(
  'employees/addEmployee',
  async (employeeData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://67c49168c4649b9551b3fdd6.mockapi.io/empolyee', employeeData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);
export const updateEmployeeInAPI = createAsyncThunk(
  'employees/updateEmployee',
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`https://67c49168c4649b9551b3fdd6.mockapi.io/empolyee/${id}`, updatedData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);
export const deleteEmployeeFromAPI = createAsyncThunk(
  'employees/deleteEmployee',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`https://67c49168c4649b9551b3fdd6.mockapi.io/empolyee/${id}`);
      return id; // Return the deleted employee's ID
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);


const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    employees: [],
    loading: false,
    error: null,
  },
  reducers: {
    addEmployee: (state, action) => {
      state.employees.push(action.payload);
    },
    updateEmployee: (state, action) => {
      const index = state.employees.findIndex(emp => emp.id === action.payload.id);
      if (index !== -1) {
        state.employees[index] = action.payload;
      }
    },
    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter(emp => emp.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle Add Employee
      .addCase(addEmployeeToAPI.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })

      // Handle Update Employee
      .addCase(updateEmployeeInAPI.fulfilled, (state, action) => {
        const index = state.employees.findIndex(emp => emp.id === action.payload.id);
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      })

      // Handle Delete Employee
      .addCase(deleteEmployeeFromAPI.fulfilled, (state, action) => {
        state.employees = state.employees.filter(emp => emp.id !== action.payload);
      })
  },
});

export const { addEmployee, updateEmployee, deleteEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
