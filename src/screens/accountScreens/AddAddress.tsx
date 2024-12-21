import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";
import BackButton from "src/components/common/CBackBotton";
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
  const {showToast} = useToast();

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
      <Text style={styles.headerText}>Add New Address</Text>
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
        />
        <TextInput
          style={styles.input}
          value={form.number}
          onChangeText={(text) => setForm({ ...form, number: text })}
          placeholder="Phone"
          keyboardType="numeric"
        />
        <Button title="Add Address" onPress={handleAdd} />
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

export default AddAddress;
