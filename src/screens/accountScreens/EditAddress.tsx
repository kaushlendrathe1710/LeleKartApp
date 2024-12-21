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

const EditAddress: React.FC = ({ route, navigation }: any) => {
  const { address } = route.params;
  const [form, setForm] = useState({ ...address });
  const { showToast } = useToast();

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
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={form.name}
            onChangeText={(text) => setForm({ ...form, name: text })}
            placeholder="Enter your name"
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Country</Text>
          <TextInput
            style={styles.input}
            value={form.country}
            onChangeText={(text) => setForm({ ...form, country: text })}
            placeholder="Enter country"
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            value={form.city}
            onChangeText={(text) => setForm({ ...form, city: text })}
            placeholder="Enter city"
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>House</Text>
          <TextInput
            style={styles.input}
            value={form.house}
            onChangeText={(text) => setForm({ ...form, house: text })}
            placeholder="Enter house number"
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Landmark</Text>
          <TextInput
            style={styles.input}
            value={form.landmark}
            onChangeText={(text) => setForm({ ...form, landmark: text })}
            placeholder="Enter landmark"
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Street</Text>
          <TextInput
            style={styles.input}
            value={form.street}
            onChangeText={(text) => setForm({ ...form, street: text })}
            placeholder="Enter street"
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>State</Text>
          <TextInput
            style={styles.input}
            value={form.state}
            onChangeText={(text) => setForm({ ...form, state: text })}
            placeholder="Enter state"
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>PIN Code</Text>
          <TextInput
            style={styles.input}
            value={form.pinCode}
            onChangeText={(text) => setForm({ ...form, pinCode: text })}
            placeholder="Enter PIN Code"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={form.number}
            onChangeText={(text) => setForm({ ...form, number: text })}
            placeholder="Enter phone number"
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity style={{ marginTop: 10,marginBottom:20 }} onPress={handleSave}>
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
