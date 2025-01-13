import React, { useEffect } from 'react';
import { Poppins_400Regular, useFonts } from '@expo-google-fonts/poppins';
import { SplashScreen, Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import { Colors } from '@/constants/Colors';
import i18n from '../i18n/';

SplashScreen.preventAutoHideAsync();

const Layout = () => {

// Loading fonts
// Further reading https://docs.expo.dev/develop/user-interface/fonts/
const [loaded, error] = useFonts({
  Poppins_400Regular,
});

useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  
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