import React, { useEffect } from "react";
import { View, Image, StyleSheet, Animated } from "react-native";

interface CustomLoadingProps {
  size?: number; // Optional size for the image
}

const CustomLoading: React.FC<CustomLoadingProps> = ({ size = 50 }) => {
  const rotate = new Animated.Value(0); // Initial rotation value

  // Rotate animation logic
  const rotateAnimation = () => {
    Animated.loop(
      Animated.timing(rotate, {
        toValue: 1, // Rotate to 1 full rotation (360 degrees)
        duration: 1500, // Duration for one full rotation
        useNativeDriver: true, // Use native driver for performance
      })
    ).start();
  };

  // Start rotation when component mounts
  useEffect(() => {
    rotateAnimation();
  }, []);

  // Interpolate the rotation value to a proper angle (360 degrees)
  const rotation = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../../../assets/myImages/loading.png")}
        style={[
          styles.image,
          { width: size, height: size, transform: [{ rotate: rotation }] },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  image: {
    width: 50,
    height: 50,
  },
});

export default CustomLoading;
