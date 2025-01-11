import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Pressable } from 'react-native';
import * as d3 from 'd3';
import { Canvas, Path, Skia } from '@shopify/react-native-skia';
import { DataPoint } from '@/types/types';
import ToolTip from './ui/ToolTip';
import { GRAPH_HEIGHT } from '../constants/Dimensions';

const { width } = Dimensions.get('window');
const height = GRAPH_HEIGHT
const margin = 20;

interface FinanceGraphProps {
  data: DataPoint[];
}

const FinanceGraph: React.FC<FinanceGraphProps> = ({ data }) => {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; data: DataPoint | null }>({
    x: 0,
    y: 0,
    data: null,
  });

  // X Scale (Date)
  const domainStartDate = data[0].t;
  const domainEndDate = data[data.length - 1].t;
  const scaleX = d3.scaleLinear()
    .domain([domainStartDate, domainEndDate])
    .range([margin, width - margin]);

  // Y Scale (Price)
  const max = Math.max(...data.map(val => val.c));
  const min = Math.min(...data.map(val => val.c));
  const scaleY = d3.scaleLinear()
    .domain([min, max])
    .range([height - margin, margin]);

  const lineGenerator = d3.line<DataPoint>()
    .x(d => scaleX(d.t))
    .y(d => scaleY(d.c))
    .curve(d3.curveMonotoneX);

  const path = Skia.Path.MakeFromSVGString(lineGenerator(data)!)!;


  const createTooltipForXValue = (x: number) => {
    const index = Math.round((x / width) * (data.length - 1));
    const clampedIndex = Math.max(0, Math.min(data.length - 1, index));
    const closestDataPoint = data[clampedIndex];
    const yValue = scaleY(closestDataPoint.c);
    try {
      console.log('X:', x, 'Y:', yValue, 'Data:', closestDataPoint);
      setTooltip({
      x,
      y: yValue,
      data: closestDataPoint,
      });
    } catch (e) {
      console.error('Caught error in createTooltipForXValue:', e);
    }
  };

  const handlePress = (event: any) => {
    try {

      const pressX = event.nativeEvent.locationX;
      createTooltipForXValue(pressX);
    } catch (e) {
      console.error('Caught error in handlePress:', e);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePress}>
        <Canvas style={{ width, height }}>
          {path && <Path path={path} color="blue" strokeWidth={1} style="stroke" />}
        </Canvas>
      </Pressable>
      {tooltip.data && 
          <ToolTip x={tooltip.x} height={height}/>
        }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
  },
});

export default FinanceGraph;