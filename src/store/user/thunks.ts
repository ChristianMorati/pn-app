import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../axios";

type userLogin = {
    username: string,
    password: string
}

type userSignUp = {
    name: string,
    username: string,
    password: string,
    cpf?: string,
}

export type userSignedUp = {
    data: {
        id: number,
        username: string,
        name: string,
        cpf: string,
        access_token: string
    }
}

export type userAuth = {
    data: {
        id: number,
        username: string,
        name: string,
        cpf: string,
        access_token: string
    }
}

export const loginAsync = createAsyncThunk(
    "login/user",
    async (formData: any) => {
        const response = await new Promise<any>(async (resolve, reject) => {

            try {
                const responseData = await fetch(`http://192.168.1.41:3000/auth/signin`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (!responseData.ok) {
                    throw new Error('Network response was not ok');
                }

                const user = await responseData.json();
                resolve({ data: user });
            } catch (error) {
                console.log('Error during login:', error);
                reject(undefined);
            }
        })
        return response.data;
    }
)

export const signUpAsync = createAsyncThunk(
    "login/user",
    async (formData: userSignUp) => {
        const response = await new Promise<userSignedUp>(async (resolve, reject) => {
            const responseData = await instance.post(`/auth/signup`, {
                body: JSON.stringify(formData),
            });

            if (responseData.status !== 201) reject(undefined);

            const user = responseData.data;
            resolve({
                data: { ...user }
            });
        })
        return response.data;
    }
)