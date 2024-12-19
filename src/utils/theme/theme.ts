import { Theme } from "@react-navigation/native";

export const lightTheme: Theme = {
  dark: false,
  colors: {
    primary: "#ffffff",
    secondary: "red",
    background: "#fff",
    card: "#ffffff",
    text: "#1B1B1B",
    inputBackground: "#f0f0f0",
    buttonBackground: "1A2421",
    buttonColor: "#fff",
    border: "#cccccc",
    notification: "#ff4500",
    regular: {
      fontWeight: "400",
      fontSize: 16,
    },
  },
  fonts: {
    regular: { fontWeight: "400", fontSize: 16 },
    medium: { fontWeight: "500", fontSize: 17 },
    bold: { fontWeight: "700", fontSize: 18 },
    heavy: { fontWeight: "900", fontSize: 20 },
  },
};

export const darkTheme: Theme = {
  dark: true,
  colors: {
    primary: "#000000",
    secondary: "red",
    background: "#121212",
    card: "#1e1e1e",
    inputBackground: "#f0f0f0",
    buttonBackground: "1A2421",
    buttonColor: "#fff",
    text: "#ffffff",
    border: "#333333",
    notification: "#ff5722",
    regular: {
      fontWeight: "400",
      fontSize: 16,
    },
  },
  fonts: {
    regular: { fontWeight: "400", fontSize: 16 },
    medium: { fontWeight: "500", fontSize: 17 },
    bold: { fontWeight: "700", fontSize: 18 },
    heavy: { fontWeight: "900", fontSize: 20 },
  },
};
