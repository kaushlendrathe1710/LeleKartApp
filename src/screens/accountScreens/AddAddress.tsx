import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import BackButton from "src/components/common/CBackBotton";
import CButton from "src/components/common/CButton";
import { useToast } from "src/context/ToastContext";

const AddAddress: React.FC = ({ navigation }: any) => {
  const [form, setForm] = useState({
    name: "",
    country: "",
    city: "",
    house: "",
    landmark: "",
    street: "",
    state: "",
    pinCode: "",
    number: "",
  });
  const { showToast } = useToast();

  const fields = [
    { label: "Name", key: "name", placeholder: "Enter Name" },
    { label: "Country", key: "country", placeholder: "Enter Country" },
    { label: "City", key: "city", placeholder: "Enter City" },
    { label: "House", key: "house", placeholder: "Enter House" },
    { label: "Landmark", key: "landmark", placeholder: "Enter Landmark" },
    { label: "Street", key: "street", placeholder: "Enter Street" },
    { label: "State", key: "state", placeholder: "Enter State" },
    {
      label: "PIN Code",
      key: "pinCode",
      placeholder: "Enter PIN Code",
      keyboardType: "numeric",
    },
    {
      label: "Phone",
      key: "number",
      placeholder: "Enter Phone Number",
      keyboardType: "numeric",
    },
  ];

  const validateForm = () => {
    if (form.name.length <= 4) {
      showToast("Name should be greater than 4 characters", "info", 2000);
      return false;
    }
    if (form.number.length < 10) {
      showToast("Phone number should be at least 10 digits", "info", 2000);
      return false;
    }
    for (const key in form) {
      if (form[key].trim() === "") {
        showToast(`Please fill the ${key} field`, "info", 2000);
        return false;
      }
    }
    return true;
  };

  const handleAdd = () => {
    if (validateForm()) {
      // Add your API call for adding a new address
      console.log("New Address:", form);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.contentText}>Add New Address</Text>
      <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
        {fields.map((field, index) => (
          <View key={index} style={styles.inputContainer}>
            <Text style={styles.label}>{field.label}</Text>
            <TextInput
              style={styles.input}
              value={form[field.key]}
              onChangeText={(text) => setForm({ ...form, [field.key]: text })}
              placeholder={field.placeholder}
            />
          </View>
        ))}
        <TouchableOpacity style={{ marginVertical: 20 }} onPress={handleAdd}>
          <CButton buttonText="Add Address" />
        </TouchableOpacity>
      </ScrollView>
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
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 0,
    marginLeft: 5,
  },
  input: {
    paddingHorizontal: 15,
    height: 60,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    color: "#333",
    fontSize: 16,
    paddingLeft: 10,
  },
});

export default AddAddress;
