import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { httpClient } from "../../services/http-client";

export const loadMyAccountData = createAsyncThunk(
    'account/loadMyAccountData',
    async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN');
            if (!token) {
              throw new Error('Token not found');
            }
        
            const user = await AsyncStorage.getItem('@User');
            if (!user) {
              throw new Error('User data not found');
            }
        
            const userData = JSON.parse(user);
            console.log(userData);

            const userId = 1;
            const response = await httpClient.request(`account/${userData.user.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response) {
                throw new Error('Failed to load user data');
            }

            return response;
        } catch (error) {
            console.log(error);
            return Promise.reject({ message: "Falha ao carregar os dados da conta" });
        }
    }
);

type findUserByPixKeyParams = {
    pixKey: string
}

export const findUserByPixKey = createAsyncThunk(
    'account/loadMyAccountData',
    async ({ pixKey }: findUserByPixKeyParams) => {
        try {
            const token = await AsyncStorage.getItem('TOKEN');
            // const userId = await AsyncStorage.getItem('@user');
            const pixKey = ""
            const response = await httpClient.request(`user/pixKey/${pixKey}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.data) {
                throw new Error('Failed to load user data');
            }

            console.log(response.data)

            return response.data;
        } catch (error) {
            console.log('error')
            return Promise.reject(error);
        }
    }
);


export const addBalanceToMyAccount = createAsyncThunk(
    'account/deposit',
    async (amount: number, { getState }: any) => {
        const { account } = getState().account;

        try {
            const token = await AsyncStorage.getItem('TOKEN');
            const response = await httpClient.request(`account/deposit`, {
                method: "POST",
                body: JSON.stringify({
                    accountId: account.id,
                    amount: amount
                }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response) {
                throw new Error('Failed to load user data');
            }

            return response;
        } catch (error) {
            console.error('Error:', error);
            return Promise.reject(error);
        }
    }
);
