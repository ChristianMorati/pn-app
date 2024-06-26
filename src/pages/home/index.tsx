import React, { useCallback } from "react";
import { Dimensions, KeyboardAvoidingView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { themeColors } from "../../theme/colors";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MyAccount from "../../components/commons/my-accont";
import ScapeFromBottomTab from "../../components/layout/scape-from-bottom-tab";
import { styles } from "./style";
import { BasePage } from "../../components/layout/base-page";
import BottomTabs from "../../components/layout/bottom-tabs";
import { useAppSelector } from "../../store/hooks/useAppSelector";
import { useAppDispatch } from "../../store/hooks/useAppDispatch";
import { loadMyAccountData } from "../../store/account/thunks";
import { useFocusEffect } from "@react-navigation/native";
import ContainerGradient from "../../components/layout/container-gradient";
import { MaterialIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../router";

type HomeScreenProps = NativeStackScreenProps<AuthStackParamList>;

export default function HomeScreen({ navigation }: HomeScreenProps) {
    const width = Dimensions.get('window').width;
    const { account, error, status } = useAppSelector(store => store.account);
    const { userInfo } = useAppSelector(store => store.user);
    const dispatch = useAppDispatch();

    useFocusEffect(
        useCallback(() => {
            dispatch(loadMyAccountData());
        }, [dispatch, userInfo])
    );

    function handleAccountReload() {
        dispatch(loadMyAccountData());
    }

    const iconSize = 40;
    const iconColor = 'white';
    const options = [
        {
            label: "Transferir",
            icon: <FontAwesome6 name="money-bill-transfer" size={30} color={iconColor} />,
            action: () => { navigation.navigate("Transaction") }
        },
        {
            label: "Cobrar",
            icon: <MaterialCommunityIcons name="bank-transfer-out" size={iconSize} color={iconColor} />,
            action: () => { navigation.navigate("QRCodeBilling") }
        },
        {
            label: "DEV | Adicionar",
            icon: <MaterialCommunityIcons name="bank-transfer-in" size={iconSize} color={iconColor} />,
            action: () => { navigation.navigate("AddBalance") }
        },
    ]

    const qrOptions = [
        {
            label: "Gerar cobrança",
            icon: <MaterialCommunityIcons name="qrcode-scan" size={iconSize - 5} color={iconColor} />,
            action: () => { navigation.navigate("QRCodeBilling") }
        },
        {
            label: "Pagar cobrança",
            icon: <MaterialCommunityIcons name="qrcode-scan" size={iconSize - 5} color={iconColor} />,
            action: () => { navigation.navigate("PayWithQrCode") }
        },
        {
            label: "Configurações",
            icon: <MaterialIcons name="settings" size={iconSize - 5} color={iconColor} />,
            action: () => { navigation.navigate("Settings") }
        },
    ]

    return (
        <>
            <BasePage>
                <KeyboardAvoidingView>
                    <View
                        style={[styles.container, { backgroundColor: themeColors.basePage }]}
                        className="pt-2"
                    >
                        <ContainerGradient>
                            <MyAccount
                                account={account}
                                error={error}
                                status={status || ''}
                                handleReload={handleAccountReload}
                                navigation={navigation}
                            />
                        </ContainerGradient>
                        <View className="rounded-lg">
                            <View style={styles.containerColor} className="mx-1 rounded-t-lg p-4">
                                <Text style={{ color: themeColors.color }} className="ml-1 font-medium text-xl">O que faremos hoje?</Text>
                            </View>
                            <ScrollView
                                className='flex flex-row'
                                horizontal
                                decelerationRate="normal"
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ marginRight: 8 }}
                            >
                                {options.map((option, index) => {
                                    const { label, icon, action } = option;
                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={action}
                                        >
                                            <ContainerGradient tailwindRoundedClass="rounded-b-xl">
                                                <View
                                                    className="flex flex-col items-center justify-start rounded-b-xl p-2 overflow-hidden"
                                                    style={[
                                                        { zIndex: 3, width: width / 3, height: 90, marginHorizontal: 4 }
                                                    ]}
                                                >
                                                    <Text style={[{ color: themeColors.color, zIndex: 2 }]} className="font-bold text-md mt-1 mb-2">
                                                        {label}
                                                    </Text>
                                                    {icon}
                                                </View>
                                            </ContainerGradient>
                                        </TouchableOpacity>
                                    )
                                })}
                            </ScrollView>
                        </View>
                        <View className="rounded-lg">
                            <View style={styles.containerColor} className="mx-1 rounded-t-lg p-4">
                                <Text style={{ color: themeColors.color }} className="ml-1 font-medium text-xl">QR</Text>
                            </View>
                            <ScrollView
                                className='flex flex-row'
                                horizontal
                                decelerationRate="normal"
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ marginRight: 8 }}
                            >
                                {qrOptions.map((option, index) => {
                                    const { label, icon, action } = option;
                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={action}
                                        >
                                            <ContainerGradient tailwindRoundedClass="rounded-b-xl">
                                                <View
                                                    className="flex flex-col items-center justify-start rounded-b-xl p-2 overflow-hidden"
                                                    style={[
                                                        { zIndex: 3, width: width / 3, height: 100, marginHorizontal: 4 }
                                                    ]}
                                                >
                                                    <Text style={[{ color: themeColors.color, zIndex: 2 }]} className="font-bold text-md mt-1 mb-2">
                                                        {label}
                                                    </Text>
                                                    {icon}
                                                </View>
                                            </ContainerGradient>
                                        </TouchableOpacity>
                                    )
                                })}
                            </ScrollView>
                        </View>
                    </View>
                    <ScapeFromBottomTab />
                </KeyboardAvoidingView>
            </BasePage >
            <BottomTabs />
        </>
    )
}
