import React, { useState } from 'react'
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { Controller, Control, FieldValues, Path } from 'react-hook-form'

type Option = {
  label: string
  value: string
}

type FormAutocompleteProps<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  options: Option[]
  label?: string
  placeholder?: string
}

export function FormAutocomplete<T extends FieldValues>({
  name,
  control,
  options,
  label,
  placeholder,
}: FormAutocompleteProps<T>) {
  const [query, setQuery] = useState('')
  const [filtered, setFiltered] = useState<Option[]>(options)
  const [showDropdown, setShowDropdown] = useState(false)

  const handleSearch = (text: string) => {
    setQuery(text)
    const result = options.filter((item) => item.label.toLowerCase().includes(text.toLowerCase()))
    setFiltered(result)
    setShowDropdown(true)
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <View style={styles.container}>
          {label && <Text style={styles.label}>{label}</Text>}

          <TextInput
            value={query || value || ''}
            onChangeText={handleSearch}
            placeholder={placeholder}
            style={[styles.input, error && styles.inputError]}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setShowDropdown(false)}
          />

          {showDropdown && filtered.length > 0 && (
            <View style={styles.dropdown}>
              <FlatList
                data={filtered}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      onChange(item.value)
                      setQuery(item.label)
                      setShowDropdown(false)
                    }}
                  >
                    <Text style={styles.item}>{item.label}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}

          {error && <Text style={styles.error}>{error.message}</Text>}
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    position: 'relative',
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  inputError: {
    borderColor: 'red',
  },
  dropdown: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    zIndex: 9999,
    maxHeight: 150,
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
})

//used
{/* <FormAutocomplete
  name="province"
  control={control}
  label="Tỉnh thành"
  placeholder="Nhập tên tỉnh"
  options={[
    { label: 'Hà Nội', value: 'hanoi' },
    { label: 'TP. Hồ Chí Minh', value: 'hcm' },
    { label: 'Đà Nẵng', value: 'danang' },
  ]}
/> */}