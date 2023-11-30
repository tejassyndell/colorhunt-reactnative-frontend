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

const { width } = Dimensions.get("window");
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

  useEffect(() => {
    getSliderimages();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % slideimagesdata.length;
      setCurrentIndex(nextIndex);
    }, 5000); // Adjust the interval as needed

    return () => clearInterval(interval);
  }, [currentIndex, slideimagesdata.length]);

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
    <TouchableOpacity style={styles.container} onPress={Shopping}>
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
            loop={true} // Enable loop for smooth sliding
            autoplay={true} // Enable autoplay
            autoplayInterval={2000} // Set autoplay interval (in milliseconds)
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
        <Text></Text>
      )}
    </TouchableOpacity>
  );
};

export default SliderScreen;
