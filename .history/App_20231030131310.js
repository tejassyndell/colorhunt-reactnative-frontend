import React, { useState, useEffect } from "react";
import "firebase/auth";
import AppContainer from "./src/navigations/AppNavigation";
import "firebase/messaging";
import { StatusBar, Text, View, Modal, Image } from "react-native";
import NetInfo from "@react-native-community/netinfo";

export default function App() {
  const [isOffline, setOfflineStatus] = useState(false);
  const [initialRender, setInitialRender] = useState(true);
  const [networkConnected, setNetworkConnected] = useState(true);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);

      // If it's the initial render, wait for 2 seconds before hiding the modal
      if (initialRender) {
        setTimeout(() => {
          setInitialRender(false);
        }, 2000);
      }

      // Check if the network status has changed
      if (!offline && !networkConnected) {
        // Network reconnected, hide the modal
        setNetworkConnected(true);
      } else if (offline && networkConnected) {
        // Network disconnected, show the modal
        setNetworkConnected(false);
      }
    });

    return () => removeNetInfoSubscription();
  }, [initialRender, networkConnected]);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="white"
        translucent={false}
        networkActivityIndicatorVisible={true}
      />
      {isOffline && !initialRender && !networkConnected ? (
        <Modal
          animationType="slide"
          visible={true} // Always show when offline
          onRequestClose={() => {
            // Handle modal close if needed
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
        </Modal>
      ) : null}

      <AppContainer />
    </>
  );
}
