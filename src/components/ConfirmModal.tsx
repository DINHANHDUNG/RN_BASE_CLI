import React from 'react'
import { Modal, View, Text, Button } from 'react-native'

export default function ConfirmModal({
  visible,
  onConfirm,
  onCancel,
}: {
  visible: boolean
  onConfirm: () => void
  onCancel: () => void
}) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.4)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={{ backgroundColor: '#FFF', padding: 24, borderRadius: 12 }}>
          <Text>Bạn chắc chắn?</Text>
          <Button title="OK" onPress={onConfirm} />
          <Button title="Huỷ" onPress={onCancel} />
        </View>
      </View>
    </Modal>
  )
}
