import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { httpClient } from "../../services/http-client";

export const loadMyAccountData = createAsyncThunk(
    'account/loadMyAccountData',
    async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN');
            // const userId = await AsyncStorage.getItem('@user');
            const userId = 1;
            const response = await httpClient.request(`account/${userId}`, {
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
