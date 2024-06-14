import React from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { themeColors } from '../../../theme/colors';
import { styles } from './style';
import { MaterialIcons } from '@expo/vector-icons';
import { AccountItem } from '../../../store/account/initialState';
import { formatToCurrencyBRL } from '../../../utils';

export type MyAccountProps = {
    account: AccountItem
    status: string
    error: string
    handleReload: any
    navigation: any
}

export default function MyAccount({ account, status, error, handleReload, navigation }: MyAccountProps) {
    if (status === 'loading') {
        return (<ActivityIndicator size="large" color={themeColors.success} />)
    }

    if (status === 'failed') {
        return (
            <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: themeColors.primary }}>
                <Text className="text-lg" style={{ color: themeColors.error }}>{error}</Text>
                <TouchableOpacity className="p-4 rounded-lg m-2" style={{ backgroundColor: themeColors.error }} onPress={handleReload}>
                    <Text className="font-bold uppercase" style={{ color: themeColors.color }}>Tentar novamente</Text>
                </TouchableOpacity>
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
                            <Text style={{ color: themeColors.color }} className="font-medium text-md">conta</Text>
                            <TouchableOpacity
                                className="flex flex-row justify-center items-center"
                                onPress={() => { navigation.navigate("MyTransactions") }}
                            >
                                <Text style={{ color: themeColors.color }} className="font-medium text-md">ver extrato</Text>
                                <Text><MaterialIcons name="arrow-forward-ios" size={14} color={themeColors.color} /></Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={{ color: themeColors.color }} className="font-extralight text-xl">Saldo disponível</Text>
                            <Text style={{ color: themeColors.success }} className="font-extralight text-4xl mt-2">{formatToCurrencyBRL(account.balance)}</Text>
                        </View>
                    </View>
                </>
            ) : (
                <Text>No data available</Text>
            )}
        </>
    );
};