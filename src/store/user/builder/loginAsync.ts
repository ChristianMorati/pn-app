import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUserProps } from "../interfaces/IUserProps";
import { loginAsync } from "../thunks";
import { UserInfo } from "../initialState";

const loginAsyncBuilder = (
    builder: ActionReducerMapBuilder<IUserProps>,
) => {
    builder
        .addCase(loginAsync.fulfilled, (state, action: PayloadAction<UserInfo>) => {

            state.userInfo = action.payload;

            (async () => {
                await AsyncStorage.setItem('@User', JSON.stringify(action.payload));
                await AsyncStorage.setItem('TOKEN', action.payload.access_token);
            })()

            console.log(state.userInfo);

            state.loading = false;
            state.signedIn = true;

        })
        .addCase(loginAsync.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(loginAsync.rejected, (state, action) => {
            state.loading = false;
            Alert.alert('Opss!', "verifique as suas credenciais!");
        })
}

export default loginAsyncBuilder;