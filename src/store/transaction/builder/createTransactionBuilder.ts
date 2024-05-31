import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { createTransaction } from "../thunks";
import { TransactionItem, TransactionState } from "../initialState";
import { withdraw } from "../../account/actions";

export const createTransactionBuilder = (
    builder: ActionReducerMapBuilder<any>,
) => {
    builder
        .addCase(createTransaction.fulfilled, (state: TransactionState, action: PayloadAction<TransactionItem>) => {
            state.status = 'succeeded';
            state.transaction = action.payload;
            withdraw(action.payload.amount);
        })
        .addCase(createTransaction.pending, (state: TransactionState) => {
            state.status = 'loading';
            state.error = null;
        })
        .addCase(createTransaction.rejected, (state: TransactionState, action) => {
            state.status = 'failed';
            state.error = action.payload || action.error.message;
        });
}