import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../../screens/HomeScreen'
import { ROUTES } from '../routeKeys'
import DetailScreen from '../../screens/DetailScreen'
import { HomeStackParamList } from '../../types/navigation'

const Stack = createNativeStackNavigator<HomeStackParamList>()

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.HOME_MAIN}
        component={HomeScreen}
        options={{ title: 'Trang chủ' }}
      />
      <Stack.Screen name={ROUTES.DETAIL} component={DetailScreen} options={{ title: 'Chi tiết' }} />
    </Stack.Navigator>
  )
}
