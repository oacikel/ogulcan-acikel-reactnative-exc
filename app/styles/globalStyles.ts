import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    walletViewContainer: {
        flex: 1,
        padding: 20,
        height: '100%',
        gap: 40,

    },
    filterViewContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
        gap: 8,
    },
    filterActiveContainer: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.primary,
        padding: 10,
    },
    filterActiveText: {
        fontFamily: 'Poppins_400Regular',
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
        fontFamily: 'Poppins_400Regular',
        fontSize: 16,
    },
    graphLabelContainer: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    graphLabelText: {
        color: Colors.textDark60,
        fontFamily: 'Poppins_400Regular',
        fontSize: 16,
        right: 8,
        top: 8
    },
    toolTipContainer: {
        position: 'absolute',
    },
    toolTipLabelContainer: {
        justifyContent: 'center',
    },
    toolTipPriceLabel: {
        color: Colors.textDark80,
        textAlign: 'center',
        fontFamily: 'Poppins_400Regular',
        fontWeight: 'bold',
        fontSize: 14,
    },
    toolTipDateLabel: {
        color: Colors.textDark,
        textAlign: 'center',
        fontFamily: 'Poppins_400Regular',
        fontSize: 12,
    },
    profitTextLabel: {
        color: Colors.textPrimary,
        fontFamily: 'Poppins_400Regular',
        fontSize: 24,
        fontWeight: '500',
    },
});