import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { refundTransaction } from "../thunks";
import { TransactionItem, TransactionState } from "../initialState";

export const refundTransactionBuilder = (
    builder: ActionReducerMapBuilder<any>,
) => {
    builder
        .addCase(refundTransaction.fulfilled, (state: TransactionState, action: PayloadAction<TransactionItem>) => {
            state.status = 'succeeded';
            state.transaction = action.payload;
        })
        .addCase(refundTransaction.pending, (state: TransactionState) => {
            state.status = 'loading';
            state.error = null;
        })
        .addCase(refundTransaction.rejected, (state: TransactionState, action) => {
            state.status = 'failed';
            state.error = JSON.stringify(action.payload) || action.error.message;
        });
}