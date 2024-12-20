import React from "react";
import { View, StyleSheet, Animated } from "react-native";

const SkeletonLoading = () => {
  const animation = new Animated.Value(0);

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animation]);

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],
  });

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginVertical:10
      }}
    >
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.loader,
            {
              transform: [
                { translateX },
                { rotate: "30deg" }, // Applying the rotation transform
              ],
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    height: 200,
    backgroundColor: "#f1f1f1",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 20,
  },
  loader: {
    width: "20%",
    height: 400,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    opacity:0.4
  },
});

export default SkeletonLoading;
