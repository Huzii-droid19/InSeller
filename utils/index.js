import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import * as Location from "expo-location";
import { Linking, Alert, BackHandler } from "react-native";
import * as Notifications from "expo-notifications";

import * as Device from "expo-device";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: false,
    aspect: [4, 3],
    quality: 0.5,
    base64: true,
    maxHeight: 50,
    maxWidth: 50,
  });
  if (!result.cancelled) {
    return result;
  }
};

export const addToast = (message, isError) => {
  Toast.show({
    type: isError ? "error" : "success",
    position: "top",
    text1: isError ? "Error" : "Success 🎉",
    text2: message,
    visibilityTime: 3000,
  });
};
export const getCategoryId = (categories, categoryName) => {
  let categoryId = 0;
  if (categories?.length > 0) {
    categories?.forEach((category) => {
      if (category.name === categoryName) {
        categoryId = category.id;
      }
    });
  }
  return categoryId;
};

const _getLocationAsync = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    /* If user hasn't granted permission to geolocate himself herself */
    Alert.alert(
      "User location not detected",
      "You haven't granted permission to detect your location. Please Provide location access",
      [{ text: "Open Settings", onPress: () => Linking.openSettings() }]
    );
    return;
  } else {
    /* If user has granted permission to geolocate himself herself */
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
    });
    return {
      status: true,
      location: location,
    };
  }
};

export const storeLocation = (setLocation) => {
  _getLocationAsync()
    .then((location) => {
      setLocation(location.location.coords);
    })
    .catch((error) => {
      Alert.alert(
        error.message,
        "You haven't granted permission to detect your location.",
        [
          {
            text: "Allow For permission",
            onPress: () => {
              _getLocationAsync()
                .then((location) => {
                  if (location) {
                    setLocation(location.location.coords);
                  }
                })
                .catch((err) => {
                  Alert.alert(
                    err.message,
                    "You haven't granted permission to detect your location.\nRestarting your application",
                    [
                      {
                        text: "Ok",
                        onPress: () => {
                          BackHandler.exitApp();
                        },
                      },
                    ]
                  );
                });
            },
          },
        ]
      );
    });
};

export const registerForPushNotificationsAsync = async () => {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
};

export const schedulePushNotification = async (title, message) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: message,
    },
    trigger: { seconds: 0 },
  });
};
