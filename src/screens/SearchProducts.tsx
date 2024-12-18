import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchHeader from "../components/headers/SearchHeader";

const SearchProducts: React.FC = () => {
  const inputRef = useRef<TextInput>(null);

  // Automatically open the keyboard when the component mounts
  useEffect(() => {
    // Use setTimeout with 0 delay to wait until rendering completes
    setTimeout(() => {
      inputRef.current?.focus();
      Keyboard.dismiss(); // Ensure previous interactions don’t prevent focusing
      console.log("Keyboard focused successfully.");
    }, 0);
  }, []);

  // Dismiss the keyboard when tapping outside the input field
  const dismissKeyboard = () => {
    Keyboard.dismiss();
    console.log("Keyboard dismissed.");
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <SearchHeader title="Search Here" />

        <Text style={styles.title}>Welcome to search product page</Text>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  searchInput: {
    height: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    marginHorizontal: 20,
    borderRadius: 8,
    fontSize: 18,
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});

export default SearchProducts;
