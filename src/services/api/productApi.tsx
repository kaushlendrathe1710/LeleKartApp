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
    const response = await axios.get(`${BASE_URL}/api/product/getBestSellers`);
    return response.data;
  } catch (error: any) {
    console.error("Get Banners Error:", error.message);
    return [];
  }
};
export const getProductDetails = async (id, setLoading) => {
  setLoading(true);
  try {
    const response = await axios.get(`${BASE_URL}/api/product/getProduct`, {
      params: { productId: id },
    });

    return response.data;
  } catch (error: any) {
    console.error("Get Banners Error:", error.message);
    return [];
  } finally {
    setLoading(false);
  }
};
