import AsyncStorage from "@react-native-async-storage/async-storage";
import { httpClient } from "../services/http-client";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    [key: string]: any;
}

export const updateTokens = async (tokens: any) => {
    try {
        const updatedTokens = await httpClient.request('auth/refresh', {
            method: "PUT",
            body: JSON.stringify(tokens),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        return updatedTokens;
    } catch (error) {
        return null;
    }
}

export const canFetchData = async (): Promise<boolean | string> => {
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

        return updatedTokens.access_token;
    } catch (e) {
        return false
    }
}

export const authenticatedPromise = async (callback: any) => {
    const token = await canFetchData();
    if (!token) {
        console.log('Unauthorized!');
        return;
    }

    callback(token);
}

export const checkAccessTokenValidation = (access_token: string): DecodedToken | null => {
    try {
        console.log(access_token);
        const decoded = jwtDecode(access_token) as DecodedToken;

        // Verificar se o token está expirado
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (decoded.exp && decoded.exp < currentTimestamp) {
            console.log('Token expirado');
            return null;
        }

        return decoded;
    } catch (error) {
        console.error('Erro ao decodificar token:', error);
        return null;
    }
};