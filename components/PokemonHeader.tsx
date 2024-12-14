import { View, Text, Image, StyleSheet } from "react-native";

interface PokemonHeaderProps {
  name: string;
  id: number;
  imageUrl: string;
}

export const PokemonHeader = ({ name, id, imageUrl }: PokemonHeaderProps) => (
  <View style={styles.container}>
    <Image source={{ uri: imageUrl }} style={styles.image} />
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.id}>#{id}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
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
  }
});
