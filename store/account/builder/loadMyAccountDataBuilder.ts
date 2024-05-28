import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { loadMyAccountData } from "../thunks";

export const loadMyAccountDataBuilder = (
    builder: ActionReducerMapBuilder<any>,
) => {
    builder
        .addCase(loadMyAccountData.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
        .addCase(loadMyAccountData.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
        })
        .addCase(loadMyAccountData.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload || action.error.message;
        });
}