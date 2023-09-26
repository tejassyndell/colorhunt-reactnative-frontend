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

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SliderScreen = (props) => {
  const { navigation } = props;

  const Shopping = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Swiper
        loop={false}
        showsPagination={true}
        dotStyle={styles.paginationDot}
        activeDotStyle={styles.activePaginationDot}
        autoplay={{ delay: 2000 }}
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
                width: "100%", // Adjust the width as needed
                height: "20%",
              }}
            />

            <Text
              style={[
                styles.slideText1,
                { color: "white", fontSize: windowWidth * 0.05 },
              ]}
            >
              Smart{"\n"}Formals
            </Text>
            <Text
              style={[
                styles.slideText2,
                { color: "white", fontSize: windowWidth * 0.06 },
              ]}
            >
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

        <ImageBackground
          source={require("../../../assets/SliderImage/low-angle-little-boy-posing.png")}
          style={styles.slide}
        >
          <View style={styles.contain2}>
            <Image
              source={require("../../../assets/SliderImage/image100.png")}
            />

            <Text
              style={[styles.slideText1, { marginTop: 30, fontWeight: "bold" }]}
            >
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
            />

            <Text
              style={[
                styles.slideText1,
                {
                  marginTop: 20,
                  fontWeight: "500",
                  fontSize: windowWidth * 0.06,
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
            />

            <Text
              style={[
                styles.slideText1,
                { marginTop: 20, fontSize: windowWidth * 0.05 },
              ]}
            >
              BEST{"\n"}PICKS
            </Text>
            <Text
              style={[
                styles.slideText2,
                { color: "black", fontSize: windowWidth * 0.07 },
              ]}
            >
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
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%", // Ensure the image covers the entire width
    height: "100%", // Ensure the image covers the entire height
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
    width: windowWidth * 0.2, // Set the width as needed
    height: windowHeight * 0.05, // Set the height as needed
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
    fontSize: windowWidth * 0.05,
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
    fontSize: 22,
    textAlign: "center",
  },
  slideText2: {
    color: "white",
    fontSize: 26,
    textAlign: "center",
    marginTop: 20,
    fontWeight: "bold",
  },
});

export default SliderScreen;
