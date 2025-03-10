import React from 'react';
import { Provider } from 'react-redux';
import AppNavigator from './src/navigation/AppNavigator';
import store, { persistor } from './src/store/store';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
