import { StyleSheet, TextInput } from "react-native";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const SearchBar = ({ value, onChangeText }: SearchBarProps) => {
  return (
    <TextInput
      style={styles.input}
      placeholder="Search Pokemon..."
      value={value}
      onChangeText={onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd"
  }
});
