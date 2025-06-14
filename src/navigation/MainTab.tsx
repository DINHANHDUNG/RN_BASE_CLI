import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ProfileScreen from '../screens/ProfileScreen'
import SettingsScreen from '../screens/SettingsScreen'
import Icon from '../components/Icon'
import { MainTabParamList } from '../types/navigation'
import { ROUTES } from './routeKeys'
import HomeStack from './stacks/HomeStack'
// Hoặc import wrapper Icon nếu bạn dùng

const Tab = createBottomTabNavigator<MainTabParamList>()

export default function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#3366FF',
        tabBarInactiveTintColor: '#AAA',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = 'home'
          if (route.name === ROUTES.HOME_TAB) iconName = focused ? 'home' : 'home-filled'
          else if (route.name === ROUTES.PROFILE_TAB) iconName = focused ? 'person' : 'person'
          else if (route.name === ROUTES.SETTINGS_TAB) iconName = focused ? 'settings' : 'settings'
          return <Icon name={iconName} size={size} color={color} />
        },
      })}
    >
      <Tab.Screen name={ROUTES.HOME_TAB} component={HomeStack} options={{ title: 'Trang chủ' }} />
      <Tab.Screen
        name={ROUTES.PROFILE_TAB}
        component={ProfileScreen}
        options={{ title: 'Cá nhân' }}
      />
      <Tab.Screen
        name={ROUTES.SETTINGS_TAB}
        component={SettingsScreen}
        options={{ title: 'Cài đặt' }}
      />
    </Tab.Navigator>
  )
}
