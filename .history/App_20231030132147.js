import React, { useState, useEffect } from "react";
import "firebase/auth";
import AppContainer from "./src/navigations/AppNavigation";
import "firebase/messaging";
import { StatusBar, Text, View, Modal, Image } from "react-native";
import NetInfo from "@react-native-community/netinfo";

export default function App() {
  const [isOffline, setOfflineStatus] = useState(false);
  const [showNetworkError, setShowNetworkError] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);

      if (isLoading) {
        // If the app is still loading, don't show the network error modal
        setIsLoading(false);
        return;
      }

      if (offline) {
        setShowNetworkError(true);
      } else {
        setShowNetworkError(false);
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

      {isLoading ? ( // Show loading indicator or splash screen during startup
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Loading...</Text>
        </View>
      ) : isOffline ? (
        // Display the network error modal when offline
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
      ) : (
        // Render your AppContainer when connected
        <AppContainer />
      )}
    </>
  );
}
