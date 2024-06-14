import React, { useEffect } from "react";
import { BasePage } from "../../components/layout/base-page";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useAppDispatch } from "../../store/hooks/useAppDispatch";
import { useAppSelector } from "../../store/hooks/useAppSelector";
import { loadMyTransactions } from "../../store/transaction/thunks";
import { themeColors } from "../../theme/colors";
import { styles } from "../home/style";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome6 } from '@expo/vector-icons';
import { formatToCurrencyBRL, formatToDateBRL } from "../../utils";

export default function MyTransactionsScreen({ navigation }) {
    const dispatch = useAppDispatch();
    const { myTransactions, loadMyTransactionsStatus, loadMyTransactionsError } = useAppSelector(store => store.transaction);

    useEffect(() => {
        dispatch(loadMyTransactions());
    }, [dispatch]);

    useEffect(() => {
        console.log('Transaction status:', loadMyTransactionsStatus);
    }, [loadMyTransactionsStatus]);

    function handleReload() {
        dispatch(loadMyTransactions());
    }

    return (
        <>
            {loadMyTransactionsStatus === 'loading' && (
                <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: themeColors.primary }}>
                    <ActivityIndicator size="large" color={themeColors.success} />
                </View>
            )}

            {loadMyTransactionsStatus === 'failed' && (
                <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: themeColors.primary }}>
                    <Text className="text-lg" style={{ color: themeColors.error }}>OPS... {loadMyTransactionsError}</Text>
                    <TouchableOpacity className="p-4 rounded-lg m-2" style={{ backgroundColor: themeColors.error }} onPress={handleReload}>
                        <Text className="font-bold uppercase" style={{ color: themeColors.color }}>Tentar novamente</Text>
                    </TouchableOpacity>
                </View>
            )}

            {loadMyTransactionsStatus === 'succeeded' && myTransactions && (
                <BasePage style={{ backgroundColor: themeColors.primary }}>
                    <View className="overflow-hidden">
                        <Text style={{ color: themeColors.color }} className="p-4 pb-2 font-medium text-xl">Minhas Transações</Text>
                        <View
                            className="flex pt-2 px-4 py-6 rounded-t-xl  overflow-hidden"
                            style={styles.containerColor}
                        >
                            {myTransactions.length > 0 ? (
                                <>
                                    {myTransactions.map(transaction => (
                                        <View
                                            key={transaction.toString() + transaction.id}
                                            className="flex pt-2 px-4 py-6 rounded-t-xl  overflow-hidden"
                                            style={styles.containerColor}
                                        >
                                            <LinearGradient
                                                colors={[themeColors.secondary, themeColors.primary]}
                                                style={[styles.background, { height: 100 }]}
                                            />
                                            <Text className="font-bold text-right" style={{ color: themeColors.color }}>
                                                {formatToDateBRL(transaction.date)}
                                            </Text>

                                            <View className="flex-row justify-between pt-2">
                                                <Text className="font-semibold" style={{ color: transaction.payeePixKey ? themeColors.error : themeColors.success }}>{transaction.payeePixKey == null ? "Adição de Saldo" : "Transferência"}</Text>
                                                {transaction.payeePixKey ? (
                                                    <Text className="font-bold text-right" style={{ color: themeColors.error }}>
                                                        <FontAwesome6 name="arrow-trend-down" size={12} />{` -${formatToCurrencyBRL(transaction.amount)}`}</Text>
                                                ) : (
                                                    <Text className="font-bold text-right" style={{ color: themeColors.success }}>
                                                        <FontAwesome6 name="arrow-trend-up" size={12} />{` +${formatToCurrencyBRL(transaction.amount)}`}
                                                    </Text>
                                                )}
                                            </View>
                                        </View>
                                    ))}
                                </>
                            ) : (
                                <View
                                    className="flex pt-2 px-4 py-6 rounded-t-xl  overflow-hidden"
                                    style={styles.containerColor}
                                >
                                    <LinearGradient
                                        colors={[themeColors.secondary, themeColors.primary]}
                                        style={[styles.background, { height: 80 }]}
                                    />
                                    <Text className="font-bold text-center" style={{ color: themeColors.error }}>Sem Transações</Text>
                                </View>
                            )}
                        </View>
                    </View>
                </BasePage>
            )}
        </>
    );
};
