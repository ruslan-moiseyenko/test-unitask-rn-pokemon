import { View, Text, StyleSheet } from "react-native";
import { PokemonDetail } from "../types/pokemon";

interface PokemonStatsProps {
  stats: PokemonDetail["stats"];
}

export const PokemonStats = ({ stats }: PokemonStatsProps) => (
  <View style={styles.statsContainer}>
    <Text style={styles.sectionTitle}>Stats</Text>
    {stats.map((stat) => (
      <View key={stat.stat.name} style={styles.statRow}>
        <Text style={styles.statName}>{stat.stat.name}</Text>
        <Text style={styles.statValue}>{stat.base_stat}</Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginTop: 10
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
  }
});
