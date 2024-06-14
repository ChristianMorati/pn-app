import AsyncStorage from "@react-native-async-storage/async-storage";
import { httpClient } from "./http-client";

class UserService {
    async findUserByPixKey(pixKey: string) {
        try {
            const token = await AsyncStorage.getItem('TOKEN');
            // const userId = await AsyncStorage.getItem('@user');
            const { userName } = await httpClient.request(`user/pixKey/${pixKey}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!userName) {
                throw new Error('Failed to load user data');
            }

            return userName;
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

const userService = new UserService();
export { userService }
