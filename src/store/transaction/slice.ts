import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState'
import { createTransactionBuilder } from './builder/createTransactionBuilder';

export const transactionReducer = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        // increment(state) {
        // },
        // load: (state, action: PayloadAction<AccountItem>) => {
        //     state.balance = 0
        // },
        // reset(state) {
        //     Object.assign(state, initialState)
        // },
    },
    extraReducers: (builder) => {
        createTransactionBuilder(builder)
        // builder.addCase('resetCartSlice', (state, action) => {
        //     return initialState;
        // })
    },
});