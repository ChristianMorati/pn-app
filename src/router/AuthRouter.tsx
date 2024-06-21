import React from "react";
import HomeScreen from "../pages/home";
import TransactionScreen from "../pages/transaction";
import AddBalanceScreen from "../pages/add-balance";
import MyTransactionsScreen from "../pages/my-transactions";
import PayWithQrCode from "../components/commons/pay-scan-qr";
import { LinearGradient } from "expo-linear-gradient";
import { themeColors } from "../theme/colors";
import QRCodeBillingScreen from "../pages/qrcode-billing";
import { Text, View } from "react-native";
import colors from "tailwindcss/colors";
import SettingsScreen from "../pages/settings";
import { AuthStack } from ".";

export default function AuthRouter() {
  return (
    <AuthStack.Navigator initialRouteName="Home" screenOptions={{
      headerShown: true,
      headerBackground: () => (
        <LinearGradient
          colors={[themeColors.primary, themeColors.secondary]}
          style={{ flex: 1 }}
        />
      ),
      headerTintColor: themeColors.color,
    }}>
      <AuthStack.Screen name="Home" component={HomeScreen} options={({ navigation }) => ({
        headerTitle: '',
        headerBackground: () => (
          <View style={{ flex: 1 }}>
            <LinearGradient
              colors={[colors.black, themeColors.secondary]}
              style={{ flex: 1 }}
            />
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', position: 'absolute', width: '100%', height: '100%' }}>
              <Text style={{ color: themeColors.color, fontSize: 24, fontWeight: 'normal' }}>PIX</Text>
              <Text style={{ color: themeColors.color, fontSize: 24, fontWeight: '200' }}>NODE</Text>
            </View>
          </View>
        ),
      })}
      />
      <AuthStack.Screen name="Transaction" component={TransactionScreen} options={({ navigation }) => ({
        headerTitle: "Transferir"
      })}
      />
      <AuthStack.Screen name="MyTransactions" component={MyTransactionsScreen} options={({ navigation }) => ({
        headerTitle: "Minhas transações",
      })}
      />
      <AuthStack.Screen name="AddBalance" component={AddBalanceScreen} options={({ navigation }) => ({
        headerTitle: "Adicionar saldo",
      })}
      />
      <AuthStack.Screen name="Settings" component={SettingsScreen} options={({ navigation }) => ({
        headerTitle: "Configurações",
      })}
      />
      <AuthStack.Screen name="QRCodeBilling" component={QRCodeBillingScreen} options={({ navigation }) => ({
        headerTitle: "Gerar cobrança QR",
      })}
      />
      <AuthStack.Screen
        name="PayWithQrCode" component={PayWithQrCode} options={({ navigation }) => ({
          headerTitle: "Pagar cobrança QR",
        })}
      />
    </AuthStack.Navigator>
  )
}
