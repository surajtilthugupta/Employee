import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from '../features/employeeSlice';
import filterReducer from '../features/filterSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';

// 1️⃣ Configure Persist Storage
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['employees', 'filter'], // Persist both employees & filters
};

// 2️⃣ Combine Reducers
const rootReducer = combineReducers({
  employees: persistReducer(persistConfig, employeeReducer),
  filter: persistReducer(persistConfig, filterReducer),
});

// 3️⃣ Create Store with Persisted Reducer
export const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);

export default store;



