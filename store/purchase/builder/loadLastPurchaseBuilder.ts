import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { loadLastPurchaseAsync } from "../thunks";


const loadLastPurchaseAsyncBuilder = (
    builder: ActionReducerMapBuilder<any>,
) => {
    builder
        .addCase(loadLastPurchaseAsync.fulfilled, (state, payload) => {
            state.lastPurchase = payload.payload.lastPurchase
            state.loading = false;
        })
        .addCase(loadLastPurchaseAsync.pending, (state) => {
            state.loading = true;
        })
        .addCase(loadLastPurchaseAsync.rejected, (state) => {
            state.loading = false;
        })
}

export default loadLastPurchaseAsyncBuilder;