import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Collapsible } from "@/components/Collapsible";
import { RangeSliderComponent } from "@/components/RangeSliderComponent";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setStrengthFilter, toggleStrengthFilter } from "@/store/pokemonSlice";
import { selectStrengthRange } from "@/store/pokemonSelectors";
import { COLORS } from "@/constants/Colors";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const SearchBar = ({ value, onChangeText }: SearchBarProps) => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const dispatch = useDispatch();
  const strengthFilter = useSelector(
    (state: RootState) => state.pokemon.strengthFilter
  );

  const strengthRange = useSelector(selectStrengthRange);

  const updateFilter = (low: number, high: number) => {
    dispatch(setStrengthFilter({ low, high }));
  };

  const handleFilterVisibilityChange = () => {
    setIsFilterVisible((prev) => !prev);
    dispatch(toggleStrengthFilter(!isFilterVisible));
  };

  return (
    <View style={[styles.container]}>
      <View style={styles.innerContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search Pokemon by name..."
          value={value}
          onChangeText={onChangeText}
        />
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: isFilterVisible ? COLORS.accent : "" }
          ]}
          onPress={() => handleFilterVisibilityChange()}
        >
          <Ionicons name="filter-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Collapsible isExpanded={isFilterVisible}>
        <RangeSliderComponent
          min={strengthRange?.min ?? 0}
          max={strengthRange?.max ?? 100}
          low={strengthFilter?.low || 0}
          high={strengthFilter?.high || 100}
          onValueChanged={updateFilter}
        />
      </Collapsible>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  innerContainer: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    flex: 1,
    padding: 10,
    marginRight: 10,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: COLORS.background,
    borderColor: COLORS.backgroundSecondary
  },
  button: {
    padding: 10,
    borderRadius: 10
  }
});
