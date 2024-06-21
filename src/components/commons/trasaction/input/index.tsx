import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { themeColors } from '../../../../theme/colors';
import colors from 'tailwindcss/colors';

type InputProps = {
    placeholder: string;
    value: string;
    type: string;
    handleChange: (value: string) => void;
    disabled?: boolean;
};

const Input: React.FC<InputProps> = ({ placeholder, value, type, handleChange, disabled }) => {
    return (
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={handleChange}
            editable={!disabled}
            keyboardType={type === 'number' ? 'numeric' : 'default'}
            secureTextEntry={type === 'password'}
            placeholderTextColor={themeColors.color}
            autoCapitalize='none'
        />
    );
};

const styles = StyleSheet.create({
    input: {
        width: '100%',
        paddingBottom: 8,
        marginBottom: 8,
        marginTop: 8,
        color: themeColors.color,
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        backgroundColor: 'transparent',
        borderBottomColor: themeColors.secondary,
        borderBottomWidth: 2,
    },
    inputFocus: {
        borderBottomColor: '#FB923C',
    }
});

export default Input;
