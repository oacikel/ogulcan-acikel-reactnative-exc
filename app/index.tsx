import i18n from '@/i18n';
import { Link, Stack } from 'expo-router';
import {View, StyleSheet } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: i18n.t('home'),
        }}
      />
      <Link href={{ pathname: '/walletAnalysis' }}>{i18n.t('goToWalletDetail')}</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
