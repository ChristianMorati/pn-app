import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../pages/home";
import TransactionScreen from "../../pages/transaction";
import AddBalanceScreen from "../../pages/add-balance";
import MyTransactionsScreen from "../../pages/my-transactions";
import LoginScreen from "../../pages/login";
import PayWithQrCode from "../../components/commons/pay-scan-qr";
import { LinearGradient } from "expo-linear-gradient";
import { themeColors } from "../../theme/colors";
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Importe o ícone desejado

const Stack = createNativeStackNavigator();

const CustomHeaderBackButton = ({ navigation }) => {
  // Verifica se a rota atual não é a tela inicial (Home)
  const isRootScreen = navigation.canGoBack();

  // Renderiza o botão padrão de voltar se não estiver na tela inicial
  if (!isRootScreen) {
    return null;
  }

  const handleGoBack = () => {
    navigation.goBack();
  };

  // Caso contrário, renderiza o ícone personalizado de voltar
  return (
    <MaterialCommunityIcons
      name="arrow-left"
      size={24}
      color="#ffffff" // Cor branca para o ícone
      style={{ marginLeft: 10 }} // Ajuste a margem conforme necessário
      onPress={handleGoBack}
    />
  );
};

export default function AuthRouter() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Transaction" component={TransactionScreen} options={{ headerShown: true }} />
        <Stack.Screen name="MyTransactions" component={MyTransactionsScreen} />
        <Stack.Screen name="AddBalance" component={AddBalanceScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="PayWithQrCode"
          component={PayWithQrCode}
          options={({ navigation }) => ({
            headerShown: true,
            title: "",
            headerStyle: {
              backgroundColor: 'transparent',
            },
            headerBackground: () => (
              <LinearGradient
                colors={[themeColors.primary, themeColors.secondary]} // Ajuste as cores conforme necessário
                style={{ flex: 1 }}
              />
            ),
            headerTitleStyle: {
              color: '#ffffff', // Texto branco para dark mode
            },
            headerLeft: (props) => <CustomHeaderBackButton {...props} navigation={navigation} />,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
