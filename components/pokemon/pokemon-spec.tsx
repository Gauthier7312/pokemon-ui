import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
import Row from '../row';
import { ThemedText } from '../themed-text';

type Props = ViewProps & {
  title: string;
  description: string;
  image?: ImageSourcePropType;
};

export function PokemonSpec({
  style,
  image,
  title,
  description,
  ...others
}: Props) {
  return (
    <View style={[style, styles.root]} {...others}>
      <Row style={styles.row}>
        {image && <Image source={image} width={16} height={16} />}
        <ThemedText> {title} </ThemedText>
      </Row>
      <ThemedText variant="caption" color="grayMedium">
        {description}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    gap: 4,
    alignItems: 'center',
  },
  row: {
    height: 32,
    alignItems: 'center',
  },
});
