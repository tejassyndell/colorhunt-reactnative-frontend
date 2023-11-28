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
    await Sliderimages().then((res) => {
      if (res && res.status === 200) {
        setSliderimagedata(res.data);
      }
    });
  };

  useEffect(() => {
    getSliderimages();
  }, []);

  const Shopping = () => {
    navigation.navigate("Home");
  };
  console.log(currentIndex.length, "hsbdhkabsjhdajhsdvjhad");
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

  return (
    <View style={styles.container}>
      {slideimagesdata ? (
        <>
          <Carousel
            data={slideimagesdata}
            renderItem={renderItem}
            sliderWidth={width}
            itemWidth={width}
            onSnapToItem={(index) => {
              console.log("onSnapToItem index:", index);
              setCurrentIndex(index);
            }}
          />
          <Pagination
            dotsLength={slideimagesdata.length}
            activeDotIndex={currentIndex}
            containerStyle={styles.paginationContainer}
            dotStyle={styles.activePaginationDot}
            inactiveDotStyle={styles.paginationDot}
            inactiveDotOpacity={0.6}
            inactiveDotScale={0.8}
            tappableDots={true}
          />
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default SliderScreen;
