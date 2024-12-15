import { useEffect, useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { useGetPokemonBatchQuery, useGetPokemonsQuery } from "@/store/api";
import { SearchBar } from "@/components/SearchBar";
import { PokemonList } from "@/components/PokemonList";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import {
  addPokemon,
  addPokemonDetails,
  clearAllData
} from "@/store/pokemonSlice";
import { RootState } from "@/store";
import { useSearch } from "@/hooks/useSearch";
import { COLORS } from "@/constants/Colors";
import { selectFilteredPokemon } from "@/store/pokemonSelectors";

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

  const { inputValue, handleSearch } = useSearch(searchTerm);

  const [currentBatch, setCurrentBatch] = useState<string[]>([]);

  const {
    data: pokemonListData,
    error: listError,
    isLoading,
    isFetching: isFetchingList
  } = useGetPokemonsQuery({
    offset: page * ITEMS_PER_PAGE,
    limit: ITEMS_PER_PAGE
  });

  const { data: detailsData, isLoading: isLoadingDetails } =
    useGetPokemonBatchQuery(currentBatch, {
      skip: currentBatch.length === 0
    });

  useEffect(() => {
    if (pokemonListData?.results) {
      dispatch(addPokemon(pokemonListData.results));
      setCurrentBatch(pokemonListData.results.map((pokemon) => pokemon.name));
    }
  }, [pokemonListData?.results, dispatch]);

  useEffect(() => {
    if (detailsData) {
      dispatch(addPokemonDetails(detailsData));
      setCurrentBatch([]);
    }
  }, [detailsData, dispatch]);

  const handleLoadMore = () => {
    if (
      !isFetchingList &&
      !isLoadingDetails &&
      pokemonListData?.nextOffset !== null
    ) {
      setPage((prev) => prev + 1);
    }
  };

  if (listError) {
    return null;
  }

  const filteredPokemon = useSelector(selectFilteredPokemon);

  if (isLoading && allPokemon.length === 0) {
    return <LoadingSpinner size="large" color="#f4511e" />;
  }

  const handleClearData = () => {
    dispatch(clearAllData());
    setPage(0);
  };

  return (
    <View style={styles.container}>
      <Button
        title="Clear All Data"
        onPress={handleClearData}
        color={COLORS.accentSecondary}
      />
      <SearchBar value={inputValue} onChangeText={handleSearch} />

      {filteredPokemon && (
        <PokemonList
          pokemon={filteredPokemon}
          onLoadMore={handleLoadMore}
          isLoading={isLoading || isFetchingList}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 10
  }
});
