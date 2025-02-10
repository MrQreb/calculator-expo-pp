import React from 'react';
import { Text, StyleSheet, ScrollView, View } from 'react-native';

const OperationsView = ({ operations = [] }: { operations: string[] }) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Historial De Operaciones</Text>
            </View>
            {operations.length === 0 ? (
                <Text style={styles.noOperationsText}>Sin operaciones por el momento</Text>
            ) : (
                operations.map((operation, index) => (
                    <Text key={index} style={styles.codeText}>
                        {operation}
                    </Text>
                ))
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    header: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 22,
    },
    codeText: {
        fontSize: 16,
        fontFamily: 'monospace',
        backgroundColor: '#e0e0e0',
        padding: 10,
        borderRadius: 5,
        color: '#333',
        marginBottom: 10,
    },
    noOperationsText: {
        fontSize: 17,
        fontFamily: 'monospace',
        color: 'red',
        fontWeight: 700,
    },
    title: {
        fontSize: 18,
        fontFamily: 'monospace',
        color: '#333',
        fontWeight: 600,
    },
});

export default OperationsView;