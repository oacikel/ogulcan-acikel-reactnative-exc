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
import { globalStyles } from './styles/globalStyles';
import i18n from '@/i18n';

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
      <View style={globalStyles.placeholderContainer}>
        <Text style={globalStyles.placeholderText}>{i18n.t('loading')}</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={globalStyles.placeholderContainer}>
        <Text style={globalStyles.placeholderText}>{i18n.t('error')}</Text>
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
          title: i18n.t('walletAnalysis'),
        }}
      />
      <View style={globalStyles.walletViewContainer}>
        <TimeFilterView selectedFilter={filter} onFilterSelected={handleFilterChange} />
        <FinanceGraph data={data} style={{ height: '45%', width: '100%' }} />
      </View>
    </View>
  );
};

export default WalletAnalysis;

WalletAnalysis.options = {
  title: i18n.t('walletAnalysis'),
};
