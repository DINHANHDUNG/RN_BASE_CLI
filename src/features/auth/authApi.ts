import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '../../baseQuery'
import { NETWORK } from '../../config/apiEndpoints'
import { setCredentials, setUser } from './authSlice'
import { GET, POST } from '../../constants'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery,
  //   tagTypes: [],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: NETWORK.login,
        method: POST,
        data: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setCredentials(data))

          // Gọi getAccount
          const userRes = await dispatch(authApi.endpoints.getAccount.initiate(undefined)).unwrap()

          dispatch(setUser(userRes?.data)) // <-- Dữ liệu user
        } catch (err) {
          console.error('Login failed', err)
        }
      },
    }),
    change_pass: builder.mutation({
      query: (data) => ({
        url: NETWORK.account_changePass,
        method: POST,
        data: data,
      }),
    }),
    getAccount: builder.query({
      query: () => ({
        url: NETWORK.account,
        method: GET,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setUser(data?.data))
        } catch (err) {
          console.error('Get Account failed', err)
        }
      },
    }),
    getRoles: builder.query({
      query: () => ({
        url: NETWORK.role,
        method: GET,
      }),
    }),
  }),
})

// Export hooks for usage in functional components
export const { useLoginMutation, useGetAccountQuery, useGetRolesQuery, useChange_passMutation } =
  authApi
