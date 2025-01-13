import React from 'react';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import { Colors } from '@/constants/Colors';

const Layout = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Stack
          screenOptions={{
            headerShown: true,
            headerTitleAlign: 'center',
            headerBackButtonDisplayMode: "minimal",
            headerShadowVisible: false,
            headerTintColor: Colors.textDark,
            headerTitleStyle: { fontSize: 20, color: Colors.textDark },
            contentStyle: { flex: 1, backgroundColor: '#fff' }
          }}
        />
      </PersistGate>
    </Provider>
  );
};

export default Layout;