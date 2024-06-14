import React, { useCallback } from "react";
import { Dimensions, KeyboardAvoidingView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
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
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import GenCharge from "../../components/commons/gen-charge";

export default function HomeScreen() {
    const width = Dimensions.get('window').width;
    const dispatch = useAppDispatch();
    const { account, error, status } = useAppSelector(store => store.account);
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            dispatch(loadMyAccountData());
        }, [dispatch])
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
            action: () => { navigation.navigate("PayWithQrCode") }
        },
        {
            label: "Adicionar Saldo",
            icon: <MaterialCommunityIcons name="bank-transfer-in" size={iconSize} color={iconColor} />,
            action: () => { navigation.navigate("AddBalance") }
        },
    ]

    const qrOptions = [
        {
            label: "Pagar cobrança QR",
            icon: <MaterialCommunityIcons name="qrcode-scan" size={iconSize - 5} color={iconColor} />,
            action: () => { navigation.navigate("PayWithQrCode") }
        },
        {
            label: "Pagar com QR",
            icon: <MaterialCommunityIcons name="qrcode-scan" size={iconSize - 5} color={iconColor} />,
            action: () => { navigation.navigate("PayWithQrCode") }
        },
    ]

    return (
        <>
            <BasePage children={
                <>
                    <>
                        <KeyboardAvoidingView>
                            <View style={[styles.container, { backgroundColor: themeColors.basePage }]}>
                                <View style={styles.containerColor} className="flex flex-row p-4 overflow-hidden">
                                    <LinearGradient
                                        colors={[themeColors.secondary, themeColors.primary]}
                                        style={[styles.background, { flex: 1 }]}
                                    />
                                    <Text style={styles.color} className="font-normal text-4xl">PIX</Text>
                                    <Text style={styles.color} className="font-extralight text-4xl">NODE</Text>
                                </View>
                                <View style={styles.containerColor} className="mx-1 rounded-lg p-4 overflow-hidden">
                                    <MyAccount
                                        account={account}
                                        error={error}
                                        status={status}
                                        handleReload={handleAccountReload}
                                        navigation={navigation}
                                    />
                                </View>
                                {/* <View style={styles.containerColor} className="mx-1 rounded-lg p-4 overflow-hidden">
                                    <GenCharge />
                                </View> */}
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
                                                    <View
                                                        className="flex flex-col items-center justify-start rounded-b-xl p-2 overflow-hidden"
                                                        style={[
                                                            styles.secondaryContainerColor,
                                                            { zIndex: 3, width: width / 2.5, height: 100, marginHorizontal: 4 }
                                                        ]}
                                                    >
                                                        <LinearGradient
                                                            colors={[themeColors.primary, themeColors.secondary]}
                                                            style={[styles.background, { flex: 1 }]}
                                                        />
                                                        <Text style={[{ color: themeColors.color, zIndex: 2 }]} className="font-bold text-md mt-1 mb-2">
                                                            {label}
                                                        </Text>
                                                        {icon}
                                                    </View>
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
                                                    <View
                                                        className="flex flex-col items-center justify-start rounded-b-xl p-2 overflow-hidden"
                                                        style={[
                                                            styles.secondaryContainerColor,
                                                            { zIndex: 3, width: width / 2 - 8, height: 100, marginHorizontal: 4 }
                                                        ]}
                                                    >
                                                        <LinearGradient
                                                            colors={[themeColors.primary, themeColors.secondary]}
                                                            style={[styles.background, { flex: 1 }]}
                                                        />
                                                        <Text style={[{ color: themeColors.color, zIndex: 2 }]} className="font-bold text-md mt-1 mb-2">
                                                            {label}
                                                        </Text>
                                                        {icon}
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        })}
                                    </ScrollView>
                                </View>
                            </View >
                            <ScapeFromBottomTab />
                        </KeyboardAvoidingView>
                    </>
                </>
            } />
            <BottomTabs />
        </>
    )
}
