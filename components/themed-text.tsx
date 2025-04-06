import { Colors } from '@/constants/colors';
import { useThemesColors } from '@/hooks/use-themes-colors';
import { Text, StyleSheet, TextProps } from 'react-native';

type ThemedTextProps = TextProps & {
  variant?: keyof typeof styles;
  color?: keyof (typeof Colors)['light'];
};

export function ThemedText({
  variant,
  color,
  style,
  ...others
}: ThemedTextProps) {
  const colors = useThemesColors();

  return (
    <Text
      style={[
        styles[variant ?? 'body3'],
        { color: colors[color ?? 'grayDark'] },
        style,
      ]}
      {...others}
    />
  );
}

const styles = StyleSheet.create({
  body3: {
    fontSize: 10,
    lineHeight: 16,
  },
  headline: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 8,
    lineHeight: 12,
  },
  subtitle1: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: 'bold',
  },

  subtitle2: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: 'bold',
  },
  subtitle3: {
    fontSize: 10,
    lineHeight: 16,
    fontWeight: 'bold',
  },
});
