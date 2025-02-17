import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Button } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { ScreensParamList } from "../../navigation/types";
import Icon from "react-native-vector-icons/Ionicons";
import CustomInput from "../../components/common/CustomInput";
import { loginUser } from "src/services/api/authApi";
import { useToast } from "../../../src/context/ToastContext"; 
import CustomLoading from "src/components/common/CustomLoading";
import { signInWithGoogle } from "src/components/common/accontScreen/SignInWithGoogle";

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const Login: React.FC = () => {
  const { showToast } = useToast();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  // Properly define the navigation hook with BottomTabParamList type
  const navigation = useNavigation<NavigationProp<ScreensParamList>>();

  const handleLogin = async () => {
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
    await loginUser(email, password, showToast, setLoading, navigation);
  };

  return (
    <View style={styles.container}>
      {/* <CustomToast message="user logged in sucessfully" type="success" /> */}
      {/* Back button */}
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.backButton}>
            <Icon name="arrow-back" size={28} color="black" />
          </View>
        </TouchableOpacity>
      </View>
      {/* Back home button  */}
      {/* <View style={styles.backToHome}>
        <TouchableOpacity onPress={() => navigation.navigate("Main")}>
          <View style={styles.backToHomeButton}>
            <Text>Back To Home</Text>
          </View>
        </TouchableOpacity>
      </View> */}
      {/* Form Container */}
      {/* <Button title="Sign in with Google" onPress={signInWithGoogle} /> */}
      {loading && <CustomLoading size={250} />}
      {loading && <Text>Logging in, please wait... </Text>}
      {!loading && (
        <View style={styles.formContainer}>
          <Text style={styles.title}>Login</Text>

          <View style={styles.inputWrapper}>
            <CustomInput
              value={email}
              setText={setEmail}
              placeholder="Enter Email here"
              iconName="mail"
            />
            <CustomInput
              value={password}
              setText={setPassword}
              placeholder="Enter Password"
              iconName="key"
              secure={true}
            />
          </View>

          <View
            style={[
              styles.bottomTextContainer,
              { marginTop: -20, marginBottom: 8 },
            ]}
          >
            <Text style={[styles.noAccountText]}>Forgot your password? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text style={[styles.signUpText, { color: "#1597FF" }]}>
                Reset Now
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.loginButtonContainer}>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.orText}>OR LOGIN WITH</Text>

          {/* Google Signup Button */}
          <View style={styles.googleButtonContainer}>
            <TouchableOpacity style={styles.googleButton}>
              <Image
                style={styles.googleIcon}
                source={require("../../../assets/myImages/google.png")}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.bottomTextContainer}>
            <Text style={[styles.noAccountText]}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={[styles.signUpText, { color: "#1597FF" }]}>
                Register Now
              </Text>
            </TouchableOpacity>
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
  backToHomeButton: {
    padding: 10,
    borderColor: "#DCDCDC",
    borderWidth: 2,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: 120,
  },
  backToHome: {
    position: "absolute",
    bottom: 20,
    right: 30,
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
    padding: 10,
    borderColor: "#DCDCDC",
    borderWidth: 2,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    position: "absolute",
    top: 40,
    left: 120,
    fontSize: 18,
    color: "#555",
    marginBottom: 20,
    paddingLeft: 14,
  },
  inputWrapper: {
    width: "100%",
    marginBottom: 20,
  },
  loginButtonContainer: {
    width: "100%",
    alignItems: "center",
  },
  loginButton: {
    backgroundColor: "#1A2421",
    width: "50%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  loginButtonText: {
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
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  googleIcon: {
    width: 30,
    height: 30,
  },
  bottomTextContainer: {
    flexDirection: "row",
    gap: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  noAccountText: {
    textAlign: "center",
    marginTop: 4,
    fontSize: 16,
  },
  signUpText: {
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 5,
  },
});

export default Login;
