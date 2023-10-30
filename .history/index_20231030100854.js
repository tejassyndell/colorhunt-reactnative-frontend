import { registerRootComponent } from "expo";

import App from "./App";
import { AppRegistry } from "react-native-web";
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("Message handled in the background!", remoteMessage);
});

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
// registerRootComponent(App)
AppRegistry.registerRootComponent(appName, () => App);
