import { StyleSheet } from 'react-native'
import { fonts, fontSizes, colors } from './'

export const textStyles = StyleSheet.create({
  h1: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.xxl,
    color: colors.text,
    lineHeight: 38,
  },
  h2: {
    fontFamily: fonts.semiBold,
    fontSize: fontSizes.xl,
    color: colors.text,
    lineHeight: 30,
  },
  body: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.md,
    color: colors.text,
    lineHeight: 22,
  },
  small: {
    fontFamily: fonts.light,
    fontSize: fontSizes.sm,
    color: colors.gray,
    lineHeight: 18,
  },
  // tuỳ biến theo app
})
