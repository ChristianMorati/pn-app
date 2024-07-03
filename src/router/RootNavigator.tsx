import { useEffect, useState } from "react";
import AuthRouter from "./AuthRouter";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setSignedIn, setUserInfo } from "../store/user/actions";
import { useAppSelector } from "../store/hooks/useAppSelector";
import { useAppDispatch } from "../store/hooks/useAppDispatch";
import { updateTokens } from "../services/jwt";
import { themeColors } from "../theme/colors";
import { NavigationContainer } from "@react-navigation/native";
import NonAuthRouter from "./NonAuthRouter";

export const RootNavigator = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { signedIn } = useAppSelector(store => store.user);
    const dispatch = useAppDispatch();

    const checkIfIsAuthtenticated = async () => {
        try {
            const user = await AsyncStorage.getItem("@User");
            if (!user) {
                throw new Error("Sem dados de Usuário");
            }

            const userData = JSON.parse(user);
            if (!userData.access_token) {
                throw new Error("Acces token não encontrado");
            }

            const tokens = {
                access_token: userData.access_token,
                refresh_token: userData.refresh_token,
            }

            const updatedTokens = await updateTokens(tokens);
            if (!updatedTokens) {
                throw new Error("falha ao atualizar tokens");
            }

            console.log(userData);

            dispatch(setUserInfo({...userData}));
            dispatch(setSignedIn(true));
        } catch (error) {

        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkIfIsAuthtenticated();
    }, []);

    return (
        <NavigationContainer>
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={themeColors.success} />
                </View>
            ) : (
                <>
                    {signedIn ? <AuthRouter /> : <NonAuthRouter />}
                </>
            )}
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default RootNavigator;
