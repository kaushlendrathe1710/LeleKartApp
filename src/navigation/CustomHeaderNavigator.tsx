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
  const [searchText, setSearchText] = useState("");
  // Properly define the navigation hook with BottomTabParamList type
  const navigation = useNavigation<NavigationProp<BottomTabParamList>>();

  return (
    <View style={styles.header}>
      {/* Search Input or Shop by Category */}
      {showSearchInput ? (
        <TouchableOpacity
          style={{
            flex: 1,
            height: 40,
            backgroundColor: "#f0f0f0",
            marginHorizontal: 10,
            borderRadius: 5,
          }}
          onPress={() => {
            navigation.navigate("SearchProducts");
          }}
        >
          <TextInput
            placeholder="Search products"
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
            style={styles.searchInput}
          />
        </TouchableOpacity>
      ) : (
        <Text style={styles.shopText}>Shop by Category</Text>
      )}
      <View style={{display:"flex",flexDirection:"row",alignItems:'center',gap:5}}>
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
    paddingHorizontal:20,
    backgroundColor: "white",
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
