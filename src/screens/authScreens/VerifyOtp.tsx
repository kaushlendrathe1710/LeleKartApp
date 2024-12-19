import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import CButton from "src/components/common/CButton";
import { BottomTabParamList } from "src/navigation/types";

type VerifyOtpRouteProp = RouteProp<BottomTabParamList, "VerifyOtp">;
const VerifyOtp = ({ route }: { route: VerifyOtpRouteProp }) => {
  const navigation = useNavigation<NavigationProp<BottomTabParamList>>();
  const { colors } = useTheme();
  const { email } = route.params;
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState<boolean>(false);
  console.log(email);

  // ---change positon of input as filled aur empty ---
  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    // Move to next input if a digit is entered
    if (text.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    // Automatically move to previous input if cleared
    if (text.length === 0 && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const confirmOtp = async () => {
    if (otp.join("").length < 4) {
      showMessage({
        message: "Enter OTP",
        type: "danger",
      });
      return;
    }
    try {
      setLoading(true);
      const data = await otpConfirm(email, otp.join(""));
      showMessage({
        message: data.message,
        type: "success",
      });
      setLoading(false);
      setShowOption("Reset");
    } catch (err: any) {
      showMessage({
        message: `${err}`,
        type: "danger",
      });
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.backButton}>
            <Icon name="arrow-back" size={28} color="black" />
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Verify Otp here</Text>
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
      <View>
        <TouchableOpacity>
          <CButton buttonText="Confirm" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});

export default VerifyOtp;
