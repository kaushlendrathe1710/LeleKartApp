import {
  NavigationProp,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  TouchableOpacity,
} from "react-native";
import { BottomTabParamList } from "../navigation/types";
import { AuthStore } from "src/services/storage/authStore";
import Icon from "react-native-vector-icons/Ionicons";

const Account: React.FC = () => {
  const { colors } = useTheme();
  const [isBoy, setIsBoy] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation<NavigationProp<BottomTabParamList>>();
  const { token, SavedEmail, isAuthenticated, userDetails } = AuthStore();

  const toggleImage = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setIsBoy((prev) => !prev);

      // Fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });
  };

  useEffect(() => {
    const interval = setInterval(toggleImage, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      {/*dummy Account  */}
      {!isAuthenticated && (
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#f8f8f8",
            paddingVertical: 30,
          }}
        >
          <View style={styles.defaultImgContainer}>
            <Animated.Image
              style={[styles.profileImg]}
              source={
                isBoy
                  ? require("../../assets/myImages/boy.png")
                  : require("../../assets/myImages/girl.png")
              }
            />
          </View>
          <TouchableOpacity
            style={[styles.accountBtn]}
            onPress={() => navigation.navigate("Login")}
          >
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Login/Signup
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {/* userDetails  */}
      {isAuthenticated && (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#f8f8f8",
            paddingVertical: 30,
            gap: 10,
            paddingHorizontal: 30,
          }}
        >
          <TouchableOpacity
            style={{
              position: "absolute",
              top: "10%",
              right: "5%",
              backgroundColor: "white",
              padding: 5,
              paddingHorizontal: 10,
              borderRadius: 4,
            }}
          >
            <Text style={{ color: "#1597FF" }}>Edit</Text>
          </TouchableOpacity>
          <View style={styles.defaultImgContainer}>
            {userDetails && userDetails.user && userDetails.user.image ? (
              <Image
                style={styles.profileImg}
                source={{ uri: userDetails.user.image }}
              />
            ) : (
              <Image
                style={styles.profileImg}
                source={require("../../assets/myImages/boy.png")}
              />
            )}
          </View>

          <View
            style={{
              display: "flex",
              justifyContent: "flex-start",
              flexWrap: "wrap",
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 5,
              }}
            >
              {userDetails.user.name}
            </Text>

            <Text
              style={{
                color: colors.text,
                fontSize: 14,
              }}
            >
              {userDetails.user.email}
            </Text>
            {userDetails.user?.phone && (
              <Text
                style={{
                  color: colors.text,
                  fontSize: 14,
                }}
              >
                {userDetails.user.phone}
              </Text>
            )}
            <Text
              style={{
                color: colors.text,
                fontSize: 14,
                marginBottom: 5,
              }}
            >
              {userDetails.user.gender}
            </Text>
          </View>
        </View>
      )}
      {/* page redirect  */}
      {isAuthenticated && (
        <View>
          <TouchableOpacity style={styles.pageRedirect}>
            <Text style={styles.pageRedirectText}>Your Orders</Text>
            <Icon
              name="chevron-forward-outline"
              style={styles.pageRedirectIcon}
            ></Icon>
          </TouchableOpacity>

          <TouchableOpacity style={styles.pageRedirect}>
            <Text style={styles.pageRedirectText}>EditProfile</Text>
            <Icon
              name="chevron-forward-outline"
              style={styles.pageRedirectIcon}
            ></Icon>
          </TouchableOpacity>

          <TouchableOpacity style={styles.pageRedirect}>
            <Text style={styles.pageRedirectText}>Addresses</Text>
            <Icon
              name="chevron-forward-outline"
              style={styles.pageRedirectIcon}
            ></Icon>
          </TouchableOpacity>

          <TouchableOpacity style={styles.pageRedirect}>
            <Text style={styles.pageRedirectText}>ResetPassword</Text>
            <Icon
              name="chevron-forward-outline"
              style={styles.pageRedirectIcon}
            ></Icon>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.pageRedirect}>
            <Text style={styles.pageRedirectText}>DeleteAccount</Text>
            <Icon
              name="chevron-forward-outline"
              style={styles.pageRedirectIcon}
            ></Icon>
          </TouchableOpacity> */}
        </View>
      )}

{/* Always shown options */}
      {
        <View>
          <View
            style={{ height: 20, width: "100%", backgroundColor: "#f8f8f8" }}
          ></View>
          <TouchableOpacity style={styles.pageRedirect}>
            <Text style={styles.pageRedirectText}>Privacy policy</Text>
            <Icon
              name="chevron-forward-outline"
              style={styles.pageRedirectIcon}
            ></Icon>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pageRedirect}>
            <Text style={styles.pageRedirectText}>Payment</Text>
            <Icon
              name="chevron-forward-outline"
              style={styles.pageRedirectIcon}
            ></Icon>
          </TouchableOpacity>

          <TouchableOpacity style={styles.pageRedirect}>
            <Text style={styles.pageRedirectText}>Shipping and return</Text>
            <Icon
              name="chevron-forward-outline"
              style={styles.pageRedirectIcon}
            ></Icon>
          </TouchableOpacity>

          <TouchableOpacity style={styles.pageRedirect}>
            <Text style={styles.pageRedirectText}>Cancellation and refund</Text>
            <Icon
              name="chevron-forward-outline"
              style={styles.pageRedirectIcon}
            ></Icon>
          </TouchableOpacity>

          <TouchableOpacity style={styles.pageRedirect}>
            <Text style={styles.pageRedirectText}>Security</Text>
            <Icon
              name="chevron-forward-outline"
              style={styles.pageRedirectIcon}
            ></Icon>
          </TouchableOpacity>

          <TouchableOpacity style={styles.pageRedirect}>
            <Text style={styles.pageRedirectText}>Contact us</Text>
            <Icon
              name="chevron-forward-outline"
              style={styles.pageRedirectIcon}
            ></Icon>
          </TouchableOpacity>

          <TouchableOpacity style={styles.pageRedirect}>
            <Text style={styles.pageRedirectText}>About us</Text>
            <Icon
              name="chevron-forward-outline"
              style={styles.pageRedirectIcon}
            ></Icon>
          </TouchableOpacity>
        </View>
      }



    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  defaultImgContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    backgroundColor: "#1597FF",
  },
  accountBtn: {
    paddingHorizontal: 50,
    marginVertical: 20,
    padding: 10,
    backgroundColor: "black",
    opacity: 1,
    borderRadius: 7,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  profileImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
  },
  pageRedirect: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderTopColor: "grey",
    borderTopWidth: 0.2,
  },
  pageRedirectText: { fontSize: 16 },
  pageRedirectIcon: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
});

export default Account;
