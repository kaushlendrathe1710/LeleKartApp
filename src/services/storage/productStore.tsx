import { create } from "zustand";

// Define the store's interface for managing user addresses
interface UserStore {
  banners: Array<any>; // Array to hold user addresses
  setBanners: (banners: Array<any>) => void; // Method to set all addresses
  getBanners: () => Array<any>; // Method to get all addresses
}

// Create the Zustand store for managing addresses
export const useUserStore = create<UserStore>((set) => ({
  banners: [],
  setBanners: (banners) => set({ banners }),
  getBanners: () => {
    const state = useUserStore.getState();
    return state.addresses;
  },
}));
