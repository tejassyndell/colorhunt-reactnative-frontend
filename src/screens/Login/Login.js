import React, { useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Image
} from "react-native";
import { phoneNumberValidation } from "../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRoute } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

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
    // <View style={styles.container}>
    //   <ImageBackground
    //     source={require("../../../assets/Login/mainlogo.png")}
    //     style={styles.backgroundImage} 
    //   />
    //     <View style={styles.contentContainer}>
    //       <Text style={styles.title}>Welcome!</Text>
    //       <Text style={styles.subtitle}>
    //         {showLogin
    //           ? "Please Login To Continue"
    //           : "Please Login To Continue"}
    //       </Text>
    //       {showLogin ? (
    //         <View style={styles.inputContainer}>
    //         <View style={styles.phoneIconContainer}>
    //           <Image
    //             source={require("../../../assets/Login/phone.png")}
    //             style={styles.phoneIcon}
    //           />
    //         </View>
    //         <TextInput
    //           style={styles.input}
    //           placeholder="Phone Number"
    //           keyboardType="numeric"
    //           maxLength={10}
    //           value={phoneNumber}
    //           onChangeText={(text) => {
    //             const numericText = text.replace(/[^0-9]/g, "");
    //             setPhoneNumber(numericText);
    //           }}
    //         />
    //       </View>
    //       ) : (
    //         <View style={styles.otpContainer}>
    //           {otp.map((digit, index) => (
    //             <TextInput
    //               key={index}
    //               style={styles.otpInput}
    //               placeholder=""
    //               keyboardType="numeric"
    //               maxLength={1}
    //               value={digit}
    //               onChangeText={(text) => handleOTPDigitChange(index, text)}
    //               ref={otpInput[index]}
    //             />
    //           ))}
    //         </View>
    //       )}
    //       <TouchableOpacity style={styles.button} onPress={handleNextOrVerify}>
    //         <Text style={styles.buttonText}>{buttonLabel}</Text>
    //       </TouchableOpacity>
    //     </View>
    // </View>
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
              style={styles.input}
              placeholder="Phone Number"
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
        <TouchableOpacity style={styles.button} onPress={handleNextOrVerify}>
          <Text style={styles.buttonText}>{buttonLabel}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    height: '100%',
    width: '100%',
    resizeMode: "cover",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 30,
    marginHorizontal: 5,
    // paddingHorizontal: 10,
  },
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: 700,
    marginBottom: 10,
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.70)",
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 60,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: windowWidth * 0.05,
    paddingLeft: 10,
    backgroundColor: "white",
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "87%",
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
    marginBottom: 20,
  },
  button: {
    backgroundColor: "black",
    width: 148,
    height: windowHeight * 0.05,
    borderRadius: 10,
    marginTop: 50,
    justifyContent: "center",
    marginLeft: "58%",
    bottom: 0,
  },
  buttonText: {
    color: "white",
    fontSize: windowWidth * 0.05,
    fontWeight: "bold",
    textAlign: "center",
  },
  phoneIcon: {
    height: 20, // Adjust the icon size as needed
    width: 20, // Adjust the icon size as needed
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: '91%',
    height: 50,
    borderColor: "gray",
    borderRadius: 7,
    marginBottom: 30,
    // paddingHorizontal:20,
    paddingLeft:8,
    paddingRight:20
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
    // justifyContent:"center",
    // alignContent:"center",
    // alignItems:"center",
    backgroundColor: '#FFF'
  },
  backgroundImage1: {
    flex: 1,
    resizeMode: 'stretch', // This ensures the image covers the entire screen
    width: '90%',
    // height:"90%" ,
    // marginLeft:30,
    marginTop: 15,// This will make the image take the full width of the parent container
    marginHorizontal: 20
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // You can add padding or additional styling here
  },
});


export default Login;
