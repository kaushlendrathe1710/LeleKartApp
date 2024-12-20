import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import BackButton from "src/components/common/CBackBotton";
import CustomInput from "src/components/common/CustomInput";
import { ScreensParamList } from "src/navigation/types";
import Icon from "react-native-vector-icons/Ionicons";
import { AuthStore } from "src/services/storage/authStore";
import CButton from "src/components/common/CButton";
import { useToast } from "src/context/ToastContext";
import { UpdateUserDetails } from "src/services/api/userApi";
import CustomLoading from "src/components/common/CustomLoading";

const EditProfile: React.FC = () => {
  const { token, userDetails, SavedEmail } = AuthStore();
  console.log(token);
  const [newName, setNewName] = useState<string>(userDetails?.user?.name);
  const [newPhone, setNewPhone] = useState<string>(userDetails?.user?.phone);
  const [loading, setLoaind] = useState<boolean>(false);
  const [newGender, setNewGender] = useState<string | null>(
    userDetails?.user?.gender
  );
  const { showToast } = useToast();
  const genderOptions = [
    { label: "Male", value: "Male", icon: "male" },
    { label: "Female", value: "Female", icon: "female" },
    {
      label: "Not Prefer to Answer",
      value: "Not Prefer to Answer",
      icon: "help-circle",
    },
  ];

  const navigation = useNavigation<NavigationProp<ScreensParamList>>();

  const handleGenderSelect = (gender: string) => {
    setNewGender(gender);
  };

  const handleContinue = async () => {
    if (!newName || newName?.length < 4) {
      showToast("please fill name", "info", 2000);
      console.log("error");
    }
    if (!newPhone || newPhone?.length < 10) {
      showToast("please fill phone number", "info", 2000);
      console.log("error sdfsdf");
    }
    await UpdateUserDetails(
      SavedEmail,
      newName,
      newPhone,
      newGender,
      token,
      setLoaind,
      showToast,
      navigation
    );
  };

  return (
    <View style={styles.container}>
      <BackButton />
      {!loading && <Text style={styles.contentText}>Edit Your Profile</Text>}
      {!loading && (
        <View>
          <CustomInput
            placeholder="Enter New Name"
            value={newName}
            setText={setNewName}
          />
          <CustomInput
            placeholder="Enter New Number"
            value={newPhone}
            setText={setNewPhone}
          />
        </View>
      )}
      {!loading && (
        <View style={styles.genderContainer}>
          {genderOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.genderOption,
                newGender === option.value && styles.selectedGenderOption,
              ]}
              onPress={() => handleGenderSelect(option.value)} // Select gender
            >
              <Icon
                name={option.icon}
                size={18}
                color={newGender === option.value ? "#fff" : "#444"}
              />
              <Text
                style={[
                  styles.optionText,
                  newGender === option.value && styles.selectedOptionText,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {!loading && (
        <View>
          <TouchableOpacity onPress={handleContinue}>
            <CButton buttonText="Continue" />
          </TouchableOpacity>
        </View>
      )}
      {loading && <View style={{marginTop:150}}><CustomLoading size={250} /></View> }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  contentText: {
    marginBottom:50,
    fontSize: 18,
    paddingTop: 20,
    fontWeight:"bold",
    color: "#444",
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    color: "#444",
    marginVertical: 15,
    marginLeft: 5,
    fontWeight: "500",
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 5,
    flexWrap: "wrap",
  },
  genderOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 13,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    justifyContent: "center",
    margin: 5, // Space out options a bit
  },
  selectedGenderOption: {
    backgroundColor: "#007BFF", // Selected background color
    borderColor: "#007BFF",
  },
  selectedOptionText: {
    color: "#fff", // Text color for selected option
  },
  optionText: {
    fontSize: 10,
    color: "#333",
    fontWeight: "500",
  },
});

export default EditProfile;
