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
  ScrollView,
} from "react-native";
import { ScreensParamList } from "../navigation/types";
import { AuthStore } from "src/services/storage/authStore";
import Icon from "react-native-vector-icons/Ionicons";
import CustomModal from "src/components/common/CModal";
import RedirectOption from "src/components/common/accontScreen/CRedirectOption";

const Account: React.FC = () => {
  const { colors } = useTheme();
  const [isBoy, setIsBoy] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation<NavigationProp<ScreensParamList>>();
  const { isAuthenticated, userDetails, logout } = AuthStore();
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    setModalVisible(true);
  };
  const onOk = () => {
    logout();
    setModalVisible(false);
  };
  const onCancel = () => {
    setModalVisible(false);
  };

  const toggleImage = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setIsBoy((prev) => !prev);
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
  const navigateToEditProfile = () => {
    // Perform navigation after the component has fully rendered
    setTimeout(() => {
      navigation.navigate("EditProfile");
    }, 0);
  };
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {!isAuthenticated ? (
        <View style={styles.authContainer}>
          <Animated.Image
            style={[styles.profileImg, { opacity: fadeAnim }]}
            source={
              isBoy
                ? require("../../assets/myImages/boy.png")
                : require("../../assets/myImages/girl.png")
            }
          />
          <TouchableOpacity
            style={[styles.accountBtn]}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.loginText}>Login/Signup</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.userContainer}>
          <Image
            style={styles.profileImg}
            source={
              userDetails?.user?.image
                ? { uri: userDetails.user.image }
                : require("../../assets/myImages/boy.png")
            }
          />
          <View>
            <Text style={[styles.userName, { color: colors.text }]}>
              {userDetails?.user?.name}
            </Text>
            <Text style={[styles.userDetails, { color: colors.text }]}>
              {userDetails?.user?.email}
            </Text>
            {userDetails?.user?.phone && (
              <Text style={[styles.userDetails, { color: colors.text }]}>
                {userDetails.user.phone}
              </Text>
            )}
            <Text style={[styles.userDetails, { color: colors.text }]}>
              {userDetails?.user?.gender}
            </Text>
          </View>
        </View>
      )}

      <ScrollView>
        {isAuthenticated && (
          <>
            <RedirectOption
              text={"Edit Profile"}
              onPress={() => navigation.navigate("EditProfile")}
            />

            <RedirectOption
              text={"Your Order"}
              onPress={() => navigation.navigate("EditProfile")}
            />

            <RedirectOption
              text={"Address"}
              onPress={() => navigation.navigate("EditProfile")}
            />

            <RedirectOption
              text={"Reset Password"}
              onPress={() => navigation.navigate("EditProfile")}
            />
          </>
        )}
        <View style={styles.separator} />
        <RedirectOption
          text={"Privacy Policy"}
          onPress={() => navigation.navigate("EditProfile")}
        />
        <RedirectOption
          text={"Payment"}
          onPress={() => navigation.navigate("EditProfile")}
        />
        <RedirectOption
          text={"Shipping and Returns"}
          onPress={() => navigation.navigate("EditProfile")}
        />
        <RedirectOption
          text={"Cancellation and Refund"}
          onPress={() => navigation.navigate("EditProfile")}
        />
        <RedirectOption
          text={"Security"}
          onPress={() => navigation.navigate("EditProfile")}
        />
        <RedirectOption
          text={"Contact Us"}
          onPress={() => navigation.navigate("EditProfile")}
        />
        <RedirectOption
          text={"About Us"}
          onPress={() => navigation.navigate("EditProfile")}
        />

        <CustomModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onOk={onOk}
          onCancel={onCancel}
          title="Confirm Logout"
          message="Are you sure you want to log out?"
        />
        {isAuthenticated && (
          <View style={styles.logoutContainer}>
            <TouchableOpacity onPress={handleLogout}>
              <View style={styles.logoutBtn}>
                <Text style={styles.logoutText}>Logout</Text>
              </View>
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
  },
  authContainer: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#f8f8f8",
  },
  accountBtn: {
    backgroundColor: "black",
    borderRadius: 7,
    padding: 10,
    paddingHorizontal: 50,
    marginTop: 20,
  },
  loginText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f8f8",
    gap: 20,
  },
  profileImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  userDetails: {
    fontSize: 14,
  },
  pageRedirect: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderTopColor: "#DCDCDC",
    borderTopWidth: 0.2,
  },
  pageRedirectText: {
    fontSize: 16,
  },
  pageRedirectIcon: {
    fontSize: 20,
    color: "black",
  },
  separator: {
    height: 20,
    backgroundColor: "#f8f8f8",
  },
  logoutContainer: {
    alignItems: "center",
    marginVertical: 20,
    width: "100%",
  },
  logoutBtn: {
    borderWidth: 2,
    borderColor: "#DCDCDC",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    width: 250,
  },
  logoutText: {
    textAlign: "center",
  },
});

export default Account;
