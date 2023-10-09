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
} from "react-native";
// import Image from 'react-native-responsive-image';
import styles from "./styles";
import { FontAwesome } from "@expo/vector-icons";
import {
  getProductName,
  getcateGorywithphotos,
  getWishlistData,
  getAddWishlist,
  DeleteWishlist,
} from "../../api/api";
import ButtomNavigation from "../../components/AppFooter/ButtomNavigation";
import SearchBar from "../../components/SearchBar/searchbar";
import { ActivityIndicator } from "react-native";
import Filter from "../../components/Filter/Filter";
import CreateAccount from "../../components/CreateAccount/CreateAccount";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
export default function HomeScreen(props) {
  const { navigation } = props;
  const [categoryName, setCategoryName] = useState();
  const [ApplyStatushBack, setApplyStatushBack] = useState(true);
  const [nameData, setNameData] = useState([]);
  const [nameDatas, setNameDatas] = useState([]);
  const [applyrData, setApplyData] = useState([]);
  const [selectedprd, setSelectprd] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);
  const [finalData, setFinalData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [filterDataSearch, setFilterDataSearch] = useState([]);
  const [minArticleRate, setMinArticleRate] = useState(null);
  const [maxArticleRate, setMaxArticleRate] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCreateAccountVisible, setCreateAccountVisible] = useState(false);
  const { width, height } = Dimensions.get("window");
  const headerHeight = Platform.OS === 'android' ? (width >= 720 ? 120 : 100) : 120;
  const [kids, setkidsdata] = useState([])
  // const textStyles = width >= 720 ? styles.tabletText : styles.phoneText;

  // useEffect(() => {
  //   // Set isLoading to true initially
  //   setIsLoading(true);
  //   // Use setTimeout to change isLoading to false after a delay (e.g., 2000 milliseconds or 2 seconds)
  //   const timeoutId = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000);

  //   // Clear the timeout when the component unmounts to prevent memory leaks
  //   return () => {
  //     clearTimeout(timeoutId);
  //   };
  // }, []);
  const openFilter = () => {
    setIsFilterVisible((prev) => !prev); // Toggle the Filter component visibility
  };

  const openCreateAccountModal = () => {
    console.log("done");
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
      return false; // Handle errors by returning false or appropriate error handling
    }
  };

  const closeCreateAccountModal = () => {
    setCreateAccountVisible(false);
  };

  const getWishlist = async () => {
    const data = {
      party_id: 197,
    };
    const result = await getWishlistData(data).then((res) => {
      setSelectprd(res.data);
    });
  };
  function convertToTitleCase(str) {
    return str
      .toLowerCase()
      .split("-") // Split the string at hyphens or spaces
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join("-"); // Join the words with spaces
  }

  const addArticleWishlist = async (i) => {
    let data = {
      user_id: 197,
      article_id: i.Id,
    };
    console.log("............111", data);
    try {
      await getAddWishlist(data).then((res) => {
        getWishlist();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const rmvProductWishlist = async (i) => {
    console.log(i, "r");
    let data = {
      party_id: 197,
      article_id: i.Id,
    };
    console.log(data);

    try {
      await DeleteWishlist(data).then((res) => {
        if (res.status === 200) {
          getWishlist();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategoriesname();
    getWishlist();
  }, []);

  // uploard url image
  const baseImageUrl = "https://colorhunt.in/colorHuntApi/public/uploads/";
  //getCategoriesname
  // const getCategoriesname = async () => {
  //   try {
  //     const result1 = await getcateGorywithphotos();
  //     if (result1.status === 200) {
  //       setCategoryName(result1.data);
  //       setNameData(result1.data);
  //       setApplyData(result1.data);
  //     }

  //     const result2 = await getProductName();
  //     if (result2.status === 200) {
  //       setCategoryName(result2.data);
  //       setNameDatas(result2.data);
  //       setApplyData(result2.data);
  //       setFilterDataSearch(result2.data);
  //     }

  //     setIsLoading(false);
  //   } catch (error) {
  //     // Handle any errors that might occur during the API requests.
  //     console.error(error);
  //     setIsLoading(false); // Make sure to set isLoading to false in case of an error.
  //   }
  // };

  const getCategoriesname = async () => {
    try {
      // Make an API request to get category data with photos
      const result1 = await getcateGorywithphotos();

      // Check if the response status is 200 (success)
      if (result1.status === 200) {
        // Update state variables with the data from the API response
        setCategoryName(result1.data);
        setNameData(result1.data);
        setApplyData(result1.data);
      }

      // Make another API request to get product names
      const result2 = await getProductName();

      // Check if the response status is 200 (success)
      if (result2.status === 200) {
        // Update state variables with the data from the API response
        setCategoryName(result2.data);
        setNameDatas(result2.data);
        setApplyData(result2.data);
        setFilterDataSearch(result2.data);
        setkidsdata(nameDatas.filter((item) => item.Category === "kids"));
      }

      // Set isLoading to false to indicate that data loading is complete
      setIsLoading(false);
    } catch (error) {
      console.error(error);

      // Set isLoading to false in case of an error.
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCategoriesname();
  }, []);

  const viewAllArticles = () => {
    console.log(finalData.length, "lenght of navigation data ");
    navigation.navigate("AllArticle", { finalData });
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
              navigation.openDrawer();
            }}
          >
            <Image
              source={require("../../../assets/sidbarOpenIcone.png")}
              style={{
                width: width >= 720 ? 50 : 35,
                height: width >= 720 ? 50 : 35,
                // resizeMode: "contain",
                borderRadius: 5,
              }}
            ></Image>
          </TouchableOpacity>
        </View>
      ),
      headerTitle: () => <View />,
      headerRight: () => (
        <View
          style={{
            marginHorizontal: 10,
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
                // resizeMode: "contain",
                width: width >= 720 ? 50 : 35,
                height: width >= 720 ? 50 : 35,
              }}
              source={require("../../../assets/Nevbar/Profile.png")}
            />
          </TouchableOpacity>
        </View>
      ),
      headerTitle: () => null, // Remove the header title
      headerStyle: {
        height: headerHeight
        // backgroundColor: "black",
      },
    });
  }, []);
  const handlePress = (item) => {
    navigation.navigate("CategorisWiseArticle", { item1: item });
  };

  const filterData = () => {
    if (searchText === "") {
    } else {
      console.log(searchText);
      const filtered = filterDataSearch.filter(
        (item) =>
          item.ArticleNumber.toString().includes(searchText.toString()) ||
          item.Category.toLowerCase().includes(searchText.toLowerCase()) ||
          item.ArticleRate.toString().includes(searchText.toString()) ||
          item.StyleDescription.toLowerCase().includes(
            searchText.toLowerCase()
          ) ||
          item.Subcategory.toLowerCase().includes(searchText.toLowerCase())
      );
      console.log(filtered.length, "search data lnegth");
      setFinalData(filtered);
    }
  };

  useEffect(() => {
    filterData();
  }, [searchText]);

  const handleFilterChange = (categories, priceRange) => {
    setSelectedCategories(categories);
    setSelectedPriceRange(priceRange);
    setSearchText("");
    const filteredData = nameDatas.filter(
      (item) =>
        selectedCategories.includes(item.Category) &&
        item.ArticleRate >= selectedPriceRange[0] &&
        item.ArticleRate <= selectedPriceRange[1]
    );

    setFinalData(filteredData);
  };

  useEffect(() => {
    console.log(selectedCategories, "Sc");
    console.log(selectedPriceRange, "Range");
    const abc = nameDatas.filter(
      (item) =>
        (!selectedCategories.length ||
          selectedCategories.includes(item.Category)) &&
        item.ArticleRate >= selectedPriceRange[0] &&
        item.ArticleRate <= selectedPriceRange[1]
    );
    console.log(abc.length);
    setFinalData(abc);
  }, [selectedCategories, selectedPriceRange]);

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
    console.log(minArticleRate);
    setMaxArticleRate(maxRate);
    console.log(maxArticleRate);
  }, [nameDatas]);

  const checkUserLogin = async () => {
    const token = await AsyncStorage.getItem("UserData");

    if (token) {
      console.log(token, "------------");
      setIsLoggedIn(true);
    } else {
      console.log(token, "()()()()(");
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
          <ActivityIndicator size="large" color="black" />
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
                  fontSize: width >= 720 ? 32 : 22,
                  fontWeight: "700",
                  paddingLeft: 8,

                  // fontFamily: "Glory-Regular",
                }}
              >
                Welcome
              </Text>
            </View>
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
                <Image
                  source={require("../../../assets/filetr_icone.png")}
                  style={{
                    width: width >= 720 ? 65 : 40, // Adjust the width for tablets
                    height: width >= 720 ? 65 : 40,
                    // resizeMode: "contain",
                    borderRadius: 10,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            style={{ overflow: "hidden" }}
          >
            <View style={{ width: "100%", flexDirection: "row", top: 10 }}>
              <Text
                style={{
                  start: 10,
                  fontWeight: "700",
                  fontSize: width >= 720 ? 25 : 18,
                }}
              >
                Men's
              </Text>
              <Text
                style={{
                  position: "absolute",
                  color: "rgba(102, 102, 102, 1)",
                  end: 10,
                  fontSize: width >= 720 ? 20 : 12,
                  fontWeight: "600",
                }}
                onPress={() => {
                  isLoggedIn ? viewAllArticles() : openCreateAccountModal();
                }}
              >
                View All
              </Text>
            </View>

            <View
              style={{
                position: "relative",
                maxWidth: "100%",
                height: "auto",
                flexDirection: "row",
                marginTop: "3%",
              }}
            >
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{ flex: 1, overflow: "hidden" }}
              >
                {ApplyStatushBack === true
                  ? finalData.length > 0
                    ? finalData.map((fitem,index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          isLoggedIn
                            ? navigation.navigate("DetailsOfArticals", {
                              id: fitem.Id,
                            })
                            : openCreateAccountModal();
                        }}
                      >
                        <View
                         
                          style={{
                            alignItems: "center",
                            width: width >= 720 ? 300 : 155, // Adjust the width for tablets
                            height: width >= 720 ? 280 : 280,
                            marginLeft: width >= 720 ? 15 : 10,
                            marginRight: width >= 720 ? 15 : 5,
                            borderRadius: 10,
                          }}
                        // style={styles.contener2}
                        >
                          <View
                            style={{
                              width: width >= 720 ? 300 : 155, // Adjust the width for tablets
                              height: width >= 720 ? 280 : 190,
                              borderColor: "gray",
                              shadowColor: "rgba(0, 0, 0, 0.5)",
                              shadowOpacity: 0.9,
                              shadowRadius: 3,
                              borderRadius: 10,
                              elevation: 4, // For Android, use elevation
                              shadowOffset: {
                                width: 0,
                                height: 0,
                              },
                            }}
                          // style={styles.fastconimage1}
                          >
                            <View id={fitem.id} style={styles.producticones}>
                              {selectedprd.some((i) => i.Id === fitem.Id) ? (
                                <TouchableOpacity
                                  onPress={() => {
                                    isLoggedIn
                                      ? rmvProductWishlist(fitem)
                                      : openCreateAccountModal();
                                  }}
                                >
                                  <FontAwesome
                                    name="heart"
                                    style={[
                                      styles.icon,
                                      // isLoggedin === false ? styles.disabledIcon : null,
                                    ]}
                                  />
                                </TouchableOpacity>
                              ) : (
                                <TouchableOpacity
                                  onPress={() => {
                                    isLoggedIn
                                      ? addArticleWishlist(fitem)
                                      : openCreateAccountModal();
                                  }}
                                >
                                  <FontAwesome
                                    name="heart-o"
                                    style={[
                                      styles.disabledIcon,
                                      // isLoggedin === false ? styles.disabledIcon : null,
                                    ]}
                                  />
                                </TouchableOpacity>
                              )}
                            </View>
                            {fitem.Photos ? (
                              <Image
                                source={{ uri: baseImageUrl + fitem.Photos }}
                                style={{
                                  width: "100%",
                                  resizeMode: "contain",
                                  height: width >= 720 ? 280 : 190,
                                  borderRadius: 10,
                                }}
                              // style={styles.fastconimage}
                              />
                            ) : (
                              <Image
                                source={require("../../../assets/demo.png")}
                                style={{
                                  width: "100%",
                                  height: width >= 720 ? 280 : 190,
                                  borderRadius: 10,
                                }}
                              // style={styles.fastconimage}
                              />
                            )}
                          </View>

                          <Text
                            style={{
                              fontWeight: "bold",
                              marginTop: 10,
                              fontSize: width >= 720 ? 20 : 15,
                            }}
                          >
                            {fitem.ArticleNumber}
                          </Text>
                          <Text>{convertToTitleCase(fitem.Category)}</Text>
                          <Text style={{ fontWeight: "bold" }}>
                            {"₹" + fitem.ArticleRate + ".00"}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))
                    : nameData.map((nitem,index) => (
                      <View
                        key={index}
                        style={{
                          alignItems: "center",
                          height: "auto",
                          width: width >= 720 ? 300 : 165,
                          marginLeft: width >= 720 ? 15 : 5,
                          marginRight: width >= 720 ? 15 : 5,
                          marginTop: 10,
                          marginBottom: 10,
                          borderRadius: 10,
                        }}
                      // style={styles.contener2}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            isLoggedIn
                              ? handlePress(nitem)
                              : openCreateAccountModal();
                          }}
                        >
                          <View
                            style={{
                              width: width >= 720 ? 300 : 155, // Adjust the width for tablets
                              height: width >= 720 ? 280 : 190,
                              borderColor: "gray",
                              shadowColor: "gray",
                              shadowOpacity: 0.9,
                              shadowRadius: 10,
                              elevation: 10,
                              shadowOffset: {
                                width: 0,
                                height: 0,
                              },
                            }}
                          // style={styles.fastconimage1}
                          >
                            {nitem.Photos ? (
                              <Image
                                source={{ uri: baseImageUrl + nitem.Photos }}
                                style={{
                                  width: "100%",
                                  resizeMode: "contain",
                                  height: width >= 720 ? 280 : 190,
                                  borderRadius: 10,
                                }}
                              // style={styles.fastconimage}
                              />
                            ) : (
                              <Image
                                source={require("../../../assets/demo.png")}
                                style={{
                                  width: "100%",
                                  height: width >= 720 ? 280 : 190,
                                  borderRadius: 10,
                                }}
                              // style={styles.fastconimage}
                              />
                            )}
                          </View>
                        </TouchableOpacity>
                        <Text
                          style={{
                            marginTop: 10,
                            fontWeight: "bold",
                            fontSize: width >= 720 ? 30 : 14,
                            marginBottom: 10,
                            textAlign: "center",
                          }}
                        >
                          {convertToTitleCase(nitem.Category)}
                        </Text>
                      </View>
                    ))
                  : applyrData.map((aitem,index) => (
                    <View
                      key={index}
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        width: width >= 720 ? 300 : 200,
                        marginLeft: width >= 720 ? 15 : 5,
                        marginRight: width >= 720 ? 15 : 5,
                      }}
                    // style={styles.contener2}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          isLoggedIn
                            ? handlePress(aitem)
                            : openCreateAccountModal();
                        }}
                      >
                        <Image
                          source={require("../../../assets/demo.png")}
                          style={{
                            width: width >= 720 ? 300 : 200, // Adjust the width for tablets
                            height: width >= 720 ? 280 : 300,
                            borderRadius: 10,
                          }}
                        // style={styles.fastconimage}
                        />
                      </TouchableOpacity>
                      <Text
                        style={{
                          marginTop: 10,
                          fontSize: 17,
                          fontWeight: "bold",
                        }}
                      >
                        {convertToTitleCase(aitem.Category)}
                      </Text>
                    </View>
                  ))}
              </ScrollView>
            </View>
            <View></View>
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
                    fontWeight: "700",
                    fontSize: width >= 720 ? 25 : 18,
                  }}
                >
                  Kid’s
                </Text>
                <Text
                  style={{
                    position: "absolute",
                    end: 10,
                    color: "rgba(102, 102, 102, 1)",
                    fontSize: width >= 720 ? 18 : 12,
                    fontWeight: "600",
                  }}
                  onPress={() => {
                    isLoggedIn ? viewAllArticles() : openCreateAccountModal();
                  }}
                >
                  View All
                </Text>
              </View>

              <View
                style={{
                  position: "relative",
                  maxWidth: "100%",
                  height: "auto",
                  flexDirection: "row",
                  top: 20,
                }}
              >
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  style={{ flex: 1, overflow: "hidden" }}
                >
                  {kids.length === 0 ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: 17 }}>No Kids Article Found</Text>
                    </View>

                    : kids.map((kitem,index) => (
                      <View
                        key={index}
                        style={{
                          alignItems: "center",
                          width: width >= 720 ? 300 : 155, // Adjust the width for tablets
                          height: width >= 720 ? 280 : 280,
                          marginLeft: width >= 720 ? 15 : 10,
                          marginRight: width >= 720 ? 15 : 5,
                          marginBottom: width >= 720 ? "4%" : 120,
                          borderRadius: 10,
                        }}
                      >
                        <View
                          style={{
                            width: width >= 720 ? 300 : 155, // Adjust the width for tablets
                            height: width >= 720 ? 280 : 190,
                            borderColor: "gray",
                            shadowColor: "rgba(0, 0, 0, 0.5)",
                            shadowOpacity: 0.9,
                            shadowRadius: 3,
                            borderRadius: 10,
                            elevation: 4, // For Android, use elevation
                            shadowOffset: {
                              width: 0,
                              height: 0,
                            },
                          }}
                        >
                          <View id={kitem.id} style={styles.producticones}>
                            {selectedprd.some((i) => i.Id === kitem.Id) ? (
                              <TouchableOpacity
                                onPress={() => {
                                  isLoggedIn
                                    ? rmvProductWishlist(kitem)
                                    : openCreateAccountModal();
                                }}
                              >
                                <FontAwesome
                                  name="heart"
                                  style={[
                                    styles.icon,
                                    // isLoggedin === false ? styles.disabledIcon : null,
                                  ]}
                                />
                              </TouchableOpacity>
                            ) : (
                              <TouchableOpacity
                                onPress={() => {
                                  isLoggedIn
                                    ? addArticleWishlist(kitem)
                                    : openCreateAccountModal();
                                }}
                              >
                                <FontAwesome
                                  name="heart-o"
                                  style={[
                                    styles.disabledIcon,
                                    // isLoggedin === false ? styles.disabledIcon : null,
                                  ]}
                                />
                              </TouchableOpacity>
                            )}
                          </View>
                          <Image
                            source={{ uri: baseImageUrl + kitem.Photos }}
                            style={{
                              flex: 1,
                              resizeMode: "contain",
                              borderRadius: 10,
                            }}
                          />
                        </View>

                        <Text
                          style={{
                            fontWeight: "bold",
                            marginTop: 10,
                            fontSize: width >= 720 ? 18 : 12,
                          }}
                        >
                          {kitem.ArticleNumber}
                        </Text>
                        <Text style={{ fontSize: width >= 720 ? 15 : 10 }}>
                          {convertToTitleCase(kitem.Category)}
                        </Text>
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontSize: width >= 720 ? 18 : 12,
                          }}
                        >
                          {"₹" + kitem.ArticleRate + ".00"}
                        </Text>
                      </View>
                    ))}
                </ScrollView>
              </View>
            </View>
          </ScrollView>
        </View>
      )}
      {isFilterVisible ? null : (
        <View style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
          <ButtomNavigation
            navigation={navigation}
            isLoggedIn={isLoggedIn}
            page="home"
          />
        </View>
      )}
      {isFilterVisible && (
        <View
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            right: 0, // Updated to 0
            left: 0,
            zIndex: 2,
          }}
        >
          <View
            style={{
              width: "92%",
              backgroundColor: "white",
              position: "absolute",
              bottom: 0,
              marginLeft: "4%",
              padding: 5,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          >
            <Filter
              onFilterChange={handleFilterChange}
              onCloseFilter={handleCloseFilter}
              Scategories={selectedCategories}
              minArticleRate={minArticleRate}
              maxArticleRate={maxArticleRate}
              status={false}
              spr={selectedPriceRange}
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
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
        >
          <View
            style={{
              width: "100%", // Adjust the width as needed
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
