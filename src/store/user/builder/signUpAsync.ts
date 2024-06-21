import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { IUserProps } from "../interfaces/IUserProps";
import { signUpAsync } from "../thunks";
import { UserInfo } from "../initialState";
import AsyncStorage from "@react-native-async-storage/async-storage";

const signUpAsyncBuilder = (
    builder: ActionReducerMapBuilder<IUserProps>,
) => {
    builder
        .addCase(signUpAsync.fulfilled, (state, action: PayloadAction<UserInfo>) => {
            console.log(state.userInfo);

            state.userInfo = action.payload;

            AsyncStorage.setItem('@User', JSON.stringify(action.payload));
            AsyncStorage.setItem('TOKEN', action.payload.access_token);

            state.loading = false;
            state.signedIn = true;
        })
        .addCase(signUpAsync.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(signUpAsync.rejected, (state, action) => {
            state.loading = false;
        })
}

export default signUpAsyncBuilder;