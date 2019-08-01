import AsyncStorage from "@react-native-community/async-storage";

export default StorageManager = {
  setItem: async (key, value) => {
    AsyncStorage.setItem(key, value);
  },
  getItem: async (key, value) => {
    AsyncStorage.getItem(key, value);
  }
};
