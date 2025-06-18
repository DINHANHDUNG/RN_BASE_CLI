import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ROUTES } from '../../navigation/routeKeys'

export type RootStackParamList = {
  [ROUTES.MAIN_TAB]: undefined
  [ROUTES.LOGIN]: undefined
  [ROUTES.LOADING]: undefined
}

export type RootStackNavigation = NativeStackNavigationProp<RootStackParamList>

export type MainTabParamList = {
  [ROUTES.HOME_TAB]: undefined
  [ROUTES.PROFILE_TAB]: undefined
  [ROUTES.SETTINGS_TAB]: undefined
}

export type HomeStackParamList = {
  [ROUTES.HOME_MAIN]: undefined
  [ROUTES.DETAIL]: { id: number }
}
