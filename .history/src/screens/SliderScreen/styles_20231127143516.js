import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions } from "react-native";
import * as Font from "expo-font";
import { loadCustomFont } from "../../loadCustomFont";

const LoginStyles = () => {
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const fonttype = async () => {
    const status = await loadCustomFont();
  };
  useEffect(() => {
    const loadCustomFont = async () => {
      try {
        await Font.loadAsync({
          Glory: require("../../../assets/Fonts/Glory.ttf"),
        });
        setIsFontLoaded(true);
      } catch (error) {
        console.error("Error loading custom font:", error);
      }
    };
    fonttype();
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
      // resizeMode: "cover",
    },
    paginationContainer: {
      width: "100%",
      position: "absolute",
      bottom: 0,
      height: 50,
      // Transparent background
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    paginationDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: "white",
      margin: 5,
      borderColor: "black",
      borderWidth: 1,
      backgroundColor: "rgba(255, 255, 255, 0.4)",
    },

    activePaginationDot: {
      backgroundColor: "black",
      borderColor: "black",
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
      fontSize: width >= 720 ? 40 : 20,
      paddingBottom: 5,
      fontFamily: "GloryBold",
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
      position: "relative",
      top: height >= 844 ? "44%" : "40%",
      right: "30%",
      width: "100%",
      height: "100%",
      alignItems: "center",
    },
    slideText1: {
      color: "black",
      fontSize: width >= 720 ? 30 : 20,
      fontFamily: isFontLoaded ? "Glory" : undefined,
      textAlign: "center",
      fontWeight: 400,
    },
    slideText2: {
      color: "white",
      fontSize: width >= 720 ? 35 : 23,
      fontFamily: isFontLoaded ? "Glory" : undefined,
      textAlign: "center",
      marginTop: 20,
      fontWeight: "500",
    },
  });

  return styles;
};

export default LoginStyles;
