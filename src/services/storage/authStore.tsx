import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the store's interface
interface AuthStore {
  token: string | null;
  SavedEmail: string | null;
  userDetails: any | null;
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  setSavedEmail: (SavedEmail: string) => void;
  setUserDetails: (userDetails: any) => void;
  removeSavedEmail: () => void;
  removeToken: () => void;
  removeUserDetails: () => void;
  logout: () => void; // Add logout method
  checkTokenExpiry: () => boolean; // Method to check token expiry
}

// Create the Zustand store with AsyncStorage persistence
export const AuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      token: null,
      SavedEmail: null,
      userDetails: null,
      isAuthenticated: false, // Initially set to false

      setToken: (token: string) => {
        set({ token });

        // After setting the token, check if it's expired and set isAuthenticated accordingly
        const isExpired = get().checkTokenExpiry();
        set({ isAuthenticated: !isExpired });
      },

      setSavedEmail: (SavedEmail: string) => {
        set({ SavedEmail });
      },

      setUserDetails: (userDetails: any) => {
        set({ userDetails });
      },

      removeSavedEmail: () => {
        set({ SavedEmail: null });
      },

      removeToken: () => {
        set({ token: null, SavedEmail: null });
      },

      removeUserDetails: () => {
        set({ userDetails: null });
      },

      logout: () => {
        set({
          token: null,
          SavedEmail: null,
          userDetails: null,
          isAuthenticated: false,
        }); // Clear all data from the store
        AsyncStorage.removeItem("auth-storage"); // Remove all data from AsyncStorage
      },

      // Check if the token is expired
      checkTokenExpiry: () => {
        const token = get().token;
        if (token) {
          const decodedToken = decodeJWT(token);
          const currentTime = Date.now() / 1000; // Get current time in seconds
          return decodedToken.exp < currentTime; // Returns true if expired
        }
        return true; // If no token, treat as expired
      },
    }),
    {
      name: "auth-storage", // Storage key
      storage: {
        getItem: async (key: string) => {
          const value = await AsyncStorage.getItem(key);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (key: string, value: any) => {
          await AsyncStorage.setItem(key, JSON.stringify(value));
        },
        removeItem: async (key: string) => {
          await AsyncStorage.removeItem(key);
        },
      },
    }
  )
);

// Function to decode JWT token and extract expiration time (exp)
const decodeJWT = (token: string) => {
  const payload = token.split(".")[1];
  const decoded = JSON.parse(atob(payload));
  return decoded;
};

// Call this function when the app starts or when the app is loaded
const autoLogoutIfExpired = () => {
  const store = AuthStore.getState();
  const isExpired = store.checkTokenExpiry();
  if (isExpired) {
    store.logout(); // Automatically log out if token is expired
  }
};

// Set an interval to check for token expiry and auto-logout
setInterval(() => {
  autoLogoutIfExpired();
}, 60000); // Check every 60 seconds (1 minute)
