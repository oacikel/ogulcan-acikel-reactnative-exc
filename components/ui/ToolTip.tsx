import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DataPoint } from '@/types/types';
import { formatPrice, formatTimestampToDateTime } from '@/app/utils/PriceUtils';
import DashedLine from './DashedLine';
import { globalStyles } from '@/app/styles/globalStyles';

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
    <View style={[globalStyles.toolTipContainer, { left: x}, {bottom: 0}]}>
      <View style={[globalStyles.toolTipLabelContainer, { right: labelWidth / 2 }]} ref={labelRef}>
        <Text style={globalStyles.toolTipPriceLabel}>{formattedPrice}</Text>
        <Text style={globalStyles.toolTipDateLabel}>{formattedDate}</Text>
      </View>
      <DashedLine style={{ height: height }} orientation='vertical' />
    </View>
  );
};

export default ToolTip;