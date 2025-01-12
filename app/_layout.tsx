import React from 'react';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';

const Layout = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Stack
          screenOptions={{
            headerShown: true,
            headerTitleAlign: 'center',
            headerBackButtonDisplayMode: "minimal",
          }}
        />
      </PersistGate>
    </Provider>
  );
};

export default Layout;