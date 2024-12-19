import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  useColorScheme,
  StatusBar,
  View,
  Button,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { lightTheme, darkTheme } from "./src/utils/theme/theme";
import AppNavigator from "./src/navigation/AppNavigatior";
import {ToastProvider} from "./src/context/ToastContext"
export default function App() {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(lightTheme);
  useEffect(() => {
    const newTheme = colorScheme === "dark" ? lightTheme : lightTheme;
    setTheme(newTheme);
  }, [colorScheme]);

  return (
    <SafeAreaView style={styles.container}>
      <ToastProvider>

      <NavigationContainer theme={theme}>
        <StatusBar
          barStyle={colorScheme === "dark" ? "dark-content" : "dark-content"}
          // translucent={true}
          backgroundColor="transparent"
        />
        <AppNavigator />
      </NavigationContainer>
      </ToastProvider>
    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
  },
});
