import { LoadingSpinner } from "@/components/LoadingSpinner";
import { PokemonCard } from "@/components/PockemonCard";
import { Pokemon } from "@/types/pokemon";
import { FlatList } from "react-native";

interface PokemonListProps {
  pokemon: Pokemon[];
  onLoadMore: () => void;
  isLoading: boolean;
}

export const PokemonList = ({
  pokemon,
  onLoadMore,
  isLoading
}: PokemonListProps) => (
  <FlatList
    data={pokemon}
    numColumns={2}
    renderItem={({ item }) => <PokemonCard pokemon={item} />}
    keyExtractor={(item) => item.id.toString()}
    onEndReached={onLoadMore}
    onEndReachedThreshold={0.5}
    ListFooterComponent={() => (isLoading ? <LoadingSpinner /> : null)}
  />
);
