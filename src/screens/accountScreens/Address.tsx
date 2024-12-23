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
import { DeleteAddress, getAllAddresses } from "src/services/api/userApi";
import { AuthStore } from "src/services/storage/authStore";
import Icon from "react-native-vector-icons/Ionicons";
import { ScreensParamList } from "src/navigation/types";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import SkeletonLoading from "src/components/common/SkeletonLoading";
import { useUserStore } from "src/services/storage/userStore";
import { useToast } from "src/context/ToastContext";

const Address: React.FC = () => {
  const [loading, setLoading] = React.useState(true);
  const navigation = useNavigation<NavigationProp<ScreensParamList>>();
  const { addresses, setAddresses } = useUserStore();
  const { showToast } = useToast();
  console.log(addresses);
  const { token, SavedEmail } = AuthStore();
  useEffect(() => {
    getAllAddresses(SavedEmail, token, setLoading, setAddresses);
  }, []);
  const handleDeleteAddress = async (address) => {
    DeleteAddress(
      SavedEmail,
      token,
      setLoading,
      setAddresses,
      address,
      showToast
    );
  };
  const renderAddress = () => {
    return (
      <View>
        {addresses?.map((address: any, index: number) => (
          <View key={index} style={styles.addressCard}>
            {/* <Icon name="home" size={30} color="#444" /> */}
            <TouchableOpacity
              onPress={() => handleDeleteAddress(address)}
              style={{
                position: "absolute",
                right: 10,
                top: 10,
                width: 30,
                zIndex: 50,
              }}
            >
              <Icon name="trash" size={30} color="#444" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("EditAddress", { address })}
              style={{
                position: "absolute",
                right: 10,
                bottom: 10,
                width: 30,
                zIndex: 50,
              }}
            >
              <Icon name="create" size={30} color="#444" />
            </TouchableOpacity>
            <Text style={styles.name}>{address?.name}</Text>
            <Text style={styles.info}>
              <Text style={styles.label}>Country: </Text>
              {address?.country}
            </Text>
            <Text style={styles.info}>
              <Text style={styles.label}>City: </Text>
              {address?.city}
            </Text>
            <Text style={styles.info}>
              <Text style={styles.label}>House: </Text>
              {address?.house}
            </Text>
            <Text style={styles.info}>
              <Text style={styles.label}>Landmark: </Text>
              {address?.landmark}
            </Text>
            <Text style={styles.info}>
              <Text style={styles.label}>Street: </Text>
              {address?.street}
            </Text>
            <Text style={styles.info}>
              <Text style={styles.label}>State: </Text>
              {address?.state}
            </Text>
            <Text style={styles.info}>
              <Text style={styles.label}>PIN Code: </Text>
              {address?.pinCode}
            </Text>
            <Text style={styles.info}>
              <Text style={styles.label}>Phone: </Text>
              {address?.number}
            </Text>
            <Text style={styles.info}>
              <Text style={styles.label}>Email: </Text>
              {address?.userEmail}
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
        {loading && <SkeletonLoading />}
        {!loading && addresses?.length === 0 && (
          <Text
            style={{
              color: "#444",
              marginBottom: 20,
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            No address found
          </Text>
        )}
        {!loading && renderAddress()}

        {!loading && (
          <TouchableOpacity
            style={{ marginBottom: 20 }}
            onPress={() => navigation.navigate("AddAddress")}
          >
            <View style={styles.addaddresscard}>
              <Icon
                name="add"
                size={38}
                color="#444"
                style={{ width: 30, fontWeight: "bold" }}
              />
              <Text style={{ color: "#333", fontWeight: "bold", fontSize: 16 }}>
                Add New Address
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "",
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
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
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
  addaddresscard: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    borderWidth: 4,
    borderColor: "#f0f0f0",
  },
});

export default Address;
