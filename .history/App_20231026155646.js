import React, { useState, useEffect } from "react";
import "firebase/auth";
import AppContainer from "./src/navigations/AppNavigation";
import "firebase/messaging";
import { StatusBar, Text, View, Modal, Image } from "react-native";
import NetInfo from "@react-native-community/netinfo";

export default function App() {
  // const [isOffline, setOfflineStatus] = useState(false);
  // const [showNetworkError, setShowNetworkError] = useState(false);

  // useEffect(() => {
  //   const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
  //     const offline = !(state.isConnected && state.isInternetReachable);
  //     setOfflineStatus(offline);
  //     if (offline) {
  //       // Set showNetworkError with a delay of 2000 milliseconds (2 seconds)

  //       setShowNetworkError(false);
  //     }
  //   });

  //   return () => removeNetInfoSubscription();
  // }, []);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="white"
        translucent={false}
        networkActivityIndicatorVisible={true}
      />
      <AppContainer />
      {/* {isOffline ? (
        // Render the network error modal when offline
        <Modal
          animationType="slide"
          transparent={false}
          visible={showNetworkError}
          onRequestClose={() => {
            // Handle modal close if needed
            setShowNetworkError(false);
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <Image
              source={require("./assets/wifiSignal.png")}
              style={{
                width: 50,
                height: 50,
                borderRadius: 5,
              }}
            ></Image>
            <Text style={{ marginTop: 10 }}>No Internet Connection</Text>
          </View>
        </Modal>
      ) : (
        // Render the AppContainer when online
        
      )} */}
    </>
  );
}
