import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useTheme} from '../themes/useTheme';

type Props = {
  title: string;
  onPress: () => void;
  style?: any;
};

export default function Button({title, onPress, style}: Props) {
  const colors = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, {backgroundColor: colors.primary}, style]}>
      <Text style={[styles.text, {color: colors.text}]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
