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
import Carousel from "react-native-snap-carousel"; // Import Carousel from the library
import SliderStyles from "./styles";
import Blacklogo from "../../jssvgs/Blacklogo";
import Sliderwhitelog from "../../jssvgs/Sliderwhitelog";
import SystemNavigationBar from "react-native-system-navigation-bar";
import { Sliderimages } from "../../api/api";

const { width, height } = Dimensions.get("window");
const baseImageUrl =
  "https://webportalstaging.colorhunt.in/colorHuntApiStaging/public/uploads/";

const SliderScreen = (props) => {
  const { navigation } = props;
  const [slideimagesdata, setSliderimagedata] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const showNavigation = async () => {
    // Your showNavigation function remains the same
  };

  const getSliderimages = async () => {
    await Sliderimages().then((res) => {
      if (res && res.status === 200) {
        setSliderimagedata(res.data);
      }
    });
  };

  useEffect(() => {
    getSliderimages();
    showNavigation();
  }, []);

  const Shopping = () => {
    navigation.navigate("Home");
  };

  const styles = SliderStyles();

  const renderItem = ({ item, index }) => (
    <ImageBackground
      key={index}
      source={{
        uri: baseImageUrl + item.image,
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
  );

  return (
    <View style={styles.container}>
      {slideimagesdata ? (
        <Carousel
          data={slideimagesdata}
          renderItem={renderItem}
          sliderWidth={width}
          itemWidth={width}
          onSnapToItem={(index) => setCurrentIndex(index)}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default SliderScreen;
