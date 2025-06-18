import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Controller, Control, FieldValues, Path, RegisterOptions } from 'react-hook-form'
import RNPickerSelect from 'react-native-picker-select'

type Option = {
  label: string
  value: string | number
}

type FormSelectProps<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  label?: string
  rules?: RegisterOptions<T>
  placeholder?: string
  options: Option[]
}

export function FormSelect<T extends FieldValues>({
  name,
  control,
  label,
  rules,
  options,
  placeholder,
}: FormSelectProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View style={styles.container}>
          {label && <Text style={styles.label}>{label}</Text>}

          <RNPickerSelect
            onValueChange={onChange}
            value={value}
            placeholder={{
              label: placeholder ?? 'Chọn một giá trị...',
              value: null,
            }}
            items={options}
            style={{
              inputIOS: styles.input,
              inputAndroid: styles.input,
              placeholder: { color: '#999' },
            }}
          />

          {error && <Text style={styles.error}>{error.message}</Text>}
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 16,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
})


//used
{/* <FormSelect
  name="gender"
  control={control}
  label="Giới tính"
  options={[
    { label: 'Nam', value: 'male' },
    { label: 'Nữ', value: 'female' },
  ]}
  rules={{ required: 'Vui lòng chọn giới tính' }}
/> */}