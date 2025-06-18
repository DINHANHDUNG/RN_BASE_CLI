import { AppDispatch } from '../../store'
import { logout as logoutReducer } from './authSlice'
import { ROUTES } from '../../navigation/routeKeys'

export const logoutApp = (navigation: any) => async (dispatch: AppDispatch) => {
  dispatch(logoutReducer()) // reset state + clear storage
  navigation.replace(ROUTES.LOGIN) // hoặc navigate nếu bạn muốn quay lại stack
}