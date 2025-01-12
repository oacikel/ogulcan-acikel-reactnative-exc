import React, { useEffect, useState } from 'react';
import FinanceGraph from '@/components/FinanceGraph';
import useSampleData from '@/hooks/useSampleData';
import { View, Text } from 'react-native';
import { Stack } from 'expo-router';
import TimeFilterView from '@/components/ui/TimeFilterView';
import { TimeFilter } from '@/types/types';

const WalletAnalysis = () => {
  const { data, loading, error, fetchData } = useSampleData();
  const [filter, setFilter] = useState<TimeFilter>('7D');

  useEffect(() => {
    fetchData(filter);
  }, [filter]);

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

  const handleFilterChange = (newFilter: TimeFilter) => {
    setFilter(newFilter);
  }
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: 'Cüzdan Analizi'
        }}
      />
      <TimeFilterView selectedFilter={filter} onFilterSelected={handleFilterChange} />
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
