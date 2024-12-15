import { StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import { useRouter } from "expo-router";
import { Pokemon } from "../types/pokemon";
import { COLORS } from "@/constants/Colors";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/${pokemon.name}`)}
    >
      <Image source={{ uri: pokemon.image }} style={styles.image} />
      <Text style={styles.name}>{pokemon.name}</Text>
      <Text style={styles.id}>#{pokemon.id}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 5,
    padding: 10,
    backgroundColor: COLORS.backgroundSecondary,
    borderRadius: 10,
    alignItems: "center"
  },
  image: {
    width: 100,
    height: 100
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginTop: 5
  },
  id: {
    color: COLORS.textSecondary
  }
});
