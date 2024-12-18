import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  useColorScheme,
  StatusBar,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { lightTheme, darkTheme } from "./src/utils/theme/theme";
import AppNavigator from "./src/navigation/AppNavigatior";

const Stack = createNativeStackNavigator();

export default function App() {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(lightTheme);
  useEffect(() => {
    const newTheme = colorScheme === "dark" ? lightTheme : lightTheme;
    setTheme(newTheme);
  }, [colorScheme]);

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer theme={theme}>
        <StatusBar
          barStyle={colorScheme === "dark" ? "dark-content" : "dark-content"}
          // translucent={true}
          // backgroundColor="transparent"
        />
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
  },
});
