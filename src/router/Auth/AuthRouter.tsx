import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../pages/home";
import TransactionScreen from "../../pages/transaction";
import AddBalanceScreen from "../../pages/add-balance";

const Stack = createNativeStackNavigator();

const AuthRouter = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Transaction" screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen name="Transaction" component={TransactionScreen} />
        <Stack.Screen name="AddBalance" component={AddBalanceScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AuthRouter;