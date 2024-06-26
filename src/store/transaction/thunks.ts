import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpClient } from "../../services/http-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PixKeyTypeEnum } from "../unum/pix-key-type.enum";
import { TransactionItem } from "./initialState";

type createTransactionParams = {
    amount: number,
    payeePixKey: string,
    payeePixKeyType: string
}

export const createTransaction = createAsyncThunk(
    'transaction/create',
    async ({ amount, payeePixKey, payeePixKeyType }: createTransactionParams, { rejectWithValue }) => {
        var response;
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

            response = await httpClient.request(`transaction`, {
                method: "POST",
                body: JSON.stringify({
                    amount: amount,
                    payerUserId: userData.user.id,
                    payeePixKey: payeePixKey,
                    payeePixKeyType: payeePixKeyType
                }),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.success) {
                throw new Error('Failed to create transaction');
            }

            return response;
        } catch (error) {
            return rejectWithValue(null);
        }
    }
);

export const refundTransaction = createAsyncThunk(
    'transaction/refund',
    async (transaction: TransactionItem, { rejectWithValue }) => {
        var response;
        try {
            const token = await AsyncStorage.getItem('TOKEN');
            if (!token) {
                throw new Error('Token not found');
            }

            response = await httpClient.request(`transaction/refund`, {
                method: "POST",
                body: JSON.stringify(transaction),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.success) {
                throw new Error('Failed to create transaction');
            }

            return response;
        } catch (error) {
            return rejectWithValue(null);
        }
    }
);

export const loadMyTransactions = createAsyncThunk(
    'transaction/allByAccountId',
    async (_, { getState }: any) => {
        const { account } = getState()?.account;

        try {
            const response = await httpClient.request(`transaction/all/${account.id}`, {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response) {
                throw new Error('Failed to load user data');
            }

            return response;
        } catch (error) {
            return Promise.reject({ message: "Aconteceu algum erro" });
        }
    }
);