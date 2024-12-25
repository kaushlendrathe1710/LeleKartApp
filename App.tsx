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
import * as WebBrowser from "expo-web-browser";
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

 useEffect(() => {
   // Set up deep link listener
   const subscription = Linking.addEventListener("url", handleRedirect);

   // Check for initial URL
   Linking.getInitialURL().then((url) => {
     if (url) {
       handleRedirect({ url });
     }
   });

   return () => {
     subscription.remove();
   };
 }, []);

 const handleRedirect = async (event) => {
   try {
     const { url } = event;
     if (url.includes("callback")) {
       // Close the browser
       await WebBrowser.dismissBrowser();

       // Extract token from URL
       const token = url.split("token=")[1];
       if (token) {
         // Store token
        //  await AsyncStorage.setItem("userToken", token);
        //  setToken(token);
         // You can now navigate to your main app screen
         console.log("Successfully logged in!",token);
       }
     }
   } catch (error) {
     console.error("Error handling redirect:", error);
   }
 };

  return (
    <SafeAreaView style={styles.container}>
      <ToastProvider>
        <NavigationContainer theme={theme}>
          {/* <StatusBar
            barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
            backgroundColor="transparent"
          /> */}
          <StatusBar
            barStyle="dark-content" // Content color is always dark
            backgroundColor="#FFFFFF" // Background color is always white
            translucent={false} // Ensure background color is solid and not transparent
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
    backgroundColor: "white",
  },
});
