import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet, Text } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const ArrowButton = ({ children, onPress, color, size, arrow, disabled = false }) => {
    const buttonValue = () => {
        switch(arrow) {
            case 'none':
                return children;
            case 'back':
                return (
                    <>
                        <Ionicons
                            name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-arrow-back`}
                            size={25}
                        />&nbsp;{children}
                    </>
                );
            default:
                return (
                    <>
                        {children}&nbsp;
                        <Ionicons
                            name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-arrow-forward`}
                            size={25}
                        />&nbsp;
                    </>
                );
        }
    };

    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={[styles.text, styles[color] || '', styles[size] || '']}>
                {buttonValue()}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        alignItems: 'center',
        opacity: 1,
        marginTop: 24,
        marginBottom: 12,
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'transparent',
        padding: 0,
    },

    text: {
        letterSpacing: 0,
        color: '#707070',
        fontStyle: 'italic',
        fontWeight: 'bold'
    },

    greenButton: { color: '#B5C401' },

    greyButton: { color: '#C1C1C1' },

    darkGreenButton: { color: '#27C383' },

    small: { fontSize: 17 },

    normal: { fontSize: 20 },

    big: { fontSize: 28 }
});

export default ArrowButton;