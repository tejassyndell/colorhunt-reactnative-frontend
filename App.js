import React from 'react';
import 'firebase/auth';
import AppContainer from './src/navigations/AppNavigation';
import 'firebase/messaging';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <>
      <StatusBar
         barStyle = "dark-content"
         // dark-content, light-content and default
         hidden = {false}
         //To hide statusBar
         backgroundColor = "white"
         //Background color of statusBar only works for Android
         translucent = {false}
         //allowing light, but not detailed shapes
         networkActivityIndicatorVisible = {true}
      />
      <AppContainer />
    </>
  );
}
