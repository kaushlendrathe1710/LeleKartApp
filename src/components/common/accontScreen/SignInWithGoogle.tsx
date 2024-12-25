import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

WebBrowser.maybeCompleteAuthSession(); // Completes the WebBrowser session if it was left open.

export const signInWithGoogle = async () => {
  const redirectUri = Linking.createURL("auth"); // Generates your app's redirect URI
  const result = await WebBrowser.openAuthSessionAsync(
    "http://192.168.31.240:3000/api/auth/google", // Backend OAuth endpoint
    redirectUri
  );

  if (result.type === "success" && result.url) {
    // Extract the token or handle further logic
    const urlParams = new URLSearchParams(result.url.split("?")[1]);
    const token = urlParams.get("token");

    if (token) {
      console.log("Authentication successful, token:", token);
      // Save token securely (e.g., SecureStore)
    } else {
      console.error("Token not found in redirect URL");
    }
  } else {
    console.error("Authentication failed or was canceled");
  }
};
