import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AllCategories: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to all categories page</Text>
      {/* Add other components like product lists or banners here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'white'
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});

export default AllCategories;
