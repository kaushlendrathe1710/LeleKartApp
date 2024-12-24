import { create } from "zustand";

// Define the store's interface for managing user addresses
interface UserStore {
  banners: Array<any>; // Array to hold banners
  setBanners: (banners: Array<any>) => void; // Method to set all banners
  getBanners: () => Array<any>; // Method to get all banners
  productsWithCategory: Array<any>; // Array to hold products with categories
  setProductsWithCategory: (productsWithCategory: Array<any>) => void; // Method to set all products
  getProductsWithCategory: () => Array<any>; // Method to get all products with categories
}

// Create the Zustand store for managing addresses
export const useProductStore = create<UserStore>((set) => ({
  banners: [],
  setBanners: (banners) => set({ banners }),
  getBanners: () => {
    const state = useProductStore.getState();
    return state.banners;
  },
  productsWithCategory: [],
  setProductsWithCategory: (productsWithCategory) =>
    set({ productsWithCategory }),
  getProductsWithCategory: () => {
    const state = useProductStore.getState();
    return state.productsWithCategory;
  },
}));
