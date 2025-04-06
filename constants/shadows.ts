import { type ViewStyle } from 'react-native';

export const Shadows = {
  dp2: {
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
} satisfies Record<string, ViewStyle>;
