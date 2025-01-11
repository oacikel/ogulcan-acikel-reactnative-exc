import React from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import FinanceGraph from '@/components/FinanceGraph';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <FinanceGraph/>
  );
}
