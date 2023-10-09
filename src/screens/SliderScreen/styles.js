import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions } from "react-native";
import * as Font from "expo-font";

const LoginStyles = () => {
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  useEffect(() => {
    const loadCustomFont = async () => {
      try {
        await Font.loadAsync({
          Glory: require("../../../assets/Fonts/Glory-Regular.ttf"),
        });
        setIsFontLoaded(true);
      } catch (error) {
        console.error("Error loading custom font:", error);
      }
    };

    loadCustomFont();
  }, []);

  const { width, height } = Dimensions.get("window");

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: width >= 720 ? "100%" : "100%",
      height: width >= 720 ? "100%" : "100%",
      resizeMode: "cover",
    },
    slide: {
      flex: 1,
      width: width >= 720 ? "100%" : "100%",
      height: width >= 720 ? "100%" : "100%",
      // padding: width >= 720 ? "100%" : "100%",
      resizeMode: "cover",
    },
    paginationDot: {
      width: 15, // Adjust the width as needed
      height: 15, // Adjust the height as needed
      borderRadius: 8, // Make it half of the width to create a circle
      backgroundColor: "#FFF", // Background color for inactive dots
      borderWidth: 2, // Border width
      borderColor: "white", // Border color
    },

    activePaginationDot: {
      width: 15, // Adjust the width as needed
      height: 15, // Adjust the height as needed
      borderRadius: 8, // Make it half of the width to create a circle
      backgroundColor: "#00000", // Background color for active dot
      borderWidth: 2, // Border width
      borderColor: "black", // Border color
    },
    button: {
      width: width >= 720 ? 180 : 100,
      height: width >= 720 ? 70 : 50,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "white",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
      backgroundColor: "black",
    },
    buttonText: {
      color: "white",
      fontSize: width >= 720 ? 30 : 20,
      fontWeight: "bold",
      //   fontFamily: "Glory",
    },
    contain1: {
      position: "absolute",
      top: "5%",
      left: "25%",
      width: "100%",
      height: "100%",
      alignItems: "center",
    },
    contain2: {
      position: "absolute",
      top: "45%",
      left: "25%",
      width: "100%",
      alignItems: "center",
      height: "100%",
    },
    contain3: {
      position: "absolute",
      top: "10%",
      left: "20%",
      height: "100%",
      width: "100%",
      alignItems: "center",
    },
    contain4: {
      position: "absolute",
      top: "50%",
      right: "30%",
      width: "100%",
      height: "100%",
      alignItems: "center",
    },
    slideText1: {
      color: "black",
      fontSize: width >= 720 ? 35 : 20,
      fontFamily: isFontLoaded ? "Glory" : undefined,
      textAlign: "center",
    },
    slideText2: {
      color: "white",
      fontSize: width >= 720 ? 40 : 23,
      fontFamily: isFontLoaded ? "Glory" : undefined,
      textAlign: "center",
      marginTop: 20,
      fontWeight: "bold",
    },
  });

  return styles;
};

export default LoginStyles;
