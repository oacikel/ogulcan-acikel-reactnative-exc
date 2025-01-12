import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DataPoint } from '@/types/types';
import { formatPrice, formatTimestampToDateTime } from '@/app/utils/PriceUtils';
import DashedLine from './DashedLine';

interface ToolTipProps {
  x: number; // X position of the tooltip
  height: number; // Height of the graph
  data: DataPoint; // Data point to display
}

const ToolTip: React.FC<ToolTipProps> = ({ x, height, data }) => {

  const { c: price, t: date } = data;
  const formattedPrice = formatPrice(price);
  const formattedDate = formatTimestampToDateTime(date);

  const labelRef = useRef<View>(null);
  const [labelWidth, setLabelWidth] = useState(0);    

  useEffect(() => {
    if (labelRef.current) {
        labelRef.current.measure((x, y, width, height) => {
            setLabelWidth(width);
        });
    }
    }, [labelRef]);

  return (
    <View style={[styles.tooltip, { left: x}, {bottom: 0}]}>
      <View style={[styles.labelContainer, { right: labelWidth / 2 }]} ref={labelRef}>
        <Text style={styles.priceLabel}>{formattedPrice}</Text>
        <Text style={styles.dateLabel}>{formattedDate}</Text>
      </View>
      <DashedLine style={{ height: height }} orientation='vertical' />
    </View>
  );
};

const styles = StyleSheet.create({
  tooltip: {
    position: 'absolute',
  },
  labelContainer: {
    justifyContent: 'center',
    marginBottom: 5, // Space between labels and line

  },
  priceLabel: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
  dateLabel: {
    color: 'black',
    textAlign: 'center',
    fontSize: 12,
  }
});

export default ToolTip;