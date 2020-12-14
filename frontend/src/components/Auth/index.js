import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Logo from '../UI/Logo';

const AuthContainer = ({ title, children, logo = true }) => (
    <View style={{ marginTop: logo ? 60 : 0 }}>
        {logo && <Logo />}

        <View>
            <Text style={styles.title}>{title}</Text>
            {children}
        </View>
    </View>
);

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 35,
        fontStyle: 'italic',
        fontWeight: 'bold',
        letterSpacing: 0,
        color: '#707070',
        opacity: 1,
        marginBottom: 25,
        marginTop: 40
    }
});

export default AuthContainer;