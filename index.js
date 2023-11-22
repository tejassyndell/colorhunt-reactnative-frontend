import { registerRootComponent } from "expo";
import React from "react";
import App from "./App";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { Text, TextInput } from "react-native";

// Set default props for Text components to disable font scaling
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

// Set default props for TextInput placeholder text to disable font scaling
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.placeholderTextColor = "#a8a8a8"; // Adjust as needed
TextInput.defaultProps.allowFontScaling = false;


const AppRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

registerRootComponent(AppRedux);
