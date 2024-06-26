import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { IUserProps } from "../interfaces/IUserProps";
import { loginAsync } from "../thunks";
import { UserInfo } from "../initialState";
import AsyncStorage from "@react-native-async-storage/async-storage";

const loginAsyncBuilder = (
    builder: ActionReducerMapBuilder<IUserProps>,
) => {
    builder
        .addCase(loginAsync.fulfilled, (state, action: PayloadAction<UserInfo>) => {
            state.userInfo = action.payload;

            AsyncStorage.setItem('@User', JSON.stringify(action.payload));
            AsyncStorage.setItem('TOKEN', action.payload.access_token);

            state.loading = false;
            state.signedIn = true;
        })
        .addCase(loginAsync.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(loginAsync.rejected, (state, action) => {
            state.loading = false;
        })
}

export default loginAsyncBuilder;