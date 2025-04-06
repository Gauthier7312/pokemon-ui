import { Shadows } from '@/constants/shadows';
import { useThemesColors } from '@/hooks/use-themes-colors';
import { View, type ViewStyle, type ViewProps } from 'react-native';

type CardProps = ViewProps;

export function Card({ style, ...others }: CardProps) {
  const colors = useThemesColors();
  return (
    <View
      style={[style, { backgroundColor: colors.grayWhite }, styles]}
      {...others}
    />
  );
}

const styles = {
  borderRadius: 8,
  //   overflow: 'hidden',
  ...Shadows.dp2,
} satisfies ViewStyle;
