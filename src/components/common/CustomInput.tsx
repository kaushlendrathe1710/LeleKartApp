import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface CustomInputProps {
  placeholder?: string;
  setText?: (text: string) => void;
  iconName?: string;
  value: any;
  secure?: boolean; // Make secure optional, default to false
}

const CustomInput: React.FC<CustomInputProps> = ({
  setText,
  placeholder,
  iconName,
  value,
  secure = false, // Default to false if not provided
}) => {
  return (
    <View style={styles.InputContainer}>
      {iconName && <Icon name={iconName} size={28} color="black" />}
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={(text) => setText && setText(text)}
        style={styles.input}
        secureTextEntry={secure} // Correctly pass secureTextEntry prop
        keyboardType={secure ? "default" : "email-address"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  InputContainer: {
    // flexDirection: "row",
    // alignItems: "center",
    // paddingHorizontal: 15,
    // height: 60,
    // backgroundColor: "#f0f0f0",
    // borderRadius: 10,
    // marginHorizontal: 20,
    // marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    height: 60,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 5,
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 16,
  },
});

export default CustomInput;
