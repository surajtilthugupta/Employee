import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  department: '', // Dropdown selection
  isActive: false, // Checkbox
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetFilter: () => initialState, // Reset filters
  },
});

export const { setFilter, resetFilter } = filterSlice.actions;
export default filterSlice.reducer;
