import { IUserProps } from "./interfaces/IUserProps";

export type UserInfo = {
    id: number,
    username: string,
    name: string,
    cpf?: string,
    access_token: string,
    refresh_token: string
}

export const initialState: IUserProps = {
    signedIn: false,
    loading: false,
    userInfo: {} as UserInfo,
    access_token: '',
};