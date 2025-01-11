import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ToolTipProps {
  x: number; // Only need x to position the vertical line
  height: number; // Height of the graph
}

const ToolTip: React.FC<ToolTipProps> = ({ x, height }) => {
  return (
    <View style={[styles.tooltip, { left: x }, { height }]}>
      <View style={[styles.line]} />
    </View>
  );
};

const styles = StyleSheet.create({
  tooltip: {
    position: 'absolute',
    width: 1, // The width of the vertical line
    top: 0,
  },
  line: {
    width: 1, // Line thickness
    height: '100%', // Ensure it spans the full height
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: 'black',
  },
});

export default ToolTip;
