import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {useTheme} from '../themes/useTheme';

type Props = React.ComponentProps<typeof TextInput>;

export default function Input(props: Props) {
  const colors = useTheme();
  return (
    <TextInput
      placeholderTextColor={colors.border}
      style={[styles.input, {color: colors.text, borderColor: colors.border}]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    marginVertical: 8,
  },
});
