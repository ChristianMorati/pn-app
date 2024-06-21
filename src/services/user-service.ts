import AsyncStorage from "@react-native-async-storage/async-storage";
import { httpClient } from "./http-client";

class UserService {
    async findUserByPixKey(pixKey: string) {
        const token = await AsyncStorage.getItem('TOKEN');
        // const userId = await AsyncStorage.getItem('@user');
        return await httpClient.request(`user/pixKey`, {
            method: 'POST',
            body: JSON.stringify({ pixKey: pixKey }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
    }
}

const userService = new UserService();
export { userService }
