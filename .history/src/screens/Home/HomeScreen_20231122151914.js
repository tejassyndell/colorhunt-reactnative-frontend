import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  RefreshControl,
  Alert,
} from "react-native";
import styles from "./styles";
import { FontAwesome } from "@expo/vector-icons";
import {
  getProductName,
  getcateGorywithphotos,
  getWishlistData,
  getAddWishlist,
  DeleteWishlist,
  cartcount,
} from "../../api/api";
import ButtomNavigation from "../../components/AppFooter/ButtomNavigation";
import SearchBar from "../../components/SearchBar/searchbar";
import { ActivityIndicator } from "react-native";
import Filter from "../../components/Filter/Filter";
import CreateAccount from "../../components/CreateAccount/CreateAccount";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";
import Svg, { Circle, Path } from "react-native-svg";
import SidebarSvg from "../../jssvgs/Sidebarsvg";
import ProfileSvg from "../../jssvgs/ProfileSvg";
import Loader from "../../components/Loader/Loader";
import { useFocusEffect } from "@react-navigation/native";
import { loadCustomFont } from "../../loadCustomFont";

export default function HomeScreen(props) {
  const { navigation } = props;
  const [nameData, setNameData] = useState([]);
  const [nameDatas, setNameDatas] = useState([]);
  const [selectedprd, setSelectprd] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);
  const [finalData, setFinalData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [minArticleRate, setMinArticleRate] = useState(null);
  const [maxArticleRate, setMaxArticleRate] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCreateAccountVisible, setCreateAccountVisible] = useState(false);
  const { width, height } = Dimensions.get("window");
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const [isKeyboardOpen, setKeyboardOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const fonttype = async () => {
    const status = await loadCustomFont();
  };
  useEffect(() => {
    fonttype();
  }, []);
  const onRefresh = () => {
    getCategoriesname();
  };

  // Add a listener to track keyboard visibility
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardOpen(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardOpen(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

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
  const headerHeight =
    Platform.OS === "android"
      ? width >= 720
        ? 110
        : 80
      : height >= 844
      ? 110
      : 65;
  const [kids, setkidsdata] = useState([]);
  const [showarticle, setshowarticle] = useState(false);

  // const textStyles = width >= 720 ? styles.tabletText : styles.phoneText;
  const getpartyid = async () => {
    let partydata = await AsyncStorage.getItem("UserData");
    partydata = await JSON.parse(partydata);
    return partydata[0].Id;
  };
  useEffect(() => {
    // Set isLoading to true initially
    // setIsLoading(true);
    // Use setTimeout to change isLoading to false after a delay (e.g., 2000 milliseconds or 2 seconds)
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
      setRefreshing(false);
    }, 2000);

    // Clear the timeout when the component unmounts to prevent memory leaks
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
  const openFilter = () => {
    setIsFilterVisible((prev) => !prev);
    Keyboard.dismiss();
  };

  const openCreateAccountModal = () => {
    setCreateAccountVisible(true);
  };

  const checkUserLoginforheader = async () => {
    try {
      const data = await AsyncStorage.getItem("UserData");
      if (data) {
        navigation.navigate("Profile");
      } else {
        openCreateAccountModal();
      }
    } catch (error) {
      console.error("Error while checking user data:", error);
      return false;
    }
  };

  const closeCreateAccountModal = () => {
    setCreateAccountVisible(false);
  };

  const getWishlist = async () => {
    const data = {
      party_id: await getpartyid(),
      status: "false",
    };
    const result = await getWishlistData(data).then((res) => {
      // console.log(res.data);
      setSelectprd(res.data);
    });
  };
  function convertToTitleCase(str) {
    return str
      .toLowerCase()
      .split("-") // Split the string at hyphens or spaces
      .map((word, index) => (
        <Text key={index}>
          {word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()}
        </Text>
      ))
      .reduce((prev, curr) => [prev, "-", curr]); // Join the words with hyphens and wrap them in a span element
  }

  const addArticleWishlist = async (i) => {
    let data = {
      user_id: await getpartyid(),
      article_id: i.Id,
    };
    setSelectprd((prevSelectprd) => [...prevSelectprd, { Id: i.Id }]);
    try {
      await getAddWishlist(data).then((res) => {
        // getWishlist();
      });
    } catch (error) {
      // console.log(error);
    }
  };

  const rmvProductWishlist = async (i) => {
    let data = {
      party_id: await getpartyid(),
      article_id: i.Id,
    };
    let selectedlist = selectedprd;
    selectedlist = selectedlist.filter((item) => {
      return item.Id !== i.Id;
    });
    setSelectprd(selectedlist);
    try {
      await DeleteWishlist(data).then((res) => {
        if (res.status === 200) {
          // getWishlist();
        }
      });
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getCategoriesname();
    getWishlist();
  }, []);

  const baseImageUrl =
    "https://webportalstaging.colorhunt.in/colorHuntApiStaging/public/uploads/";

  const getCategoriesname = async () => {
    setRefreshing(true);
    try {
      const result1 = await getcateGorywithphotos();
      if (result1 && result1.status === 200) {
        const filteredData = result1.data.filter(
          (item) =>
            item.Category !== "ASSORTED" &&
            item.Category !== "REJECTION" &&
            item.Category !== "kids"
        );
        setNameData(filteredData);
        setTimeout(() => {
          setIsLoading(false);
          setRefreshing(false);
        }, 2000);
      }
      const result2 = await getProductName();
      if (result2 && result2.status === 200) {
        setNameDatas(result2.data);
        setkidsdata(result2.data.filter((item) => item.Category === "kids"));
        setIsLoading(false);
        setRefreshing(false);
      } else {
        // Alert.alert("Server is not responding");
      }
      setTimeout(() => {
        setIsLoading(false);
        setRefreshing(false);
      }, 2000);
    } catch (error) {
      console.error(error);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    getCategoriesname();
  }, []);

  const key = "your_storage_key";
  const key2 = "your_storage_key";
  const viewAllArticles = async () => {
    navigation.navigate("AllArticle");

    try {
      const serializedCategories = JSON.stringify(selectedCategories);
      const serrializedPriceRange = JSON.stringify(selectedPriceRange);
      await AsyncStorage.setItem(key, serializedCategories);
      await AsyncStorage.setItem(key2, serrializedPriceRange);
    } catch (error) {
      console.error("Error storing data:", error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View
          style={{
            marginLeft: 5,
            width: 50,
            height: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              navigation.openDrawer();
            }}
          >
            <SidebarSvg />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            marginHorizontal: width >= 720 ? 10 : 5,
            width: "auto",
            height: "auto",
            padding: 4,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              checkUserLoginforheader();
              // console.log(val,";;;;;;");
              // val===true?
              // :openCreateAccountModal()
            }}
          >
            <Image
              style={{
                resizeMode: "contain",
                width: width >= 720 ? 55 : 35,
                height: width >= 720 ? 55 : 35,
              }}
              source={require("../../../assets/Profileicon/Group8919.png")}
            />
          </TouchableOpacity>
        </View>
      ),
      headerTitle: () => null, // Remove the header title
      headerStyle: {
        height: headerHeight,
        elevation: 0, // Remove the shadow on Android
        shadowOpacity: 0,

        // backgroundColor: "black",
      },
    });
  }, []);

  const handlePress = (item) => {
    navigation.navigate("CategorisWiseArticle", { item1: item });
  };
  const filterData = async () => {
    if (
      searchText == "" &&
      selectedCategories.length === 0 &&
      ((selectedPriceRange[0] == minArticleRate &&
        selectedPriceRange[1] == maxArticleRate) ||
        selectedPriceRange.length === 0)
    ) {
      // console.log("done");
      let currentText = await AsyncStorage.getItem("searchText");

      // Parse the currentText if it exists
      if (currentText) {
        currentText = JSON.parse(currentText);

        // Update the text property with your new value
        currentText.text = searchText;

        // Store the updated object back in AsyncStorage
        await AsyncStorage.setItem("searchText", JSON.stringify(currentText));
      } else {
        // If "searchText" doesn't exist, create a new object and store it
        const newObject = { text: searchText };
        await AsyncStorage.setItem("searchText", JSON.stringify(newObject));
      }
      setshowarticle(false);
    } else {
      setshowarticle(true);
      const chunkSize = 10; // Define the size of each chunk
      const totalChunks = Math.ceil(nameDatas.length / chunkSize);
      let filtered = [];

      for (let i = 0; i < totalChunks; i++) {
        const start = i * chunkSize;
        const end = (i + 1) * chunkSize;
        const chunk = nameDatas.slice(start, end);

        const chunkResult = chunk.filter(
          (item) =>
            (searchText === "" ||
              item.ArticleNumber.toString().includes(searchText.toString()) ||
              item.Category.toLowerCase().includes(searchText.toLowerCase()) ||
              item.ArticleRate.toString().includes(searchText.toString()) ||
              item.StyleDescription.toLowerCase().includes(
                searchText.toLowerCase()
              ) ||
              item.Subcategory.toLowerCase().includes(
                searchText.toLowerCase()
              )) &&
            (selectedCategories.length === 0 ||
              selectedCategories.includes(item.Category)) &&
            (selectedPriceRange.length === 0 ||
              (item.ArticleRate >= selectedPriceRange[0] &&
                item.ArticleRate <= selectedPriceRange[1]))
        );

        if (chunkResult.length > 0) {
          filtered = [...filtered, ...chunkResult];
          if (parseInt(filtered.length) >= 4) {
            // console.log(filtered.length,typeof 4);
            break; // Stop after the first matching chunk
          }
        }
      }

      setFinalData(filtered);

      let currentText = await AsyncStorage.getItem("searchText");

      // Parse the currentText if it exists
      if (currentText) {
        currentText = JSON.parse(currentText);

        // Update the text property with your new value
        currentText.text = searchText;

        // Store the updated object back in AsyncStorage
        await AsyncStorage.setItem("searchText", JSON.stringify(currentText));
      } else {
        // If "searchText" doesn't exist, create a new object and store it
        const newObject = { text: searchText };
        await AsyncStorage.setItem("searchText", JSON.stringify(newObject));
      }
    }
    // console.log("done", "_+__+");
  };

  const filtercategoriesrange = (categories, priceRange) => {
    // console.log(categories, priceRange);
    // console.log(minArticleRate, maxArticleRate);
    if (
      categories.length === 0 &&
      priceRange[0] == minArticleRate &&
      priceRange[1] == maxArticleRate
    ) {
      // console.log("done");
      setshowarticle(false);
    } else {
      setshowarticle(true);
      const chunkSize = 10; // Define the size of each chunk
      const totalChunks = Math.ceil(nameDatas.length / chunkSize);
      let filtered = [];

      for (let i = 0; i < totalChunks; i++) {
        const start = i * chunkSize;
        const end = (i + 1) * chunkSize;
        const chunk = nameDatas.slice(start, end);

        const chunkResult = chunk.filter(
          (item) =>
            (categories.length === 0 || categories.includes(item.Category)) &&
            (priceRange.length === 0 ||
              (item.ArticleRate >= priceRange[0] &&
                item.ArticleRate <= priceRange[1]))
        );

        if (chunkResult.length > 0) {
          filtered = [...filtered, ...chunkResult];
          break; // Stop after the first matching chunk
        }
      }

      setFinalData(filtered);
    }
    // console.log("done", "_+__+");
  };
  useEffect(() => {
    filterData();
  }, [searchText]);

  const handleFilterChange = (categories, priceRange) => {
    // console.log(categories, priceRange);
    setSelectedCategories(categories);
    setSelectedPriceRange(priceRange);
    setSearchText("");
    filtercategoriesrange(categories, priceRange);
  };

  // useEffect(() => {
  //   filterData();
  // }, [searchText, selectedCategories, selectedPriceRange]);

  const handleCloseFilter = (isClosed) => {
    setIsFilterVisible(isClosed);
  };

  useEffect(() => {
    const minRate = nameDatas.reduce((min, item) => {
      const articleRate = parseFloat(item.ArticleRate); // Convert the article rate to a number
      return articleRate < min ? articleRate : min;
    }, Infinity);

    const maxRate = nameDatas.reduce((max, item) => {
      const articleRate = parseFloat(item.ArticleRate); // Convert the article rate to a number
      return articleRate > max ? articleRate : max;
    }, -Infinity);

    setMinArticleRate(minRate);
    setMaxArticleRate(maxRate);
  }, [nameDatas]);

  const checkUserLogin = async () => {
    const token = await AsyncStorage.getItem("UserData");

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkUserLogin();
  }, []);
  return (
    <>
      {isLoading ? (
        <View style={styles.loader}>
          <Loader />
        </View>
      ) : (
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#FFF",
            paddingStart: 5,
            marginBottom: width >= 720 ? 10 : 0,
          }}
        >
          <View style={{ marginTop: 0 }}>
            <View
              style={{
                height: width >= 720 ? 60 : 40,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: width >= 720 ? 32 : 24,
                  fontFamily: isFontLoaded
                    ? "GloryExtraBold"
                    : "Arial, sans-serif",
                  paddingLeft: 8,
                }}
              >
                Welcome
              </Text>
            </View>
            {isLoggedIn ? (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <SearchBar
                  searchPhrase={searchText}
                  setSearchPhrase={setSearchText}
                />

                <TouchableOpacity
                  style={{ width: "10%", alignItems: "flex-end" }}
                  onPress={() => {
                    isLoggedIn ? openFilter() : openCreateAccountModal();
                  }}
                >
                  <Svg
                    width={width >= 720 ? 60 : 35}
                    height={width >= 720 ? 60 : 35}
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/Svg"
                    {...props}
                  >
                    <Circle cx={20} cy={20} r={20} fill="#212121" />
                    <Path
                      opacity={0.4}
                      d="M18.6198 22.9297H13.8854C13.2862 22.9297 12.7998 23.4076 12.7998 23.9962C12.7998 24.5841 13.2862 25.0628 13.8854 25.0628H18.6198C19.219 25.0628 19.7054 24.5841 19.7054 23.9962C19.7054 23.4076 19.219 22.9297 18.6198 22.9297Z"
                      fill="white"
                    />
                    <Path
                      opacity={0.4}
                      d="M27.1997 16.0326C27.1997 15.4447 26.7133 14.9668 26.1149 14.9668H21.3805C20.7814 14.9668 20.2949 15.4447 20.2949 16.0326C20.2949 16.6213 20.7814 17.0991 21.3805 17.0991H26.1149C26.7133 17.0991 27.1997 16.6213 27.1997 16.0326Z"
                      fill="white"
                    />
                    <Path
                      d="M17.7518 16.0322C17.7518 17.3762 16.6438 18.4655 15.2758 18.4655C13.9086 18.4655 12.7998 17.3762 12.7998 16.0322C12.7998 14.689 13.9086 13.5996 15.2758 13.5996C16.6438 13.5996 17.7518 14.689 17.7518 16.0322Z"
                      fill="white"
                    />
                    <Path
                      d="M27.2001 23.9665C27.2001 25.3098 26.0921 26.3991 24.7241 26.3991C23.3568 26.3991 22.248 25.3098 22.248 23.9665C22.248 22.6225 23.3568 21.5332 24.7241 21.5332C26.0921 21.5332 27.2001 22.6225 27.2001 23.9665Z"
                      fill="white"
                    />
                  </Svg>
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "112%",
                }}
              >
                <SearchBar
                  searchPhrase={searchText}
                  setSearchPhrase={setSearchText}
                />
              </View>
            )}
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 0.7 }}
            keyboardShouldPersistTaps="handled"
            style={{ overflow: "hidden" }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View style={{ width: "100%", flexDirection: "row", top: 10 }}>
              <Text
                style={{
                  start: 10,
                  fontSize: width >= 720 ? 25 : 20,
                  fontFamily: isFontLoaded
                    ? "GloryExtraBold"
                    : "Arial, sans-serif",
                }}
              >
                Men's
              </Text>
              <Text
                style={{
                  position: "absolute",
                  color: "#666666",
                  end: 10,
                  fontSize: width >= 720 ? 20 : 14,
                  fontFamily: isFontLoaded
                    ? "GlorySemiBold"
                    : "Arial, sans-serif",
                }}
                onPress={() => {
                  viewAllArticles();
                }}
              >
                View All
              </Text>
            </View>

            <View
              style={{
                maxWidth: "100%",
                height: "auto",
                flexDirection: "row",
                marginTop: "3%",
                shadowColor: "grey",
                shadowOffset: {
                  width: 1,
                  height: 1,
                },
                shadowOpacity: 0.5,
                elevation: 2,
              }}
            >
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{ flex: 1 }}
              >
                {showarticle ? (
                  finalData.length > 0 ? (
                    finalData.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          navigation.navigate("DetailsOfArticals", {
                            id: item.Id,
                          });
                        }}
                      >
                        <View
                          key={index}
                          style={{
                            alignItems: "center",
                            width: width >= 720 ? 300 : 155,
                            height: width >= 720 ? 280 : 280,
                            marginLeft: width >= 720 ? 15 : 10,
                            marginRight: width >= 720 ? 15 : 5,
                            borderRadius: 10,
                            marginTop: 10,
                          }}
                        >
                          <View
                            style={{
                              width: width >= 720 ? 300 : 155,
                              height: width >= 720 ? 280 : 190,
                              borderRadius: 12,
                              backgroundColor: "#FFF",
                              elevation: 2,
                            }}
                          >
                            {isLoggedIn ? (
                              <View id={item.id} style={styles.producticones}>
                                {selectedprd.some((i) => i.Id === item.Id) ? (
                                  <TouchableOpacity
                                    onPress={() => {
                                      rmvProductWishlist(item);
                                    }}
                                  >
                                    <FontAwesome
                                      name="heart"
                                      style={[styles.icon]}
                                    />
                                  </TouchableOpacity>
                                ) : (
                                  <TouchableOpacity
                                    onPress={() => {
                                      isLoggedIn
                                        ? addArticleWishlist(item)
                                        : openCreateAccountModal();
                                    }}
                                  >
                                    <FontAwesome
                                      name="heart-o"
                                      style={[styles.disabledIcon]}
                                    />
                                  </TouchableOpacity>
                                )}
                              </View>
                            ) : null}
                            {item.Photos ? (
                              <Image
                                source={{ uri: baseImageUrl + item.Photos }}
                                style={{
                                  width: "100%",
                                  height: width >= 720 ? 280 : 190,
                                  borderRadius: 10,
                                  resizeMode: "contain",
                                }}
                              />
                            ) : (
                              <Image
                                source={require("../../../assets/demo.png")}
                                style={{
                                  width: "100%",
                                  height: width >= 720 ? 280 : 190,
                                  borderRadius: 10,
                                }}
                              />
                            )}
                          </View>

                          <Text
                            style={{
                              marginTop: 10,
                              fontSize: width >= 720 ? 20 : 18,
                              fontFamily: isFontLoaded
                                ? "GloryExtraBold"
                                : "Arial, sans-serif",
                            }}
                          >
                            {item.ArticleNumber}
                          </Text>
                          <Text
                            style={{
                              fontSize: width >= 720 ? 16 : 16,
                              fontFamily: isFontLoaded
                                ? "GloryMedium"
                                : "Arial, sans-serif",
                            }}
                          >
                            {convertToTitleCase(item.Category)}
                          </Text>
                          <Text
                            style={{
                              fontSize: width >= 720 ? 20 : 18,
                              fontFamily: isFontLoaded
                                ? "GloryBold"
                                : "Arial, sans-serif",
                            }}
                          >
                            {isLoggedIn ? "₹" + item.ArticleRate + ".00" : null}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))
                  ) : (
                    <View
                      style={{
                        width: "100%",
                        height: "80%",
                        justifyContent: "center",
                        textAlign: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: width >= 720 ? 25 : 17,
                          fontFamily: "GloryMedium",
                          textAlign: "center",
                          color: "#808080",
                        }}
                      >
                        No Article Found
                      </Text>
                    </View>
                  )
                ) : (
                  nameData.map((item, index) => (
                    <View
                      key={index}
                      style={{
                        alignItems: "center",
                        height: "auto",
                        width: width >= 720 ? 300 : 165,
                        marginLeft: width >= 720 ? 15 : 5,
                        marginRight: width >= 720 ? 15 : 5,
                        marginTop: width >= 720 ? 30 : 10,
                        marginBottom: 10,
                        borderRadius: 10,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          handlePress(item);
                        }}
                      >
                        <View
                          style={{
                            width: width >= 720 ? 300 : 155, // Adjust the width for tablets
                            height: width >= 720 ? 280 : 190,
                            borderColor: "gray",
                            shadowColor: "gray",
                            shadowOpacity: 0.1,
                            shadowRadius: 10,
                            elevation: 10,
                            shadowOffset: {
                              width: 1,
                              height: 1,
                            },
                          }}
                        >
                          {item.Photos ? (
                            <Image
                              source={{ uri: baseImageUrl + item.Photos }}
                              style={{
                                width: "100%",
                                height: width >= 720 ? 280 : 190,
                                borderRadius: 10,
                              }}
                            />
                          ) : (
                            <Image
                              source={require("../../../assets/demo.png")}
                              style={{
                                width: "100%",
                                height: width >= 720 ? 280 : 190,
                                borderRadius: 10,
                              }}
                            />
                          )}
                        </View>
                      </TouchableOpacity>
                      <Text
                        style={{
                          marginTop: 10,
                          fontSize: width >= 720 ? 30 : 18,
                          fontFamily: isFontLoaded
                            ? "GloryExtraBold"
                            : "Arial, sans-serif",
                          marginBottom: 10,
                          textAlign: "center",
                        }}
                      >
                        {convertToTitleCase(item.Category)}
                      </Text>
                    </View>
                  ))
                )}
              </ScrollView>
            </View>
            <View></View>
            {kids.length === 0 ? (
              ""
            ) : (
              <View style={{ marginTop: width >= 720 ? 30 : 10 }}>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    top: 10,
                    marginTop: 5,
                  }}
                >
                  <Text
                    style={{
                      start: 10,
                      fontSize: width >= 720 ? 25 : 20,
                      fontFamily: isFontLoaded
                        ? "GloryExtraBold"
                        : "Arial, sans-serif",
                    }}
                  >
                    Kid’s
                  </Text>
                  <Text
                    style={{
                      position: "absolute",
                      end: 10,
                      color: "#666666",
                      fontSize: width >= 720 ? 20 : 14,
                      fontFamily: isFontLoaded
                        ? "GlorySemiBold"
                        : "Arial, sans-serif",
                    }}
                    onPress={() => {
                      // viewAllArticles();
                    }}
                  >
                    View All
                  </Text>
                </View>

                <View
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "auto",
                    flexDirection: "row",
                    top: 20,
                  }}
                >
                  {kids.map((item, index) => (
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      style={{ overflow: "hidden" }}
                    >
                      <View
                        key={index}
                        style={{
                          alignItems: "center",
                          width: width >= 720 ? 300 : 155,
                          height: width >= 720 ? 280 : 280,
                          marginLeft: width >= 720 ? 15 : 10,
                          marginRight: width >= 720 ? 15 : 5,
                          borderRadius: 10,
                          marginTop: 10,
                        }}
                      >
                        <View
                          style={{
                            width: width >= 720 ? 300 : 155,
                            height: width >= 720 ? 280 : 190,
                            borderRadius: 12,
                            backgroundColor: "#FFF",
                            elevation: 2,
                          }}
                        >
                          <View id={item.id} style={styles.producticones}>
                            {selectedprd.some((i) => i.Id === item.Id) ? (
                              <TouchableOpacity
                                onPress={() => {
                                  rmvProductWishlist(item);
                                }}
                              >
                                <FontAwesome
                                  name="heart"
                                  style={[styles.icon]}
                                />
                              </TouchableOpacity>
                            ) : (
                              <TouchableOpacity
                                onPress={() => {
                                  isLoggedIn
                                    ? addArticleWishlist(item)
                                    : openCreateAccountModal();
                                }}
                              >
                                <FontAwesome
                                  name="heart-o"
                                  style={[styles.disabledIcon]}
                                />
                              </TouchableOpacity>
                            )}
                          </View>
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate("DetailsOfArticals", {
                                id: item.Id,
                              });
                            }}
                          >
                            <Image
                              source={{ uri: baseImageUrl + item.Photos }}
                              style={{
                                width: "100%",
                                height: width >= 720 ? 280 : 190,
                                borderRadius: 10,
                              }}
                            />
                          </TouchableOpacity>
                        </View>

                        <Text
                          style={{
                            marginTop: 10,
                            fontSize: width >= 720 ? 18 : 12,
                            fontFamily: isFontLoaded
                              ? "GloryExtraBold"
                              : "Arial, sans-serif",
                          }}
                        >
                          {item.ArticleNumber}
                        </Text>
                        <Text
                          style={{
                            fontSize: width >= 720 ? 15 : 10,
                            fontFamily: isFontLoaded
                              ? "GloryMedium"
                              : "Arial, sans-serif",
                          }}
                        >
                          {convertToTitleCase(item.Category)}
                        </Text>
                        <Text
                          style={{
                            fontSize: width >= 720 ? 18 : 12,
                            fontFamily: isFontLoaded
                              ? "GloryBold"
                              : "Arial, sans-serif",
                          }}
                        >
                          {"₹" + item.ArticleRate + ".00"}
                        </Text>
                      </View>
                    </ScrollView>
                  ))}
                </View>
              </View>
            )}
          </ScrollView>
        </View>
      )}
      <KeyboardAvoidingView behavior={isKeyboardOpen ? "padding" : null}>
        {isFilterVisible ? null : (
          <View style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
            <ButtomNavigation
              navigation={navigation}
              isLoggedIn={isLoggedIn}
              page="home"
            />
          </View>
        )}

        {/* Other components here */}
      </KeyboardAvoidingView>
      {isFilterVisible && (
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            zIndex: 2,
          }}
        >
          <View
            style={{
              width: "92%",
              backgroundColor: "white",
              position: "absolute",
              bottom: "2%",
              marginLeft: "4%",
              padding: 5,
              borderRadius: 20,
            }}
          >
            <Filter
              onFilterChange={handleFilterChange}
              onCloseFilter={handleCloseFilter}
              Scategories={selectedCategories}
              minArticleRate={minArticleRate}
              maxArticleRate={maxArticleRate}
              status={true}
              spr={selectedPriceRange}
              uniquerates={nameDatas}
            />
          </View>
        </View>
      )}
      <Modal
        visible={isCreateAccountVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeCreateAccountModal}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              width: "95%",
              backgroundColor: "#fff",
              borderRadius: 10,
              padding: 10,
              marginTop: 25,
              marginBottom: 25,
            }}
          >
            <CreateAccount onClose={closeCreateAccountModal} />
          </View>
        </View>
      </Modal>
    </>
  );
}
