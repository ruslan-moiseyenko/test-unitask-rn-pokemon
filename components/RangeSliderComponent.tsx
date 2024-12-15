import { COLORS } from "@/constants/Colors";
import React, { useCallback } from "react";
import { StyleSheet, View, Text } from "react-native";
import RangeSlider from "rn-range-slider";

interface RangeSliderProps {
  min: number;
  max: number;
  low: number;
  high: number;
  onValueChanged: (low: number, high: number) => void;
}

export const RangeSliderComponent: React.FC<RangeSliderProps> = ({
  min,
  max,
  low,
  high,
  onValueChanged
}) => {
  const renderThumb = useCallback(() => <View style={styles.thumb} />, []);

  const renderRail = useCallback(() => <View style={styles.rail} />, []);

  const renderRailSelected = useCallback(
    () => <View style={styles.railSelected} />,
    []
  );

  const renderLabel = useCallback(
    (value: number) => (
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>{value}</Text>
      </View>
    ),
    []
  );

  const renderNotch = useCallback(() => <View style={styles.notch} />, []);

  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <Text style={styles.label}>Strength range:</Text>
        <View style={styles.rangeValues}>
          <Text style={styles.value}>{low}</Text>
          <Text style={styles.value}>{high}</Text>
        </View>
        <RangeSlider
          style={styles.slider}
          min={min}
          max={max}
          low={low}
          high={high}
          step={1}
          renderThumb={renderThumb}
          renderRail={renderRail}
          renderRailSelected={renderRailSelected}
          renderLabel={renderLabel}
          renderNotch={renderNotch}
          onValueChanged={onValueChanged}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderRadius: 10,
    backgroundColor: COLORS.white
  },
  sliderContainer: {
    alignItems: "stretch",
    justifyContent: "center"
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8
  },
  rangeValues: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8
  },
  value: {
    fontSize: 14
  },
  slider: {
    height: 40
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.accentSecondary,
    backgroundColor: COLORS.white
  },
  rail: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.backgroundSecondary
  },
  railSelected: {
    height: 4,
    backgroundColor: COLORS.accentSecondary,
    borderRadius: 2
  },
  notch: {
    width: 8,
    height: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: COLORS.accentSecondary,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 8
  },
  labelContainer: {
    alignItems: "center",
    padding: 4,
    backgroundColor: COLORS.accentSecondary,
    borderRadius: 4
  },
  labelText: {
    fontSize: 12,
    color: COLORS.white
  }
});
