import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./Navigation/RootNavigator";
import { Colors } from "./colors";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import {
  useFonts,
  Poppins_100Thin,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";
import { RootSiblingParent } from "react-native-root-siblings";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <RootSiblingParent>
            <ActionSheetProvider>
              <SafeAreaView
                style={{
                  flex: 1,
                  paddingTop: Platform.OS === "android" ? 24 : 0,
                }}
              >
                <RootNavigator />
                <StatusBar style="auto" backgroundColor={Colors.primary} />
              </SafeAreaView>
            </ActionSheetProvider>
          </RootSiblingParent>
        </NavigationContainer>
      </Provider>
    );
  }
}
