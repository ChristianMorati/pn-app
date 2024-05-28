import AdminRouter from "../Admin/AdminRouter";
import BottomTabs from "./tabs/BottomTabs";
import { Drawer } from "..";
import { ParagraphBold } from "../../../styled-components/text";
import React from "react";
import Settings from "../../pages/settings";
import useDeviceTheme from "../../theme/use-theme";

const AuthRouter = () => {
  const { theme } = useDeviceTheme()

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
      initialRouteName="Fast Market"
    >
      <Drawer.Screen
        name="Fast Market"
        component={BottomTabs}
        options={{
          drawerLabel: ({ focused, color }) => (
            <ParagraphBold style={{ color: focused ? 'white' : theme.secondaryColor }}>Fast Market</ParagraphBold>
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          title: "Configurações",
          drawerLabel: ({ focused, color }) => (
            <ParagraphBold style={{ color: focused ? 'white' : theme.secondaryColor }}>Configurações</ParagraphBold>
          ),
        }}
      />
      {/* <Drawer.Screen
        name="Admin"
        component={AdminRouter}
        options={{
          title: "Admin",
          drawerLabel: ({ focused, color }) => (
            <ParagraphBold style={{ color: focused ? 'white' : theme.secondaryColor }}>Admin</ParagraphBold>
          ),
        }}
      /> */}
    </Drawer.Navigator>
  );
}

export default AuthRouter;