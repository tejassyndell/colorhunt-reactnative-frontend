import React, { useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";
import { phoneNumberValidation } from "../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Login = (props) => {
  const { navigation } = props;

  // State variables
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOTP] = useState(["", "", "", ""]);
  const [showLogin, setShowLogin] = useState(true);
  // Function to clear data when the component is first loaded
  const clearDataOnFirstLoad = useCallback(async () => {
    try {
      await AsyncStorage.removeItem("UserData");
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error);
      alert("An error occurred while clearing data.");
    }
  }, []);

  // Call clearDataOnFirstLoad only once when the component is first loaded
  useFocusEffect(clearDataOnFirstLoad);
  // Reset everything
  const clearAndReset = useCallback(async () => {
    try {
      await AsyncStorage.removeItem("UserData");
      setPhoneNumber("");
      setOTP(["", "", "", ""]);
      setShowLogin(true);
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error);
      alert("An error occurred while clearing data.");
    }
  }, []);

  useFocusEffect(clearAndReset);
  const handleNextOrVerify = async () => {
    if (showLogin) {
      // Check if phone number is valid (for simplicity, checking if it's 10 digits)
      if (phoneNumber.length === 10 || !phoneNumber) {
        try {
          if (!phoneNumber) {
            console.log("{}{}{}{}{}{}{}{}{}");
            // Skip phone number validation and navigate to Home
            await AsyncStorage.removeItem("UserData");
            navigation.navigate("Skip");
            return;
          } else {
          }
          // Call the phoneNumberValidation function to validate the number
          const validationResponse = await phoneNumberValidation({
            number: phoneNumber,
          }).then((res) => {
            if (res.status === 201) {
              alert("Invalid Phone Number. Please enter a valid phone number.");
            } else if (res.status === 200) {
              // Store data in local storage
              const userData = res.data; // Assuming res.data contains user data
              AsyncStorage.setItem("UserData", JSON.stringify(userData))
                .then(() => {
                  console.log("Data stored in local storage:", userData);
                })
                .catch((error) => {
                  console.error("Error storing data in local storage:", error);
                });

              setShowLogin(false); // Switch to OTP view
            } else {
              console.log("No");
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
        navigation.navigate("Home");
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

  // Determine the button label based on the current state
  const buttonLabel = showLogin ? (phoneNumber ? "Next" : "Skip") : "Verify";
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/Login/mainlogo.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Content inside the ImageBackground */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Welcome!</Text>
          <Text style={styles.subtitle}>
            {showLogin
              ? "Please Login To Continue"
              : "Enter the 4-digit OTP sent to your phone"}
          </Text>
          {showLogin ? (
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="numeric"
              maxLength={10}
              value={phoneNumber}
              onChangeText={(text) => {
                // Input validation: allow only numeric characters
                const numericText = text.replace(/[^0-9]/g, "");
                setPhoneNumber(numericText);
              }}
            />
          ) : (
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
          )}

          <TouchableOpacity style={styles.button} onPress={handleNextOrVerify}>
            <Text style={styles.buttonText}>{buttonLabel}</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    flex: 1,
    resizeMode: "cover",
    padding: 0,
  },
  contentContainer: {
    flex: 1,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    marginLeft: "5%",
    marginRight: "5%",
  },
  title: {
    color: "white",
    fontSize: windowWidth * 0.08,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    color: "#FFFFFFB2",
    fontSize: windowWidth * 0.035,
    fontWeight: "bold",
    marginBottom: 60,
  },
  input: {
    width: "100%",
    height: windowHeight * 0.08,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    fontSize: windowWidth * 0.05,
    borderRadius: windowWidth * 0.03,
    paddingLeft: windowWidth * 0.04,
    alignContent: "space-between",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "90%",
  },
  otpInput: {
    width: "22%",
    height: windowHeight * 0.08,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    fontSize: windowWidth * 0.04,
    borderRadius: windowWidth * 0.04,
    textAlign: "center",
  },
  button: {
    backgroundColor: "black",
    width: "40%",
    height: windowHeight * 0.07,
    borderRadius: windowWidth * 0.02,
    marginTop: 40,
    justifyContent: "center",
    marginLeft: "60%",
  },
  buttonText: {
    color: "white",

    fontSize: windowWidth * 0.05,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Login;
