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

// Define the type for the stack's parameters
export type RootStackParamList = {
  Main: any;
  Wishlist: any; 
  Cart: any; 
  SearchProducts: any;
  Login: any;
  SignUp: any;
  VerifyOtp: { email: string; phone: string };
  Home: any;
};

// Create the stack with the defined parameters
const Stack = createNativeStackNavigator<RootStackParamList>();

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
    </Stack.Navigator>
  );
};

export default AppNavigator;
