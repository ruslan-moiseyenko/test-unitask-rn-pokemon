import { COLORS } from "@/constants/Colors";
import { ActivityIndicator } from "react-native";

interface LoadingSpinnerProps {
  size?: "small" | "large";
  color?: string;
}

export const LoadingSpinner = ({
  size = "large",
  color = COLORS.accent
}: LoadingSpinnerProps) => <ActivityIndicator size={size} color={color} />;
