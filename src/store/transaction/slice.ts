import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState'
import { createTransactionBuilder } from './builder/createTransactionBuilder';
import { loadMyTransactionsBuilder } from './builder/loadMyTransactionsBuilder';

export const transactionReducer = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        createTransactionBuilder(builder)
        loadMyTransactionsBuilder(builder)
    },
});