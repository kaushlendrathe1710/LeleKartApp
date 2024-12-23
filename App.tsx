import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  useColorScheme,
  StatusBar,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { lightTheme, darkTheme } from "./src/utils/theme/theme";
import AppNavigator from "./src/navigation/AppNavigatior";
import { ToastProvider } from "./src/context/ToastContext";
import { AuthStore } from "./src/services/storage/authStore";
import * as Linking from "expo-linking";

export default function App() {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(lightTheme);

  useEffect(() => {
    const newTheme = colorScheme === "dark" ? darkTheme : lightTheme;
    setTheme(newTheme);
  }, [colorScheme]);

  useEffect(() => {
    const store = AuthStore.getState();
    const isExpired = store.checkTokenExpiry();
    if (isExpired) {
      store.logout(); // Automatically log out if the token is expired on app start
    }
  }, []);

  // // Handle deep links
  // const handleDeepLink = (event) => {
  //   const data = Linking.parse(event.url);
  //   if (data.queryParams?.token) {
  //     const token = data.queryParams.token;
  //     console.log("Received token:", token);
  //     // AuthStore.getState().setToken(token); // Example of setting token in store
  //   }
  // };

  // useEffect(() => {
  //   const subscription = Linking.addEventListener("url", handleDeepLink);

  //   // Handle the initial deep link when the app starts
  //   Linking.getInitialURL().then((url) => {
  //     if (url) {
  //       handleDeepLink({ url });
  //     }
  //   });

  //   return () => subscription.remove();
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ToastProvider>
        <NavigationContainer theme={theme}>
          <StatusBar
            barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
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
