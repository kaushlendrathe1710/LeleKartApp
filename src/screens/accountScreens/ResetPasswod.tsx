import React from "react";
import { View, Text, StyleSheet } from "react-native";
import BackButton from "src/components/common/CBackBotton";

const ResetPassword: React.FC = () => {
  return (
    <View style={styles.container}>
        <BackButton/>
      <Text style={styles.contentText}>Your Cart is Empty.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  contentText: {
    fontSize: 18,
    paddingTop: 20,
    color: "#444",
    textAlign: "center",
  },
});

export default ResetPassword;
