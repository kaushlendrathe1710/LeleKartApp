import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { BottomTabParamList } from "../../navigation/types";
import Icon from "react-native-vector-icons/Ionicons";
import CustomInput from "../../components/common/CustomInput";
import { useToast } from "src/context/ToastContext";
import { registerUser } from "src/services/api/authApi";
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const SignUp: React.FC = () => {
  const { showToast } = useToast();
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const navigation = useNavigation<NavigationProp<BottomTabParamList>>();
  const handleSignUp = async () => {
    if (!email) {
      showToast("Please fill email", "info", 2000);
      return; // Exit the function if email is invalid
    }
    if (!emailRegex.test(email)) {
      showToast("Please fill correct email", "info", 2000);
      return; // Exit the function if email is invalid
    }
    if (!password) {
      showToast("Please fill Password", "info", 2000);
      return; // Exit the function if email is invalid
    }
    await registerUser(email);
  };
  return (
    <View style={styles.container}>
      {/* Back button */}
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.backButton}>
            <Icon name="arrow-back" size={28} color="black" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Form Container */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>SignUp</Text>

        <View style={styles.inputWrapper}>
          <CustomInput
            setText={setEmail}
            placeholder="Enter Email"
            iconName="mail"
          />
          <CustomInput
            setText={setEmail}
            placeholder="Enter Phone No"
            iconName="call"
          />
          <CustomInput
            setText={setPassword}
            placeholder="Enter Password"
            iconName="key"
          />
          <CustomInput
            setText={setConfirmPassword}
            placeholder="Confirm Password"
            iconName="key"
          />
        </View>

        <View style={styles.signupButtonContainer}>
          <TouchableOpacity style={styles.signupButton}>
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>
            Already have an account?{" "}
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center", // Centers content vertically
    alignItems: "center", // Centers content horizontally
  },
  backButtonContainer: {
    position: "absolute",
    top: 40,
    left: 30,
  },
  backButton: {
    padding: 10,
    borderColor: "#DCDCDC",
    borderWidth: 2,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: 80,
  },
  formContainer: {
    width: "90%",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
    marginBottom: 20,
  },
  inputWrapper: {
    width: "100%",
    marginBottom: 20,
  },
  signupButtonContainer: {
    width: "100%",
    alignItems: "center",
  },
  signupButton: {
    backgroundColor: "#1A2421",
    width: "50%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  signupButtonText: {
    color: "white",
    fontSize: 20,
  },
  orText: {
    textAlign: "center",
    fontSize: 14,
    color: "#777",
    marginVertical: 15,
  },
  googleButtonContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  googleButton: {
    backgroundColor: "#1A2421",
    width: "50%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  googleIcon: {
    width: 30,
    height: 30,
  },
  loginContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  loginText: {
    textAlign: "center",
    fontSize: 16,
    color: "#444",
  },
  loginLink: {
    color: "#1597FF",
    fontWeight: "bold",
    lineHeight: 24,
  },
});

export default SignUp;
