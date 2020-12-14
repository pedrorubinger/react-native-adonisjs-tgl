import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Logo = () => (
    <View style={styles.logo}>
        <Text style={styles.title}>TGL</Text>
        <View style={styles.marker} />
    </View>
);

const styles = StyleSheet.create({
    logo: {
        alignSelf: 'center'
    },

    title: {
        textAlign: 'center',
        fontSize: 44,
        letterSpacing: 0,
        color: '#707070',
        fontStyle: 'italic',
        fontWeight: 'bold'
    },

    marker: {
        width: 107,
        height: 7,
        backgroundColor: '#B5C401',
        borderRadius: 6
    }
});

export default Logo;