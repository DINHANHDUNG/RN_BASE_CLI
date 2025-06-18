import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MainTab from './MainTab'

export type RootStackParamList = {
  Home: undefined
  Login: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function RootNavigator() {
  return <MainTab />
}
