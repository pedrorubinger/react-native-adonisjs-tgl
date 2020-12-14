import React, { useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const Input = ({ type, onChangeText, value, placeholder, keyboard }) => {
    const [inputStyles, setInputStyles] = useState([styles.input]);
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.setNativeProps({
            style: {
                fontFamily: Platform.OS === 'ios' ? 'San Francisco' : 'Roboto',
                fontStyle: 'normal'
            }
        })
    }, []);

    return (
        <TextInput
            ref={inputRef}
            selectionColor="#B5C401"
            textContentType={type}
            style={inputStyles}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={'#d3d3d3'}
            secureTextEntry={type === 'password'}
            keyboardType={keyboard}
            autoCapitalize={type === 'name' ? 'words' : 'none'}
            onFocus={() => setInputStyles([styles.input, styles.focused])}
            onBlur={() => setInputStyles([styles.input, styles.notFocused])}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 0,
        borderBottomWidth: 2,
        borderBottomColor: '#EBEBEB',
        opacity: 1,
        textAlign: 'left',
        fontSize: 17,
        fontStyle: 'italic',
        fontWeight: 'bold',
        letterSpacing: 0,
        color: '#9D9D9D',
        opacity: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 22,
        paddingRight: 22,
        marginTop: 2,
    },

    focused: {
        borderBottomColor: '#B5C401'
    },

    notFocused: {
        borderBottomColor: '#EBEBEB'
    }
});

export default Input;