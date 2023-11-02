import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  PanResponder,
  Animated,
  Easing,
  ScrollView,
} from "react-native";
import { getCategories } from "../../api/api";
import { useRef } from "react";
import { Svg, G, Path, Circle } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";

const { width, height } = Dimensions.get("window");

export default function Filter({
  onFilterChange,
  onCloseFilter,
  Scategories,
  minArticleRate,
  maxArticleRate,
  status,
  spr,
  uniquerates,
}) {
  const [data, setData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(Scategories);
  const [selectedPriceRange, setSelectedPriceRange] = useState([
    minArticleRate,
    maxArticleRate,
  ]);
  const defaultPriceRange = [minArticleRate, maxArticleRate];
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [positionY, setPositionY] = useState(Dimensions.get("window").height);
  const unqrates = new Set();
  uniquerates.forEach((item) => {
    unqrates.add(item.ArticleRate);
  });
  const allowedValues2 = [...unqrates];
  const allowedValues3 = allowedValues2.map((value) => {
    return parseFloat(value);
  });
  const allowedValues = allowedValues3.sort((a, b) => a - b);
  // console.log(allowedValues, "unq");

  const Screenwidth = Dimensions.get("window").width;
  const sliderlenghtinPercent = 60;
  const sliderLength = (Screenwidth * sliderlenghtinPercent) / 100;
  const { width, height } = Dimensions.get("window");
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  const UserCheck = async () => {
    const user = await AsyncStorage.get("UserData");
    if (user) {
      isLoggedIn(true);
    } else {
      isLoggedIn(false);
    }
  };
  useEffect(() => {
    UserCheck();
  }, []);

  const getCategoriesname = async () => {
    try {
      const result1 = await getCategories();
      if (result1.status === 200) {
        setData(result1.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
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

  useEffect(() => {
    getCategoriesname();
  }, []);

  const handleCategorySelect = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const applyFilters = () => {
    onFilterChange(selectedCategories, selectedPriceRange);
    onCloseFilter(false);
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceRange(defaultPriceRange);
    // onFilterChange([], [minArticleRate, maxArticleRate]);
    setLeftValue(minArticleRate);
    setRightValue(maxArticleRate);
  };
  const closeFilter = () => {
    onCloseFilter(false);
  };

  useEffect(() => {
    setSelectedCategories(Scategories);
  }, [Scategories]);

  useEffect(() => {
    const slideUpAnimation = () => {
      Animated.timing(fadeAnim, {
        toValue: 2,
        duration: 1000,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start(() => {
        setPositionY(0); // Set positionY to 0 after animation completes
      });
    };

    slideUpAnimation();
  }, []);
  // Initialize leftValue and rightValue based on selectedPriceRange or default to minArticleRate and maxArticleRate
  const [leftValue, setLeftValue] = useState(
    spr.length > 0 ? spr[0] : minArticleRate
  );

  const [rightValue, setRightValue] = useState(
    spr.length > 0 ? spr[1] : maxArticleRate
  );

  const step = 1; // Change the step value as desired
  const borderWidth = 2; // Change the border width as desired

  const handleLeftMove = (dx) => {
    const newLeftValue = Math.min(
      Math.max(leftValue + dx, minArticleRate),
      maxArticleRate - step
    );
    // Find the nearest allowed value
    const nearestAllowedValue = allowedValues.reduce((prev, curr) => {
      return Math.abs(curr - newLeftValue) < Math.abs(prev - newLeftValue)
        ? curr
        : prev;
    });
    setLeftValue(nearestAllowedValue);
    setRightValue(Math.max(rightValue, nearestAllowedValue));
  };

  const handleRightMove = (dx) => {
    const newRightValue = Math.max(
      Math.min(rightValue + dx, maxArticleRate),
      leftValue + step
    );
    const nearestAllowedValue = allowedValues.reduce((prev, curr) => {
      return Math.abs(curr - newRightValue) < Math.abs(prev - newRightValue)
        ? curr
        : prev;
    });

    // Update the rightValue to the nearest allowed value
    setRightValue(nearestAllowedValue);

    // Ensure that the leftValue is less than or equal to the rightValue
    setLeftValue(Math.min(leftValue, nearestAllowedValue));
  };

  const panResponderLeft = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => handleLeftMove(gestureState.dx),
  });

  const panResponderRight = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => handleRightMove(gestureState.dx),
  });
  useEffect(() => {
    setSelectedPriceRange([leftValue, rightValue]);
  }, [leftValue, rightValue]);

  return (
    <View
      style={[
        styles.container,
        {
          transform: [{ translateY: positionY }],
        },
      ]}
    >
      <Animated.View
        style={{
          opacity: fadeAnim,
          width: "100%",
          height: "auto",
          //   backgroundColor: 'blue',
        }}
      >
        {status === false ? (
          <View style={status === false ? styles.header : styles.category}>
            <Text style={styles.headerText}>Categories</Text>
            <TouchableOpacity onPress={closeFilter}>
              <Svg
                style={styles.closeIcon}
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <G id="Group 1000010296">
                  <Circle
                    id="Ellipse 1234"
                    cx="16"
                    cy="16"
                    r="16"
                    fill="#212121"
                  />
                  <G id="Group 1000010293">
                    <Path
                      id="Vector 8"
                      d="M21.7666 21.668L10.0993 10.0007"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                    <Path
                      id="Vector 9"
                      d="M21.7666 10L10.0993 21.6673"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </G>
                </G>
              </Svg>
            </TouchableOpacity>
          </View>
        ) : (
          ""
        )}
        {status === false ? (
          <ScrollView
            style={{ width: "100%", height: height >= 844 ? 360 : 250 }}
          >
            <View style={styles.categoriesContainer}>
              {data.map((item) => (
                <TouchableOpacity
                  key={item.Id}
                  style={[
                    styles.categoryItem,
                    selectedCategories.includes(item.Category) && {
                      backgroundColor: "black",
                    },
                  ]}
                  onPress={() => handleCategorySelect(item.Category)}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      selectedCategories.includes(item.Category) && {
                        color: "#FFF",
                      },
                    ]}
                  >
                    {item.Category}
                  </Text>
                  <View
                    style={[
                      styles.radioButton,
                      selectedCategories.includes(item.Category) && {
                        backgroundColor: "white",
                      },
                    ]}
                  >
                    {selectedCategories.includes(item.Category) && (
                      <View style={styles.radioInnerCircle} />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        ) : (
          ""
        )}
       
          <View style={styles.container2}>
            {status ? (
              <View style={styles.headertrue}>
                <Text style={styles.headerText}>Price Range </Text>
                <TouchableOpacity onPress={closeFilter}>
                  <Svg
                    style={styles.closeIcon}
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <G id="Group 1000010296">
                      <Circle
                        id="Ellipse 1234"
                        cx="16"
                        cy="16"
                        r="16"
                        fill="#212121"
                      />
                      <G id="Group 1000010293">
                        <Path
                          id="Vector 8"
                          d="M21.7666 21.668L10.0993 10.0007"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                        />
                        <Path
                          id="Vector 9"
                          d="M21.7666 10L10.0993 21.6673"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                        />
                      </G>
                    </G>
                  </Svg>
                </TouchableOpacity>
              </View>
            ) : (
              <Text style={styles.label}>Price Range</Text>
            )}

            <View style={styles.sliderContainer}>
              <View style={{ width: width >= 720 ? "8%" : 40 }}>
                <Text
                  style={{
                    textAlign: "left",
                    fontSize: width >= 720 ? 25 : 15,
                    fontFamily: "Glory",
                    paddingRight: 10,
                    paddingBottom: 5,
                  }}
                >
                  {minArticleRate}
                </Text>
              </View>
              <View
                style={{ width: width >= 720 ? "80%" : "70%", marginTop: 3 }}
              >
                <View style={styles.sliderContainer}>
                  <View style={{ width: "100%" }}>
                    <View style={styleslider.sliderContainer}>
                      <View style={styleslider.slider}>
                        <View style={styleslider.border} />
                        <View
                          style={[
                            styleslider.thumb,
                            {
                              left: `${(leftValue / maxArticleRate) * 100}%`,
                              borderColor: "black",
                            }, // Adjust the left handle's position here
                          ]}
                          {...panResponderLeft.panHandlers} // Attach the panResponderLeft here
                        >
                          <Text style={styleslider.thumbText}>{leftValue}</Text>
                        </View>
                        <View
                          style={[
                            styleslider.thumb,
                            {
                              left: `${(rightValue / maxArticleRate) * 100}%`,
                              borderColor: "black",
                            },
                          ]}
                          {...panResponderRight.panHandlers}
                        >
                          <Text style={styleslider.thumbText}>
                            {rightValue}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{ width: width >= 720 ? "11.6%" : 150, marginLeft: 20 }}
              >
                <Text
                  style={{
                    textAlign: width >= 720 ? "right" : "left",
                    fontSize: width >= 720 ? 25 : 15,
                    fontFamily: "Glory",
                    paddingLeft: 16,
                  }}
                >
                  {maxArticleRate}
                </Text>
              </View>
            </View>
          </View>
        
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[
              styles.resetButton,
              {
                backgroundColor:
                  selectedCategories.length > 0 ? "black" : "white",
                color: selectedCategories.length > 0 ? "white" : "black",
              },
            ]}
            onPress={resetFilters}
          >
            <Text
              style={{
                color: selectedCategories.length > 0 ? "white" : "black",
                fontWeight: "600",
                fontFamily: "Glory",
                fontSize: 18, // Add this line for bold text
              }}
            >
              Reset
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
            <Text style={styles.buttonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headertrue: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    width: "100%",
    height: width >= 720 ? 80 : 40,
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: width >= 720 ? 30 : 22,
    fontFamily: "Glory",
    fontWeight: "bold",
  },
  closeIcon: {
    width: width >= 720 ? 45 : 30,
    height: width >= 720 ? 45 : 30,
  },
  categoriesContainer: {
    marginTop: 25,
    flexDirection: "row",

    flexWrap: "wrap",
    justifyContent: "space-between",
    height: "auto",
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    width: "48%",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: 8,
    padding: 5,
    height: "auto",
    maxHeight: "20%",
    justifyContent: "space-between",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 20, // For Android
  },

  radioButton: {
    width: width >= 720 ? 32 : 20,
    height: width >= 720 ? 32 : 20,
    borderRadius: width >= 720 ? 25 : 10,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 3,
  },
  radioInnerCircle: {
    width: width >= 720 ? 20 : 13,
    height: width >= 720 ? 20 : 13,
    borderRadius: width >= 720 ? 10 : 6,
    backgroundColor: "#FFF",
    borderWidth: 2,
  },
  categoryText: {
    fontSize: width >= 720 ? 16 : 12,
    fontFamily: "Glory",
    marginLeft: 3,
    width: "80%",
    paddingVertical: 5,
    flexWrap: "wrap", // Enable text wrapping
    justifyContent: "center",
    fontWeight: "500",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
  },
  button: {
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    width: 76,
    height: 38,
  },
  container2: {
    // marginTop: 5,
    width: "100%",
  },
  label: {
    fontSize: width >= 720 ? 30 : 22,
    fontFamily: "Glory",
    marginBottom: 10,
    fontWeight: "700",
    height: 50,
    paddingTop: 10,
    justifyContent: "center",
  },
  sliderContainer: {
    flexDirection: "row",
    // alignItems: 'center',
    // justifyContent: 'space-between',
    width: "100%",
  },
  resetButton: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 7.6,
    height: width >= 720 ? 42 : 38,
    width: width >= 720 ? 120 : 76,
    fontSize: width >= 720 ? 42 : 24,
    fontFamily: "Glory",
    fontWeight: "700",
    alignItems: "center",
    justifyContent: "center",
  },
  applyButton: {
    backgroundColor: "black",
    borderRadius: 7.6,
    height: width >= 720 ? 42 : 38,
    width: width >= 720 ? 120 : 76,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: width >= 720 ? 20 : 18,
    fontFamily: "Glory",
    paddingBottom: 3,
    fontWeight: "600",
  },
  tooltipContainer: {
    backgroundColor: "black",
    padding: 8,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  tooltipText: {
    position: "absolute",
    top: 20,
    color: "black",
    fontSize: 16,
    fontFamily: "Glory",
  },
});

const styleslider = StyleSheet.create({
  // sliderContainer: {
  //     flex: 1,
  //     // justifyContent: 'center',
  //     // alignItems: 'center',
  //     paddingHorizontal: 10,
  // },
  slider: {
    flexDirection: "row",
    height: 20,
    // backgroundColor: 'lightgray',
    borderRadius: 10,
    position: "relative",
  },
  border: {
    position: "absolute",
    // height: '100%',
    width: "100%",
    top: width >= 720 ? 9.9 : 6.5,
    borderWidth: 0.6,
    borderColor: "black",
    zIndex: -1,
  },
  thumb: {
    width: width >= 720 ? 16 : 13,
    height: width >= 720 ? 16 : 13,
    backgroundColor: "black",
    borderRadius: 10,
    position: "absolute",
    borderWidth: 2,
    borderColor: "black",
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  thumbText: {
    // marginTop:30,
    width: width >= 720 ? 50 : 30,
    textAlign: "center",
    position: "absolute",
    top: 15,
    color: "black",
    fontSize: width >= 720 ? 22 : 15,
    fontFamily: "Glory",
    fontWeight: "500",
  },
});
