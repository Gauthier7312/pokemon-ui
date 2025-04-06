import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ViewProps } from 'react-native/Libraries/Components/View/ViewPropTypes';
import Row from '../row';
import { ThemedText } from '../themed-text';
import { useThemesColors } from '@/hooks/use-themes-colors';

type Props = ViewProps & {
  color: string;
  value: number;
  name: string;
};

function StatShortName(name: string): string {
  return name
    .replaceAll('special', 'S')
    .replaceAll('hp', 'HP')
    .replaceAll('speed', 'SPD')
    .replaceAll('defense', 'DEF')
    .replaceAll('attack', 'ATK')
    .replaceAll('-', '')
    .toUpperCase();
}

export function PokemonStat({ style, name, value, color, ...others }: Props) {
  const colors = useThemesColors();
  return (
    <Row style={[style, styles.root]} gap={8} {...others}>
      <View style={[styles.name, { borderColor: colors.grayLight }]}>
        <ThemedText variant="subtitle3" style={{ color: color }}>
          {StatShortName(name)}
        </ThemedText>
      </View>

      <View style={styles.number}>
        <ThemedText>{value.toString().padStart(3, '0')}</ThemedText>
      </View>

      <Row style={styles.bar}>
        <View
          style={[styles.barInner, { flex: value, backgroundColor: color }]}
        ></View>
        <View
          style={[
            styles.barBackground,
            { flex: 255 - value, backgroundColor: color },
          ]}
        ></View>
      </Row>
    </Row>
  );
}

const styles = StyleSheet.create({
  root: {},
  name: {
    width: 40,
    paddingRight: 8,
    borderRightWidth: 1,
    borderStyle: 'solid',
  },
  number: {
    width: 23,
    // paddingLeft: 8,
  },
  bar: {
    borderRadius: 20,
    height: 4,
    overflow: 'hidden',
    flex: 1,
  },
  barInner: {
    height: 4,
  },
  barBackground: {
    height: 4,
    opacity: 0.2,
  },
});
