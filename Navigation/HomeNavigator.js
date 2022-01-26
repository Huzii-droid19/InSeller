import React from "react";
import Order from "../screens/Order";
import Home from "../screens/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function HomeNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="Order" component={Order} />
    </Stack.Navigator>
  );
}
export default HomeNavigator;
