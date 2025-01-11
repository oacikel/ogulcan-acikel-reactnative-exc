import { useState, useEffect } from 'react';
import { MockData, DataPoint } from '../types/types';
import * as Constants from '../constants/Constants';

const useSampleData = () => {
    const [data, setData] = useState<DataPoint[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(Constants.pathToMockData7D);
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

        fetchData();
    }, []);

    return { data, loading, error };
};

export default useSampleData;