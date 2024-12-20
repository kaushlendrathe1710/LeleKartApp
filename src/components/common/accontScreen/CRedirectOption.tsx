import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const RedirectOption = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={styles.pageRedirect} onPress={onPress}>
      <Text style={[styles.pageRedirectText]}>{text}</Text>
      <Icon name="chevron-forward-outline" style={styles.pageRedirectIcon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pageRedirect: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderTopColor: "#DCDCDC",
    borderTopWidth: 0.2,
  },
  pageRedirectText: {
    fontSize: 16,
  },
  pageRedirectIcon: {
    fontSize: 20,
    color: "black",
  },
});

export default RedirectOption;
