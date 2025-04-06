import { useThemesColors } from '@/hooks/use-themes-colors';
import { TextInput, StyleSheet, Image } from 'react-native';
import Row from '../row';

type SearchBarProps = {
  value: string;
  onChange: (text: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  const colors = useThemesColors();
  return (
    <Row
      gap={8}
      style={[styles.wappers, { backgroundColor: colors.grayWhite }]}
    >
      <Image
        source={require('@/assets/images/search.png')}
        width={16}
        height={16}
      />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder="Search"
      />
    </Row>
  );
}

const styles = StyleSheet.create({
  wappers: {
    flex: 1,
    borderRadius: 16,
    height: 32,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    height: 16,
    fontSize: 10,
    lineHeight: 16,
  },

});
