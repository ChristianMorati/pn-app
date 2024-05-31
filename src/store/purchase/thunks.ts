import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { purchaseService } from "../../services/PurchaseService";
import axios from "axios";

export const loadLastPurchaseAsync = createAsyncThunk(
    "loadLast/purchase",
    async () => {
        try {
            const lastPurchase = await purchaseService.getLast();
            return { data: { lastPurchase } };
        } catch (error) {
            throw new Error("Erro ao carregar última compra: " + error.message);
        }
    }
);


export const loadAllPurchasesAsync = createAsyncThunk(
    "loadAll/purchase",
    async () => {
        const response = await new Promise<any>(async (resolve, reject) => {
            try {
                const user = await AsyncStorage.getItem('@User').then(res => JSON.parse(res!));
                const token = await AsyncStorage.getItem('TOKEN');

                if (!user || !token) {
                    throw new Error("Failed to load user data");
                }
                const { id } = user;
                const responseData = await axios.get(`/purchase/all/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (responseData.status !== 200) throw new Error("Failed to load Purchases");
                const allPurchases = responseData.data;
                resolve({ data: { allPurchases } });

            } catch (error) {
                reject(undefined);
            }
        })
        return response.data;
    }
)