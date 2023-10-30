import React, { useEffect } from "react";
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

const { width, height } = Dimensions.get("window");


const SliderScreen = (props) => {
  const { navigation } = props;
  const showNavigation = async () => {
    if (SystemNavigationBar && SystemNavigationBar.navigationHide) {
      try {
        const result = await SystemNavigationBar.navigationHide();
        console.log("Show Navigation Bar:", result);
      } catch (error) {
        console.error("Error showing navigation bar:", error);
      }
    } else {
      console.error("SystemNavigationBar or immersive function is not available.");
    }
  };
  
    useEffect(() => {
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

  return (
    <View style={styles.container}>
      <Swiper
        loop={false}
        showsPagination={true}
        renderPagination={(index, total) => (
          <CustomPagination index={index} total={total} />
        )}
        // autoplay={true}
      >
        <ImageBackground
          source={require("../../../assets/SliderImage/serious-young-man-standing-isolated-grey.png")}
          style={styles.slide}
        >
          <View style={styles.contain1}>
            {/* <Image
              source={require("../../../assets/SliderImage/image99.png")}
              resizeMode="contain"
              style={{
                width: imageWidth,
                height: imageHeight,
              }}
            /> */}
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

        {/* Repeat the same structure for other slides */}
        <ImageBackground
          source={require("../../../assets/SliderImage/low-angle-little-boy-posing.png")}
          style={styles.slide}
        >
          <View style={styles.contain2}>
            <Blacklogo />
            <Text style={[styles.slideText1, { fontWeight: "bold" }]}>
              Flat{"\n"}40-50% OFF*
            </Text>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "white" }]}
              onPress={Shopping}
            >
              <Text style={[styles.buttonText, { color: "black" }]}>Shop</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <ImageBackground
          source={require("../../../assets/SliderImage/kid-studio-portrait-isolated.png")}
          style={styles.slide}
        >
          <View style={styles.contain3}>
            <Blacklogo />

            <Text
              style={[
                styles.slideText1,
                {
                  fontWeight: "500",
                  marginTop: 20,
                },
              ]}
            >
              Flat{"\n"}20-40% OFF*
            </Text>
            <TouchableOpacity style={styles.button} onPress={Shopping}>
              <Text
                style={[
                  styles.buttonText,
                  { color: "white", fontWeight: "bold" },
                ]}
              >
                Shop
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <ImageBackground
          source={require("../../../assets/SliderImage/handsome-confident-hipster-modelsexy-unshaven-man-dressed-summer-stylish-green-hoodie-jeans-clothes-fashion-male-with-curly-hairstyle-posing-studio-isolated-blue.png")}
          style={styles.slide}
        >
          <View style={styles.contain4}>
            <Blacklogo />

            <Text style={[styles.slideText1]}>BEST{"\n"}PICKS</Text>
            <Text style={[styles.slideText2, { color: "black" }]}>
              FLAT{"\n"}50% OFF*
            </Text>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: "black",
                  borderColor: "black",
                },
              ]}
              onPress={Shopping}
            >
              <Text style={styles.buttonText}>Shop</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </Swiper>
    </View>
  );
};

export default SliderScreen;
