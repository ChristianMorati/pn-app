import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack";

type AuthStackParamList = {
    Home: undefined;
    Transaction: undefined;
    MyTransactions: undefined;
    AddBalance: undefined;
    QRCodeBilling: undefined;
    PayWithQrCode: undefined;
    Settings: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
type NavigationProps = NativeStackScreenProps<AuthStackParamList>;

export { AuthStack, AuthStackParamList, NavigationProps };