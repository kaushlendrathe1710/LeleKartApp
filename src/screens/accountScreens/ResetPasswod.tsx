import {
  NavigationProp,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import BackButton from "src/components/common/CBackBotton";
import CButton from "src/components/common/CButton";
import CustomInput from "src/components/common/CustomInput";
import CustomLoading from "src/components/common/CustomLoading";
import { useToast } from "src/context/ToastContext";
import { ScreensParamList } from "src/navigation/types";
import {
  forgotPassword,
  resetPassword,
  verifyUserOtpForgot,
} from "src/services/api/authApi";
import { AuthStore } from "src/services/storage/authStore";

const ResetPassword: React.FC = () => {
  const {userDetails, SavedEmail } = AuthStore();
  const navigation = useNavigation<NavigationProp<ScreensParamList>>();
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState<boolean>(false);
  const { colors } = useTheme();
  const { showToast } = useToast();
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  // Step states
  const [showOtp, setShowOtp] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  // ---Change position of input as filled or empty---
  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    if (text.length === 0 && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const sendOtp = async () => {
    const email = SavedEmail || userDetails.user.email;
    await forgotPassword(email, setShowOtp, showToast, setLoading);
  };

  const confirmOtp = async () => {
    if (otp.join("").length < 4) {
      showToast("Please enter a 4-digit OTP", "info", 2000);
      return;
    }
    try {
      const email = SavedEmail || userDetails.user.email;
      await verifyUserOtpForgot(email, otp.join(""), setLoading, showToast);
      const otpValue = otp.join("");
      console.log("OTP Confirmed:", otpValue);
      await setShowChangePassword(true);
      await showToast("OTP verified successfully!", "info", 2000);
    } catch (err: any) {
      console.log("Error in confirmOtp:", err);
      showToast("Invalid OTP. Please try again.", "error", 2000);
    }
  };

  const changePassword = async () => {
    if (newPassword !== confirmPassword) {
      showToast("Passwords do not match", "error", 2000);
      return;
    }
    if (newPassword.length < 6) {
      showToast("Password must be at least 6 characters long", "error", 2000);
      return;
    }
    showToast("Password changed successfully!", "success", 2000);
    const email = SavedEmail || userDetails.user.email;
    await resetPassword(email, newPassword, showToast, setLoading);
    await navigation.navigate("Main");
    // Handle further password change logic here
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <BackButton />
      {/* Title */}
      <Text style={styles.contentText}>Reset Password</Text>
      {/* Form Content */}
      <View style={styles.formContainer}>
        {/* Email Section */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Registered Email</Text>
          <Text style={styles.emailText}>{SavedEmail || "Not Available"}</Text>
        </View>

        {
          loading && <CustomLoading size={250} />
        }
        {!showOtp && !loading && (
          <TouchableOpacity style={styles.buttonWrapper} onPress={sendOtp}>
            <CButton buttonText="Send OTP" />
          </TouchableOpacity>
        )}

        {/* OTP Section */}
        {showOtp && !showChangePassword && !loading && (
          <>
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  style={[
                    styles.otpInput,
                    { borderColor: colors.text },
                    { color: colors.text },
                  ]}
                  keyboardType="numeric"
                  maxLength={1}
                  value={digit}
                  onChangeText={(text) => handleChange(text, index)}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                />
              ))}
            </View>
            <TouchableOpacity style={styles.buttonWrapper} onPress={confirmOtp}>
              <CButton buttonText="Confirm OTP" />
            </TouchableOpacity>
          </>
        )}

        {/* Change Password Section */}
        {showChangePassword && !loading && (
          <>
            <CustomInput
              value={newPassword}
              setText={setNewPassword}
              placeholder="Enter New Password"
              secure={true}
            />
            <CustomInput
              value={confirmPassword}
              setText={setConfirmPassword}
              placeholder="Enter Confirm Password"
              secure={true}
            />
            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={changePassword}
            >
              <CButton buttonText="Change Password" />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  contentText: {
    marginTop: 5,
    marginBottom: 50,
    fontSize: 18,
    paddingTop: 20,
    fontWeight: "bold",
    color: "#444",
    textAlign: "center",
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 30,
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
    fontWeight: "600",
  },
  emailText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    margin: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 18,
  },
  buttonWrapper: {
    width: "100%",
    marginTop: 20,
  },
});

export default ResetPassword;
