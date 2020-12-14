import React from 'react';
import { StyleSheet, Text } from 'react-native';

const ErrorMessage = ({ children }) => <Text style={styles.message}>{children}</Text>;

const styles = StyleSheet.create({
    message: {
        color: '#ef3939',
        textAlign: 'left',
        marginTop: 10,
        marginLeft: 20,
        fontSize: 13
    }
});

export default ErrorMessage;