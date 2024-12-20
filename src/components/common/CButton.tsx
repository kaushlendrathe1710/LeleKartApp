import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface CustomInputProps {
  buttonText?: string;
}

const CButton: React.FC<CustomInputProps> = ({ buttonText }) => {
  return (
    <View style={styles.InputContainer}>
      {buttonText && <Text style={styles.input}>{buttonText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  InputContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#1A2421",
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: "center",
    color: "white",
    fontSize: 18,
  },
});

export default CButton;
