import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage"

const instance = axios.create({
    baseURL: 'http://192.168.1.41:3000',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const loadMyAccountData = createAsyncThunk(
    'account/loadMyAccountData',
    async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN');
            // const userId = await AsyncStorage.getItem('@user');
            const userId = 1;
            const response = await instance.get(`account/${userId}`, {
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
