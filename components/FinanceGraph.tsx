import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FinanceGraph: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.placeholderText}>Finance Graph Placeholder</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    placeholderText: {
        fontSize: 18,
        color: '#333',
    },
});

export default FinanceGraph;