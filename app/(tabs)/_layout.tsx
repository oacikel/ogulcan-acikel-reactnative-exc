import React from 'react';
import FinanceGraph from '@/components/FinanceGraph';
import useSampleData from '@/hooks/useSampleData';
import { View, Text } from 'react-native';
import { GRAPH_HEIGHT } from '@/constants/Dimensions';

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
    <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 80, padding: 20 }}>
      <FinanceGraph data={data} style={{height: 100, width:'100%'}}/>
    </View>
  );
}
