// src/services/authService.tsx
import axios from "axios";
import { BASE_URL } from "../config";
import { AuthStore } from "../storage/authStore";

export const FindUser = async (email, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/user/findByEmail`, {
      email: email,
    });
    AuthStore.getState().setUserDetails(response.data);
    return;
  } catch (error: any) {
    console.log('error',error);
  }
};
