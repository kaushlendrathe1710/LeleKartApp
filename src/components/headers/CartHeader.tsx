import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const CartHeader: React.FC<{ title?: string }> = ({ title = "Header" }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={28} color="black" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Cart Button */}
      <TouchableOpacity>
        <Icon name="cart-outline" size={28} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    height: 60,
    backgroundColor: "#fff",
    borderBottomWidth: 0.3,
    borderBottomColor: "#ccc",
    paddingTop: 5, // Adjust padding for iOS status bar compatibility
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});

export default CartHeader;
