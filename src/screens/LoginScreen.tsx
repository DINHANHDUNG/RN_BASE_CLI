import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Yup from 'yup'
import FormInput from '../components/form/FormInput'
import LoadingOverlay from '../components/LoadingOverlay'
import { useLoginMutation } from '../features/auth/authApi'
import { ROUTES } from '../navigation/routeKeys'
import { colors } from '../themes/colors'
import { RootStackNavigation } from '../types/navigation'

type FormValues = {
  keyLogin: string
  username: string
  password: string
  province: string
}

const schema = Yup.object().shape({
  username: Yup.string().required('Nhập tài khoản'),
  password: Yup.string().required('Nhập mật khẩu'),
  keyLogin: Yup.string().required('Nhập mã key'),
  province: Yup.string().required('Nhập mã key'),
})

const AuthLogin = () => {
  const navigation = useNavigation<RootStackNavigation>()
  const [login, { isLoading }] = useLoginMutation()

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      username: '',
      password: '',
      keyLogin: '',
    },
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await login(data).unwrap()
      const check = res?.data?.accessToken
      if (check) {
        return navigation.reset({ index: 0, routes: [{ name: ROUTES.MAIN_TAB }] })
      }
      Alert.alert('Đăng nhập thất bại', 'Tài khoản hoặc mật khẩu không chính xác')
    } catch (err) {
      Alert.alert('Đăng nhập thất bại', 'Tài khoản hoặc mật khẩu không chính xác')
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <Text style={styles.title}>Chào mừng bạn quay lại với NAMEAPP!</Text>

        <FormInput name="username" control={control} placeholder="Tài khoản" />
        <FormInput name="password" control={control} placeholder="Mật khẩu" secureTextEntry />
        <FormInput name="keyLogin" control={control} placeholder="Key" />

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
      <LoadingOverlay visible={isLoading} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  button: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
})

export default AuthLogin
