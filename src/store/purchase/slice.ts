import { createSlice } from "@reduxjs/toolkit";
import { initialState } from './initialState';
import loadLastPurchaseAsyncBuilder from "./builder/loadLastPurchaseBuilder";
import loadAllPurchasesBuilder from "./builder/loadAllPurchasesBuilder";

export const purchaseSlice = createSlice({
    name: 'purchase',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        loadLastPurchaseAsyncBuilder(builder)
        loadAllPurchasesBuilder(builder)
    },
});