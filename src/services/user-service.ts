import AsyncStorage from "@react-native-async-storage/async-storage";
import { httpClient } from "./http-client";

type findUserByPixKeyParams = {
    pixKey: string
}


class UserService {
    async findUserByPixKey({ pixKey }: findUserByPixKeyParams) {
        try {
            const token = await AsyncStorage.getItem('TOKEN');
            // const userId = await AsyncStorage.getItem('@user');
            const pixKey = ""
            const response = await httpClient.request(`user/pixKey/${pixKey}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.data) {
                throw new Error('Failed to load user data');
            }

            console.log(response.data)

            return response.data;
        } catch (error) {
            console.log('error')
            return Promise.reject(error);
        }
    }
}

const userService = new UserService();
export { userService }
