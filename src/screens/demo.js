// import React, { useState, useCallback, useRef, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   Dimensions,
//   ImageBackground,
// } from "react-native";

// import { phoneNumberValidation, udatepartytoken } from "../../api/api";
// import { useFocusEffect, useRoute } from "@react-navigation/native";
// import { PixelRatio } from "react-native";
// import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
// import * as Notifications from "expo-notifications";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const { width, height } = Dimensions.get("window");
// const logoSize = Math.min(width, height) * 0.6;

// const windowWidth = Dimensions.get("window").width;
// const windowHeight = Dimensions.get("window").height;

// const Login = (props) => {
//   const { navigation } = props;
//   const route = useRoute();
//   const { getstatus } = route.params;

//   // State variables
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [otp, setOTP] = useState(["", "", "", ""]);
//   const [showLogin, setShowLogin] = useState(true);
//   const [token, setToken] = useState("");
//   const [isFontLoaded, setIsFontLoaded] = useState(true); // Set isFontLoaded to true

//   useEffect(() => {
//     const loadCustomFont = async () => {
//       try {
//         await Font.loadAsync({
//           Glory: require("../../../assets/Fonts/Glory.ttf"),
//         });
//         setIsFontLoaded(true);
//       } catch (error) {
//         console.error("Error loading custom font:", error);
//       }
//     };
  
//     loadCustomFont();
//   }, []);

//   const getNotificationPermission = async () => {
//     try {
//       const { status } = await Notifications.requestPermissionsAsync();
//       console.log(status, "statuss"); // Move this line here
//       if (status === "granted") {
//         const pushToken = (await Notifications.getExpoPushTokenAsync()).data;
//         console.log("Expo Push Token:", pushToken);
//         setToken(pushToken);
//         AsyncStorage.setItem(
//           "notificationstatus",
//           JSON.stringify({ status: true, token: pushToken })
//         );
//         console.log({ status: true, token: pushToken });
//       } else {
//         AsyncStorage.setItem(
//           "notificationstatus",
//           JSON.stringify({ status: false, token: "" })
//         );
//         console.log("Notification permission denied");
//       }
//     } catch (error) {
//       console.error("Error getting notification permission:", error);
//     }
//   };

//   useEffect(() => {
//     getNotificationPermission();
//   }, []);

//   // Rest of your component code...

//   return (
//     <View style={styles.container1}>
//       {/* ... (rest of your JSX) */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   contentContainer: {
//     width: "100%",
//     alignItems: "center",
//     justifyContent: "center",
//     position: "absolute",
//     bottom: 0,
//   },
//   title: {
//      fontFamily: isFontLoaded ? 'Glory' : undefined,
//     color: "white",
//     fontSize: windowWidth * 0.07,
//     fontWeight: 700,
//     marginBottom: "2%",
//   },
//   subtitle: {
//      fontFamily: isFontLoaded ? 'Glory' : undefined,
//     color: "#BCBCBC",
//     fontSize: windowWidth * 0.04,
//     fontWeight: 700,
//     marginBottom: 80,
//   },
//   input: {
//      fontFamily: isFontLoaded ? 'Glory' : undefined,
//     flex: 1,
//     fontSize: width >= 720 ? 35 : 20,
//     height: width >= 720 ? 80 : 50,
//     paddingLeft: 5,
//     backgroundColor: "white",
//     borderTopRightRadius: 7,
//     borderBottomRightRadius: 7,
//     color: "#000000",
//   },
//   otpContainer: {
//     height: "auto",
//     flexDirection: "row",
//     width: width >= 720 ? 400 : "60%",
//     marginBottom: "10%",
//     justifyContent: "space-between",
//   },
//   otpInput: {
//      fontFamily: isFontLoaded ? 'Glory' : undefined,
//     width: width >= 720 ? 90 : 47,
//     justifyContent: "space-between",
//     height: width >= 720 ? 90 : 50,
//     borderColor: "gray",
//     borderWidth: 1,
//     backgroundColor: "white",
//     fontSize: width >= 720 ? 40 : 23,
//     borderRadius: 7,
//     textAlign: "center",
//   },
//   button: {
//     backgroundColor: "#212121",
//     width: width >= 720 ? 220 : 148,
//     height: width >= 720 ? 70 : 50,
//     borderRadius: 10,
//     position: "absolute",
//     justifyContent: "center",
//     alignItems: "center",
//     bottom: 0,
//     right: 0,
//   },
//   buttonText: {
//     fontFamily: isFontLoaded ? 'Glory' : undefined,
//     color: "white",
//     fontSize: width >= 720 ? 40 : 23,
//     fontWeight: 700,
//     textAlign: "center",
//   },
//   phoneIcon: {
//     height: width >= 720 ? 35 : 20,
//     width: width >= 720 ? 35 : 20,
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "90%",
//     height: width >= 720 ? 80 : 10,
//     borderColor: "gray",
//     borderRadius: 7,
//     marginBottom: windowHeight * 0.046,
//     justifyContent: "center",
//   },
//   phoneIconContainer: {
//     height: width >= 720 ? 80 : 50,
//     width: width >= 720 ? 80 : 50,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#FFF",
//     borderRadius: 7,
//     borderRightWidth: 3,
//     borderColor: "#212121",
//   },
//   container1: {
//     flex: 1,
//     padding: 20,
//   },
//   backgroundImage1: {
//     flex: 1,
//     resizeMode: "stretch",
//     width: "100%",
//   },
//   loginContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   loginLogoContainer: {
//     position: "absolute",
//     top: "40%",
//     left: "50%",
//     transform: [{ translateX: -logoSize / 2 }, { translateY: -logoSize / 2 }],
//   },
//   loginLogo: {
//     resizeMode: "contain",
//   },
//   imagebox: {
//     flex: 1,
//   },
// });

// export default Login;
