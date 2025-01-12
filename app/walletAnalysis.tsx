import React, { useEffect, useState } from 'react';
import FinanceGraph from '@/components/FinanceGraph';
import useSampleData from '@/hooks/useSampleData';
import { View, Text } from 'react-native';
import { Stack } from 'expo-router';
import TimeFilterView from '@/components/ui/TimeFilterView';
import { TimeFilter } from '@/types/types';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setFilter } from './redux/slices/filterSlice';

const WalletAnalysis = () => {
  const { data, loading, error, fetchData } = useSampleData();
  const dispatch = useDispatch();
  const filter = useSelector((state:any) => state.filter.filter);

  useEffect(() => {
    console.log('filter', filter);
    if (filter) {
      fetchData(filter);
    } else {
      dispatch(setFilter('7D'));
    }
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
    dispatch(setFilter(newFilter));
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
