import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import Config from 'react-native-config';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: Config.API_URL,
    prepareHeaders: (headers, {getState}) => {
      // Optional: attach token from store here
      // const token = (getState() as RootState).auth.token
      // if (token) headers.set('Authorization', `Bearer ${token}`)
      return headers;
    },
  }),
  endpoints: () => ({}),
});
