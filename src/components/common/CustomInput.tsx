import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface CustomInputProps {
  placeholder?: string;
  setText?: (text: string) => void;
  iconName?: string;
  value: any;
  secure?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  setText,
  placeholder,
  iconName,
  value,
  secure = false, // Default to false if not provided
}) => {
  const [isSecure, setIsSecure] = useState(secure); // State to manage secureTextEntry

  return (
    <View style={styles.InputContainer}>
      {/* Left Icon */}
      {iconName && <Icon name={iconName} size={28} color="black" />}
      {/* TextInput */}
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={(text) => setText && setText(text)}
        style={styles.input}
        secureTextEntry={isSecure} 
        keyboardType={secure ? "default" : "email-address"}
      />
      {/* Eye Icon for Password Toggle */}
      {secure && (
        <TouchableOpacity onPress={() => setIsSecure((prev) => !prev)}>
          <Icon
            name={isSecure ? "eye-off-outline" : "eye-outline"} 
            size={24}
            color="black"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  InputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    height: 50,
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
