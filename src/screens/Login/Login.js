import React, { useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image
} from "react-native";
import { phoneNumberValidation } from "../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRoute } from "@react-navigation/native";



const Login = (props) => {
  const { navigation } = props;
  const route = useRoute();
  const { getstatus } = route.params;
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
            if (res.status === 201) {
              alert("Invalid Phone Number. Please enter a valid phone number.");
            } else if (res.status === 200) {
              // Store data in local storage
              console.log(res.data[0].Name);
              getstatus(true, res.data[0].Name);
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
    <View style={styles.container1}>
      <Image
        source={require("../../../assets/Login/mainlogo.png")}
        style={styles.backgroundImage1}
      />

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
              style={[styles.input,{color:"black"}]}
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
        <View style={{ width: "100%", height: 100 }}>
          <TouchableOpacity style={styles.button} onPress={handleNextOrVerify}>
            <Text style={styles.buttonText}>{buttonLabel}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
  },
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: 700,
    marginBottom: '2%',
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.70)",
    fontSize: 20,
    fontWeight: 700,
    marginBottom: '12%',
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 22,
    paddingLeft: 5,
    backgroundColor: "white",
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    color: ' rgba(0, 0, 0, 0.30)'
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginBottom: '10%',
  },
  otpInput: {
    width: 47,
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    fontSize: 23,
    borderRadius: 7,
    textAlign: "center",

  },
  button: {
    backgroundColor: "#212121",
    width: 148,
    height: 50,
    borderRadius: 10,
    position: 'absolute',
    marginTop: 50,
    justifyContent: "center",
    bottom: 10,
    right: 0
  },
  buttonText: {
    color: "white",
    fontSize: 23,
    fontWeight: 700,
    textAlign: "center",
  },
  phoneIcon: {
    height: 20,
    width: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: '85%',
    height: 50,
    borderColor: "gray",
    borderRadius: 7,
    marginBottom: '13%',
    justifyContent: "center",
    backgroundColor: 'green'
  },
  phoneIconContainer: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 7,
    borderRightWidth: 3,
    borderColor: "#212121",
  },
  container1: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backgroundImage1: {
    flex: 1,
    resizeMode: 'stretch',
    width: '100%',
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default Login;
