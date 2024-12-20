import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import BackButton from "src/components/common/CBackBotton";
import CButton from "src/components/common/CButton";
import SkeletonLoading from "src/components/common/SkeletonLoading";
import { ScreensParamList } from "src/navigation/types";
import { getALlYourOrders } from "src/services/api/userApi";
import { AuthStore } from "src/services/storage/authStore";

const YourOrder: React.FC = () => {
  const { token, userDetails, SavedEmail } = AuthStore();
  const navigation = useNavigation<NavigationProp<ScreensParamList>>();
  const [allOrders, setAllOrders] = useState<any[]>();
  const [loading, setLoading] = useState<boolean>(false);
  console.log(SavedEmail);
  console.log(allOrders);

  const fetchOrders = async () => {
    await getALlYourOrders(SavedEmail, token, setLoading, setAllOrders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.contentText}>Your Order</Text>
      <ScrollView style={{ flex: 1 }}>
        {loading && <SkeletonLoading />}
        {loading && <SkeletonLoading />}
        {!loading && allOrders?.length === 0 && (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image source={require("../../../assets/myImages/blankCart.png")} />
            <TouchableOpacity
              style={{ marginTop: 20 }}
              onPress={() => navigation.navigate("Main")}
            >
              <CButton buttonText="place your first order" />
            </TouchableOpacity>
          </View>
        )}
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
    marginBottom: 40,
    fontSize: 18,
    paddingTop: 20,
    fontWeight: "bold",
    color: "#444",
    textAlign: "center",
  },
});

export default YourOrder;
