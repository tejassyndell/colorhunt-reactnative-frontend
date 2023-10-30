import React from 'react';
import 'firebase/auth';
import AppContainer from './src/navigations/AppNavigation';
import 'firebase/messaging';
import { StatusBar, Text, View, Modal, Image } from "react-native";




export default function App() {


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
    </>
  );
}