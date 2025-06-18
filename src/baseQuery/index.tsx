import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import type { AxiosError, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { logout, setCredentials } from '../features/auth/authSlice'
import { RootState } from '../store'
import { API_BASE_URL, NETWORK } from '../config/apiEndpoints'

const axiosInstance = axios.create({
  baseURL: API_BASE_URL
})

export const axiosBaseQuery: BaseQueryFn<
  {
    url: string
    method?: AxiosRequestConfig['method']
    data?: AxiosRequestConfig['data']
    params?: AxiosRequestConfig['params']
    headers?: AxiosRequestConfig['headers']
    responseType?: AxiosRequestConfig['responseType']
  },
  unknown,
  unknown
> = async ({ url, method, data, params, headers, responseType }, { getState, dispatch }) => {
  const state = getState() as RootState
  const token = state.auth.accessToken

  try {
    const result = await axiosInstance({
      url,
      method,
      data,
      params,
      responseType,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...headers
      }
    })
    return { data: result.data }
  } catch (axiosError) {
    const err = axiosError as AxiosError
    if (err.response?.status === 401 && url != NETWORK.login) {
      // try to get a new token
      try {
        console.log('Token expired, refreshing token...')
        const refreshResult = await axiosInstance.post(NETWORK.refresh_token, {
          refreshToken: state.auth.refreshToken
        })

        if (refreshResult.data) {
          const newAccessToken = refreshResult.data.data.accessToken

          // store the new token
          dispatch(setCredentials(refreshResult.data))

          // retry the original query with new token
          const retryResult = await axiosInstance({
            url,
            method,
            data,
            params,
            headers: {
              ...headers,
              Authorization: `Bearer ${newAccessToken}`,
              'Content-Type': 'application/json'
            }
          })
          return { data: retryResult.data }
        }
      } catch (refreshError) {
        const refreshErr = refreshError as AxiosError
        if (refreshErr.response?.status === 401) dispatch(logout())
        return {
          error: {
            status: refreshErr.response?.status,
            data: refreshErr.response?.data || refreshErr.message,
            message: refreshErr.message
          }
        }
      }
    }

    return {
      error: {
        status: err.response?.status,
        data: err.response?.data || err.message,
        message: err.message
      }
    }
  }
}
