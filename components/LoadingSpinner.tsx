import { ActivityIndicator } from "react-native";

interface LoadingSpinnerProps {
  size?: "small" | "large";
  color?: string;
}

export const LoadingSpinner = ({
  size = "large",
  color = "#f3ce43"
}: LoadingSpinnerProps) => <ActivityIndicator size={size} color={color} />;
