import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

const Icon = ({ color, size, style, onPress }) => (
    <Ionicons
        name={
            (Platform.OS === 'ios' ? 'ios' : 'md') +
            '-cart'
        }
        size={size || 16}
        color={color || "#B5C401"}
        style={style}
        onPress={onPress}
    />
);

export default Icon;