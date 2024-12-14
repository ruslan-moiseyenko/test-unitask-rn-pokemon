import { View, Text, StyleSheet } from "react-native";
import { PokemonDetail } from "../types/pokemon";

interface PokemonTypesProps {
  types: PokemonDetail["types"];
}

export const PokemonTypes = ({ types }: PokemonTypesProps) => (
  <View style={styles.typesContainer}>
    <Text style={styles.sectionTitle}>Types</Text>
    <View style={styles.typesList}>
      {types.map((type) => (
        <View key={type.type.name} style={styles.typeTag}>
          <Text style={styles.typeText}>{type.type.name}</Text>
        </View>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
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
  }
});
