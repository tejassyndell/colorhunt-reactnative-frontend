import React, { useState, useEffect } from 'react';
import 'firebase/auth';
import AppContainer from './src/navigations/AppNavigation';
import 'firebase/messaging';
import { StatusBar, Text, View, Modal, Image } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

export default function App() {
  const [isOffline, setOfflineStatus] = useState(false);
  const [showNetworkError, setShowNetworkError] = useState(false);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);

      // Show the network error popup when offline
      setShowNetworkError(offline);
    });

    return () => removeNetInfoSubscription();
  }, []);

  // Define your fetchUsers function or replace this with your actual data fetching logic
  const fetchUsers = () => {
    // Your data fetching logic here
  };

  fetchUsers();

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
      {isOffline ? (
        <AppContainer />
      ) : (
        <AppContainer />
      )}

      {/* Network Error Popup */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showNetworkError}
        onRequestClose={() => {
          // Handle modal close if needed
          setShowNetworkError(false);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white', // Set the background color to white
          }}
        >
          <Image
            source={require("./assets/wifiSignal.png")}
            style={{
              width: 50, // Adjust the width as needed
              height: 50, // Adjust the height as needed
              borderRadius: 5,
            }}
          ></Image>
          <Text style={{ marginTop: 10 }}>No Internet Connection</Text>
        </View>
      </Modal>
    </>
  );
}
