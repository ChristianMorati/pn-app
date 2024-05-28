import React from "react";
import HomeStack from "../stacks/HomeStack";
import { Image } from "react-native";
import ProductStack from "../stacks/ProductsStack";
import { Tab } from "../..";
import { Text } from "react-native";
import { useAppSelector } from "../../../../store/hooks/useAppSelector";
import useDeviceTheme from "../../../theme/use-theme";

export default function BottomTabs() {
  const { cartLength } = useAppSelector((store) => store.cart);
  const { theme } = useDeviceTheme()

  return (
    <Tab.Navigator
      initialRouteName="/"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: 'absolute',
          borderTopColor: theme.borderColor,
          borderTopWidth: .5,
          bottom: 0,
          left: 0,
          backgroundColor: theme.bottomTabColor,
          right: 0,
          height: 50,
        }
      }}
    >
      <Tab.Screen
        name="/"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarLabel: ({ focused, color, ...otherProps }) => (
            <Text
              style={{ color: focused ? theme.callToActionBackground : color, fontSize: 10 }}
            >
              Início
            </Text>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require('../../../../../assets/home.png')}
              style={{
                width: size, height: size,
                tintColor: focused ? theme.callToActionBackground : color,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Comprar"
        component={ProductStack}
        options={
          {
            headerShown: false,
            tabBarBadge: cartLength == 0 ? undefined : cartLength,
            tabBarBadgeStyle: {
              backgroundColor: 'red'
            },
            tabBarLabel: ({ focused, color, ...otherProps }) => (
              <Text
                style={{ color: focused ? theme.callToActionBackground : color, fontSize: 10 }}
              >
                Ír as compras
              </Text>
            ),
            tabBarIcon: ({ focused, color, size }) => (
              <Image
                source={require('../../../../../assets/cart.png')}
                style={{
                  width: size, height: size,
                  tintColor: focused ? theme.callToActionBackground : color,
                }}
              />
            ),
          }}
      />
    </Tab.Navigator >
  );
}