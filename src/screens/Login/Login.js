import React, { useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";

import { phoneNumberValidation, udatepartytoken } from "../../api/api";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { PixelRatio } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
// import * as Notifications from "expo-notifications";
import { useEffect } from "react";
const { width, height } = Dimensions.get("window");
const logoSize = Math.min(width, height) * 0.4;
import AsyncStorage from "@react-native-async-storage/async-storage";
import loginStyles from "./loginStyles";
const Login = (props) => {
  const { navigation } = props;
  const route = useRoute();
  const { getstatus } = route.params;
  // State variables
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOTP] = useState(["", "", "", ""]);
  const [showLogin, setShowLogin] = useState(true);
  const [token, setToken] = useState("");

  // const getNotificationPermission = async () => {
  //   try {
  //     const { status } = await Notifications.requestPermissionsAsync()
  //     console.log(status, "statuss"); // Move this line here
  //     if (status === "granted") {
  //       const pushToken = (await Notifications.getExpoPushTokenAsync()).data;
  //       console.log("Expo Push Token:", pushToken);
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
        // Navigate to the Home screen or your desired destination.
        navigation.navigate("Slider");
      } else {
        // Handle invalid OTP (display an error message, etc.).
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
    <View style={loginStyles.container1}>
      <View style={loginStyles.imagebox}>
        <ImageBackground
          source={require("../../../assets/Login/LoginBackground.png")}
          style={loginStyles.backgroundImage1}
          resizeMode="stretch"
        >
          <View style={loginStyles.loginLogoContainer}>
            <Image
              source={imageSource}
              style={[
                loginStyles.loginLogo,
                { height: logoSize, width: logoSize },
              ]}
            />
          </View>
        </ImageBackground>
        <View style={loginStyles.contentContainer}>
          <Text style={loginStyles.title}>Welcome!</Text>
          <Text style={loginStyles.subtitle}>
            {showLogin
              ? "Please Login To Continue"
              : "Please Login To Continue"}
          </Text>
          {showLogin ? (
            <View style={loginStyles.inputContainer}>
              <View style={loginStyles.phoneIconContainer}>
                <Image
                  source={require("../../../assets/Login/phone.png")}
                  style={loginStyles.phoneIcon}
                />
              </View>
              <TextInput
                style={[loginStyles.input, { color: "black" }]}
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
              <View style={loginStyles.otpContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    style={loginStyles.otpInput}
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
              style={loginStyles.button}
              onPress={handleNextOrVerify}
            >
              <Text style={loginStyles.buttonText}>{buttonLabel}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;
