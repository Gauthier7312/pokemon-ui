import React from 'react';
import { View, type ViewProps, ViewStyle } from 'react-native';

type RowProps = ViewProps & {
  gap?: number;
};

function Row({ style, gap, ...others }: RowProps) {
  return (
    <View
      style={[rowStyle, style, gap ? { gap: gap } : undefined]}
      {...others}
    />
  );
}

export default Row;

const rowStyle = {
  flex: 0,
  flexDirection: 'row',
  alignItems: 'center',
} satisfies ViewStyle;
