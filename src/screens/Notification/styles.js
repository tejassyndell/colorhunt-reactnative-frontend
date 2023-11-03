import React, { useState, useEffect } from "react";
import { StyleSheet, } from "react-native";
import * as Font from "expo-font";


const Categoriesstyle = () => {
  const [isFontLoaded, setIsFontLoaded] = useState(false);

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

    loadCustomFont();
  }, []);

const styles = StyleSheet.create({
    scrollView: {
        height: "86%",
        backgroundColor: "white", // Set the background color to your preference
      },
      container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      },
      input: {
        height: 40,
        marginTop: 12,
        marginBottom: 12,
        width: "100%",
        fontSize: 15,
        fontFamily: "Glory",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
      },
      notificationContainer: {
        marginTop: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        width: "96%",
        marginLeft: "1%",
      },
      notificationTitle: {
        fontWeight: "bold",
      },
      notificasionContenor: {
        flex: 1,
        width: "100%",
        height: "100%",
        alignItems: "center",
      },
      contentBox: {
        height: "auto",
        width: "95%",
        backfaceVisibility:'#FFF',
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        marginTop: 5,
        // shadowOpacity: 0.5, // Increased shadow opacity
        // borderColor: "rgba(0,0,0,0.9)",
        elevation:0.4, // Increased elevation
       
      },
      imagesection: {
        width:'100%',
        height:'100%'
      },
      detailscon: {
        width: "65%",
        fontSize: 14,
        fontFamily: "Glory",
        fontWeight: "600", // Corrected to string
      },
      timedetails: {
        width: "23%",
        fontSize: 14,
        fontFamily: "Glory",
        fontWeight: "600", // Corrected to string
        paddingTop: "8%",
        textAlign: "right",
        backgroundColor:'red',
        paddingRight: 15,
      },
      contentsection: {
        flexDirection: "row",
      },
  });
  return styles;
};
  
  export default styles;
