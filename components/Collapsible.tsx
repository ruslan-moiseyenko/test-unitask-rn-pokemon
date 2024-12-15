import { COLORS } from "@/constants/Colors";
import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet } from "react-native";

type CollapsibleProps = {
  isExpanded: boolean;
  children: React.ReactNode;
};

export const Collapsible: React.FC<CollapsibleProps> = ({
  isExpanded,
  children
}) => {
  const height = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(height, {
      toValue: isExpanded ? 150 : 0,
      duration: 300,
      useNativeDriver: false
    }).start();
  }, [isExpanded]);

  return (
    <Animated.View style={[styles.collapsible, { height }]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  collapsible: {
    marginHorizontal: 5,
    paddingHorizontal: 5,
    justifyContent: "center",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: COLORS.backgroundSecondary
  }
});
