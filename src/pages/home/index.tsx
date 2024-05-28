import React from "react";
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { themeColors } from "../../theme/colors";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from "./style";
import MyAccount from "../../components/commons/my-accont";

export default function HomeScreen() {
    const width = Dimensions.get('window').width;

    const iconSize = 40;
    const iconColor = 'white';
    const options = [
        { label: "Adicionar Saldo", icon: <MaterialCommunityIcons name="bank-transfer-in" size={iconSize} color={iconColor} /> },
        { label: "Transferir", icon: <FontAwesome6 name="money-bill-transfer" size={30} color={iconColor} /> },
        { label: "Cobrar", icon: <MaterialCommunityIcons name="bank-transfer-out" size={iconSize} color={iconColor} /> },
    ]

    return (
        <View style={styles.container}>
            <View style={styles.containerColor} className="flex flex-row p-4 overflow-hidden">
                <Text style={styles.color} className="font-normal text-4xl">B3</Text>
                <Text style={styles.color} className="font-extralight text-4xl">BANK</Text>
                <MyAccount />
            </View>
            <View style={styles.containerColor} className="mx-1 rounded-lg p-4 overflow-hidden">
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
                        <Text style={styles.color} className="font-extralight text-4xl mt-2">R$ 120,00</Text>
                    </View>
                </View>
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
                        const { label, icon } = option;
                        return (
                            <TouchableOpacity>
                                <View
                                    className="flex flex-col items-center justify-start rounded-b-xl p-2 overflow-hidden"
                                    key={index}
                                    style={[
                                        styles.secondaryContainerColor,
                                        { zIndex: 3, width: width / 2.3, height: 100, marginHorizontal: 4 }
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
    )
}