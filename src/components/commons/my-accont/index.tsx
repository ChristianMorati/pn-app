import React, { useEffect } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { useAppDispatch } from '../../../../store/hooks/useAppDispatch';
import { useAppSelector } from '../../../../store/hooks/useAppSelector';
import { loadMyAccountData } from '../../../../store/account/thunks';

const MyAccount = () => {
    const dispatch = useAppDispatch();
    const { status, error, account } = useAppSelector((store) => store.account);

    useEffect(() => {
        dispatch(loadMyAccountData());
    }, [dispatch]);

    const handleReload = () => {
        dispatch(loadMyAccountData());
    };

    if (status === 'loading') {
        return (
            <>
                <ActivityIndicator size="large" color="#0000ff" />
                <Button title="Reload" onPress={handleReload} />
            </>
        )
    }

    if (status === 'failed' || status === 'loading') {
        return (
            <View style={styles.centered}>
                <Text>Failed to load account data: {error}</Text>
                <Button title="Reload" onPress={handleReload} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {status === 'succeeded' && account ? (
                <Text>{JSON.stringify(account, null, 2)}</Text>
            ) : (
                <Text>No data available</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MyAccount;
