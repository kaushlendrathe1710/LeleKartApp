import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import BackButton from "src/components/common/CBackBotton";
import { useToast } from "src/context/ToastContext";

const EditAddress: React.FC = ({ route, navigation }: any) => {
  const { address } = route.params;
  const [form, setForm] = useState({ ...address });
  const {showToast} = useToast();

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
      <Text style={styles.headerText}>Edit Address</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          value={form.name}
          onChangeText={(text) => setForm({ ...form, name: text })}
          placeholder="Name"
        />
        <TextInput
          style={styles.input}
          value={form.country}
          onChangeText={(text) => setForm({ ...form, country: text })}
          placeholder="Country"
        />
        <TextInput
          style={styles.input}
          value={form.city}
          onChangeText={(text) => setForm({ ...form, city: text })}
          placeholder="City"
        />
        <TextInput
          style={styles.input}
          value={form.house}
          onChangeText={(text) => setForm({ ...form, house: text })}
          placeholder="House"
        />
        <TextInput
          style={styles.input}
          value={form.landmark}
          onChangeText={(text) => setForm({ ...form, landmark: text })}
          placeholder="Landmark"
        />
        <TextInput
          style={styles.input}
          value={form.street}
          onChangeText={(text) => setForm({ ...form, street: text })}
          placeholder="Street"
        />
        <TextInput
          style={styles.input}
          value={form.state}
          onChangeText={(text) => setForm({ ...form, state: text })}
          placeholder="State"
        />
        <TextInput
          style={styles.input}
          value={form.pinCode}
          onChangeText={(text) => setForm({ ...form, pinCode: text })}
          placeholder="PIN Code"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          value={form.number}
          onChangeText={(text) => setForm({ ...form, number: text })}
          placeholder="Phone"
          keyboardType="numeric"
        />
        <Button title="Save Address" onPress={handleSave} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  form: {
    flex: 1,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
});

export default EditAddress;
