import { requestNotifications } from 'react-native-permissions'

export const usePushPermission = () => {
  const ask = async () => {
    const { status } = await requestNotifications(['alert', 'badge', 'sound'])
    return status === 'granted'
  }
  return { ask }
}
