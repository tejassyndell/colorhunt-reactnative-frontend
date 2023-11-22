import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions } from "react-native";
import * as Font from "expo-font";
import { loadCustomFont } from "../../loadCustomFont";

const { width: viewportWidth } = Dimensions.get("window");
const { width, height } = Dimensions.get("window");

const detailsOfArtStyles = () => {
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const fonttype = async ()=>{
    const  status = await loadCustomFont();
  }
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
    container: {
      // flex: 1,
      // zIndex: 0,
      overflow: "scroll",
      height: "100%",
    },
    image: {
      ...StyleSheet.absoluteFillObject,
      width: "100%",
      height: "100%",
    },
    imageContainer: {
      flex: 1,
      justifyContent: "center",
      width: viewportWidth,
      height: 300,
    },
    artical_name: {
      width: "100%",
    },

    productDetails: {
      paddingBottom: 0,
      paddingLeft: 12,
      paddingRight: 6,
      paddingTop: 1,
      position: "absolute",
      height: "auto",
      width: "100%",
      bottom: 0,
      zIndex: 2,
      backgroundColor: "#FFF",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      top: "47%", // You can use a percentage for positioning if needed
      elevation: 50,
      shadowOffset: { width: 0, height: 0 }, // Offset the shadow upwards
      shadowColor: "#000000", // Specify a shadow color
      shadowOpacity: 0, // Set the shadow opacity within the valid range (0-1)
      shadowRadius: 5,
    },

    product_detail_sec3: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      alignContent: "center",
      width: "100%",
    },
    container_grid: {
      width: "100%",
    },
    head_grid: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      height: 30,
    },
    color_Text: {
      width: "31%",
      textAlign: "left",
    },
    available_Text: {
      width: "37%",
      textAlign: "left",
    },
    qty_Text: {
      width: "31%",
      textAlign: "left",
    },
    color_box_Text: {
      width: "31%",
      display: "flex",
      paddingHorizontal: 10,
      elevation: 2,
      shadowColor: "gray",
      shadowOpacity: 0,
      borderWidth: 1,
      borderColor: "#ded6d6",
      backgroundColor: "white",
      borderRadius: 10,
      height: 40,
      justifyContent: "center",
      textAlign: "center",
      alignItems: "center",
      paddingVertical: 7,
      marginRight: 10,
    },
    available_box_Text: {
      width: "34%",
      display: "flex",
      paddingHorizontal: 10,
      elevation: 2,
      shadowColor: "gray",
      shadowOpacity: 0,
      borderWidth: 1,
      borderColor: "#ded6d6",
      backgroundColor: "white",
      borderRadius: 10,
      height: 40,
      justifyContent: "center",
      textAlign: "center",
      alignItems: "center",
      paddingVertical: 7,
    },

    product_detail: {
      // display: "flex",
      // width: "95%",
      // height: "auto",
      // paddingTop: 12,
      // flexDirection: "row",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "stretch",
      padding: 0,
      backgroundColor: "red",
    },
    product_detail_sec: {
      // marginRight: "5%",
      // width: "50%",
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
      backgroundColor: "yellow",
    },

    size: {
      width: width >= 720 ? 70 : 40,
      height: width >= 720 ? 70 : 39,
      borderWidth: 1,
      borderColor: "#b3a8a8",
      borderRadius: 100,
      // color: "#000000",
      fontWeight: "600",
      marginLeft: 8,
      alignItems: "center",
      justifyContent: "center",
    },
      size_a: {
      marginTop: 3,
      textAlign: "center",
      fontSize: width >= 720 ? 30 : 15,
      fontFamily: isFontLoaded ? "Glory" : undefined,
    },
    product_detail_sec2: {
      width: "50%",
      textAlign: "left",
    },
    size_container2: {
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "#ded6d6",
      borderRadius: 12,
      backgroundColor: "#f4f4f4",
      // padding: 12,
      display: "flex",
      height: width >= 720 ? 80 : 52,
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      width: "80%",
      elevation: 2,
      marginStart: 32,
      shadowColor: "gray",
      // shadowOpacity: 0.2,
    },

    size_p: {
      marginTop: 0,
      marginBottom: "1%",
      fontSize: width >= 720 ? 28 : 18,
      fontFamily: isFontLoaded ? "Glory" : undefined,
      color: "#000000",
      textAlign: "center",
      fontWeight: "500",
    },
    qty_box_Text: { width: "31%", display: "flex", paddingLeft: 20 },
    color_div: {
      width: "31%",
      textAlign: "left",
    },

    color_title: {
      width: "100%",
      fontSize: 15,
      fontFamily: isFontLoaded ? "Glory" : undefined,
      fontWeight: "bold",
      color: "#000000",
    },
    available_div: {
      width: "37%",
      textAlign: "left",
    },
    available_title: {
      width: "100%",
      fontSize: 15,
      fontFamily: isFontLoaded ? "Glory" : undefined,
      fontWeight: "bold",
      color: "black",
      marginLeft: 2,
    },
    qty_div: {
      width: "31%",
      textAlign: "left",
    },
    qty_title: {
      width: "100%",
      fontSize: 15,
      fontFamily: isFontLoaded ? "Glory" : undefined,
      fontWeight: "bold",
      color: "black",
      marginLeft: 20,
    },
    body_main_con: {
      display: "flex",
      width: "100%",
    },
    row: {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
      width: "100%",
      marginTop: 2,
      marginBottom: 5,
    },
    color_box_div: {
      width: "31%",
    },
    color_box: {
      width: "100%",
      color: "rgba(0, 0, 0, 0.60)",
      textAlign: "center",
      fontWeight: "bold",
    },
    available_box_div: {
      width: "100%",
    },
    available_box: {
      width: "100%",
      textAlign: "center",
      fontWeight: "bold",
    },
    qty_box_div: {
      width: "31%",
      maxWidth: "100%",
      display: "flex",
      flexDirection: "row",
    },
    // row:{
    //     flexShrink:0,
    //     maxWidth:"100%"
    // },
    qty_box: {
      width: "100%",
      // shadowColor: "gray",
      // shadowOpacity: 0.5,
      elevation: 2, // Use elevation to simulate box-shadow
      justifyContent: "center", // Align content vertically
      alignItems: "center", // Center content horizontally
      // paddingTop: 7,
      // paddingBottom:7,
      paddingLeft: 0,
      paddingStart: 0,
      textAlign: "center",
      height: 40,
      borderWidth: 1,
      borderColor: "#ded6d6",
      backgroundColor: "#FFF",
      borderRadius: 10,
      borderTopRightRadius: 2,
      borderBottomRightRadius: 2,
    },
    top_row: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      // backgroundColor:"#FFF",
      // borderWidth: 1,
      // borderStyle: "solid",
      // borderColor: "#0000002d",
      // borderRadius:10,
      // elevation:2,
      // shadowColor:"gray",
      // shadowOpacity:0.5
    },
    box1: {
      width: "44%",
      height: 40,
      borderRadius: 10,
    },
    box1_btn: {
      textAlign: "left",
      borderRadius: 10,
      backgroundColor: "white",
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "#0000004d",
      marginHorizontal: 0,
      paddingBottom: 3,
      marginVertical: 0,
      width: "100%",
      height: "100%",
    },
    box1_btn_text: {
      fontSize: 25,
      fontFamily: isFontLoaded ? "Glory" : undefined,
      textAlign: "center",
      fontWeight: "bold",
    },
    box2: {
      width: "44%",
      height: "96%",
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
    },
    box3: {
      width: "44%",
      height: 40,
      borderRadius: 10,
    },
    box3_btn: {
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "#0000004d",
      textAlign: "right",
      borderRadius: 10,
      backgroundColor: "white",
      marginHorizontal: 0,
      paddingBottom: 3,
      width: "100%",
      height: "100%",
    },

    article_ratio_Section: {
      display: "flex",
      flexDirection: "row",
      width: "98%",
      marginHorizontal: 4,
    },
    article_ratio_container: {
      width: "45%",
      marginTop: 10,
      height: "40%",
    },
    articallabel: {
      marginLeft: 0.5,
      textAlign: "left",
      fontSize: width >= 720 ? 20 : 16,
      fontFamily: isFontLoaded ? "GloryBold" :  "Arial, sans-serif",
    },
    article_content_r: {
      width: "80.5%",
      elevation: 2,
      shadowOpacity: 0,
      shadowColor: "gray",
      borderColor: "#ded6d6",
      borderWidth: 1,
      borderStyle: "solid",
      borderRadius: 10,
      paddingTop: 13,
      height: width >= 720 ? 80 : 53,
      justifyContent: "center",
      paddingHorizontal: 0,
      paddingVertical: 10,
      backgroundColor: "#f4f4f4",
      color: "#626262",
      marginTop: 10,
    },
    article_ratio_content: {
      textAlign: "center",
      fontSize: width >= 720 ? 20 : 16,
      fontFamily: isFontLoaded ? "GloryBold" :  "Arial, sans-serif",
      color: "#626262",
    },
    article_rate_container: {
      width: "40%",
      textAlign: "left",
      marginLeft: "13%",
      marginTop: 10,
    },
    article_rate_content: {
      textAlign: "center",
      fontSize: width >= 720 ? 30 : 18,
      fontFamily: isFontLoaded ? "GloryMedium" : undefined,
      color: "#626262",
    },
    articallabel1: {
      marginLeft: 0.5,
      fontSize: width >= 720 ? 20 : 16,
      fontFamily: isFontLoaded ? "GloryBold" :  "Arial, sans-serif",
    },
    total_price_container: {
      width: "95%",
      display: "flex",
      flexDirection: "row",
      marginTop: "11%",
      position: "relative",
      top: 0,
      marginLeft: 6,
      marginBottom: 5,
    },
    main_total_div: {
      width: "30%",
      display: "flex",
      justifyContent: "flex-end",
      alignContent: "flex-end",
    },
    addto_card_container: {
      width: 208,
      height: 50,
      marginLeft: "16%",
    },
    addto_cart_btn: {
      backgroundColor: "black",
      borderRadius: 10,
      paddingHorizontal: 20,
      paddingVertical: width >= 720 ? 20 : 11,
      height: width >= 720 ? 80 : 50,
    },
    loader: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FFF",
    },
    modalContainer: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.8)", // Transparent background with some opacity
      justifyContent: "center",
      alignItems: "center",
    },
    modalImage: {
      width: Dimensions.get("window").width - 30, // Adjust the width with margins
      height: Dimensions.get("window").height - 10, // Adjust the height with margin
      marginLeft: 15,
      marginRight: 15,
    },

    closeButton: {
      position: "absolute",
      top: 30,
      right: 20,
      backgroundColor: "white",
      borderRadius: 50,

      alignItems: "center",
      justifyContent: "center",
    },
  });
  return styles;
};

export default detailsOfArtStyles;
