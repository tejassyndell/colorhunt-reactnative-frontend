import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Swiper from "react-native-swiper";
import SliderStyles from "./styles";
import Blacklogo from "../../jssvgs/Blacklogo";
import Sliderwhitelog from "../../jssvgs/Sliderwhitelog";
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { Sliderimages } from "../../api/api";

const { width, height } = Dimensions.get("window");
const baseImageUrl =
  "https://webportalstaging.colorhunt.in/colorHuntApiStaging/public/uploads/";

const SliderScreen = (props) => {
  const { navigation } = props;
  const [slideimagesdata, setSliderimagedata] = useState([]);
  const showNavigation = async () => {
    if (SystemNavigationBar) {
      try {
        const result = await SystemNavigationBar.navigationHide();
        // console.log("Show Navigation Bar:", result);
      } catch (error) {
        console.error("Error showing navigation bar:", error);
      }
    } else {
      console.error("SystemNavigationBar is not available.");
    }
  };
  const getSliderimages = async () => {
    await Sliderimages().then((res) => {
      if (res) {
        if (res.status == 200) {
          setSliderimagedata(res.data);
        }
      }
    })
  }
  useEffect(() => {
    getSliderimages();
    showNavigation(); // Call this function to hide the navigation bar when the component mounts
  }, []);



  const Shopping = () => {
    navigation.navigate("Home");
  };
  const styles = SliderStyles();
  // Calculate the image width and height based on screen width
  const imageWidth = width >= 720 ? 280 : 130;
  const imageHeight = height * 0.15; // 20% of screen height

  const CustomPagination = ({ index, total }) => {
    const dots = [];
    for (let i = 0; i < total; i++) {
      dots.push(
        <View
          key={i}
          style={[
            styles.paginationDot,
            i === index ? styles.activePaginationDot : null,
          ]}
        />
      );
    }
    return <View style={styles.paginationContainer}>{dots}</View>;
  };

  const Shoppings = () => {
    navigation.navigate("Home");
  };


  return (
    <>
      <View style={styles.container}>
        {slideimagesdata ?
          <Swiper
            loop={false}
            showsPagination={true}
            renderPagination={(index, total) => (
              <CustomPagination index={index} total={total} />
            )}
            autoplay={true}
          >
            {slideimagesdata.length > 0 ? slideimagesdata.map((item, index) => (
              <ImageBackground
                key={index}
                source={{
                  uri: baseImageUrl + item.image
                }}
                style={styles.slide}
              >
                <View style={styles.contain1}>
                  <Sliderwhitelog />
                  <Text style={[styles.slideText1, { color: "white" }]}>
                    SMAERT{"\n"}FORMALS
                  </Text>
                  <Text style={[styles.slideText2, { color: "white" }]}>
                    MIN. {"\n"}30% OFF*
                  </Text>
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: "white" }]}
                    onPress={Shopping}
                  >
                    <Text style={[styles.buttonText, { color: "black" }]}>Shop</Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            )) : ""}
          </Swiper> : ""}
      </View>
    </>
  );
};

export default SliderScreen;
