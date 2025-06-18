import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MainTab from './MainTab'
import { ROUTES } from './routeKeys'
import LoginScreen from '../screens/LoginScreen'
import { RootStackParamList } from '../types/navigation'
import { useAppDispatch } from '../store/hooks'
import { loadAuthFromStorage } from '../utils/auth/authStorage'
import LoadingScreen from '../screens/LoadingScreen'


const Stack = createNativeStackNavigator<RootStackParamList>()

export default function RootNavigator() {

  return (
    <Stack.Navigator>
      <Stack.Screen name={ROUTES.LOADING} component={LoadingScreen} options={{ headerShown: false }}/>
      <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name={ROUTES.MAIN_TAB}
        component={MainTab}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
