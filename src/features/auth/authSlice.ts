import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { storage } from '../../utils/storage'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_KEY } from '../../utils/auth/authStorage'

type AuthState = {
  isLoggedIn: boolean
  isLoading: boolean
  accessToken?: string
  refreshToken?: string
  user?: {
    id: string
    name: string
  }
}

const initialState: AuthState = {
  isLoggedIn: false,
  isLoading: true
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, refreshToken } = action.payload.data
      state.accessToken = accessToken
      state.refreshToken = refreshToken

      // Save tokens to local storage
      storage.set(ACCESS_TOKEN_KEY, accessToken)
      storage.set(REFRESH_TOKEN_KEY, refreshToken)
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
    login: (state, action) => {
      state.isLoggedIn = true
      state.accessToken = action.payload.accessToken
      state.user = action.payload.user
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.accessToken = undefined
      state.user = undefined

      //Delete data
      storage.multiRemove([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_KEY])
    },
    hydrateAuth: (state, action: PayloadAction<AuthState>) => {
      return {
        ...state,
        ...action.payload,
        isLoggedIn: !!action.payload.accessToken, // auto set true nếu có token
      }
    },
  },
})

export const { login, logout, setCredentials, setUser, hydrateAuth } = authSlice.actions
export default authSlice.reducer
