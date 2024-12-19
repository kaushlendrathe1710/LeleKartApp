// src/services/authService.tsx
import axios from "axios";
import { BASE_URL } from "../config"; // Replace with your API URL

// Register API
export const registerUser = async (userData: {
  email: string;
  password: string;
  role: string;
  name: string;
  phone: string;
}) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, userData);
    return { success: true, user: response.data };
  } catch (error: any) {
    console.error("Register Error:", error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.message || "Registration failed",
    };
  }
};

//login api
export const loginUser = async (
  email: string,
  password: string,
  showToast: any,
  setLoading: any
) => {
  console.log(email, password);
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
    console.log(response.data);
    showToast(`${response.data.message}`, "success", "2000");
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
      showToast(`${error.response?.data || error.message}`, "error", "2000");
    }
    console.error("Login Error:", error.response?.data || error.message);
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
  verificationCode: string
) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/verify-otp`, {
      email,
      verificationCode,
    });
    return { success: true, message: response.data.message };
  } catch (error: any) {
    console.error("Verify OTP Error:", error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.message || "OTP Verification failed",
    };
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
