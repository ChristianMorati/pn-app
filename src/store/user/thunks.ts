import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpClient } from "../../services/http-client";
import { UserInfo } from "./initialState";

type UserLogin = {
    username: string,
    password: string
}

type UserSignUp = {
    name: string,
    username: string,
    password: string,
    cpf?: string,
}

export const loginAsync = createAsyncThunk(
    "login/login",
    async (formData: UserLogin) => {
        return await httpClient.request(`auth/signin`, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
);

export const signUpAsync = createAsyncThunk(
    "login/signup",
    async (formData: UserSignUp) => {
        return await httpClient.request(`auth/signup`, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
);
