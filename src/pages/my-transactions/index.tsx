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
import { NavigationProps } from "../../router";
import { PixKey } from "../../store/account/initialState";
import RefundTransactionButton from "../../components/commons/refund-button";
import ContainerGradient from "../../components/layout/container-gradient";


export default function MyTransactionsScreen({ route, navigation }: NavigationProps) {
    const dispatch = useAppDispatch();
    const { myTransactions, loadMyTransactionsStatus, loadMyTransactionsError } = useAppSelector(store => store.transaction);
    const { account } = useAppSelector(store => store.account);

    useEffect(() => {
        dispatch(loadMyTransactions());
    }, [dispatch]);

    useEffect(() => {
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
                    <View className="overflow-hidden w-full h-full pt-2">
                        <View
                            className="px-1 overflow-hidden"
                        >
                            {myTransactions.length > 0 ? (
                                <>
                                    {myTransactions.map(transaction => {
                                        const keys: PixKey[] = account.pixKeys || [];
                                        const isAdd = keys.some((pixKey: PixKey) => pixKey.value === transaction.payeePixKey);
                                        return (
                                            <View
                                                key={transaction.toString() + transaction.id}
                                                className="flex rounded-t-xl  overflow-hidden"
                                                style={styles.containerColor}
                                            >
                                                <ContainerGradient tailwindRoundedClass="rounded-b-xl">
                                                    <Text className="font-bold text-right" style={{ color: themeColors.color }}>
                                                        {formatToDateBRL(transaction.date)}
                                                    </Text>
                                                    <Text className="font-bold text-right" style={{ color: themeColors.color }}>
                                                        {isAdd && transaction.type == 'refund' ? "Foi extornada" : null}
                                                    </Text>
                                                    <View className="flex-row justify-start py-4">
                                                        {isAdd && transaction.type == 'transaction' && (
                                                            <RefundTransactionButton
                                                                buttonText={"Devolver"}
                                                                transaction={transaction}
                                                            />
                                                        )}
                                                    </View>
                                                    <View className="flex-row justify-between pt-2">
                                                        {transaction.type == 'deposit' && (
                                                            <>
                                                                <Text
                                                                    className="font-semibold"
                                                                    style={{ color: themeColors.success }}>
                                                                    Depósito
                                                                </Text>
                                                                <Text className="font-bold text-right" style={{ color: themeColors.success }}>
                                                                    <FontAwesome6 name="arrow-trend-up" size={12} />{` +${formatToCurrencyBRL(transaction.amount)}`}
                                                                </Text>
                                                            </>
                                                        )}
                                                        {account.id == transaction.accountId && transaction.type == 'refund' && (
                                                            <>
                                                                <Text
                                                                    className="font-semibold"
                                                                    style={{ color: themeColors.success }}>
                                                                    O destinatário extornou
                                                                </Text>
                                                                <Text className="font-bold text-right" style={{ color: themeColors.success }}>
                                                                    <FontAwesome6 name="arrow-trend-up" size={12} />{` +${formatToCurrencyBRL(transaction.amount)}`}
                                                                </Text>
                                                            </>
                                                        )}

                                                        {isAdd && transaction.type == 'refund' && (
                                                            <>
                                                                <Text
                                                                    className="font-semibold"
                                                                    style={{ color: themeColors.error }}>
                                                                    Você extornou
                                                                </Text>
                                                                <Text className="font-bold text-right" style={{ color: themeColors.error }}>
                                                                    <FontAwesome6 name="arrow-trend-down" size={12} />{` -${formatToCurrencyBRL(transaction.amount)}`}
                                                                </Text>
                                                            </>
                                                        )}

                                                        {isAdd && transaction.type == 'transaction' && (
                                                            <>
                                                                <Text
                                                                    className="font-semibold"
                                                                    style={{ color: themeColors.success }}>
                                                                    Recebido
                                                                </Text>
                                                                <Text className="font-bold text-right" style={{ color: themeColors.success }}>
                                                                    <FontAwesome6 name="arrow-trend-down" size={12} />{` +${formatToCurrencyBRL(transaction.amount)}`}
                                                                </Text>
                                                            </>
                                                        )}

                                                        {!isAdd && transaction.type == 'transaction' && (
                                                            <>
                                                                <Text
                                                                    className="font-semibold"
                                                                    style={{ color: themeColors.error }}>
                                                                    Transferência
                                                                </Text>
                                                                <Text className="font-bold text-right" style={{ color: themeColors.error }}>
                                                                    <FontAwesome6 name="arrow-trend-down" size={12} />{` -${formatToCurrencyBRL(transaction.amount)}`}
                                                                </Text>
                                                            </>
                                                        )}
                                                    </View>
                                                </ContainerGradient>
                                            </View>
                                        )
                                    })}
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
                    </View >
                </BasePage >
            )
            }
        </>
    );
};
