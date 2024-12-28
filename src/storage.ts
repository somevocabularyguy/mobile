import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = {
  setItem: async (key: string, value: any) => {
    try {
      if (typeof value === 'string') {
        await AsyncStorage.setItem(key, value);
      } else {
        await AsyncStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  },
  getItem: async (key: string) => {
    const value = await AsyncStorage.getItem(key);
    try {
      if (value !== null) {
        return JSON.parse(value);
      }
      return null;
    } catch (error) {
      return value;
    }
  },
  
  removeItem: async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing data:', error);
    }
  },
  
  clearAll: async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }
};

export default storage;
