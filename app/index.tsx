import { Link, Stack } from 'expo-router';
import {View, StyleSheet } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Ana Sayfa'
        }}
      />
      <Link href={{ pathname: '/walletAnalysis' }}>Go to Details</Link>
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
