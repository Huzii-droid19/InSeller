import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrderDetails from "../screens/OrderDetails";
import Login from "../screens/Login";
import Main from "../screens/Main";
import AddItem from "../screens/AddItem";
import Signup from "../screens/Signup";
import DrawerNavigator from "./DrawerNavigator";
const Root = createNativeStackNavigator();
import { useSelector } from "react-redux";
import AddCategory from "../screens/AddCategory";
import EditItem from "../screens/EditItem";
import Editcategory from "../screens/Editcategory";

const RootNavigator = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <Root.Navigator
      initialRouteName={Object.keys(user).length === 0 ? "Main" : "drawer"}
    >
      <Root.Screen
        name="Main"
        component={Main}
        options={{
          headerShown: false,
        }}
      />
      <Root.Screen
        name="login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Root.Screen
        name="signup"
        component={Signup}
        options={{
          headerShown: false,
        }}
      />
      <Root.Screen
        name="drawer"
        component={DrawerNavigator}
        options={{
          headerShown: false,
        }}
      />

      <Root.Screen name="OrderDetails" component={OrderDetails} />
      <Root.Screen name="Item-Add" component={AddItem} />
      <Root.Screen name="Item-Edit" component={EditItem} />
      <Root.Screen name="Category-Add" component={AddCategory} />
      <Root.Screen name="Category-Edit" component={Editcategory} />
    </Root.Navigator>
  );
};

export default RootNavigator;
