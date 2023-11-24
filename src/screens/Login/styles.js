import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions } from "react-native";
import * as Font from "expo-font";
import { loadCustomFont } from "../../loadCustomFont";

const SliderStyles = () => {
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

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const { width, height } = Dimensions.get("window");
  const logoSize = Math.min(width, height) * 0.6;

  const styles = StyleSheet.create({
    contentContainer: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      bottom: 0,
    },
    title: {
      fontFamily: "GloryExtraBold",
      color: "white",
      fontSize: windowWidth * 0.08,
      marginBottom: width >= 720 ? "0.5%" : "2%",
    },
    subtitle: {
      fontFamily: "GloryMedium",
      color: "#BCBCBC",
      fontSize: windowWidth * 0.045,
      marginBottom:80,
    },
    input: {
      fontFamily: "GloryRegular",
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
      marginBottom:width >= 720 ? "6%": "10%",
      justifyContent: "space-between",
    },
    otpInput: {
      fontFamily: "GloryRegular",
      width: width >= 720 ? 90 : 47,
      justifyContent: "space-between",
      height: width >= 720 ? 90 : 50,
      borderColor: "gray",
      borderWidth: 1,
      backgroundColor: "white",
      fontSize: width >= 720 ? 40 : 23,
      borderRadius: 7,
      textAlign: "center",
      marginTop:20,
    },
    button: {
      backgroundColor: "#212121",
      width: width >= 720 ? 220 : 148,
      height: width >= 720 ? 70 : 50,
      borderRadius: 10,
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      bottom: 20,
      right: 20,
    },
    buttonText: {
      fontFamily: "GloryBold",
      color: "white",
      fontSize: width >= 720 ? 40 : 25,
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

  return styles;
};

export default SliderStyles;
