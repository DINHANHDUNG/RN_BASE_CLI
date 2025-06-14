import {createSlice} from '@reduxjs/toolkit';

type AuthState = {
  isLoggedIn: boolean;
  token?: string;
  user?: {
    id: string;
    name: string;
  };
};

const initialState: AuthState = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: state => {
      state.isLoggedIn = false;
      state.token = undefined;
      state.user = undefined;
    },
  },
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;
