import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { phoneNumberValidation } from "../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
const Login = (props) => {
  const { navigation } = props;

  // State variables
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOTP] = useState(["", "", "", ""]); // Array to store OTP digits
  const [showLogin, setShowLogin] = useState(true);

  // Reset Every thing
  const clearAndReset = useCallback(async () => {
    try {
      await AsyncStorage.removeItem("UserData"); // Clear the stored user data
      setPhoneNumber(""); // Reset phone number
      setOTP(["", "", "", ""]); // Reset OTP
      setShowLogin(true); // Reset to the login view
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error);
      alert("An error occurred while clearing data.");
    }
  }, []);

  useFocusEffect(clearAndReset);
  // Handle "Next" or "Verify" button click
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
  // Function to handle OTP digit input
  const handleOTPDigitChange = (index, text) => {
    const newOTP = [...otp];
    newOTP[index] = text;
    setOTP(newOTP);
  };

  // Determine the button label based on the current state
  const buttonLabel = showLogin ? (phoneNumber ? "Next" : "Skip") : "Verify";

  return (
    <ImageBackground
      source={require("../../../assets/Login/mainlogo.png")}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 40,
        margin: 25,
      }}
    >
      <View
        style={{
          width: "100%",
          alignItems: "center",
          top: 610,
          height: "100%",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 30,
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          {showLogin ? "Welcome!" : "OTP Verification"}
        </Text>
        <Text style={{ color: "#FFFFFFB2", fontSize: 16, fontWeight: "bold" }}>
          {showLogin
            ? "Please Login To Continue"
            : "Enter the 4-digit OTP sent to your phone"}
        </Text>
        {showLogin ? (
          <TextInput
            style={{
              width: "90%",
              height: 50,
              borderColor: "gray",
              borderWidth: 1,
              marginTop: 20,
              backgroundColor: "white",
              fontSize: 20,
              borderRadius: 10,
              paddingLeft: 10,
            }}
            placeholder="Phone Number"
            keyboardType="numeric"
            maxLength={10}
            value={phoneNumber}
            onChangeText={(text) => {
              // Input validation: allow only numeric characters
              const numericText = text.replace(/[^0-9]/g, ""); // Remove non-numeric characters
              setPhoneNumber(numericText);
            }}
          />
        ) : (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "80%",
              marginTop: 20,
            }}
          >
            {[0, 1, 2, 3].map((index) => (
              <TextInput
                key={index}
                style={{
                  width: "22%",
                  height: 50,
                  borderColor: "gray",
                  borderWidth: 1,
                  backgroundColor: "white",
                  fontSize: 20,
                  borderRadius: 10,
                  textAlign: "center",
                }}
                placeholder=""
                keyboardType="numeric"
                maxLength={1}
                value={otp[index]}
                onChangeText={(text) => handleOTPDigitChange(index, text)}
              />
            ))}
          </View>
        )}
        <TouchableOpacity
          style={{
            backgroundColor: "black",
            width: 148,
            height: 50,
            borderRadius: 14,
            marginTop: 80,
            justifyContent: "center",
            left: 110,
          }}
          onPress={handleNextOrVerify}
        >
          <Text
            style={{
              color: "white",
              fontSize: 25,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {buttonLabel}
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Login;
