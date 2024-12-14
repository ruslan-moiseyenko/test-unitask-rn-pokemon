import { ErrorMessage } from "@/components/ErrorMessage";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { PokemonHeader } from "@/components/PokemonHeader";
import { PokemonPhysicalTraits } from "@/components/PokemonPhisicalTraits";
import { PokemonStats } from "@/components/PokemonStats";
import { PokemonTypes } from "@/components/PokemonTypes";
import { useGetPokemonByNameQuery } from "@/store/api";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";

export default function PokemonDetail() {
  const { name } = useLocalSearchParams();
  const {
    data: pokemon,
    isLoading,
    error
  } = useGetPokemonByNameQuery(name as string);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message="Error loading Pokemon details!" />;
  }

  if (!pokemon) {
    return <ErrorMessage message="Pokemon not found!" />;
  }

  return (
    <ScrollView style={styles.container}>
      <PokemonHeader
        name={pokemon.name}
        id={pokemon.id}
        imageUrl={pokemon.sprites.other["official-artwork"].front_default}
      />
      <PokemonStats stats={pokemon.stats} />
      <PokemonTypes types={pokemon.types} />
      <PokemonPhysicalTraits height={pokemon.height} weight={pokemon.weight} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff"
  },
  card: {
    padding: 20,
    alignItems: "center"
  },
  image: {
    width: 200,
    height: 200
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginTop: 10
  },
  id: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20
  },
  statsContainer: {
    width: "100%",
    marginTop: 20
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5
  },
  statName: {
    textTransform: "capitalize"
  },
  statValue: {
    fontWeight: "bold"
  },
  typesContainer: {
    width: "100%",
    marginTop: 20
  },
  typesList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10
  },
  typeTag: {
    backgroundColor: "#f3ce43",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15
  },
  typeText: {
    color: "white",
    textTransform: "capitalize"
  },
  infoContainer: {
    width: "100%",
    marginTop: 20
  }
});
