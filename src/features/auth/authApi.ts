import {api} from '../../services/api';

export const authApi = api.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<any, {username: string; password: string}>({
      query: body => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    getProfile: build.query<any, void>({
      query: () => '/auth/me',
    }),
  }),
  overrideExisting: false,
});

export const {useLoginMutation, useGetProfileQuery} = authApi;
