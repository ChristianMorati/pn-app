import React from "react"
import { Button, View } from "react-native"
import PixKeySelector from "../../components/commons/pix-key-selector"
import { styles } from "../home/style"
import { LinearGradient } from "expo-linear-gradient"
import { themeColors } from "../../theme/colors"
import { BasePage } from "../../components/layout/base-page"

export default function TransactionScreen({ navigation }) {
    return (
        <BasePage children={
            <>
                <View style={styles.containerColor} className="p-4 overflow-hidden rounded-xl mx-2">
                    <LinearGradient
                        colors={[themeColors.primary, themeColors.secondary]}
                        style={[styles.background, { height: 380 }]}
                    />
                    <Button
                        title="B3bank"
                        onPress={() => navigation.navigate('Home')}
                    />
                    <PixKeySelector />
                </View>
            </>
        } />
    )
}