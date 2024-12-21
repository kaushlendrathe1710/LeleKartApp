import { create } from "zustand";

// Define the store's interface for managing user addresses
interface UserStore {
  addresses: Array<any>; // Array to hold user addresses
  setAddresses: (addresses: Array<any>) => void; // Method to set all addresses
  getAddresses: () => Array<any>; // Method to get all addresses
}

// Create the Zustand store for managing addresses
export const useUserStore = create<UserStore>((set) => ({
  addresses: [], // Initialize with an empty array

  // Method to set all addresses
  setAddresses: (addresses) => set({ addresses }),

  // Method to get all addresses
  getAddresses: () => {
    const state = useUserStore.getState();
    return state.addresses;
  },
}));
