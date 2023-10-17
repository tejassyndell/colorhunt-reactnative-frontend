import React, { useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";

import { phoneNumberValidation, udatepartytoken } from "../../api/api";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { PixelRatio } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useEffect } from "react";
import LoginStyles from "./styles.js";
const { width, height } = Dimensions.get("window");
const logoSize = Math.min(width, height) * 0.6;
import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from '@react-native-firebase/messaging';
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";
const Login = (props) => {
  const { navigation } = props;
  const route = useRoute();
  const { getstatus } = route.params;
  // State variables
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOTP] = useState(["", "", "", ""]);
  const [showLogin, setShowLogin] = useState(true);
  const [token, setToken] = useState("");
  const [show,setShow]=useState("No");
  const styles = LoginStyles();

  const getNotificationPermission = async () => {
    try {
      // const { status } =await Notifications.requestPermissionsAsync();
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      console.log(status, "statuss"); // Move this line here
      if (status === "granted") {
        setShow("Yes")
        const pushToken = (await Notifications.getExpoPushTokenAsync({
          projectId: '45ac2315-27f0-44a1-bda0-536ac873608d',
        })).data;
        console.log("Expo Push Token:", pushToken);
        setToken(pushToken);
        AsyncStorage.setItem(
          "notificationstatus",
          JSON.stringify({ status: true, token: pushToken })
        );
        console.log({ status: true, token: pushToken });
      } else {
        const {status} =await Notifications.requestPermissionsAsync();
        if (status === "granted") {
          setShow("Yes");
          const pushToken = (await Notifications.getExpoPushTokenAsync({
            projectId: '45ac2315-27f0-44a1-bda0-536ac873608d',
          })).data;
          console.log("Expo Push Token:", pushToken);
          setToken(pushToken);
          AsyncStorage.setItem(
            "notificationstatus",
            JSON.stringify({ status: true, token: pushToken })
          );
          console.log({ status: true, token: pushToken });
        }
        AsyncStorage.setItem(
          "notificationstatus",
          JSON.stringify({ status: false, token: "" })
        );
        console.log("Notification permission denied");
      }
    } catch (error) {
      console.error("Error getting notification permission:", error);
    }
  };

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };
  
  // Get the device token
  // const getDeviceToken = async () => {
  //   const token = await messaging().getToken();
  //   console.log('Device Token:', token);
  //   setToken(token);
  //   AsyncStorage.setItem(
  //             "notificationstatus",
  //             JSON.stringify({ status: true, token: token })
  //           );
  // };
  //  const gettoken = async  ()=>{
  //   requestUserPermission();
  //   getDeviceToken();
  //  }
  useEffect(() => {
// if(requestUserPermission()){
//     messaging().getToken().then((token)=>{
//       console.log('Device Token:', token);
//       setToken(token);
//       AsyncStorage.setItem(
//                 "notificationstatus",
//                 JSON.stringify({ status: true, token: token })
//               );
//     })       

//     messaging()
//       .getInitialNotification()
//       .then(async(remoteMessage) => {
//         if (remoteMessage) {
//           console.log(
//             'Notification caused app to open from quit state:',
//             remoteMessage.notification,
//           );
//         }
//       });
//       messaging().onNotificationOpenedApp(async remoteMessage => {
//         console.log(
//           'Notification caused app to open from background state:',
//           remoteMessage.notification,
//         );
//       });
//       messaging().setBackgroundMessageHandler(async remoteMessage => {
//         console.log('Message handled in the background!', remoteMessage);
//       });
//       const unsubscribe = messaging().onMessage(async remoteMessage => {
//         Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
//       });
  
//       return unsubscribe;
// }
// else{
//   console.log("Not working.....");
// }
    getNotificationPermission();
    // gettoken();
  }, []);


  // const getFCMToken = async () => {
  //   try {
  //     const token = await messaging().getToken();
  //     return token;
  //   } catch (error) {
  //     console.error('Error getting FCM token:', error);
  //     return null;
  //   }
  // }

  // const getNotificationPermission = async () => {
  //   try {
  //     const { status } = await Notifications.requestPermissionsAsync();
  //     console.log(status, "statuss"); // Move this line here
  //     if (status === "granted") {
  //       const pushToken = await getFCMToken();
  //       console.log("FCM Token:", pushToken);
  //       setToken(pushToken);
  //       AsyncStorage.setItem(
  //         "notificationstatus",
  //         JSON.stringify({ status: true, token: pushToken })
  //       );
  //       console.log({ status: true, token: pushToken });
  //     } else {
  //       AsyncStorage.setItem(
  //         "notificationstatus",
  //         JSON.stringify({ status: false, token: "" })
  //       );
  //       console.log("Notification permission denied");
  //     }
  //   } catch (error) {
  //     console.error("Error getting notification permission:", error);
  //   }
  // };

  // useEffect(() => {
  //   getNotificationPermission();
  // }, []);

  const getResponsiveImageSource = () => {
    const pixelRatio = PixelRatio.get();
    if (pixelRatio <= 1) {
      return require("../../../assets/Login/logo1x.png");
    } else if (pixelRatio <= 2) {
      return require("../../../assets/Login/logo2x.png");
    } else {
      return require("../../../assets/Login/logo3x.png");
    }
  };

  const imageSource = getResponsiveImageSource();

  useFocusEffect(
    useCallback(() => {
      async function clearAndReset() {
        try {
          await AsyncStorage.removeItem("UserData");
          setPhoneNumber("");
          setOTP(["", "", "", ""]);
          setShowLogin(true);
        } catch (error) {
          console.error("Error clearing AsyncStorage:", error);
        }
      }

      clearAndReset();
    }, [])
  );
  const handleNextOrVerify = async () => {
    if (showLogin) {
      // Check if phone number is valid (for simplicity, checking if it's 10 digits)
      if (phoneNumber.length === 10 || !phoneNumber) {
        try {
          if (!phoneNumber) {
            getstatus(false);
            // Skip phone number validation and navigate to Home
            await AsyncStorage.removeItem("UserData");
            navigation.navigate("Slider", { isLoggedIn: false });
            return;
          } else {
          }
          // Call the phoneNumberValidation function to validate the number
          const validationResponse = await phoneNumberValidation({
            number: phoneNumber,
          }).then(async (res) => {
            if (res.status === 201) {
              alert("Invalid Phone Number. Please enter a valid phone number.");
            } else if (res.status === 200) {
              // Store data in local storage
              if (res.data[0].token == token) {
              } else {
                await udatepartytoken({
                  token: token,
                  party_id: res.data[0].Id,
                }).then((res) => {
                  console.log(res.data);
                });
              }
              // console.log(res.data[0].Name);
              getstatus(true, res.data[0].Name);
              const userData = res.data; // Assuming res.data contains user data
              AsyncStorage.setItem("UserData", JSON.stringify(userData))
                .then(() => {
                  // console.log("Data stored in local storage:", userData);
                })
                .catch((error) => {
                  console.error("Error storing data in local storage:", error);
                });

              setShowLogin(false); // Switch to OTP view
            } else {
              // console.log("No");
            }
          });
        } catch (error) {
          console.error("Error validating phone number:", error);
          alert("An error occurred while validating the phone number.");
        }
      } else {
        alert("Invalid Phone Number. Please enter a 10-digit phone number.");
      }
    } else {
      // Implement OTP verification logic here.
      // For simplicity, we'll just check if the OTP is "1234".
      const enteredOTP = otp.join(""); // Concatenate OTP digits
      if (enteredOTP === "1234") {
        navigation.navigate("Slider");
      } else {
        alert("Invalid OTP. Please try again.");
      }
    }
  };
  const otpInput = [useRef(), useRef(), useRef(), useRef()];
  // Function to handle OTP digit input
  const handleOTPDigitChange = (index, text) => {
    const newOTP = [...otp];
    newOTP[index] = text;
    setOTP(newOTP);

    if (text && index < 3) {
      otpInput[index + 1].current.focus();
    }
    if (!text && index > 0) {
      otpInput[index - 1].current.focus();
    }
  };

  const buttonLabel = showLogin ? (phoneNumber ? "Next" : "Skip") : "Verify";
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }} // You might need to adjust the style as per your layout
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container1}>
        <View style={styles.imagebox}>
          <ImageBackground
            source={require("../../../assets/Login/LoginBackground.png")}
            style={styles.backgroundImage1}
            resizeMode="stretch"
          >
            <View style={styles.loginLogoContainer}>
              <Image
                source={imageSource}
                style={[
                  styles.loginLogo,
                  { height: logoSize, width: logoSize },
                ]}
              />
            </View>
          </ImageBackground>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{`Welcome! \n${show}\n${show ? token :""}`}</Text>
            <Text style={styles.subtitle}>
              {showLogin
                ? "Please Login To Continue"
                : "Please Login To Continue"}
            </Text>
            {showLogin ? (
              <View style={styles.inputContainer}>
                <View style={styles.phoneIconContainer}>
                  <Image
                    source={require("../../../assets/Login/phone.png")}
                    style={styles.phoneIcon}
                  />
                </View>
                <TextInput
                  style={[styles.input, { color: "black" }]}
                  placeholder="Phone Number"
                  placeholderTextColor="#0000004D"
                  keyboardType="numeric"
                  maxLength={10}
                  value={phoneNumber}
                  onChangeText={(text) => {
                    const numericText = text.replace(/[^0-9]/g, "");
                    setPhoneNumber(numericText);
                  }}
                />
              </View>
            ) : (
              <View style={{ width: "100%", alignItems: "center" }}>
                <View style={styles.otpContainer}>
                  {otp.map((digit, index) => (
                    <TextInput
                      key={index}
                      style={styles.otpInput}
                      placeholder=""
                      keyboardType="numeric"
                      maxLength={1}
                      value={digit}
                      onChangeText={(text) => handleOTPDigitChange(index, text)}
                      ref={otpInput[index]}
                    />
                  ))}
                </View>
              </View>
            )}
            <View style={{ width: "100%", height: 100 }}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleNextOrVerify}
              >
                <Text style={styles.buttonText}>{buttonLabel}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
