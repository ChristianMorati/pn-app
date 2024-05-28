import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AccountItem, initialState } from './initialState'
import { loadMyAccountDataBuilder } from './builder/loadMyAccountDataBuilder';

export const accountReducer = createSlice({
    name: 'account',
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
        loadMyAccountDataBuilder(builder)
        // builder.addCase('resetCartSlice', (state, action) => {
        //     return initialState;
        // })
    },
});