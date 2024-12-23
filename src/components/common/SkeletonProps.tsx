import React, { useEffect } from "react";
import {
  View,
  Animated,
  StyleSheet,
  ViewStyle,
  DimensionValue,
} from "react-native";

interface SkeletonProps {
  width: DimensionValue;
  height: DimensionValue;
}

const SkeletonLoader: React.FC<SkeletonProps> = ({ width, height }) => {
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    startAnimation();
    return () => {
      animatedValue.setValue(0);
    };
  }, []);

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const opacity = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.3, 0.7, 1],
  });

  const animatedStyle = {
    opacity,
    width,
    height,
    borderRadius: 4, // Default borderRadius if not passed
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.skeleton, animatedStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center", // To center the skeleton loader
    alignItems: "center",
    flex: 1, // Make sure the parent takes full space
    margin: 10,
  },
  skeleton: {
    backgroundColor: "#E1E9EE",
    borderRadius: 40,
    overflow: "hidden",
  },
});

export default SkeletonLoader;
