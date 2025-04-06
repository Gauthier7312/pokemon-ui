import React from 'react';
import {
  View,
  Text,
  type ViewStyle,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Card } from '../card';
import { ThemedText } from '../themed-text';
import { useThemesColors } from '@/hooks/use-themes-colors';
import { Link } from 'expo-router';
import { getPokemonArtwork } from '@/functions/pokemons';

type PokemonCardProps = {
  style?: ViewStyle;
  id: number;
  name: string;
};

export function PokemonCard({ style, id, name, ...others }: PokemonCardProps) {
  const colors = useThemesColors();
  return (
    <Link href={{ pathname: '/pokemon/[id]', params: { id } }} asChild>
      <Pressable style={style}>
        <Card style={[styles.card]} {...others}>
          <View
            style={[styles.shadow, { backgroundColor: colors.grayBackground }]}
          />

          <ThemedText style={styles.text} variant="caption" color="grayMedium">
            #{id.toString().padStart(3, '0')}
          </ThemedText>
          <Image
            source={{
              uri: getPokemonArtwork(id),
            }}
            width={72}
            height={72}
          />
          <ThemedText variant="body3" color="grayBlack">
            {name}
          </ThemedText>
        </Card>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    padding: 4,
    position: 'relative',
  },
  text: {
    alignSelf: 'flex-end',
  },
  shadow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 44,
    borderRadius: 7,
    zIndex: -1,
  },
});
