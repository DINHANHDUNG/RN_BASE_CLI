import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { useAppDispatch } from '../store/hooks'
import { logout } from '../features/auth/authSlice'
import Icon from '../components/Icon'
import { textStyles } from '../themes/textStyles'

export default function HomeScreen() {
  const dispatch = useAppDispatch()
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <Text style={textStyles.h1}>Home Screen style Regular</Text>
      <Text style={textStyles.h2}>Home Screen style bold</Text>
      <Button title="Logout" onPress={() => dispatch(logout())} />
      <Icon type="ant" name="home" size={32} color="#3366FF" />
      <Text style={styles.label}>Trang chủ</Text>

      <Icon type="material" name="search" size={28} color="#1A2138" />
      <Text style={styles.label}>Tìm kiếm</Text>

      <Icon type="material" name="settings" size={28} color="#F99" />
      <Text style={styles.label}>Cài đặt</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  // regular: { fontFamily: 'OpenSans-Regular' },
  // bold: { fontFamily: 'OpenSans-Bold' },
  // italic: { fontFamily: 'OpenSans-Italic' },
  // light: { fontFamily: 'OpenSans-Light' },
  // semiBold: { fontFamily: 'OpenSans-SemiBold' },
  // medium: { fontFamily: 'OpenSans-Medium' },
  label: {
    marginBottom: 18,
    fontSize: 16,
    fontFamily: 'OpenSans-SemiBold',
  },

  // ... các kiểu khác
})
