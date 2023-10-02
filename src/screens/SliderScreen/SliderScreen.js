import React from "react";
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

const { width, height } = Dimensions.get("window");

const SliderScreen = (props) => {
  const { navigation } = props;

  const Shopping = () => {
    navigation.navigate("Home");
  };

  // Calculate the image width and height based on screen width
  const imageWidth = width >= 720 ? 280 : 130;
  const imageHeight = height * 0.2; // 20% of screen height

  return (
    <View style={styles.container}>
      <Swiper
        loop={false}
        showsPagination={true}
        dotStyle={styles.paginationDot}
        activeDotStyle={styles.activePaginationDot}
      >
        <ImageBackground
          source={require("../../../assets/SliderImage/serious-young-man-standing-isolated-grey.png")}
          style={styles.slide}
        >
          <View style={styles.contain1}>
            <Image
              source={require("../../../assets/SliderImage/image99.png")}
              resizeMode="contain"
              style={{
                width: imageWidth,
                height: imageHeight,
              }}
            />

            <Text style={[styles.slideText1, { color: "white" }]}>
              Smart{"\n"}Formals
            </Text>
            <Text style={[styles.slideText2, { color: "white" }]}>
              MIN {"\n"}30% OFF*
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
            <Image
              source={require("../../../assets/SliderImage/image100.png")}
              resizeMode="contain"
              style={{
                width: imageWidth,
                height: imageHeight,
              }}
            />

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
            <Image
              source={require("../../../assets/SliderImage/image100.png")}
              resizeMode="contain"
              style={{
                width: imageWidth,
                height: imageHeight,
              }}
            />

            <Text
              style={[
                styles.slideText1,
                {
                  fontWeight: "500",
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
            <Image
              source={require("../../../assets/SliderImage/image100.png")}
              resizeMode="contain"
              style={{
                width: imageWidth,
                height: imageHeight,
              }}
            />

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
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginBottom: -10,
  },
  activePaginationDot: {
    backgroundColor: "white",
    marginBottom: -10,
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
    textAlign: "center",
  },
  slideText2: {
    color: "white",
    fontSize: width >= 720 ? 40 : 23,
    textAlign: "center",
    marginTop: 20,
    fontWeight: "bold",
  },
});

export default SliderScreen;
