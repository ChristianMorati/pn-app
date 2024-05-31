import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MoneyTextInput } from "../../components/commons/monetary-input";
import { useState } from "react";
import { themeColors } from "../../theme/colors";
import { LinearGradient } from "expo-linear-gradient";
import { BasePage } from "../../components/layout/base-page";

export default function AddBalanceScreen({ navigation }) {
    const [money, setMoney] = useState('');
    const [inputMoneyError, setInputMoneyError] = useState('');
    const [isReady, setIsReady] = useState(false);

    const validateMoneyInput = (text: string) => {
        const amount = parseFloat(text.trim().replace('R$', '').replace(',', '.'));
        if (amount < 0.5) {
            setInputMoneyError('Valor abaixo do mínimo: 0,50');
            setIsReady(false);
        } else {
            setIsReady(true);
            setInputMoneyError('');
        }
    };

    return (
        <BasePage children={
            <>
                <ScrollView style={{ backgroundColor: themeColors.basePage }}>
                    <View style={styles.container}>
                        <View className="p-4 overflow-hidden mx-2 rounded-lg">
                            <LinearGradient
                                colors={[themeColors.primary, themeColors.secondary]}
                                style={[styles.background, { height: 200 }]}
                            />
                            <Text className="text-2xl font-thin text-white">Quanto iremos adicionar</Text>
                            <MoneyTextInput
                                value={money} onChangeText={setMoney}
                                validateMoneyInput={validateMoneyInput}
                                inputMoneyError={inputMoneyError}
                            />
                            {isReady && (
                                <>
                                    <View>
                                        <TouchableOpacity
                                            className="bg-red-300 p-4 rounded-md"
                                            onPress={() => {
                                                console.log("boomm")
                                            }}
                                        >
                                            <Text className="text-xl text-center font-bold text-white uppercase">Gerar pagamento</Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            )}
                        </View>
                    </View >
                </ScrollView >
            </>}
        />
    )
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
})