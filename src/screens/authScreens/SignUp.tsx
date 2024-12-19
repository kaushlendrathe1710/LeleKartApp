import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { BottomTabParamList } from "../../navigation/types";
import Icon from "react-native-vector-icons/Ionicons";
import CustomInput from "../../components/common/CustomInput";
import { useToast } from "src/context/ToastContext";
import { registerUser } from "src/services/api/authApi";
import CustomLoading from "src/components/common/CustomLoading";

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const phoneRegex = /^[0-9]{10}$/; // Regex for validating 10-digit phone numbers

const SignUp: React.FC = () => {
  const { showToast } = useToast();
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigation = useNavigation<NavigationProp<BottomTabParamList>>();

  console.log(loading);

  const handleSignUp = async () => {
    console.log("hiit");
    // Name validation (minimum 4 characters)
    if (!name || name.length < 4) {
      showToast("Name must be at least 4 characters long", "info", 2000);
      return;
    }

    // Email validation
    if (!email) {
      showToast("Please fill email", "info", 2000);
      return;
    }
    if (!emailRegex.test(email)) {
      showToast("Please fill correct email", "info", 2000);
      return;
    }

    // Phone number validation (must be 10 digits)
    if (!phone || !phoneRegex.test(phone)) {
      showToast("Phone number must be 10 digits", "info", 2000);
      return;
    }

    // Password validation (minimum 8 characters)
    if (!password) {
      showToast("Please fill Password", "info", 2000);
      return;
    }
    if (password.length < 8) {
      showToast("Password must be at least 8 characters long", "info", 2000);
      return;
    }

    // Confirm password validation (must match password)
    if (password !== confirmPassword) {
      showToast("Passwords do not match", "info", 2000);
      return;
    }

    // Proceed with the registration
    await registerUser(
      email,
      name,
      phone,
      password,
      showToast,
      setLoading,
      navigation
    );
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
      {loading && (
        <View style={{ display: "flex", flexDirection: "column", gap: 50 }}>
          <CustomLoading size={250} />
          <Text style={{ textAlign: "center", paddingTop: -40 }}>
            Sending Verificatin Code, Please Wait...{" "}
          </Text>
        </View>
      )}
      {!loading && (
        <View style={styles.formContainer}>
          <Text style={styles.title}>SignUp</Text>

          <View style={styles.inputWrapper}>
            <CustomInput
              value={name}
              setText={setName}
              placeholder="Enter Name"
              iconName="person"
            />
            <CustomInput
              value={email}
              setText={setEmail}
              placeholder="Enter Email"
              iconName="mail"
            />
            <CustomInput
              value={phone}
              setText={setPhone}
              placeholder="Enter Phone No"
              iconName="call"
            />
            <CustomInput
              value={password}
              setText={setPassword}
              placeholder="Enter Password"
              iconName="key"
              secure={true}
            />
            <CustomInput
              value={confirmPassword}
              setText={setConfirmPassword}
              placeholder="Confirm Password"
              iconName="key"
              secure={true}
            />
          </View>

          <View style={styles.signupButtonContainer}>
            <TouchableOpacity
              style={styles.signupButton}
              onPress={handleSignUp}
            >
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
      )}
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
