import { Card } from '@/components/card';
import { PokemonSpec } from '@/components/pokemon/pokemon-spec';
import { PokemonStat } from '@/components/pokemon/pokemon-stat';
import { PokemonType } from '@/components/pokemon/pokemon-type';
import { RootView } from '@/components/root-view';
import Row from '@/components/row';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/colors';
import {
  formatSIze,
  formatWeight,
  getPokemonArtwork,
} from '@/functions/pokemons';
import { useFetchQuery } from '@/hooks/use-fetch-query';
import { useThemesColors } from '@/hooks/use-themes-colors';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import { Audio } from 'expo-av';

export default function Pokemon() {
  const colors = useThemesColors();
  const params = useLocalSearchParams() as { id: string };
  const { id: pokemonId } = params;
  const { data: pokemon } = useFetchQuery(`/pokemon/${pokemonId}`);

  const { data: species } = useFetchQuery(`/pokemon-species/${pokemonId}`);

  const getAudioPermission = async () => {
    const { status } = await Audio.requestPermissionsAsync();
    if (status !== 'granted') {
      console.warn('Audio permission not granted.');
    }
  };

  useEffect(() => {
    getAudioPermission();
  }, []);

  const bio =
    species?.flavor_text_entries
      ?.find(({ language }: any) => language.name === 'en')
      ?.flavor_text?.replaceAll('\n', '. ') ?? '';

  const mainType = pokemon?.types[0].type.name as keyof typeof Colors.type;
  const colorType = mainType ? Colors.type[mainType] : colors.primary;

  const types = pokemon?.types ?? [];

  const onImagePress = async () => {
    const cry = pokemon?.cries?.latest;

    if (!cry) {
      return;
    }

    const { sound } = await Audio.Sound.createAsync(
      {
        uri: cry,
      },
      { shouldPlay: true }
    );

    sound.playAsync();
  };

  const onNext = () => {
    const nextId = parseInt(pokemonId) + 1;
    router.replace(`/pokemon/${nextId}`);
  };

  const onPrev = () => {
    const prevId = parseInt(pokemonId) - 1;
    router.replace(`/pokemon/${prevId}`);
  };

  return (
    <RootView backgroundColor={colorType}>
      <View>
        <Image
          style={styles.pokeball}
          source={require('@/assets/images/pokeball-big.png')}
          width={100}
          height={100}
        />
        <Row style={styles.header}>
          <Row gap={8}>
            <Pressable onPress={() => router.back()}>
              <Image source={require('@/assets/images/arrow_back.png')} />
            </Pressable>
            <ThemedText
              color="grayWhite"
              variant="headline"
              style={{ textTransform: 'capitalize' }}
            >
              {pokemon?.name}
            </ThemedText>
          </Row>
          <ThemedText color="grayWhite" variant="subtitle2">
            #{params.id.padStart(3, '0')}
          </ThemedText>
        </Row>

        {/* <View style={styles.body}> */}

        <Card style={styles.card}>
          <Row style={styles.imageRow}>
            {parseInt(pokemonId) === 1 ? (
              <View style={{ width: 24, height: 24 }}></View>
            ) : (
              <Pressable onPress={onPrev}>
                <Image
                  source={require('@/assets/images/chevron_left.png')}
                  width={24}
                  height={24}
                />
              </Pressable>
            )}

            <Pressable onPress={onImagePress}>
              <Image
                style={styles.artwork}
                source={{ uri: getPokemonArtwork(parseInt(pokemonId)) }}
                width={200}
                height={200}
              />
            </Pressable>

            {parseInt(pokemonId) === 151 ? (
              <View style={{ width: 24, height: 24 }}></View>
            ) : (
              <Pressable onPress={onNext}>
                <Image
                  source={require('@/assets/images/chevron_right.png')}
                  width={100}
                  height={100}
                />
              </Pressable>
            )}
          </Row>
          <Row gap={16}>
            {types.map((type: any) => (
              <PokemonType name={type.type.name} key={type.type.name} />
            ))}
          </Row>
          <ThemedText style={{ color: colorType }} variant="subtitle1">
            About
          </ThemedText>

          <Row>
            <PokemonSpec
              style={{
                borderStyle: 'solid',
                borderColor: colors.grayLight,
                borderRightWidth: 1,
              }}
              title={formatWeight(pokemon?.weight)}
              description="weight"
              image={require('@/assets/images/poids.png')}
            />

            <PokemonSpec
              style={{
                borderStyle: 'solid',
                borderColor: colors.grayLight,
                borderRightWidth: 1,
              }}
              title={formatSIze(pokemon?.height)}
              description="Size"
              image={require('@/assets/images/straighten.png')}
            />

            <PokemonSpec
              title={pokemon?.moves
                ?.slice(0, 5)
                .map((move: any) => move.move.name)
                .join('\n')}
              description="Moves"
            />
          </Row>

          <ThemedText variant="subtitle2">{bio}</ThemedText>

          <ThemedText style={{ color: colorType }} variant="subtitle1">
            Base stats
          </ThemedText>

          <View style={{ alignSelf: 'stretch' }}>
            {pokemon?.stats.map((stat: any) => (
              <PokemonStat
                key={stat.stat.name}
                color={colorType}
                name={stat.stat.name}
                value={stat.base_stat}
              />
            ))}
          </View>
        </Card>
        {/* </View> */}
      </View>
    </RootView>
  );
}

const styles = StyleSheet.create({
  header: {
    // margin: 20,
    padding: 20,
    justifyContent: 'space-between',
  },
  pokeball: {
    opacity: 0.7,
    position: 'absolute',
    right: 8,
    top: 8,
  },
  artwork: {
    // alignSelf: 'center',
  },
  // body: {

  // },
  card: {
    marginTop: 144,
    paddingHorizontal: 20,
    paddingTop: 60,
    gap: 16,
    alignItems: 'center',
    paddingBottom: 20,
  },
  imageRow: {
    position: 'absolute',
    top: -140,
    zIndex: 2,
    left: 0,
    right: 0,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
});
