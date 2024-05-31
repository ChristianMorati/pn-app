import React from "react";
import HomeScreen from "../../../pages/home";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from "react-native";
const Stack = createNativeStackNavigator();

function TransactionScreen() {
    return (
        <View>
            <Text>TransactionScreen</Text>
        </View>
    )
}

export default function HomeStack() {
    return (
        <Stack.Navigator
            initialRouteName="transaction"
            screenOptions={{
                // headerTintColor: theme.titleColor,
                // headerStyle: {
                //     backgroundColor: theme.pageBackgroundColor,
                // }
            }}
        >
            <Stack.Screen
                name="transaction"
                component={TransactionScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="/"
                component={HomeScreen}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}