import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpClient } from "../../services/http-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserInfo } from "./initialState";

type UserLogin = {
    username: string,
    password: string
}

type userSignUp = {
    name: string,
    username: string,
    password: string,
    cpf?: string,
}

export const loginAsync = createAsyncThunk(
    "login/signin",
    async (formData: UserLogin) => {
        const response = await new Promise<UserInfo>(async (resolve, reject) => {
            const token = await AsyncStorage.getItem('TOKEN');

            try {
                const responseData = await httpClient.request(`auth/signin`, {
                    method: "POST",
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!responseData) {
                    reject('No response data');
                } else {
                    resolve(responseData);
                }
            } catch (error) {
                reject(error.message);
            }
        });
        return response;
    }
)

export const signUpAsync = createAsyncThunk(
    "login/signup",
    async (formData: userSignUp) => {
        const response = await new Promise<UserInfo>(async (resolve, reject) => {
            const token = await AsyncStorage.getItem('TOKEN');
            try {
                const responseData = await httpClient.request(`/auth/signup`, {
                    method: "POST",
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!responseData) {
                    reject('No response data');
                } else {
                    resolve(responseData);
                }
            } catch (error) {
                reject(error.message);
            }
        });
        return response;
    }
);
