// SliderScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import SliderStyles from "./styles";
import { Sliderimages } from "../../api/api";
import Swiper from "react-native-swiper";
const { width } = Dimensions.get("window");
import Sliderwhitelog from "../../jssvgs/Sliderwhitelog";
import Blacklogo from "../../jssvgs/Blacklogo";
const baseImageUrl =
  "https://webportalstaging.colorhunt.in/colorHuntApiStaging/public/uploads/";

const SliderScreen = (props) => {
  const { navigation } = props;
  const [slideimagesdata, setSliderimagedata] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const getSliderimages = async () => {
    try {
      const res = await Sliderimages();
      if (res && res.status === 200) {
        setSliderimagedata(res.data);
      }
    } catch (error) {
      console.error("Error fetching slider images:", error);
    }
  };
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

  useEffect(() => {
    getSliderimages();
  }, []);

  const Shopping = () => {
    navigation.navigate("Home");
  };
  const styles = SliderStyles();
  const renderItem = ({ item, index }) => (
    <View style={styles.slide} key={index}>
      <ImageBackground
        source={{
          uri: baseImageUrl + item.image,
        }}
        style={styles.slide}
      >
        <View style={styles.contain1}>
          {/* Your existing content */}
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
    </View>
  );
  const CustomDot = ({ index, currentIndex }) => {
    const isActive = index === currentIndex;

    return (
      <View
        style={[
          styles.paginationDot,
          isActive ? styles.activePaginationDot : null,
        ]}
      />
    );
  };

  return (
    <View style={styles.container}>
      {slideimagesdata.length > 0 ? (
        <>
          <Carousel
            data={slideimagesdata}
            renderItem={renderItem}
            sliderWidth={width}
            itemWidth={width}
            onSnapToItem={(index) => {
              setCurrentIndex(index);
            }}
          />
          <View style={styles.paginationContainer}>
            {slideimagesdata.map((_, index) => (
              <CustomDot
                key={index}
                index={index}
                currentIndex={currentIndex}
              />
            ))}
          </View>
        </>
      ) : (
        <>
          <View
            style={{
              width: "100%",
              height: 50,
              backgroundColor: "#FFF",
              position: "absolute",
              bottom: 0,
              zIndex: 0,
            }}
          ></View>
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
                  <Text style={[styles.buttonText, { color: "black" }]}>
                    Shop
                  </Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>

            {/* Repeat the same structure for other slides */}
            <ImageBackground
              source={require("../../../assets/SliderImage/low-angle-little-boy-posing.png")}
              style={styles.slide}
            >
              <View style={styles.contain2}>
                {/* <Image
              source={require("../../../assets/SliderImage/image100.png")}
              resizeMode="contain"
              style={{
                width: imageWidth,
                height: imageHeight,
              }}
            /> */}
                <Blacklogo />
                <Text style={[styles.slideText1, { fontWeight: "bold" }]}>
                  Flat{"\n"}40-50% OFF*
                </Text>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "white" }]}
                  onPress={Shopping}
                >
                  <Text style={[styles.buttonText, { color: "black" }]}>
                    Shop
                  </Text>
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
        </>
      )}
    </View>
  );
};

export default SliderScreen;
