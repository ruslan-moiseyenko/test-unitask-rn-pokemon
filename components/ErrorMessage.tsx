import { COLORS } from "@/constants/Colors";
import { StyleSheet, View, Text } from "react-native";

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <View style={styles.container}>
    <Text style={styles.errorText}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 10
  },
  errorText: {
    fontSize: 16,
    color: "red"
  }
});
