import AsyncStorage from '@react-native-async-storage/async-storage'

export const storage = {
  async set(key: string, value: any) {
    try {
      const jsonValue = typeof value === 'string' ? value : JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      console.log(`Error setting ${key} to AsyncStorage`, e)
    }
  },

  async get<T = any>(key: string): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(key)
      return value ? JSON.parse(value) : null
    } catch (e) {
      console.log(`Error getting ${key} from AsyncStorage`, e)
      return null
    }
  },

  async getString(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key)
    } catch (e) {
      console.log(`Error getting string ${key} from AsyncStorage`, e)
      return null
    }
  },

  async remove(key: string) {
    try {
      await AsyncStorage.removeItem(key)
    } catch (e) {
      console.log(`Error removing ${key} from AsyncStorage`, e)
    }
  },

  async multiRemove(keys: string[]) {
    try {
      await AsyncStorage.multiRemove(keys)
    } catch (e) {
      console.log(`Error multi removing keys from AsyncStorage`, e)
    }
  }
}
