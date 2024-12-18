import React from "react";
import { View, Text, StyleSheet } from "react-native";

const VerifyOtp: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Otp here</Text>
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
    color: "#333",
  },
});

export default VerifyOtp;
