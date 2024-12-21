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
export const getALlYourOrders = async (
  SavedEmail,
  token,
  setLoading,
  setAllOrders
) => {
  console.log(SavedEmail, "email");
  setLoading(true);
  try {
    const response = await axios.get(`${BASE_URL}/api/user/getAllYourOrders`, {
      params: { email: SavedEmail },
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the headers
      },
    });
    console.log(response.data);
    await setAllOrders(response.data.allOrders);
    return;
  } catch (error) {
    console.log("Error updating user details:", error);
  } finally {
    setLoading(false);
  }
};
export const getAllAddresses = async (
  SavedEmail,
  token,
  setLoading,
  setAddresses
) => {
  setLoading(true);
  try {
    const response = await axios.get(`${BASE_URL}/api/user/getUserAddresses`, {
      params: { email: SavedEmail },
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the headers
      },
    });
    await setAddresses(response.data.addresses);
    return;
  } catch (error) {
    console.log("Error updating user details:", error);
  } finally {
    setLoading(false);
  }
};
export const updateAddress = async (
  SavedEmail,
  token,
  setLoading,
  setAddresses,
  form,
  showToast
) => {
  setLoading(true);
  console.log(form.id);
  try {
    const response = await axios.post(
      `${BASE_URL}/api/user/updateUserAddress`,
      {
        email:SavedEmail,
        name: form.name,
        phone: form.phone,
        country: form.country,
        state: form.state,
        city: form.city,
        street: form.street,
        house: form.house,
        landmark: form.landmark,
        pinCode: form.pinCode,
        number: form.number,
        id: form.id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    await setAddresses(response.data.addresses);
    showToast(`${response.data.message}`, "success", 2000);
    return;
  } catch (error: any) {
    showToast(
      `${
        (error.response?.data || error.message,
        "Something went wrong try again later")
      }`,
      "error",
      2000
    );
    console.log("Error updating user details:", error);
  } finally {
    setLoading(false);
  }
};
export const AddUserAddress = async (
  SavedEmail,
  token,
  setLoading,
  setAddresses,
  form,
  showToast
) => {
  setLoading(true);
  try {
    const response = await axios.post(
      `${BASE_URL}/api/user/addAddress`,
      {
        email: SavedEmail,
        name: form.name,
        phone: form.phone,
        country: form.country,
        state: form.state,
        city: form.city,
        street: form.street,
        house: form.house,
        landmark: form.landmark,
        pinCode: form.pinCode,
        number: form.number,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    await setAddresses(response.data.addresses);
    showToast(`${response.data.message}`, "success", 2000);
    return;
  } catch (error: any) {
    showToast(
      `${
        (error.response?.data || error.message,
        "Something went wrong try again later")
      }`,
      "error",
      2000
    );
    console.log("Error updating user details:", error);
  } finally {
    setLoading(false);
  }
};
