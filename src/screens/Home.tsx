import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Home: React.FC = () => {
  const {colors}=useTheme()
  return (
    <View style={styles.container}>
      <Text style={[styles.title,{color:colors.text}]}>Welcome to the Home Screen</Text>
      {/* Add other components like product lists or banners here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
});

export default Home;
