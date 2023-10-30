import React, { useState, useEffect } from "react";
import "firebase/auth";
import AppContainer from "./src/navigations/AppNavigation";
import "firebase/messaging";
import { StatusBar, Text, View, Modal, Image } from "react-native";
import NetInfo from "@react-native-community/netinfo";

export default function App() {
  const [isOffline, setOfflineStatus] = useState(false);
  const [showNetworkError, setShowNetworkError] = useState(false); // Initialize to false

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);

      // Only set showNetworkError if offline, not when online
      if (offline) {
        // Set showNetworkError with a delay of 2000 milliseconds (2 seconds)
        setShowNetworkError(true);
      }
    });

    return () => removeNetInfoSubscription();
  }, []);

  // Define your fetchUsers function or replace this with your actual data fetching logic
  const fetchUsers = () => {
    // Your data fetching logic here
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="white"
        translucent={false}
        networkActivityIndicatorVisible={true}
      />
      {/* Render your AppContainer with network error handling */}
      {isOffline ? <AppContainer /> : <AppContainer />}

      {/* Network Error Popup */}
      <Modal
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
              padding: 5,
              borderRadius: 20,
            }}
          >
            <Image
              source={require("./assets/wifiSignal.png")}
              style={{
                width: 50,
                height: 50,
                borderRadius: 5,
                left: "42%",
              }}
            ></Image>
            <Text style={{ marginTop: 10, left: "26%" }}>
              No Internet Connection
            </Text>
          </View>
        </View>
      </Modal>
    </>
  );
}
