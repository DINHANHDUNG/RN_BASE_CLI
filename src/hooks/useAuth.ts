import {useAppSelector, useAppDispatch} from '../store/hooks';
import {login, logout} from '../features/auth/authSlice';

export function useAuth() {
  const auth = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  return {
    ...auth,
    login: (user: any) => dispatch(login(user)),
    logout: () => dispatch(logout()),
  };
}
