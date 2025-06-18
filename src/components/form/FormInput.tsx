import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import {
  Controller,
  Control,
  FieldValues,
  RegisterOptions,
  Path,
} from 'react-hook-form'
import Icon from '../Icon'

type FormInputProps<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  label?: string
  placeholder?: string
  rules?: RegisterOptions<T, Path<T>>
  secureTextEntry?: boolean
  leftIcon?: React.ReactNode
} & TextInputProps

function FormInput<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  rules,
  secureTextEntry = false,
  leftIcon,
  ...rest
}: FormInputProps<T>) {
  const [showPassword, setShowPassword] = useState(!secureTextEntry)

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View style={styles.container}>
          {label && <Text style={styles.label}>{label}</Text>}

          <View style={[styles.inputWrapper, error && styles.errorBorder]}>
            {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

            <TextInput
              placeholder={placeholder}
              value={value || ''} // tránh lỗi undefined
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry={!showPassword}
              style={styles.input}
              {...rest}
            />

            {secureTextEntry && (
              <TouchableOpacity
                onPress={() => setShowPassword((prev) => !prev)}
                style={styles.eyeIcon}
              >
                <Icon
                  type="material"
                  name={showPassword ? 'visibility' : 'visibility-off'}
                  size={20}
                  color="#888"
                />
              </TouchableOpacity>
            )}
          </View>

          {error && <Text style={styles.errorText}>{error.message}</Text>}
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
    marginBottom: 6,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: '#000',
  },
  leftIcon: {
    marginRight: 8,
  },
  eyeIcon: {
    paddingLeft: 8,
  },
  errorBorder: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
})

export default FormInput
