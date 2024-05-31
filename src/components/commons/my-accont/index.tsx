import React, { useEffect } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { useAppDispatch } from '../../../store/hooks/useAppDispatch';
import { useAppSelector } from '../../../store/hooks/useAppSelector';
import { loadMyAccountData } from '../../../store/account/thunks';
import { LinearGradient } from 'expo-linear-gradient';
import { themeColors } from '../../../theme/colors';
import { styles } from './style';

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
        <>
            {status === 'succeeded' && account ? (
                <>
                    <LinearGradient
                        colors={[themeColors.primary, themeColors.secondary]}
                        style={[styles.background, { height: 300 }]}
                    />
                    <View>
                        <View className="flex flex-row justify-between items-center">
                            <Text style={styles.color} className="font-medium text-md mt-2">conta</Text>
                            <Text style={styles.color} className="font-medium text-md">ver extrato</Text>
                        </View>
                        <View>
                            <Text style={styles.color} className="font-extralight text-xl">Saldo disponível</Text>
                            <Text style={styles.color} className="font-extralight text-4xl mt-2">R$ {account.balance}</Text>
                        </View>
                    </View>
                </>
            ) : (
                <Text>No data available</Text>
            )}
        </>
    );
};

export default MyAccount;
