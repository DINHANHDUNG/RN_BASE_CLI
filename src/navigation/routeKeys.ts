export const ROUTES = {
  LOGIN: 'Login',
  LOADING: 'Loading',

  MAIN_TAB: 'MainTab',

  HOME_TAB: 'HomeTab',
  PROFILE_TAB: 'ProfileTab',
  SETTINGS_TAB: 'SettingsTab',

  HOME_MAIN: 'HomeMain',
  DETAIL: 'Detail',

  PROFILE_MAIN: 'ProfileMain',
  // ... các key khác
}

export type RouteName = typeof ROUTES[keyof typeof ROUTES]
