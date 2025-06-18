import Config from 'react-native-config';
import { API_TIMEOUT, API_URL } from './env';

export const API_BASE_URL = API_URL ?? '';
export const API_BASE_TIMEOUT = Number(API_TIMEOUT) || 10000;

export const NETWORK = {
    //Admin
    login: 'auth/login',
    refresh_token: 'auth/refresh-token',
  
    //Account
    account: 'account',
    accountActive: (accountId: number) => `account/${accountId}/active`,
    account_changePass: 'account/change-password',
    role: 'role',
}