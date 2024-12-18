import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { BottomTabParamList } from "../navigation/types";
const CustomHeader: React.FC<{ showSearchInput?: boolean }> = ({
  showSearchInput = true,
}) => {
  // Properly define the navigation hook with BottomTabParamList type
  const navigation = useNavigation<NavigationProp<BottomTabParamList>>();
  return (
    <View style={styles.header}>
      {showSearchInput ? (
        <TouchableOpacity
          style={{
            flex: 1,
            height: 40,
            backgroundColor: "#f0f0f0",
            borderRadius: 5,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20,
          }}
          onPress={() => {
            console.log("Search input pressed");
            navigation.navigate("SearchProducts");
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Text>Logo</Text>
            <Text style={{ opacity: 0.5 }}> Search product here</Text>
            <Icon name="search-outline" size={30} color="black" />
          </View>
        </TouchableOpacity>
      ) : (
        <Text style={styles.shopText}>Shop by Category</Text>
      )}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
        }}
      >
        {/* Heart icon to navigate to Wishlist */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Wishlist");
          }}
        >
          <Icon name="heart-outline" size={35} color="black" />
        </TouchableOpacity>
        {/* Cart icon to navigate to Cart */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Cart");
          }}
        >
          <Icon name="cart-outline" size={35} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: "white",
    gap: 10,
  },
  searchInput: {
    flex: 1,
    height: 60,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  shopText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default CustomHeader;
