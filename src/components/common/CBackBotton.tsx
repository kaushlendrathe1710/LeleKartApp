import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const BackButton = ({ onPress }) => {
  return (
    <View style={styles.backButtonContainer}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.backButton}>
          <Icon name="arrow-back" size={28} color="black" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  backButtonContainer: {
    position: "absolute",
    top: 10,
    left: 30,
  },
  backButton: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    borderColor: "#DCDCDC",
    borderWidth: 2,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: 80,
  },
});

export default BackButton;
