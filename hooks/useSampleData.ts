import { useState } from 'react';
import { MockData, DataPoint, TimeFilter } from '../types/types';
import * as Constants from '../constants/Constants';

const useSampleData = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (filter: TimeFilter) => {
    setLoading(true);
    setError(null);
    try {
      const url = getUrlForFilter(filter);
      console.log('fetching data from:', url);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData: MockData = await response.json();
      const formattedData: DataPoint[] = jsonData.c.map((_, index) => ({
        c: jsonData.c[index],
        h: jsonData.h[index],
        l: jsonData.l[index],
        o: jsonData.o[index],
        t: jsonData.t[index],
        v: jsonData.v[index],
      }));
      setData(formattedData);
    } catch (err) {
      setError((err as Error)?.message);
    } finally {
      setLoading(false);
    }
  };

  const getUrlForFilter = (filter: TimeFilter): string => {
    return `https://web.paribu.com/chart/history?symbol=btc_tl&period=${filter}&type=basic`;
  };

  return { data, loading, error, fetchData };
};

export default useSampleData;