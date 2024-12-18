import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SearchProducts: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to search product page</Text>
      {/* Add other components like product lists or banners here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});

export default SearchProducts;
