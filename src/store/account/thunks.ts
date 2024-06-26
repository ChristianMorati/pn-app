import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpClient } from "../../services/http-client";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

            const response = await httpClient.request(`account/user/${userData.user.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response) {
                throw new Error('Failed to load user data');
            }

            return response;
        } catch (error) {
            return Promise.reject({ message: "Falha ao carregar os dados da conta" });
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
            return Promise.reject({ message: "Falha ao adicionar saldo na conta" });
        }
    }
);
