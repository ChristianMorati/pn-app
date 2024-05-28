import React from "react";
import GrantAccess from "../../pages/admin/grant-access";
import { Drawer } from "..";
import Settings from "../../pages/settings";
import useDeviceTheme from "../../theme/use-theme";
import { ParagraphBold } from "../../../styled-components/text";

export default function AdminRouter() {
    const { theme } = useDeviceTheme();

    const screenOptionStyle = {
        headerStyle: {
            backgroundColor: theme.bottomTabColor,
        },
        headerTintColor: theme.titleColor,
        headerBackTitle: "black",
    };

    return (
        <Drawer.Navigator
            screenOptions={{
                ...screenOptionStyle,
                drawerActiveBackgroundColor: theme.callToActionBackground,
                drawerStyle: {
                    backgroundColor: theme.pageBackgroundColor,
                }
            }}
            initialRouteName="Grant"
        >
            <Drawer.Screen
                name="Grant"
                component={GrantAccess}
                options={{
                    drawerLabel: ({ focused, color }) => (
                        <ParagraphBold style={{ color: focused ? 'white' : theme.secondaryColor }}>Confirmação de compra</ParagraphBold>
                    ),
                }}
            />
            <Drawer.Screen
                name="Settings"
                component={Settings}
                options={{
                    drawerLabel: ({ focused, color }) => (
                        <ParagraphBold style={{ color: focused ? 'white' : theme.secondaryColor }}>Configurações</ParagraphBold>
                    ),
                }}
            />
        </Drawer.Navigator>
    )
}