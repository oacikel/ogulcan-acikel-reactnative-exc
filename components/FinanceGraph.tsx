import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scaleLinear } from 'd3-scale';
import { line } from 'd3-shape';
import { Canvas, Path } from '@shopify/react-native-skia';
import useSampleData from '@/hooks/useSampleData';
import { DataPoint } from '@/types/types';

const width = 300; // canvas width
const height = 2000; // canvas height

interface FinanceGraphProps {
    data: DataPoint[];
}
const FinanceGraph: React.FC<FinanceGraphProps> = ({ data }) => {

  const xScale = scaleLinear().domain([0, data.length - 1]).range([0, width]);
  const yScale = scaleLinear().domain([0, Math.max(...data.map(d => d.c))]).range([height, 0]); // invert y-axis

  const path = line<DataPoint>()
    .x((d, i) => xScale(i))
    .y(d => yScale(d.c))(data);

  return (
      <Canvas style={{ width, height }}>
        {path && <Path path={path} color="blue" strokeWidth={1} style="stroke" />}
      </Canvas>
  );
};

export default FinanceGraph;