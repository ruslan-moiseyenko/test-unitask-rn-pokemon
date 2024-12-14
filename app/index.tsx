import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useGetPokemonsQuery } from "@/store/api";
import { SearchBar } from "@/components/SearchBar";
import { PokemonList } from "@/components/PokemonList";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { addPokemon, setSearchTerm } from "@/store/pokemonSlice";
import { Pokemon } from "@/types/pokemon";
import { RootState } from "@/store";

const ITEMS_PER_PAGE = 20;
export default function Home() {
  const dispatch = useDispatch();
  const allPokemon = useSelector(
    (state: RootState) => state.pokemon.allPokemon
  );
  const searchTerm = useSelector(
    (state: RootState) => state.pokemon.searchTerm
  );
  const [page, setPage] = useState(0);

  const { data, error, isLoading, isFetching } = useGetPokemonsQuery({
    offset: page * ITEMS_PER_PAGE,
    limit: ITEMS_PER_PAGE
  });

  useEffect(() => {
    if (data?.results) {
      dispatch(addPokemon(data.results));
    }
  }, [data?.results, dispatch]);

  const handleSearch = (text: string) => {
    dispatch(setSearchTerm(text));
  };

  const handleLoadMore = () => {
    if (!isFetching && data?.nextOffset !== null) {
      setPage((prev) => prev + 1);
    }
  };

  if (error) {
    return null;
  }

  if (isLoading && allPokemon.length === 0) {
    return <LoadingSpinner size="large" color="#f4511e" />;
  }

  const filteredPokemon = searchTerm
    ? allPokemon.filter((pokemon: Pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allPokemon;

  return (
    <View style={styles.container}>
      <SearchBar value={searchTerm} onChangeText={handleSearch} />

      {filteredPokemon && (
        <PokemonList
          pokemon={filteredPokemon}
          onLoadMore={handleLoadMore}
          isLoading={isFetching}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10
  }
});
