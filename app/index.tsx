import { Card } from '@/components/card';
import { PokemonCard } from '@/components/pokemon/pokemon-card';
import { SearchBar } from '@/components/pokemon/search-bar';
import { SortButton } from '@/components/pokemon/sort-button';
import { RootView } from '@/components/root-view';
import Row from '@/components/row';
import { ThemedText } from '@/components/themed-text';
import { getPokemonId } from '@/functions/pokemons';
import { useInfinityFetchQuery } from '@/hooks/use-fetch-query';
import { useThemesColors } from '@/hooks/use-themes-colors';
import { useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet } from 'react-native';

export default function Index() {
  const [search, setSearch] = useState<string>('');
  const color = useThemesColors();

  const [sortKey, setSortKey] = useState<'id' | 'name'>('id');

  const { data, isFetching, fetchNextPage } =
    useInfinityFetchQuery('/pokemon?limit=21');

  const pokemons =
    data?.pages?.flatMap((page) =>
      page.results.map((r: any) => ({ name: r.name, id: getPokemonId(r.url) }))
    ) ?? [];

  const filterPokemons = [
    ...(search
      ? pokemons?.filter(
          (pokemon) =>
            pokemon.name.includes(search.toLowerCase()) ||
            pokemon.id.toString() === search
        )
      : pokemons),
  ].sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : -1));

  return (
    <RootView>
      <Row gap={16} style={styles.header}>
        <Image
          source={require('@/assets/images/pokeball.png')}
          width={24}
          height={24}
        />
        <ThemedText variant="headline" color="grayWhite">
          Pokédex
        </ThemedText>
      </Row>

      <Row gap={16} style={styles.search}>
        <SearchBar value={search} onChange={setSearch} />
        <SortButton value={sortKey} onChange={setSortKey} />
      </Row>

      <Card style={styles.card}>
        <FlatList
          data={filterPokemons}
          keyExtractor={(item) => item.id}
          numColumns={3}
          contentContainerStyle={[styles.gridGap, styles.list]}
          columnWrapperStyle={styles.gridGap}
          //
          onEndReached={search ? undefined : () => fetchNextPage()}
          //
          ListFooterComponent={
            isFetching ? (
              <ActivityIndicator size="small" color={color.primary} />
            ) : null
          }
          renderItem={({ item }) => (
            <PokemonCard
              id={item.id}
              name={item.name}
              style={{ flex: 1 / 3 }}
            />
          )}
        />
      </Card>
    </RootView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  card: {
    flex: 1,
    marginTop: 14,
  },
  gridGap: {
    gap: 8,
  },
  list: {
    padding: 12,
  },
  search: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
});
