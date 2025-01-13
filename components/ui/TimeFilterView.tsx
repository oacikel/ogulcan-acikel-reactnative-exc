import { globalStyles } from '@/app/styles/globalStyles';
import i18n from '@/i18n';
import { TimeFilter } from '@/types/types';
import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

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
        <View style={globalStyles.filterViewContainer}>
            <TouchableOpacity
                onPress={() => handlePress('7D')}
                style={activeFilter === '7D' ? globalStyles.filterActiveContainer : globalStyles.filterInactiveContainer}
            >
                <Text style={activeFilter === '7D' ? globalStyles.filterActiveText: globalStyles.filterInactiveText }>{i18n.t('Last7Days')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => handlePress('1M')}
                style={activeFilter === '1M' ? globalStyles.filterActiveContainer : globalStyles.filterInactiveContainer}>
                <Text style={activeFilter === '1M' ? globalStyles.filterActiveText: globalStyles.filterInactiveText }>Son 30 Gün</Text>
            </TouchableOpacity>
        </View>
    );
};

export default TimeFilterView;