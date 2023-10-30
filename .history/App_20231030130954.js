import React, { useState, useEffect } from "react";
import "firebase/auth";
import AppContainer from "./src/navigations/AppNavigation";
import "firebase/messaging";
import { StatusBar, Text, View, Modal, Image } from "react-native";
import NetInfo from "@react-native-community/netinfo";

export default function App() {
  const [isOffline, setOfflineStatus] = useState(false);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
    });

    return () => removeNetInfoSubscription();
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
      {isOffline ? (
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
