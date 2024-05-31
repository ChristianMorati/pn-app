import React, { useEffect } from "react";
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

export default function HomeScreen({ navigation }) {
    const width = Dimensions.get('window').width;

    const iconSize = 40;
    const iconColor = 'white';
    const options = [
        {
            label: "Transferir",
            icon: <FontAwesome6 name="money-bill-transfer" size={30} color={iconColor} />,
            action: () => { navigation.navigate("Transaction") }
        },
        {
            label: "Adicionar Saldo",
            icon: <MaterialCommunityIcons name="bank-transfer-in" size={iconSize} color={iconColor} />,
            action: () => { navigation.navigate("AddBalance") }
        },
        {
            label: "Cobrar",
            icon: <MaterialCommunityIcons name="bank-transfer-out" size={iconSize} color={iconColor} />,
            action: () => { navigation.navigate("Transaction") }
        },
    ]

    return (
        <>
            <BasePage children={
                <>
                    <>
                        <ScrollView style={{ backgroundColor: themeColors.basePage }}>
                            <KeyboardAvoidingView>
                                <View style={styles.container}>
                                    <View style={styles.containerColor} className="flex flex-row p-4 overflow-hidden">
                                        <LinearGradient
                                            colors={[themeColors.secondary, themeColors.primary]}
                                            style={[styles.background, { height: 120 }]}
                                        />
                                        <Text style={styles.color} className="font-normal text-4xl">B3</Text>
                                        <Text style={styles.color} className="font-extralight text-4xl">BANK</Text>
                                    </View>
                                    <View style={styles.containerColor} className="mx-1 rounded-lg p-4 overflow-hidden">
                                        <MyAccount />
                                    </View>
                                    <View className="rounded-lg">
                                        <View style={styles.containerColor} className="mx-1 rounded-t-lg p-4">
                                            <Text style={styles.color} className="ml-1 font-medium text-xl">O que faremos hoje?</Text>
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
                                                                style={[styles.background, { height: 100 }]}
                                                            />
                                                            <Text style={[styles.color, { zIndex: 2 }]} className="font-bold text-md mt-1 mb-2">
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
                        </ScrollView >
                    </>
                </>
            } />
            <BottomTabs />
        </>
    )
}