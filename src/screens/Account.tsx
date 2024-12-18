import { NavigationProp, useNavigation } from "@react-navigation/native";
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

const Account: React.FC = () => {
  const [isBoy, setIsBoy] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  // Properly define the navigation hook with BottomTabParamList type
  const navigation = useNavigation<NavigationProp<BottomTabParamList>>();
  // Function to handle fade transition
  const toggleImage = () => {
    // Fade out
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

  // Toggle the image every 500 milliseconds
  useEffect(() => {
    const interval = setInterval(toggleImage, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      {/* Account  */}
      <View style={{}}>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <View style={styles.defaultImgContainer}>
            <Animated.Image
              style={[styles.profileImg, { opacity: fadeAnim }]}
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
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
});

export default Account;