// src/stores/authStore.tsx
import create from "zustand";
import { persist } from "zustand/middleware";
import { storage } from "../mmkv"; // MMKV instance
import { registerUser, loginUser, verifyUserOtp } from "../api/authApi"; // Import services

interface AuthState {
  user: any;
  token: string | null;
  isAuthenticated: boolean;

  register: (userData: {
    email: string;
    password: string;
    role: string;
    name: string;
    phone: string;
  }) => Promise<void>;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  verifyOtp: (email: string, verificationCode: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (
    email: string,
    verificationCode: string,
    newPassword: string
  ) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      register: async (userData) => {
        const response = await registerUser(userData);
        if (response.success) {
          set({ user: response.user, isAuthenticated: true });
        }
      },

      login: async (credentials) => {
        const response = await loginUser(credentials);
        if (response.success) {
          storage.set("authToken", response.token); // Save token to MMKV
          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
          });
        }
      },

      verifyOtp: async (email, verificationCode) => {
        const response = await verifyUserOtp(email, verificationCode);
        if (response.success) {
          // Handle successful OTP verification
        }
      },

      logout: () => {
        storage.delete("authToken"); // Remove token from MMKV
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage", // The name of the storage file in MMKV
      getStorage: () => ({
        getItem: (key) => storage.getString(key),
        setItem: (key, value) => storage.set(key, value),
        removeItem: (key) => storage.delete(key),
      }),
    }
  )
);
