import React from 'react';
import { StyleSheet, Text } from 'react-native';

const PageTitle = ({ children }) => (
    <Text style={styles.title}>{children}</Text>
);

const styles = StyleSheet.create({
    title: {
        color: '#707070',
        fontSize: 22,
        fontStyle: 'italic',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
});

export default PageTitle;