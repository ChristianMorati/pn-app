import React from "react";
import Products from "../../../pages/products";
import { Stack } from "../..";
import Payment from "../../../pages/payment";
import UnlockAccessScreen from "../../../pages/unlock-access";

export default function ProductStack() {
    return (
        <Stack.Navigator
            initialRouteName="Ìr as compras"
        >
            <Stack.Screen
                name="Ìr as compras"
                component={Products}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Payment"
                component={Payment}
                options={{
                    headerTitle: 'Pagamento'
                }}
            />
            <Stack.Screen
                name="UnlockAccess"
                component={UnlockAccessScreen}
                options={{
                    headerShown: false,
                    headerTitle: "Liberar a Catraca"
                }}
            />
        </Stack.Navigator>
    )
};