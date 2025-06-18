import React from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'
export default function LoadingOverlay({ visible }: { visible: boolean }) {
  if (!visible) return null
  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color="#3366FF" />
    </View>
  )
}
const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.15)',
    zIndex: 999,
    flex: 1
  },
})
