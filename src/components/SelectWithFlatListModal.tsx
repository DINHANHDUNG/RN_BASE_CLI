import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native'

const SCREEN_HEIGHT = Dimensions.get('window').height

export type SelectOption = {
  label: string
  value: string | number
}

type Props = {
  label?: string
  value?: string | number
  options: SelectOption[]
  placeholder?: string
  onChange: (val: string | number) => void
}

export default function SelectWithFlatListModal({
  label,
  value,
  options,
  placeholder,
  onChange,
}: Props) {
  const [visible, setVisible] = useState(false)

  const selectedLabel =
    options.find((item) => item.value === value)?.label || ''

  return (
    <View style={{ marginBottom: 16 }}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={styles.inputContainer}
      >
        <Text style={[styles.inputText, !value && { color: '#999' }]}>
          {selectedLabel || placeholder || 'Chọn một giá trị'}
        </Text>
      </TouchableOpacity>

      <Modal visible={visible} animationType="slide" transparent>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chọn một giá trị</Text>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    onChange(item.value)
                    setVisible(false)
                  }}
                >
                  <Text style={styles.itemText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    fontWeight: '600',
    marginBottom: 6,
    fontSize: 15,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  inputText: {
    fontSize: 16,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    maxHeight: SCREEN_HEIGHT * 0.5,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  item: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: 16,
  },
})
