// src/services/authService.tsx
import axios from "axios";
import { BASE_URL } from "../config";
import { AuthStore } from "../storage/authStore";

export const FindUser = async (email, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/user/findByEmail`, {
      email: email,
    });
    console.log(response.data);
    AuthStore.getState().setUserDetails(response.data);
    return;
  } catch (error: any) {
    console.log("error", error);
  }
};
export const UpdateUserDetails = async (
  SavedEmail,
  newName,
  newPhone,
  newGender,
  token,
  setLoading,
  showToast,
  navigation
) => {
  setLoading(true);
  try {
    const response = await axios.post(
      `${BASE_URL}/api/user/updateUserDetails`,
      {
        name: newName,
        phone: newPhone,
        gender: newGender,
        email: SavedEmail,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      }
    );

    AuthStore.getState().setUserDetails(response.data);
    showToast("Changes are done", "success", 2000);
    await navigation.navigate("Main");
    return;
  } catch (error) {
    console.log("Error updating user details:", error);
  } finally {
    setLoading(false);
  }
};
