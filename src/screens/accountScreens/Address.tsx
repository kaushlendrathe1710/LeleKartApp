import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Touchable,
  TouchableOpacity,
} from "react-native";
import BackButton from "src/components/common/CBackBotton";
import { getAllAddresses } from "src/services/api/userApi";
import { AuthStore } from "src/services/storage/authStore";
import Icon from "react-native-vector-icons/Ionicons";
import { ScreensParamList } from "src/navigation/types";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const Address: React.FC = () => {
  const [allAddress, setAllAddress] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const navigation = useNavigation<NavigationProp<ScreensParamList>>();
  const { token, SavedEmail } = AuthStore();
  useEffect(() => {
    getAllAddresses(SavedEmail, token, setLoading, setAllAddress);
  }, []);
  console.log(allAddress);
  const renderAddress = () => {
    return (
      <View>
        {allAddress?.map((address: any, index: number) => (
          <View key={index} style={styles.addressCard}>
            {/* <Icon name="home" size={30} color="#444" /> */}
            <TouchableOpacity
              style={{ position: "absolute", right: 10, top: 10, width: 30 }}
            >
              <Icon name="trash" size={30} color="#444" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("EditAddress", { address })}
              style={{ position: "absolute", right: 10, bottom: 10, width: 30 }}
            >
              <Icon name="create" size={30} color="#444" />
            </TouchableOpacity>
            <Text style={styles.name}>{address.name}</Text>
            <Text style={styles.info}>
              <Text style={styles.label}>Country: </Text>
              {address.country}
            </Text>
            <Text style={styles.info}>
              <Text style={styles.label}>City: </Text>
              {address.city}
            </Text>
            <Text style={styles.info}>
              <Text style={styles.label}>House: </Text>
              {address.house}
            </Text>
            <Text style={styles.info}>
              <Text style={styles.label}>Landmark: </Text>
              {address.landmark}
            </Text>
            <Text style={styles.info}>
              <Text style={styles.label}>Street: </Text>
              {address.street}
            </Text>
            <Text style={styles.info}>
              <Text style={styles.label}>State: </Text>
              {address.state}
            </Text>
            <Text style={styles.info}>
              <Text style={styles.label}>PIN Code: </Text>
              {address.pinCode}
            </Text>
            <Text style={styles.info}>
              <Text style={styles.label}>Phone: </Text>
              {address.number}
            </Text>
            <Text style={styles.info}>
              <Text style={styles.label}>Email: </Text>
              {address.userEmail}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.contentText}>Your Address</Text>
      <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
        {renderAddress()}
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
  addressCard: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#grey",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
    borderWidth: 0.5,
    borderColor: "#grey",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  label: {
    fontWeight: "600",
    color: "#444",
  },
});

export default Address;
