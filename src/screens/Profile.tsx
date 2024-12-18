import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Profile: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to profile page</Text>
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

export default Profile;
