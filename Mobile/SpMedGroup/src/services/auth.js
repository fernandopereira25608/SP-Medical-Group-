import { AsyncStorage } from "react-native";

const USER_KEY = "spmedg-token";

export default {
    async setItem(value) {
        try {
            return await AsyncStorage.setItem(USER_KEY, JSON.stringify(value));
        } catch (error){}
    },
    async getItem() {
        return await AsyncStorage.getItem(USER_KEY)
            .then((result) => {
                if (result) {
                    try {
                        result = JSON.parse(result);
                    } catch (e) {}
                }
                return result;
            });
    },
    async removeItem() {
        return await AsyncStorage.removeItem(USER_KEY);
    }
}