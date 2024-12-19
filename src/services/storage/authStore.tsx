import { create } from "zustand";
import { persist } from "zustand/middleware";
import { storage } from "./storage";

// Define the store's interface
interface AuthStore {
  token: string | null;
  mmkvEmail: string | null;
  setToken: (token: string) => void;
  setmmkvEmail: (mmkvEmail: string) => void;
  removemmkvEmail: () => void;
  removeToken: () => void;
}

// Create the Zustand store with persistence
export const AuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: storage.getItem("token"),
      mmkvEmail: storage.getItem("mmkvEmail"),

      setToken: (token: string) => {
        set({ token });
        storage.setItem("token", token);
      },

      setmmkvEmail: (mmkvEmail: string) => {
        set({ mmkvEmail });
        storage.setItem("mmkvEmail", mmkvEmail);
      },

      removemmkvEmail: () => {
        set({ mmkvEmail: null });
        storage.removeItem("mmkvEmail");
      },

      removeToken: () => {
        set({ token: null, mmkvEmail: null });
        storage.removeItem("token");
        storage.removeItem("mmkvEmail");
      },
    }),
    {
      name: "auth-storage",
      storage: {
        getItem: (key: string) => {
          return storage.getItem(key);
        },
        setItem: (key: string, value: any) => {
          storage.setItem(key, value);
        },
        removeItem: (key: string) => {
          storage.removeItem(key);
        },
      },
    }
  )
);
