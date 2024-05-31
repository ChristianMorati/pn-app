import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { themeColors } from '../../../theme/colors';
import colors from 'tailwindcss/colors';

export const MoneyTextInput = ({ value, onChangeText, validateMoneyInput, inputMoneyError }:
    {
        value: string,
        onChangeText: (text: string) => void,
        validateMoneyInput: (text: string) => void,
        inputMoneyError: string,
    }) => {
    return (
        <>
            {inputMoneyError ? <Text style={styles.error}>{inputMoneyError}</Text> : <Text></Text>}
            <TextInputMask
                type={"money"}
                style={[styles.monetaryInput,
                {
                    color: inputMoneyError ? themeColors.error : themeColors.color,
                    borderBottomColor: inputMoneyError ? themeColors.error : themeColors.color
                }]}
                placeholder="R$"
                placeholderTextColor={themeColors.color}
                value={value}
                onChangeText={(text) => {
                    validateMoneyInput(text);
                    onChangeText(text);
                }}
            />
        </>
    );
};


const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    error: {
        color: themeColors.error,
        textAlign: 'center',
    },
    monetaryInput: {
        textAlign: "center",
        fontSize: 28,
        padding: 4,
        marginBottom: 8,
        borderBottomWidth: .5,
        borderBottomColor: themeColors.color,
    },
});
