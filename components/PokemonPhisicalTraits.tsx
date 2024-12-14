import { View, Text, StyleSheet } from "react-native";

interface PokemonPhysicalTraitsProps {
  height: number;
  weight: number;
}

export const PokemonPhysicalTraits = ({
  height,
  weight
}: PokemonPhysicalTraitsProps) => (
  <View style={styles.infoContainer}>
    <Text style={styles.sectionTitle}>Physical Traits</Text>
    <Text>Height: {height / 10}m</Text>
    <Text>Weight: {weight / 10}kg</Text>
  </View>
);

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
  },

  infoContainer: {
    width: "100%",
    marginTop: 20
  }
});
