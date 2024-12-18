import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Home from "../screens/Home";
import AllCategories from "../screens/AllCategories";
import Profile from "../screens/Profile";
import CustomHeader from "./CustomHeaderNavigator";

const CustomBottomTabNavigator = () => {
  const [currentScreen, setCurrentScreen] = useState("Home");

  const renderScreen = () => {
    switch (currentScreen) {
      case "Home":
        return <Home />;
      case "Categories":
        return <AllCategories />;
      case "Account":
        return <Profile />;
      default:
        return <Home />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Render Header */}
      {currentScreen === "Home" || currentScreen === "Categories" ? (
        <CustomHeader showSearchInput={currentScreen === "Home"} />
      ) : (
        <View style={{ height: 50 }} />
      )}

      {/* Main screen content */}
      <View style={{ flex: 1 }}>{renderScreen()}</View>

      {/* Custom Bottom Navigation */}
      <View style={styles.tabBar}>
        {["Home", "Categories", "Account"].map((screen) => (
          <TouchableOpacity
            key={screen}
            onPress={() => setCurrentScreen(screen)}
            style={styles.tabItem}
          >
            <Icon
              name={
                screen === "Home"
                  ? currentScreen === screen
                    ? "home"
                    : "home-outline"
                  : screen === "Categories"
                  ? currentScreen === screen
                    ? "list"
                    : "list-outline"
                  : currentScreen === screen
                  ? "person"
                  : "person-outline"
              }
              color={currentScreen === screen ? "#000" : "#808080"}
              size={currentScreen === screen ? 20 : 20}
            />
            <Text style={{ color: currentScreen === screen ? "#000" : "grey" }}>
              {screen}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    backgroundColor: "white",
    borderTopColor: "#DCDCDC",
    borderWidth: 0.2,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CustomBottomTabNavigator;
