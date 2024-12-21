import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Wishlist from "../screens/Wishlist";
import Cart from "../screens/Cart";
import CustomBottomTabNavigator from "./CustomBottomTabNavigation";
import SearchProducts from "../screens/SearchProducts";
import SignUp from "../screens/authScreens/SignUp";
import VerifyOtp from "../screens/authScreens/VerifyOtp";
import Login from "../screens/authScreens/Login";
import Home from "../screens/Home";
import EditProfile from "src/screens/accountScreens/EditProfile";
import { ScreensParamList } from "./types";
import YourOrder from "src/screens/accountScreens/YourOrders";
import Address from "src/screens/accountScreens/Address";
import AddAddress from "src/screens/accountScreens/AddAddress";
import ResetPassword from "src/screens/accountScreens/ResetPasswod";
import EditAddress from "src/screens/accountScreens/EditAddress";

// Create the stack with the defined parameters
const Stack = createNativeStackNavigator<ScreensParamList>();

const AppNavigator: React.FC = () => {
  //   const { token } = useAuthStore();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={CustomBottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Wishlist"
        component={Wishlist}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Cart"
        component={Cart}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SearchProducts"
        component={SearchProducts}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SignUp"
        component={SignUp}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="VerifyOtp"
        component={VerifyOtp}
      />
      {/* Account page all navigation  */}

      <Stack.Screen
        options={{ headerShown: false }}
        name="EditProfile"
        component={EditProfile}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="YourOrders"
        component={YourOrder}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Address"
        component={Address}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AddAddress"
        component={AddAddress}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="EditAddress"
        component={EditAddress}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ResetPassword"
        component={ResetPassword}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
