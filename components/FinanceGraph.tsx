import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Pressable, Text } from 'react-native';
import * as d3 from 'd3';
import { Canvas, Path, Skia, TileMode } from '@shopify/react-native-skia';
import { DataPoint } from '@/types/types';
import ToolTip from './ui/ToolTip';
import { GRAPH_HEIGHT, GRAPH_WIDTH } from '../constants/Dimensions';
import { formatNumberToK } from '@/app/utils/PriceUtils';

const { width } = Dimensions.get('window');
const height = GRAPH_HEIGHT;
const margin = 50;

interface FinanceGraphProps {
  data: DataPoint[];
}

const FinanceGraph: React.FC<FinanceGraphProps> = ({ data }) => {
  const [selectedDataPoint, setSelectedDataPoint] = useState<{ xPosition: number; data: DataPoint } | null>(null);
  const [pressX, setPressX] = useState<number | null>(null);
  const labelRef = useRef<Text>(null);
  const [labelWidth, setLabelWidth] = useState(60);

  useEffect(() => {
    if (labelRef.current) {
      labelRef.current.measure((x, y, width, height) => {
        setLabelWidth(width+30);
      });
    }
  }, [labelRef]);
  
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

  const areaGenerator = d3.area<DataPoint>()
    .x(d => scaleX(d.t))
    .y0(height - margin)
    .y1(d => scaleY(d.c))


  const createPaths = (pressIndex: number | null) => {

    const leftData = pressIndex !== null ? data.slice(0, pressIndex + 1) : data;
    const rightData = pressIndex !== null ? data.slice(pressIndex) : [];
    const areaLeft = areaGenerator(leftData) ? Skia.Path.MakeFromSVGString(areaGenerator(leftData)!) : null;
    const pathLeft = lineGenerator(leftData) ? Skia.Path.MakeFromSVGString(lineGenerator(leftData)!) : null;
    
    const pathRight = lineGenerator(rightData) ? Skia.Path.MakeFromSVGString(lineGenerator(rightData)!) : null;

    return { pathLeft, areaLeft, pathRight };
  };

  const { pathLeft, areaLeft, pathRight  } = createPaths(pressX !== null ? Math.round((pressX / width) * (data.length - 1)) : null);

  const createTooltipForXValue = (x: number) => {
    const index = Math.round(((x) / (width - labelWidth)) * (data.length - 1));
    const clampedIndex = Math.max(0, Math.min(data.length - 1, index));
    const closestDataPoint = data[clampedIndex];

    setSelectedDataPoint({
      xPosition: x+labelWidth,
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
      { x: 4, y: 4 }, // Controls spacing and angle
      [
        Skia.Color('transparent'), // Transparent part
        Skia.Color('transparent'), // Sharp transition to green
        Skia.Color('green'),       // Green part
        Skia.Color('green'),       // Sharp transition back to transparent
      ],
      [0, 0.89, 0.9, 1], // Sharp transitions
      TileMode.Repeat
    );
  
    const dashPaint = Skia.Paint();
    dashPaint.setShader(dashShader);
    
    const yTicks = scaleY.ticks(5);
    

  return (
    <View style={styles.container}>
            <View style={styles.gridContainer}>
        {yTicks.map((tick, index) => {
          const y = scaleY(tick); // Get Y position for the tick
          return (
            <View key={index} style={[styles.labelContainer, { top: y }]}>
              <Text style={[styles.label]} ref={labelRef}>{formatNumberToK(tick)}</Text>
              <View style={[styles.gridLine]} />
            </View>
          );
        })}
      </View>
      <Pressable onPress={handlePress} style={{ paddingLeft: labelWidth }}>
        <Canvas style={{ width: width-labelWidth, height }}>
          {areaLeft && <Path path={areaLeft} color="green" strokeWidth={1} style="stroke" paint={dashPaint} />}
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
  },
  gridContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  gridLine: {
    width: '100%',
    height: 1,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
  labelContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 10,
    color: 'gray',
  },
});

export default FinanceGraph;