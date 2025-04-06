import { useThemesColors } from '@/hooks/use-themes-colors';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
  checked: boolean;
  onChange?: (checked: boolean) => void;
};

export function Radio({ checked, onChange }: Props) {
  const colors = useThemesColors();
  return (
    <View style={[styles.radio, { borderColor: colors.primary }]}>
      {checked ? (
        <View style={[styles.radioInner, { backgroundColor: colors.primary }]} />
      ) : (
        <View style={styles.radioInner} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  radio: {
    width: 14,
    height: 14,
    borderStyle: 'solid',

    borderRadius: 14,
    borderWidth: 1,
    // borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner:{
    borderRadius: 6,
    height: 6,
    width: 6,
  }
});
