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
  const headerHeight =
    Platform.OS === "android" ? (width >= 720 ? 120 : 100) : 120;
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
    setIsLoading(true);
    // Use setTimeout to change isLoading to false after a delay (e.g., 2000 milliseconds or 2 seconds)
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Clear the timeout when the component unmounts to prevent memory leaks
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
  const openFilter = () => {
    setIsFilterVisible((prev) => !prev);
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
      return false;
    }
  };

  const closeCreateAccountModal = () => {
    setCreateAccountVisible(false);
  };

  const getWishlist = async () => {
    const data = {
      party_id: await getpartyid(),
    };
    const result = await getWishlistData(data).then((res) => {
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
      party_id: await getpartyid(),
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

  const baseImageUrl = "https://colorhunt.in/colorHuntApi/public/uploads/";

  const getCategoriesname = async () => {
    try {
      const result1 = await getcateGorywithphotos();
      if (result1.status === 200) {
        setNameData(result1.data);
      }
      const result2 = await getProductName();
      if (result2.status === 200) {
        setNameDatas(result2.data);
        setkidsdata(nameDatas.filter((item) => item.Category === "kids"));
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCategoriesname();
  }, []);

  const viewAllArticles = () => {
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
                // resizeMode: "contain",
                width: width >= 720 ? 50 : 35,
                height: width >= 720 ? 50 : 35,
                resizeMode: "contain",
              }}
              source={require("../../../assets/Nevbar/Profile.png")}
            />
          </TouchableOpacity>
        </View>
      ),
      headerTitle: () => null, // Remove the header title
      headerStyle: {
        height: headerHeight,
        // backgroundColor: "black",
      },
    });
  }, []);

  const handlePress = (item) => {
    navigation.navigate("CategorisWiseArticle", { item1: item });
  };
  const filterData = () => {
    if (
      searchText === "" &&
      selectedCategories.length === 0 &&
      selectedPriceRange.length === 0
    ) {
      setshowarticle(false);
    } else {
      setshowarticle(true);
      const filtered = nameDatas.filter(
        (item) =>
          (searchText === "" || // Check if searchText is empty or matches any criteria
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
    filterData();
  };

  useEffect(() => {
    filterData();
  }, [searchText, nameDatas, selectedCategories, selectedPriceRange]);

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
                  fontWeight: 700,
                  paddingLeft: 8,
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
                  openFilter();
                }}
              >
                <Image
                  source={require("../../../assets/filetr_icone.png")}
                  style={{
                    width: width >= 720 ? 65 : 40,
                    height: width >= 720 ? 65 : 40,
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
                  fontWeight: 700,
                  fontSize: width >= 720 ? 25 : 18,
                }}
              >
                Men's
              </Text>
              <Text
                style={{
                  position: "absolute",
                  color: "#666666",
                  end: 10,
                  fontSize: width >= 720 ? 20 : 12,
                  fontWeight: 600,
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
                {console.log(setshowarticle, "setshwo")}
                {showarticle ? (
                  finalData.length > 0 ? (
                    finalData.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          isLoggedIn
                            ? navigation.navigate("DetailsOfArticals", {
                                id: item.Id,
                              })
                            : openCreateAccountModal();
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
                          }}
                        >
                          <View
                            style={{
                              width: width >= 720 ? 300 : 155,
                              height: width >= 720 ? 280 : 190,
                              borderColor: "gray",
                              shadowColor: "rgba(0, 0, 0, 0.5)",
                              shadowOpacity: 0.9,
                              shadowRadius: 3,
                              borderRadius: 10,
                              elevation: 4,
                              shadowOffset: {
                                width: 0,
                                height: 0,
                              },
                            }}
                          >
                            <View id={item.id} style={styles.producticones}>
                              {selectedprd.some((i) => i.Id === item.Id) ? (
                                <TouchableOpacity
                                  onPress={() => {
                                    isLoggedIn
                                      ? rmvProductWishlist(item)
                                      : openCreateAccountModal();
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
                            {item.Photos ? (
                              <Image
                                source={{ uri: baseImageUrl + item.Photos }}
                                style={{
                                  width: "100%",
                                  resizeMode: "contain",
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

                          <Text
                            style={{
                              fontWeight: "bold",
                              marginTop: 10,
                              fontSize: width >= 720 ? 20 : 15,
                            }}
                          >
                            {item.ArticleNumber}
                          </Text>
                          <Text>{convertToTitleCase(item.Category)}</Text>
                          <Text style={{ fontWeight: "bold" }}>
                            {"₹" + item.ArticleRate + ".00"}
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
                          textAlign: "center",
                          color: "#808080",
                        }}
                      >
                        No Mens Article Found
                      </Text>
                    </View>
                  )
                ) : (
                  nameData.map((item, index) => (
                    <View
                      key={item.id}
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
                            shadowOpacity: 0.9,
                            shadowRadius: 10,
                            elevation: 10,
                            shadowOffset: {
                              width: 0,
                              height: 0,
                            },
                          }}
                        >
                          {item.Photos ? (
                            <Image
                              source={{ uri: baseImageUrl + item.Photos }}
                              style={{
                                width: "100%",
                                resizeMode: "contain",
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
                          fontWeight: "bold",
                          fontSize: width >= 720 ? 30 : 14,
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
                    fontWeight: 700,
                    fontSize: width >= 720 ? 25 : 18,
                  }}
                >
                  Kid’s
                </Text>
                <Text
                  style={{
                    position: "absolute",
                    end: 10,
                    color: "#666666",
                    fontSize: width >= 720 ? 18 : 12,
                    fontWeight: 600,
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
                  position: "relative",
                  width: "100%",
                  height: "auto",
                  flexDirection: "row",
                  top: 20,
                }}
              >
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  style={{ overflow: "hidden" }}
                >
                  {kids.length === 0 ? (
                    <View
                      style={{
                        width: "100%",
                        height: "100%",
                        justifyContent: "center",
                        textAlign: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: width >= 720 ? 25 : 17,
                          textAlign: "center",
                          color: "#808080",
                        }}
                      >
                        No Kids Article Found
                      </Text>
                    </View>
                  ) : (
                    kids.map((item, index) => (
                      <View
                        key={index}
                        style={{
                          alignItems: "center",
                          width: width >= 720 ? 300 : 155,
                          height: width >= 720 ? 280 : 280,
                          marginLeft: width >= 720 ? 15 : 10,
                          marginRight: width >= 720 ? 15 : 5,
                          marginBottom: width >= 720 ? "4%" : 120,
                          borderRadius: 10,
                        }}
                      >
                        <View
                          style={{
                            width: width >= 720 ? 300 : 155,
                            height: width >= 720 ? 280 : 190,
                            borderColor: "gray",
                            shadowColor: "#000000",
                            shadowOpacity: 0.9,
                            shadowRadius: 3,
                            borderRadius: 10,
                            elevation: 4,
                            shadowOffset: {
                              width: 0,
                              height: 0,
                            },
                          }}
                        >
                          <View id={item.id} style={styles.producticones}>
                            {selectedprd.some((i) => i.Id === item.Id) ? (
                              <TouchableOpacity
                                onPress={() => {
                                  isLoggedIn
                                    ? rmvProductWishlist(item)
                                    : openCreateAccountModal();
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
                          <Image
                            source={{ uri: baseImageUrl + item.Photos }}
                            style={{
                              flex: 1,
                              // resizeMode: "contain",
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
                          {item.ArticleNumber}
                        </Text>
                        <Text style={{ fontSize: width >= 720 ? 15 : 10 }}>
                          {convertToTitleCase(item.Category)}
                        </Text>
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontSize: width >= 720 ? 18 : 12,
                          }}
                        >
                          {"₹" + item.ArticleRate + ".00"}
                        </Text>
                      </View>
                    ))
                  )}
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
              width: "100%",
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
