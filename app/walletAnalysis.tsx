import React from 'react';
import FinanceGraph from '@/components/FinanceGraph';
import useSampleData from '@/hooks/useSampleData';
import { View, Text } from 'react-native';
import { Stack } from 'expo-router';

const WalletAnalysis = () => {
  const { data, loading, error } = useSampleData();

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: 'Cüzdan Analizi'
        }}
      />
      <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 80, padding: 20 }}>
        <FinanceGraph data={data} style={{ height: 100, width: '100%' }} />
      </View>
    </View>
  );
};

export default WalletAnalysis;

WalletAnalysis.options = {
  title: 'Cüzdan Analizi',
};
