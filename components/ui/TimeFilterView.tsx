import { TimeFilter } from '@/types/types';
import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';

interface TimeFilterViewProps {
    selectedFilter?: TimeFilter;
    onFilterSelected: (filter: TimeFilter) => void;
}

const TimeFilterView: React.FC<TimeFilterViewProps> = ({ selectedFilter, onFilterSelected }) => {
    const [activeFilter, setActivefilter] = useState<TimeFilter>(selectedFilter || '7D');

    const handlePress = (filter: TimeFilter) => {
        onFilterSelected(filter);
        setActivefilter(filter);
    };

    return (
        <View style={styles.container}>
            <Button
                title="7D"
                onPress={() => handlePress('7D')}
                color={activeFilter === '7D' ? 'blue' : 'gray'}
            />
            <Button
                title="1M"
                onPress={() => handlePress('1M')}
                color={activeFilter === '1M' ? 'blue' : 'gray'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
});

export default TimeFilterView;