import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

interface SearchHeaderProps {
  title?: string;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({ title = "Header" }) => {
  const inputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  useEffect(() => {
    // Automatically focus on input when component mounts
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100); // Adding a slight delay to ensure proper rendering
  }, []);

  return (
    <View style={styles.header}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={28} color="black" />
      </TouchableOpacity>

      {/* Search Input */}
      <TextInput
        ref={inputRef}
        style={[styles.searchInput]}
        placeholder="Search here"
      />
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
    paddingTop: 5,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
});

export default SearchHeader;
