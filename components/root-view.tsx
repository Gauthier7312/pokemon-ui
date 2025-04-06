import { useThemesColors } from '@/hooks/use-themes-colors';
import React, { useEffect } from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  Easing,
  interpolateColor,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type Props = ViewProps & {
  backgroundColor?: string;
};

export function RootView({ style, backgroundColor, ...others }: Props) {
  const color = useThemesColors();

  const progress = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [color.primary, backgroundColor ?? color.primary]
      ),
    };
  });

  useEffect(() => {
    if (backgroundColor) {
      progress.value = 0;
      progress.value = withTiming(1, {
        duration: 700,
        easing: Easing.out(Easing.quad),
        reduceMotion: ReduceMotion.System,
      });
    }
  }, [backgroundColor]);

  if (!backgroundColor) {
    return (
      <SafeAreaView
        style={[rootStyles, { backgroundColor: color.primary }, style]}
        {...others}
      />
    );
  }
  return (
    <Animated.View style={[{ flex: 1 }, animatedStyle, style]}>
      <SafeAreaView style={rootStyles} {...others} />
    </Animated.View>
  );
}

const rootStyles = {
  flex: 1,
  padding: 4,
} satisfies ViewStyle;
