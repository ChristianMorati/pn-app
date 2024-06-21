import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { themeColors } from "../../theme/colors";
import { BasePage } from "../../components/layout/base-page";
import { MoneyTextInput } from "../../components/commons/monetary-input";
import { addBalanceToMyAccount } from "../../store/account/thunks";
import { useAppDispatch } from "../../store/hooks/useAppDispatch";
import { useAppSelector } from "../../store/hooks/useAppSelector";
import { NavigationProps } from "../../router";

export default function AddBalanceScreen({ route, navigation }: NavigationProps) {
    const [money, setMoney] = useState('');
    const [inputMoneyError, setInputMoneyError] = useState('');
    const [isReady, setIsReady] = useState(false);
    const [loading, setLoading] = useState(false);

    const dispatch = useAppDispatch();
    const { statusAddingAmountToBalance, statusAddingAmountToBalanceLoading } = useAppSelector(store => store.account);

    const validateMoneyInput = (text: string) => {
        const formattedAmount = text.trim()
            .replace('R$', '')
            .replace(/\./g, '')
            .replace(',', '.');
        const amount = parseFloat(formattedAmount);

        if (amount < 0.5) {
            setInputMoneyError('Valor abaixo do mínimo: 0,50');
            setIsReady(false);
        } else {
            setIsReady(true);
            setInputMoneyError('');
        }
    };

    const handleAddAmountToBalance = () => {
        setLoading(true);

        const formattedAmount = money.trim()
            .replace('R$', '')
            .replace(/\./g, '')
            .replace(',', '.');
        const amount = parseFloat(formattedAmount);

        try {
            dispatch(addBalanceToMyAccount(amount));
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        // Resetar o estado de isReady e inputMoneyError quando o componente montar
        setIsReady(false);
        setInputMoneyError('');
    }, []);

    return (
        <BasePage>
            <ScrollView style={{ backgroundColor: themeColors.basePage }}>
                <View style={styles.container}>
                    <View className="p-4 overflow-hidden mx-2 rounded-lg">
                        <LinearGradient
                            colors={[themeColors.primary, themeColors.secondary]}
                            style={[styles.background, { height: 200 }]}
                        />
                        <Text className="text-2xl font-thin text-white">Quanto iremos adicionar</Text>
                        <MoneyTextInput
                            value={money}
                            onChangeText={setMoney}
                            validateMoneyInput={validateMoneyInput}
                            inputMoneyError={inputMoneyError}
                        />
                        {isReady && (
                            <TouchableOpacity
                                className="bg-red-300 p-4 rounded-md"
                                onPress={handleAddAmountToBalance}
                            >
                                <Text className="text-xl text-center font-bold text-white uppercase">Gerar pagamento</Text>
                            </TouchableOpacity>
                        )}

                        {/* Renderiza condicionalmente com base no statusAddingAmountToBalanceLoading */}
                        {loading ? (
                            <Text style={{ color: 'gray', textAlign: 'center', marginTop: 10 }}>Processando...</Text>
                        ) : (
                            <>
                                {statusAddingAmountToBalance === "succeeded" && (
                                    <Text style={{ color: 'green', textAlign: 'center', marginTop: 10 }}>Saldo adicionado com sucesso à conta.</Text>
                                )}

                                {statusAddingAmountToBalance === "failed" && (
                                    <TouchableOpacity
                                        onPress={handleAddAmountToBalance}
                                        style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5, marginTop: 10 }}
                                    >
                                        <Text style={{ color: 'white', textAlign: 'center' }}>Recarregar</Text>
                                    </TouchableOpacity>
                                )}
                            </>
                        )}
                    </View>
                </View>
            </ScrollView>
        </BasePage>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        gap: 10,
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 100,
    },
});
