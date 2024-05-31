import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { httpClient } from "../../services/http-client";

type createTransactionParams = {
    amount: number,
    payeePixKey: string
}

export const createTransaction = createAsyncThunk(
    'transaction/create',
    async ({ amount, payeePixKey }: createTransactionParams) => {
        try {
            const token = await AsyncStorage.getItem('TOKEN');
            const user = await AsyncStorage.getItem('@user');
            payeePixKey = payeePixKey || "chris2@gmail.com";
            const userId = 3;

            const response = await httpClient.request(`transaction/${userId}`, {
                method: "POST",
                body: {
                    amount: amount,
                    payerUserId: userId,
                    payeePixKey
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.data) {
                throw new Error('Failed to load user data');
            }

            console.log(response.data);

            return response.data;
        } catch (error) {
            console.error('Error:', error);
            return Promise.reject(error);
        }
    }
);
