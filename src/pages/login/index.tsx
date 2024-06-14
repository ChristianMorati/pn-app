import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useAppSelector } from '../../store/hooks/useAppSelector';
import { loginAsync } from '../../store/user/thunks';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useAppDispatch();
    const { status, error } = useAppSelector(state => state.user); // Supondo que você tenha configurado o slice de auth

    const handleLogin = () => {
        dispatch(loginAsync({ username, password }));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Username:</Text>
            <TextInput
                style={styles.input}
                value={username}
                autoCapitalize='none'
                onChangeText={setUsername}
            />

            <Text style={styles.label}>Password:</Text>
            <TextInput
                style={styles.input}
                value={password}
                autoCapitalize='none'
                onChangeText={setPassword}
                secureTextEntry
            />

            <Button title="Login" onPress={handleLogin} />

            {status === 'loading' && <Text>Loading...</Text>}
            {status === 'succeeded' && <Text>Login successful!</Text>}
            {status === 'failed' && <Text>Error: {error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    label: {
        marginBottom: 8,
    },
    input: {
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        borderRadius: 4,
    },
});

export default LoginScreen;
