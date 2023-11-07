import React, { useState, useEffect } from "react";
import "firebase/auth";
import AppContainer from "./src/navigations/AppNavigation";
import "firebase/messaging";
import { StatusBar, Text, View, Modal, Image } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import messaging from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [isOffline, setOfflineStatus] = useState(false);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
      getNotificationToken();
      // getNoticicationToken();
    }
  }
  useEffect(() => {
    requestUserPermission();
  }, []);

  const getNoticicationToken = async () => {
    try {
      await messaging().registerDeviceForRemoteMessages();
      const notificationToken = await messaging().getToken();
      console.log("noti-token get succefully ", notificationToken);
    } catch (error) {
      console.log(error, "error in getToken ");
      alert(error?.message);
    }
  };

  const getNotificationToken = async () => {
    let notificationToken = await AsyncStorage.getItem("UserData");
    console.log(notificationToken, "the old token");
    if (notificationToken) {
    }
    try {
      const notificationToken = await messaging().getToken();
      if (notificationToken) {
        console.log(notificationToken, "gentrate a new token");
        await AsyncStorage.setItem("UserData", notificationToken);
      }
    } catch (error) {
      console.log(error, "error in notifationtoken ");
    }
  };

  // useEffect(() => {
  //   getNotificationToken();
  // }, []);

  // const [showNetworkError, setShowNetworkError] = useState(false);

  // Function to enable/disable font scaling for a specific Text component

  // useEffect(() => {
  //   const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
  //     const offline = !(state.isConnected && state.isInternetReachable);
  //     const online = state.isConnected && state.isInternetReachable;
  //     setOfflineStatus(offline);
  //     if (offline) {
  //       // Set showNetworkError with a delay of 2000 milliseconds (2 seconds)
  //       setShowNetworkError(true);
  //     } else if (online) {
  //       setShowNetworkError(false);
  //     } else {
  //       setShowNetworkError(false);
  //     }

  //     // Call the setFontScaling function to disable font scaling

  //   });

  //   return () => removeNetInfoSubscription();
  // }, []);

  // Define your fetchUsers function or replace this with your actual data fetching logic
  // const fetchUsers = () => {
  //   // Your data fetching logic here
  // };

  // fetchUsers();

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="white"
        translucent={false}
        networkActivityIndicatorVisible={true}
      />
      {isOffline ? <AppContainer /> : <AppContainer />}

      {/* <Modal
        animationType="slide"
        visible={showNetworkError}
        onRequestClose={() => {
          // Handle modal close if needed
          setShowNetworkError(false);
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            zIndex: 2,
          }}
        >
          <View
            style={{
              width: "70%",
              backgroundColor: "white",
              position: "absolute",
              bottom: "45%",
              marginLeft: "13%",
              padding: 15,
              borderRadius: 20, // Set the background color to white
            }}
          >
            <Image
              source={require("./assets/wifiSignal.png")}
              style={{
                width: 50, // Adjust the width as needed
                height: 50, // Adjust the height as needed
                borderRadius: 5,
                left: "42%",
              }}
            ></Image>
            <Text style={{ marginTop: 10, left: "26%" }}>
              No Internet Connection
            </Text>
          </View>
        </View>
      </Modal> */}
    </>
  );
}
