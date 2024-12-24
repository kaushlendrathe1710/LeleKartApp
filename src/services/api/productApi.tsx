import axios from "axios";
import { BASE_URL } from "../config";

export const getBanners = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/product/getBanners`);
    return response.data;
  } catch (error: any) {
    console.error("Get Banners Error:", error.message);
    return [];
  }
};
export const getProductsWithCategoryHome = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/product/getProductsWithCategory`
    );
    return response.data;
  } catch (error: any) {
    console.error("Get Banners Error:", error.message);
    return [];
  }
};
export const getBestSellersHome = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/product/getBestSellers`
    );
    return response.data;
  } catch (error: any) {
    console.error("Get Banners Error:", error.message);
    return [];
  }
};
