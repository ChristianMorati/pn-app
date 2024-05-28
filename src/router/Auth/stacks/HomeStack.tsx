import React from "react";
import { Stack } from "../.."; 
import useDeviceTheme from "../../../theme/use-theme";
import { HomeScreen } from "../../../pages/home";
import { PurchaseHistoryScreen } from "../../../screens";

export default function HomeStack() {
    const { theme } = useDeviceTheme()
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerTintColor: theme.titleColor,
                headerStyle: {
                    backgroundColor: theme.pageBackgroundColor,
                }
            }}
        >
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="PurchaseHystory"
                component={PurchaseHistoryScreen}
                options={{
                    headerTitle: "Histórico de Compras"
                }}
            />
        </Stack.Navigator>
    )
}