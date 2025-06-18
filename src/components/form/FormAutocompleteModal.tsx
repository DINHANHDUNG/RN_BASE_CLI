import React, { useState } from 'react'
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,
} from 'react-native'
import { Controller } from 'react-hook-form'
import Icon from '../Icon'

interface Option {
  label: string
  value: string
}

interface Props {
  name: string
  control: any
  label?: string
  placeholder?: string
  options: Option[]
}

export const FormAutocompleteModal = ({ name, control, label, placeholder, options }: Props) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [search, setSearch] = useState('')

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const selectedLabel = options.find((opt) => opt.value === value)?.label || ''

        return (
          <View style={{ marginBottom: 16 }}>
            {label && <Text style={styles.label}>{label}</Text>}

            <TouchableOpacity
              style={[styles.input, error && styles.errorInput]}
              onPress={() => setModalVisible(true)}
            >
              <Text style={{ color: value ? '#000' : '#999' }}>
                {selectedLabel || placeholder || 'Chọn...'}
              </Text>
              <Icon type='ion'  name="chevron-down" size={20} color="#888" />
            </TouchableOpacity>

            {error && <Text style={styles.errorText}>{error.message}</Text>}

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>{label || 'Chọn'}</Text>

                  <TextInput
                    placeholder="Tìm kiếm..."
                    value={search}
                    onChangeText={setSearch}
                    style={styles.searchInput}
                  />

                  <FlatList
                    data={filteredOptions}
                    keyExtractor={(item) => item.value}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.optionItem}
                        onPress={() => {
                          onChange(item.value)
                          setModalVisible(false)
                          setSearch('')
                        }}
                      >
                        <Text>{item.label}</Text>
                      </TouchableOpacity>
                    )}
                  />

                  <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                    <Text style={{ color: '#3366FF' }}>Đóng</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: '#333',
    fontFamily: 'OpenSans-SemiBold',
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginTop: 4,
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  optionItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  closeButton: {
    alignItems: 'center',
    marginTop: 12,
  },
})