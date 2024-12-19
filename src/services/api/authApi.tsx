// src/services/authService.tsx
import axios from "axios";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Register API
export const registerUser = async (
  email: string,
  password: string,
  name: string,
  phone: string,
  showToast: any,
  setLoading: any,
  navigation: any
) => {
  // const navigation = useNavigation<NavigationProp<BottomTabParamList>>();
  console.log(email);
  setLoading(true);
  try {
    const response = await axios.post(
      `${BASE_URL}/api/auth/register`,
      {
        name,
        email,
        password,
        phone,
      },
      { timeout: 10000 }
    );

    navigation.navigate("VerifyOtp", {
      email: email,
    });

    showToast(`${response.data.message}`, "success", "3000");
    return { success: true, user: response.data };
  } catch (error: any) {
    if (error.code === "ECONNABORTED") {
      // Handle timeout error
      showToast(
        "The request timed out. Please try again later.",
        "error",
        "2000"
      );
    } else {
      showToast(`${error.response?.data || error.message}`, "error", "2000");
    }
    console.error("Signup Error:", error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.message || "Login failed",
    };
  } finally {
    setLoading(false);
  }
};

//login api
export const loginUser = async (
  email: string,
  password: string,
  showToast: any,
  setLoading: any,
  // setToken: any,
  // setmmkvEmail: any,
  navigation: any
) => {
  try {
    setLoading(true);
    const response = await axios.post(
      `${BASE_URL}/api/auth/login`,
      {
        email,
        password,
      },
      { timeout: 5000 } // Set timeout to 5000ms (5 seconds)
    );
    console.log(response.data.user.email);
    await AsyncStorage.setItem("lelekartEmail", response.data.user.email);
    await AsyncStorage.setItem("token", response?.data?.token);
    // setmmkvEmail(response?.data?.user.email);
    // setToken(response?.data?.token);
    showToast(`${response.data.message}`, "success", "2000");
    navigation.navigate("Main");
    return {
      success: true,
      user: response.data.user,
      token: response.data.token,
    };
  } catch (error: any) {
    if (error.code === "ECONNABORTED") {
      // Handle timeout error
      showToast(
        "The request timed out. Please try again later.",
        "error",
        "2000"
      );
    } else {
      showToast(
        `${error.response?.data.message || error.message}`,
        "error",
        "2000"
      );
    }
    showToast(`${error.response?.data.message}`, "error", "2000");
    console.error("Login Error:-", error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.message || "Login failed",
    };
  } finally {
    setLoading(false); // Always stop loading animation
  }
};

// Verify user OTP API
export const verifyUserOtp = async (
  email: string,
  otpValue: string,
  setLoading: any,
  showToast: any,
  navigation: any
) => {
  console.log("Starting OTP verification");
  setLoading(true);
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/verifyuser`, {
      email,
      verificationCode: otpValue, // Ensure you're passing otpValue correctly
    });
    showToast(`${response.data.message || "OTP Verified"}`, "success", 2000);
    navigation.navigate("Login");
    return { success: true, message: response.data.message };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong";
    showToast(errorMessage, "error", 2000);
    console.error("Verify OTP Error:", errorMessage);
    return { success: false, error: errorMessage };
  } finally {
    setLoading(false);
  }
};

// Forgot Password API
// export const forgotPassword = async (email: string) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/auth/forgot-password`, {
//       email,
//     });
//     return { success: true, message: response.data.message };
//   } catch (error) {
//     console.error(
//       "Forgot Password Error:",
//       error.response?.data || error.message
//     );
//     return {
//       success: false,
//       error: error.response?.data?.message || "Forgot password failed",
//     };
//   }
// };

// Reset Password API
// export const resetPassword = async (
//   email: string,
//   verificationCode: string,
//   newPassword: string
// ) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/auth/reset-password`, {
//       email,
//       verificationCode,
//       newPassword,
//     });
//     return { success: true, message: response.data.message };
//   } catch (error) {
//     console.error(
//       "Reset Password Error:",
//       error.response?.data || error.message
//     );
//     return {
//       success: false,
//       error: error.response?.data?.message || "Reset password failed",
//     };
//   }
// };
