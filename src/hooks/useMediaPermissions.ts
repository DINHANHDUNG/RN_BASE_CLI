import {
  PERMISSIONS,
  request,
  check,
  RESULTS,
  openSettings,
  AndroidPermission,
  IOSPermission,
  WindowsPermission,
} from 'react-native-permissions'
import { Permission, Platform } from 'react-native'
import { showToast } from '../utils/toast'

export const CAMERA_PERMISSION = Platform.select({
  ios: PERMISSIONS.IOS.CAMERA,
  android: PERMISSIONS.ANDROID.CAMERA,
})

// export const getPermission = (type: 'camera' | 'location'): Permission | null => {
//   return Platform.select({
//     ios: type === 'camera' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
//     android:
//       type === 'camera' ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
//     default: null,
//   })
// }

export const requestPermission = async (permission: any): Promise<boolean> => {
  try {
    const result = await check(permission)

    if (result === RESULTS.GRANTED) return true

    if (result === RESULTS.BLOCKED) {
      showToast('info', 'Quyền đã bị chặn, vui lòng cấp lại trong phần cài đặt.')
      await openSettings()
      return false
    }

    const status = await request(permission)

    if (status === RESULTS.GRANTED) return true
    showToast('error', 'Không thể cấp quyền. Vui lòng thử lại.')
    return false
  } catch (err) {
    console.warn('Permission request failed', err)
    showToast('error', 'Lỗi khi xin quyền. Vui lòng thử lại.')
    return false
  }
}

export const useCameraPermission = () => {
  const ask = async () => {
    const result = await request(
      Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA,
    )
    return result === RESULTS.GRANTED
  }
  return { ask }
}

export const useGalleryPermission = () => {
  const ask = async () => {
    const result = await request(
      Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES, // RN 0.72+ API
    )
    return result === RESULTS.GRANTED
  }
  return { ask }
}
