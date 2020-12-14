import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const Card = ({ item, color, cardPressHandler, isPicked, pickedChart }) => {
    const defaultColor = pickedChart ? color : isPicked ? color : '#ADC0C4';
    const size = pickedChart ? 30 : 54;
    const styles = StyleSheet.create({
        card: {
            margin: 5,
            borderRadius: (size / 2),
            borderWidth: 1,
            borderColor: defaultColor,
            width: size,
            height: size,
            textAlign: 'center',
            backgroundColor: defaultColor
        },
        
        number: {
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: pickedChart ? 12 : 16,
            color: '#FFF',
            opacity: 1,
            lineHeight: size
        }
    });

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => cardPressHandler(item, isPicked)}
        >
            <Text style={styles.number}>{item}</Text>
        </TouchableOpacity>
    );
};

export default React.memo(Card, (prevProps, nextProps) => { 
    return prevProps.isPicked !== undefined
        ? prevProps.isPicked === nextProps.isPicked
        : nextProps.picked.has(nextProps.item)
});