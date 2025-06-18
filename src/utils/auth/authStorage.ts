import { authApi } from "../../features/auth/authApi"
import { hydrateAuth } from "../../features/auth/authSlice"
import { AppDispatch } from "../../store"
import { storage } from "../storage"

export const ACCESS_TOKEN_KEY = 'accessToken'
export const REFRESH_TOKEN_KEY = 'refreshToken'
export const USER_KEY = 'user'

export const loadAuthFromStorage = () => async (dispatch: AppDispatch) => {
  try {
    const accessToken = await getAccessToken()
    const refreshToken = await getRefreshToken()

    if (accessToken && refreshToken) {
      dispatch(hydrateAuth({ isLoggedIn: true, accessToken, refreshToken, isLoading: false }))

      try {
        // Gọi API lấy user (dispatch getAccount)
        await dispatch(authApi.endpoints.getAccount.initiate(undefined)).unwrap()
      } catch (error) {
        console.log('❌ Lấy user thất bại, có thể token hết hạn', error)
        // Optional: clear token nếu cần
      }
    }
  } catch (error) {
    console.log('Failed to load auth from storage:', error)
  }
}

export const getAccessToken = () => storage.getString(ACCESS_TOKEN_KEY)
export const getRefreshToken = () => storage.getString(REFRESH_TOKEN_KEY)

export const setAccessToken = (token: string) => storage.set(ACCESS_TOKEN_KEY, token)
export const setRefreshToken = (token: string) => storage.set(REFRESH_TOKEN_KEY, token)

export const clearTokens = () => {
  storage.remove(ACCESS_TOKEN_KEY)
  storage.remove(REFRESH_TOKEN_KEY)
  storage.remove(USER_KEY)
}