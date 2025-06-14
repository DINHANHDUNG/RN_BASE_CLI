import { ROUTES } from '../../navigation/routeKeys'

export type MainTabParamList = {
  [ROUTES.HOME_TAB]: undefined
  [ROUTES.PROFILE_TAB]: undefined
  [ROUTES.SETTINGS_TAB]: undefined
}

export type HomeStackParamList = {
  [ROUTES.HOME_MAIN]: undefined
  [ROUTES.DETAIL]: { id: number }
}
