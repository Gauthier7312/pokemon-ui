import { Colors } from '@/constants/colors';
import { useColorScheme } from 'react-native';

export function useThemesColors() {
  const theme = useColorScheme() ?? 'light';
  return Colors[theme];
}
