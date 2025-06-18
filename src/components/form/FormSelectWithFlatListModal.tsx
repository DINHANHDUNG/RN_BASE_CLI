import React, { useState } from 'react'
import { View, Text, Modal, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import { Controller, Control } from 'react-hook-form'

type Option = {
  label: string
  value: string | number
}

type Props = {
  name: string
  control: Control<any>
  options: Option[]
  label?: string
  placeholder?: string
  required?: boolean
}

export const FormSelectWithFlatListModal = ({
  name,
  control,
  options,
  label,
  placeholder = 'Chọn...',
  required,
}: Props) => {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <Controller
      control={control}
      name={name}
      rules={required ? { required: 'Không được để trống' } : undefined}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
        const selectedOption = options.find((opt) => opt.value === value)

        return (
          <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}

            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              onBlur={onBlur}
              style={[
                styles.selectBox,
                !!error && { borderColor: 'red' },
              ]}
            >
              <Text style={selectedOption ? styles.text : styles.placeholder}>
                {selectedOption?.label || placeholder}
              </Text>
            </TouchableOpacity>

            {!!error && <Text style={styles.errorText}>{error.message}</Text>}

            <Modal
              visible={modalVisible}
              transparent
              animationType="slide"
              onRequestClose={() => setModalVisible(false)}
            >
              <TouchableOpacity
                style={styles.overlay}
                onPress={() => setModalVisible(false)}
                activeOpacity={1}
              >
                <View style={styles.modalContent}>
                  <FlatList
                    data={options}
                    keyExtractor={(item) => String(item.value)}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.option}
                        onPress={() => {
                          onChange(item.value)
                          setModalVisible(false)
                        }}
                      >
                        <Text style={styles.optionText}>{item.label}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </TouchableOpacity>
            </Modal>
          </View>
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  selectBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
  placeholder: {
    fontSize: 16,
    color: '#999',
  },
  errorText: {
    color: 'red',
    marginTop: 4,
    fontSize: 12,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: 'white',
    maxHeight: '50%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 16,
  },
  option: {
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
})
