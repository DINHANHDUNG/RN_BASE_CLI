import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../config/apiEndpoints';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, {getState}) => {
      // Optional: attach token from store here
      // const token = (getState() as RootState).auth.token
      // if (token) headers.set('Authorization', `Bearer ${token}`)
      return headers;
    },
  }),
  endpoints: () => ({}),
});
