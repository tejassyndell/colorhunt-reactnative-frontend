import React from "react";
import "firebase/auth";
import AppContainer from "./src/navigations/AppNavigation";
import messaging from "@react-native-firebase/messaging";
import "firebase/messaging";

export default function App() {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return <AppContainer />;
}
