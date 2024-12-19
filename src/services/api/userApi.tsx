// src/services/authService.tsx
import axios from "axios";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const FindUser = async () => {
  console.log("hite this ");
  const token = await AsyncStorage.getItem("token");
  const email = await AsyncStorage.getItem("lelekartEmail");
  console.log(token, "dfsdf", email, "dfsdfsdffsdfsdf");
  //   setLoading(true);
  try {
    const response = await axios.post(`${BASE_URL}/api/user/findByEmail`, {
      email,
    });
    console.log(response.data);
  } catch (error: any) {
    console.log(error);
  } finally {
    // setLoading(false);
  }
};
