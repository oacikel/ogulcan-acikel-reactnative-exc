import React from 'react';
import FinanceGraph from '@/components/FinanceGraph';
import { ThemedView } from '@/components/ThemedView';
import useSampleData from '@/hooks/useSampleData';
import { View, Text } from 'react-native';

export default function TabLayout() {

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
    <ThemedView style = {[{paddingTop: 100}]}>
      <FinanceGraph data={data}/>
    </ThemedView>
  );
}
