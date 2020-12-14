import React from 'react';
import { StyleSheet, View } from 'react-native';

const AuthForm = ({ children, handleSubmit }) => (
    <View onSubmit={handleSubmit} style={styles.form}>{children}</View>
);

const styles = StyleSheet.create({
    form: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#DDDDDD',
        borderRadius: 14,
        opacity: 1,
        alignSelf: 'stretch',
        shadowColor: "#000",

        shadowOffset: {
            width: 0,
            height: 2,
        },

        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    }
});

export default AuthForm;