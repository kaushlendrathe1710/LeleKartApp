import React, { useState, useEffect } from "react";
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

const EditAddress: React.FC = ({ route, navigation }: any) => {
  const { address } = route.params;
  const [form, setForm] = useState<any>({}); // Initialize the form state
  const { showToast } = useToast();

  // Define fields and map to generate input fields dynamically
  const fields = [
    {
      label: "Name",
      key: "name",
      placeholder: "Enter your name",
      type: "text",
    },
    {
      label: "Country",
      key: "country",
      placeholder: "Enter country",
      type: "text",
    },
    { label: "City", key: "city", placeholder: "Enter city", type: "text" },
    {
      label: "House",
      key: "house",
      placeholder: "Enter house number",
      type: "text",
    },
    {
      label: "Landmark",
      key: "landmark",
      placeholder: "Enter landmark",
      type: "text",
    },
    {
      label: "Street",
      key: "street",
      placeholder: "Enter street",
      type: "text",
    },
    { label: "State", key: "state", placeholder: "Enter state", type: "text" },
    {
      label: "PIN Code",
      key: "pinCode",
      placeholder: "Enter PIN Code",
      type: "numeric",
    },
    {
      label: "Phone",
      key: "number",
      placeholder: "Enter phone number",
      type: "numeric",
    },
  ];

  useEffect(() => {
    // Initialize the form state with the address data
    setForm({ ...address });
  }, [address]);

  const validateForm = () => {
    if (!form.name || form.name.length < 4) {
      showToast("Name must be at least 4 characters long", "info", 2000);
      return false;
    }
    if (!form.country) {
      showToast("Country is required", "info", 2000);
      return false;
    }
    if (!form.city) {
      showToast("City is required", "info", 2000);
      return false;
    }
    if (!form.house) {
      showToast("House is required", "info", 2000);
      return false;
    }
    if (!form.landmark) {
      showToast("Landmark is required", "info", 2000);
      return false;
    }
    if (!form.street) {
      showToast("Street is required", "info", 2000);
      return false;
    }
    if (!form.state) {
      showToast("State is required", "info", 2000);
      return false;
    }
    if (
      !form.pinCode ||
      form.pinCode.length !== 6 ||
      isNaN(Number(form.pinCode))
    ) {
      showToast("PIN Code must be a 6-digit number", "info", 2000);
      return false;
    }
    if (!form.number || form.number.length < 10 || isNaN(Number(form.number))) {
      showToast("Phone must be at least 10 digits", "info", 2000);
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (validateForm()) {
      // Add your API call for saving the edited address
      console.log("Updated Address:", form);
      showToast("Address updated successfully", "info", 2000);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.contentText}>Edit Address</Text>
      <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
        {fields.map((field) => (
          <View style={styles.fieldContainer} key={field.key}>
            <Text style={styles.label}>{field.label}</Text>
            <TextInput
              style={styles.input}
              value={form[field.key]}
              onChangeText={(text) => setForm({ ...form, [field.key]: text })}
              placeholder={field.placeholder}
              keyboardType={field.type === "numeric" ? "numeric" : "default"}
            />
          </View>
        ))}

        <TouchableOpacity
          style={{ marginTop: 10, marginBottom: 20 }}
          onPress={handleSave}
        >
          <CButton buttonText="Save Address" />
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
  input: {
    paddingHorizontal: 15,
    height: 60,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginHorizontal: 0,
    marginVertical: 5,
    color: "#333",
    fontSize: 16,
  },
  label: {
    fontSize: 14,
    color: "#444",
    marginBottom: 0,
    marginLeft:5,
    fontWeight: "bold",
  },
  fieldContainer: {
    marginBottom: 15,
  },
});

export default EditAddress;
