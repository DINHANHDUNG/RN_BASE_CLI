import React from 'react'
import { View, Text, Button } from 'react-native'
import { HomeStackParamList } from '../types/navigation'
import { ROUTES } from '../navigation/routeKeys'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

type Props = NativeStackScreenProps<HomeStackParamList, typeof ROUTES.DETAIL>

export default function DetailScreen({ route, navigation }: Props) {
  const { id } = route.params ?? {}

  return (
    <View>
      {/* Nút back custom */}
      <Button title="Quay lại" onPress={() => navigation.goBack()} />
      <Text>Detail: {id}</Text>
    </View>
  )
}
