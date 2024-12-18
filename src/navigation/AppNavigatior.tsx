import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Wishlist from "../screens/Wishlist";
import Cart from "../screens/Cart";
import CustomBottomTabNavigator from "./CustomBottomTabNavigation";
import SearchProducts from "../screens/SearchProducts";
// import WishlistScreen from "../screens/WishlistScreen";
// import CartScreen from "../screens/CartScreen";

// import useAuthStore from "../store/authStore";

// Define the type for the stack's parameters
export type RootStackParamList = {
  Main: any; // No params for Main
  Wishlist: any; // No params for Wishlist
  Cart: any; // No params for Cart
  SearchProducts: any;
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
        name="Cart"
        component={Cart}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SearchProducts"
        component={SearchProducts}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
