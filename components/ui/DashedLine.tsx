import { Colors } from '@/constants/Colors';
import React from 'react';
import { ViewStyle } from 'react-native';
import Svg, { Line } from 'react-native-svg';

interface DashedLineProps {
    style?: ViewStyle;
    orientation: 'horizontal' | 'vertical';
    color?: string;
}

const DashedLine: React.FC<DashedLineProps> = ({
    style,
    orientation,
    color = Colors.textDark20,
}) => {
    const width = orientation === 'horizontal' ? (style?.width ? Number(style.width) : '100%') : '1';
    const height = orientation === 'horizontal' ? '1' : (style?.height ? Number(style.height) : '100%'); 
    return (
        <Svg
            height={height}
            width={width}
            style={[style]}>
            <Line
                x1="0"
                y1="0"
                x2={orientation === 'horizontal' ? width : '0'}
                y2={orientation === 'horizontal' ? '0' : height}
                stroke={color}
                strokeWidth="2"
                strokeDasharray="10"
            />
        </Svg>
    );
};

export default DashedLine;