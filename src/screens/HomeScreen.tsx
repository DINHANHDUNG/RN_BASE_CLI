import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { useAppDispatch } from '../store/hooks'
import { logout } from '../features/auth/authSlice'

export default function HomeScreen() {
  const dispatch = useAppDispatch()
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <Text style={styles.regular}>Home Screen style Regular</Text>
      <Text style={styles.bold}>Home Screen style bold</Text>
      <Button title="Logout" onPress={() => dispatch(logout())} />
    </View>
  )
}

const styles = StyleSheet.create({
  regular: { fontFamily: 'OpenSans-Regular' },
  bold: { fontFamily: 'OpenSans-Bold' },
  italic: { fontFamily: 'OpenSans-Italic' },
  light: { fontFamily: 'OpenSans-Light' },
  semiBold: { fontFamily: 'OpenSans-SemiBold' },
  medium: { fontFamily: 'OpenSans-Medium' },
  // ... các kiểu khác
})
