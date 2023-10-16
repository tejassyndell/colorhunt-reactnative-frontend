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
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
<<<<<<< HEAD
const { width, height } = Dimensions.get("window");
const logoSize = Math.min(width, height) * 0.4;
=======
import LoginStyles from "./styles.js";
const { width, height } = Dimensions.get("window");
const logoSize = Math.min(width, height) * 0.6;
>>>>>>> miltestone-test
import AsyncStorage from "@react-native-async-storage/async-storage";

// import messaging from '@react-native-firebase/messaging';

const Login = (props) => {
  const { navigation } = props;
  const route = useRoute();
  const { getstatus } = route.params;
  // State variables
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOTP] = useState(["", "", "", ""]);
  const [showLogin, setShowLogin] = useState(true);
  const [token, setToken] = useState("");
<<<<<<< HEAD
=======
  const styles = LoginStyles();
>>>>>>> miltestone-test

  const getNotificationPermission = async () => {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      console.log(status, "statuss"); // Move this line here
      if (status === "granted") {
<<<<<<< HEAD
        const pushToken = (await Notifications.getExpoPushTokenAsync()).data;
=======
        const pushToken = (await Notifications.getExpoPushTokenAsync({
          projectId: 'b0d5d035-7a66-4a0f-b5ec-33b84d030443',
        })).data;
>>>>>>> miltestone-test
        console.log("Expo Push Token:", pushToken);
        setToken(pushToken);
        AsyncStorage.setItem(
          "notificationstatus",
          JSON.stringify({ status: true, token: pushToken })
        );
        console.log({ status: true, token: pushToken });
      } else {
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

  useEffect(() => {
<<<<<<< HEAD
    getNotificationPermission();
  }, []);
=======
    
    getNotificationPermission();
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
>>>>>>> miltestone-test

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
<<<<<<< HEAD
      // if (enteredOTP === "1234") {
        // Navigate to the Home screen or your desired destination.
        navigation.navigate("Slider");
      // } else {
        // Handle invalid OTP (display an error message, etc.).
        // alert("Invalid OTP. Please try again.");
      // }
=======
      if (enteredOTP === "1234") {
        navigation.navigate("Slider");
      } else {
        alert("Invalid OTP. Please try again.");
      }
>>>>>>> miltestone-test
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
<<<<<<< HEAD
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
=======
          </ImageBackground>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Welcome!</Text>
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
>>>>>>> miltestone-test
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

<<<<<<< HEAD
const styles = StyleSheet.create({
  contentContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
  },
  title: {
    color: "white",
    fontSize: windowWidth * 0.07,
    // fontSize:RFPercentage(5),
    fontWeight: 700,
    marginBottom: "2%",
  },
  subtitle: {
    color: "#FFFFFF",
    fontSize: windowWidth * 0.04,
    // fontSize:RFPercentage(5),
    fontWeight: 700,
    marginBottom: 80,
  },
  input: {
    flex: 1,
    fontSize: width >= 720 ? 35 : 20,
    height: width >= 720 ? 80 : 50,
    paddingLeft: 5,
    backgroundColor: "white",
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,

    color: "#000000",
  },
  otpContainer: {
    height: "auto",
    flexDirection: "row",
    width: width >= 720 ? 400 : "60%",
    marginBottom: "10%",
    justifyContent: "space-between",
  },
  otpInput: {
    width: width >= 720 ? 90 : 47,
    justifyContent: "space-between",
    height: width >= 720 ? 90 : 50,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    fontSize: width >= 720 ? 40 : 23,
    borderRadius: 7,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#212121",
    width: width >= 720 ? 220 : 148,
    height: width >= 720 ? 70 : 50,
    borderRadius: 10,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
    right: 0,
  },
  buttonText: {
    color: "white",
    fontSize: width >= 720 ? 40 : 23,
    fontWeight: 700,
    textAlign: "center",
  },
  phoneIcon: {
    height: width >= 720 ? 35 : 20,
    width: width >= 720 ? 35 : 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    height: width >= 720 ? 80 : 10,
    borderColor: "gray",
    borderRadius: 7,
    marginBottom: windowHeight * 0.046,
    justifyContent: "center",
  },
  phoneIconContainer: {
    height: width >= 720 ? 80 : 50,
    width: width >= 720 ? 80 : 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 7,
    borderRightWidth: 3,
    borderColor: "#212121",
  },
  container1: {
    flex: 1,
    padding: 20,
  },
  backgroundImage1: {
    flex: 1,
    resizeMode: "stretch",
    width: "100%",
  },
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginLogoContainer: {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: [{ translateX: -logoSize / 2 }, { translateY: -logoSize / 2 }],
  },
  loginLogo: {
    resizeMode: "contain",
  },
  imagebox: {
    flex: 1,
  },
});

=======
>>>>>>> miltestone-test
export default Login;
