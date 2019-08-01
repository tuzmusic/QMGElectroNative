// @flow
import AsyncStorage from "@react-native-community/async-storage";
import User from "./User";

export default class StorageManager {
  static async logout() {
    await AsyncStorage.setItem("electro_logged_in_user", "");
  }

  static async getStoredUser(): Promise<?User> {
    const storedUser = await AsyncStorage.getItem("electro_logged_in_user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const user = new User(parsedUser);
      return user;
    }
  }
}
