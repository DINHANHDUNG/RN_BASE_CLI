import React from 'react'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Ionicon from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
// ... import bộ icon khác nếu muốn

type IconProps = {
  name: string
  size?: number
  color?: string
  type?: 'material' | 'ion' | 'fa' | 'ant'
  [key: string]: any
}

// Dùng type chọn bộ icon động (switch)
const iconSet = {
  material: MaterialIcon,
  ion: Ionicon,
  fa: FontAwesome,
  ant: AntDesign,
  // ... bổ sung nếu muốn
}

export default function Icon({ type = 'material', ...props }: IconProps) {
  const Ico = iconSet[type] as unknown as React.ComponentType<any>
  return <Ico {...props} />
}
