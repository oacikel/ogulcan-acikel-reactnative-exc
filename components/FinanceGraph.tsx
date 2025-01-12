import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Pressable } from 'react-native';
import * as d3 from 'd3';
import { Canvas, Path, Rect, Skia, TileMode } from '@shopify/react-native-skia';
import { DataPoint } from '@/types/types';
import ToolTip from './ui/ToolTip';
import { GRAPH_HEIGHT } from '../constants/Dimensions';

const { width } = Dimensions.get('window');
const height = GRAPH_HEIGHT;
const margin = 50;

interface FinanceGraphProps {
  data: DataPoint[];
}

const FinanceGraph: React.FC<FinanceGraphProps> = ({ data }) => {
  const [selectedDataPoint, setSelectedDataPoint] = useState<{ xPosition: number; data: DataPoint } | null>(null);
  const [pressX, setPressX] = useState<number | null>(null);

  // X Scale (Date)
  const domainStartDate = data[0].t;
  const domainEndDate = data[data.length - 1].t;
  const scaleX = d3.scaleLinear()
    .domain([domainStartDate, domainEndDate])
    .range([0, width]);

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

  const areaGenerator = d3.area<DataPoint>()
    .x(d => scaleX(d.t))
    .y0(height - margin)
    .y1(d => scaleY(d.c))
    .curve(d3.curveMonotoneX);

  const createPaths = (pressIndex: number | null) => {

    const leftData = pressIndex !== null ? data.slice(0, pressIndex + 1) : data;
    const rightData = pressIndex !== null ? data.slice(pressIndex) : [];
    const pathLeft = areaGenerator(leftData) ? Skia.Path.MakeFromSVGString(areaGenerator(leftData)!) : null;
    const pathRight = areaGenerator(rightData) ? Skia.Path.MakeFromSVGString(areaGenerator(rightData)!) : null;

    return { pathLeft, pathRight };
  };

  const { pathLeft, pathRight } = createPaths(pressX !== null ? Math.round((pressX / width) * (data.length - 1)) : null);

  const createTooltipForXValue = (x: number) => {
    const index = Math.round((x / width) * (data.length - 1));
    const clampedIndex = Math.max(0, Math.min(data.length - 1, index));
    const closestDataPoint = data[clampedIndex];
    setSelectedDataPoint({
      xPosition: x,
      data: closestDataPoint,
    });
  };

  const handlePress = (event: any) => {
    try {
      const pressX = event.nativeEvent.locationX;
      setPressX(pressX);
      createTooltipForXValue(pressX);
    } catch (e) {
      console.error('Caught error in handlePress:', e);
    }
  };

    // Create a shader for the dashed pattern
    const dashShader = Skia.Shader.MakeLinearGradient(
      { x: 0, y: 0 },
      { x: 8, y: 8 }, // Controls spacing and angle
      [
        Skia.Color('transparent'), // Transparent part
        Skia.Color('transparent'), // Sharp transition to green
        Skia.Color('green'),       // Green part
        Skia.Color('green'),       // Sharp transition back to transparent
      ],
      [0, 0.8, 0.9, 1], // Sharp transitions
      TileMode.Repeat
    );
  
    const dashPaint = Skia.Paint();
    dashPaint.setShader(dashShader);

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePress}>
        <Canvas style={{ width, height }}>
          {pathLeft && <Path path={pathLeft} color="green" strokeWidth={1} style="stroke" paint={dashPaint} />}
          {pathLeft && <Path path={pathLeft} color="green" strokeWidth={1} style="stroke"/>}
          {pathRight && <Path path={pathRight} color="darkGrey" strokeWidth={1} style="stroke" />}
        </Canvas>
      </Pressable>
      {selectedDataPoint && (
        <ToolTip x={selectedDataPoint.xPosition} height={height} data={selectedDataPoint.data} />
      )}
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