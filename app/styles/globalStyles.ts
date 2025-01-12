import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    filterViewContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 8,
        padding: 10,
    },
    filterActiveContainer: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.primary,
        padding: 10,
    },
    filterActiveText: {
        color: Colors.primary,
        fontSize: 16,
    },
    filterInactiveContainer: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.textDark20,
        padding: 10,

    },
    filterInactiveText: {
        color: Colors.textDark80,
        fontSize: 16,
    },
    graphLabelContainer: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    graphLabelText: {
        color: Colors.textDark60,
        fontSize: 16,
        right: 8,
        top: 8
    },
});