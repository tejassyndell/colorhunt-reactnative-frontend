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
  Keyboard,
  ActivityIndicator,
  Alert,
} from "react-native";

import { phoneNumberValidation, udatepartytoken } from "../../api/api";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { PixelRatio } from "react-native";
import { useEffect } from "react";
import LoginStyles from "./styles.js";
import Svg, { Path, G } from "react-native-svg";
import Loader from "../../components/Loader/Loader";
const { width, height } = Dimensions.get("window");

import AsyncStorage from "@react-native-async-storage/async-storage";
import WhiteLogo from "../../jssvgs/WhiteLogo ";
// import messaging from "@react-native-firebase/messaging";
// import PushNotification from "react-native-push-notification";
// import { requestPermissionsAsync } from "expo-notifications";

const Login = (props) => {
  const { navigation } = props;
  const route = useRoute();
  const { getstatus } = route.params;
  // State variables
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOTP] = useState(["", "", "", ""]);
  const [showLogin, setShowLogin] = useState(true);
  const [token, setToken] = useState("");
  const styles = LoginStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingSplace, setIsLoadingSplace] = useState(true);

  const initialLogoSize = Math.min(width, height) * 0.5;
  const [logoSize, setLogoSize] = useState(initialLogoSize);
  const [leftPosition, setLeftPosition] = useState("50%");

  useEffect(() => {
    // This is the code that runs after the component mounts
    // Start a timer with a delay of 2000 milliseconds (2 seconds)
    const timeoutId = setTimeout(() => {
      // Perform actions you want after the timeout (e.g., change loading state)
      setIsLoadingSplace(false);
    }, 2050);

    // Return a cleanup function to clear the timer if the component unmounts
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  // const requestUserPermission = async () => {
  //   const status = await requestPermissionsAsync();
  //   try {
  //     const authStatus = await messaging().requestPermission();
  //     const enabled =
  //       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //       authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //     console.log('Authorization status:', authStatus, enabled);
  //     return enabled;
  //   } catch (error) {
  //     console.error('Error requesting permission:', error);
  //     return false;
  //   }
  // }
  //  ? const keyboardDidShow = () => {
  //     const newSize = Math.min(width, height) * 0.3; // Adjust size when the keyboard is shown
  //     setLogoSize(newSize);
  //     setLeftPosition("65%");
  //   };

  //   const keyboardDidHide = () => {
  //     setLogoSize(initialLogoSize); // Set it back to the original size when the keyboard is hidden
  //     setLeftPosition("50%");
  //   };

  // useEffect(() => {
  //   const keyboardDidShowListener = Keyboard.addListener(
  //     "keyboardDidShow",
  //     keyboardDidShow
  //   );
  //   const keyboardDidHideListener = Keyboard.addListener(
  //     "keyboardDidHide",
  //     keyboardDidHide
  //   );

  //   return () => {
  //     keyboardDidShowListener.remove();
  //     keyboardDidHideListener.remove();
  //   };
  // }, []);
  useEffect(() => {
    AsyncStorage.setItem("notificationstatus", JSON.stringify({ status: true, token: token })).then(() => {
      // console.log("Data stored in local storage:", userData);
    })
      .catch((error) => {
        console.error("Error storing data in local storage:", error);
      });

  }, [])
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
          }).then((res) => {
            if (res && res.status == 200) {
              if (res.data[0].Status == 0) {
                Alert.alert("Invalid Phone Number. Please enter a valid phone number.");
              }
              else if (res.data[0].Status == 1) {
                setIsLoading(true);

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
                setIsLoading(false);
              }
            } else {
              console.log(res, "error");
              Alert.alert("Server is not responding");
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

  const gifImageSource = require("../../../assets/Loader/Screen.gif");
  return (
    <>
      {isLoadingSplace ? (
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#FFF",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={gifImageSource}
            style={{ resizeMode: "contain", width: "90%" }}
          />
        </View>
      ) : (
        <KeyboardAvoidingView
          style={{ flex: 1, justifyContent: "center" }} // You might need to adjust the style as per your layout
          behavior={Platform.OS === "ios" ? "padding" : null}
        >
          <View style={styles.container1}>
            <View style={styles.imagebox}>
              <ImageBackground
                source={require("../../../assets/Login/LoginBackground.png")}
                style={styles.backgroundImage1}
                resizeMode="stretch"
              >
                <View
                  style={[styles.loginLogoContainer, { left: leftPosition }]}
                >
                  {/* <Image
                source={imageSource}
                style={[
                  styles.loginLogo,
                  { height: logoSize, width: logoSize },
                ]}
              /> */}
                  <WhiteLogo path={imageSource} />
                </View>
              </ImageBackground>
              <View style={styles.contentContainer}>
                {showLogin ? (
                  <View
                    style={{ width: "100%", alignItems: "center", height: 140 }}
                  >
                    <Text style={styles.title}>Welcome!</Text>
                    <Text style={styles.subtitle}>
                      {showLogin
                        ? "Please Login To Continue"
                        : "Please Login To Continue"}
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{
                      width: "100%",
                      alignItems: "center",
                      height: "31%",
                    }}
                  >
                    <Text style={styles.title}>Welcome!</Text>
                    <Text style={styles.subtitle}>
                      {showLogin
                        ? "Please Login To Continue"
                        : "Please Login To Continue"}
                    </Text>
                  </View>
                )}
                {showLogin ? (
                  <View style={styles.inputContainer}>
                    <View style={styles.phoneIconContainer}>
                      <Svg
                        style={styles.phoneIcon}
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <G id="Layer 5">
                          <Path
                            id="Vector"
                            d="M19.51 16.0209C19.5113 16.8773 19.1985 17.7045 18.6309 18.3459C18.0633 18.9872 17.2803 19.3981 16.43 19.5009C16.29 19.5109 16.14 19.5109 16 19.5109C15.86 19.5109 15.71 19.5109 15.57 19.5009C11.4023 19.3911 7.44228 17.6581 4.53384 14.671C1.6254 11.6839 -0.00144415 7.67904 9.61936e-07 3.50991C0.000172717 2.95646 0.131181 2.41089 0.382337 1.91771C0.633493 1.42453 0.997683 0.997703 1.44519 0.672063C1.89271 0.346423 2.41086 0.131189 2.95739 0.0439214C3.50392 -0.0433463 4.06333 -0.000175148 4.59 0.169911C4.59265 0.169911 4.5952 0.170965 4.59707 0.17284C4.59895 0.174715 4.6 0.177258 4.6 0.179911L6.67 5.02991C6.465 5.45858 6.17486 5.84102 5.81726 6.15392C5.45966 6.46682 5.04209 6.70363 4.59 6.84991C5.15587 8.76274 6.19176 10.5034 7.60315 11.913C9.01454 13.3227 10.7565 14.3564 12.67 14.9199C12.8172 14.4681 13.0556 14.0512 13.3704 13.6952C13.6851 13.3391 14.0696 13.0514 14.5 12.8499L19.33 14.9099V14.9199C19.4521 15.274 19.5129 15.6464 19.51 16.0209Z"
                            fill="#212121"
                          />
                        </G>
                      </Svg>
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
                  <>
                    {isLoading ? (
                      <View
                        style={{
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Loader />
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
                              onChangeText={(text) =>
                                handleOTPDigitChange(index, text)
                              }
                              ref={otpInput[index]}
                            />
                          ))}
                        </View>
                      </View>
                    )}
                  </>
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
      )}
    </>
  );
};

export default Login;
