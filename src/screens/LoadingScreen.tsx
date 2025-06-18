import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { ROUTES } from '../navigation/routeKeys'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { authStore } from '../store/selectedStore'
import { colors } from '../themes/colors'
import { RootStackNavigation } from '../types/navigation'
import { getAccessToken, loadAuthFromStorage } from '../utils/auth/authStorage'

export default function LoadingScreen() {
  const navigation = useNavigation<RootStackNavigation>()
  const auth = useAppSelector(authStore)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const bootstrapAsync = async () => {
      await dispatch(loadAuthFromStorage())
      const token = await getAccessToken()
      
      if (token) {
        navigation.replace(ROUTES.MAIN_TAB)
      } else {
        navigation.replace(ROUTES.LOGIN)
      }
    }

    bootstrapAsync()
  }, [])

  return (
    <View style={styles.container}>
      {/* <StatusBar /> */}
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
})
