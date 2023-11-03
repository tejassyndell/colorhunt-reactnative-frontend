import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Platform,
  Modal,
  KeyboardAvoidingView,
  Keyboard,
  RefreshControl,
  Alert,
} from "react-native";
import {
  getProductName,
  getWishlistData,
  getAddWishlist,
  DeleteWishlist,
} from "../../api/api";
import styles from "./styles";
import Loader from "../../components/Loader/Loader";
import { useRoute } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import ButtomNavigation from "../../components/AppFooter/ButtomNavigation";
import MenuBackArrow from "../../components/menubackarrow/menubackarrow";
import SearchBar from "../../components/SearchBar/searchbar";
import Filter from "../../components/Filter/Filter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";
import * as Font from "expo-font";
import { Svg, Path, Circle } from "react-native-svg";
import CreateAccount from "../../components/CreateAccount/CreateAccount";
export default function CategorisWiseArticle(props) {
  const { navigation } = props;
  const [finalData, setFinalData] = useState([]);
  const [nameDatas, setNameDatas] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedprd, setSelectprd] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);
  const [searchText, setSearchText] = useState(""); // To store the search text
  const [minArticleRate, setMinArticleRate] = useState(null);
  const [maxArticleRate, setMaxArticleRate] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCreateAccountVisible, setCreateAccountVisible] = useState(false);

  const [isFontLoaded, setIsFontLoaded] = useState(false);

  const [isKeyboardOpen, setKeyboardOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    getproductnamess()
  };

  const fetchMoreData = () => {
    if (!isLoadingMore) {
      setIsLoadingMore(true);
      setPage(page + 1);
    }
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

  const CheckUser = async () => {
    const user = await AsyncStorage.getItem("UserData");
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };
  useEffect(() => {
    CheckUser();
  }, []);

  const openCreateAccountModal = () => {
    console.log("done");
    setCreateAccountVisible(true);
  };

  const closeCreateAccountModal = () => {
    setCreateAccountVisible(false);
  };

  const route = useRoute(); // Define route using useRoute hook
  const { item1 } = route.params;
  const { width, height } = Dimensions.get("window");
  const headerHeight =
    Platform.OS === "android"
      ? width >= 720
        ? 110
        : 80
      : height >= 844
      ? 110
      : 65;
  const [noArticlesFound, setNoArticlesFound] = useState(false);

  // uploard url image
  const baseImageUrl =
    "https://webportalstaging.colorhunt.in/colorHuntApiStaging/public/uploads/";
  const category = item1.Category;
  // const titlename = convertToTitleCase(category);
  console.log(category);
  const openFilter = () => {
    setIsFilterVisible((prev) => !prev); // Toggle the Filter component visibility
  };
  const getpartyid = async () => {
    let partydata = await AsyncStorage.getItem("UserData");
    partydata = await JSON.parse(partydata);
    return partydata[0].Id;
  };

  const getproductnamess = async () => {
    try {
      const res = await getProductName();
      if (res.status === 200) {
        // console.log(res.data);
        const sdPrds = res.data.slice();
        const fildata = sdPrds.filter((item) => item.Category === category);
        setNameDatas(fildata);
        setFinalData(fildata);
        setIsLoading(false);
        setRefreshing(false);
      } else {
        Alert.alert("Server is not responding", [
          {
            text: "OK",
            onPress: () => {
              // Call namdemo function when the user clicks 'OK'
              getproductnamess();
            },
          },
        ]);
      }
    } catch (error) {
      console.log(error);
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
      console.log(error);
    }
  };

  // ------- add product in wishlist start-------------
  const getWishlist = async () => {
    const data = {
      party_id: await getpartyid(),
      status: "false",
    };
    const result = await getWishlistData(data).then((res) => {
      setSelectprd(res.data);
    });
  };

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
      console.log(error);
    }
  };
  const convertToTitleCase = (str) => {
    return str
      .toLowerCase()
      .split("-") // Split the string at hyphens
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("-"); // Join the words with hyphens
  };
  useEffect(() => {
    // getCategoriesname();
    getWishlist();
    getproductnamess();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <MenuBackArrow
          onPress={() => {
            navigation.goBack();
          }}
        />
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
              isLoggedIn ? navigation.navigate("Profile") : null;
              console.log(isLoggedIn);
            }}
          >
            <Image
              style={{
                resizeMode: "contain",
                width: width >= 720 ? 55 : 35,
                height: width >= 720 ? 55 : 35,
                 marginBottom:20, 
              }}
              source={require("../../../assets/Profileicon/Group8919.png")}
            />
          </TouchableOpacity>
        </View>
      ),
      headerStyle: {
        height: headerHeight,
        borderBottomWidth: 1, // Adjust the width as needed
        borderBottomColor: "#FFF", // Increase the header height here
      },
    });
  }, []);

  useEffect(() => {
    filterData();
  }, [searchText, nameDatas, selectedCategories, selectedPriceRange]);

  const filterData = () => {
    if (
      searchText === "" &&
      selectedCategories.length === 0 &&
      selectedPriceRange.length === 0
    ) {
      setFinalData(nameDatas); // Reset to the original data when no filters are applied
    } else {
      const batchSize = 10; // Define the batch size
      const filteredData = []; // Create an array to store the filtered data

      for (let i = 0; i < nameDatas.length; i += batchSize) {
        // Slice the data into batches of size batchSize
        const batch = nameDatas.slice(i, i + batchSize);

        const batchFiltered = batch.filter(
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

        // Append the batchFiltered data to the filteredData array
        filteredData.push(...batchFiltered);
      }

      setFinalData(filteredData);
      setNoArticlesFound(filteredData.length === 0);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        isLoggedIn
          ? navigation.navigate("DetailsOfArticals", { id: item.Id })
          : openCreateAccountModal()
      }
      style={{
        alignItems: "center",
        height: "auto",
        width: width >= 720 ? "22%" : "44.8%",
        margin: 10,
        borderRadius: 10,
        borderColor: "gray",
        backgroundColor: "#FFF",
        shadowColor: "gray",
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 10,
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
              rmvProductWishlist(item);
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
              addArticleWishlist(item);
            }}
          >
            {isLoggedIn ? (
              <FontAwesome name="heart-o" style={[styles.disabledIcon]} />
            ) : null}
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{
          width: "90%",
          height: 180,
          flex: 1,
          marginTop: 10,

          justifyContent: "center",
          alignItems: "center",

          borderWidth: 1,
          borderColor: "rgba(0,0,0,0.2)",
          borderRadius: 10,
        }}
      >
        <Image
          source={{ uri: baseImageUrl + item.Photos }}
          style={{
            width: "100%",
            height: "100%",
            flex: 1,
            resizeMode: "contain",
            borderRadius: 10,
            zIndex: 1,

            // marginTop: 10,
          }}
        />
      </View>
      <View
        style={{
          width: "100%",
          marginBottom: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 0,
          }}
        >
          <View style={{ width: 178, alignItems: "center", paddingTop: 10 }}>
            <Text
              style={{
                fontWeight: "bold",
                fontFamily: isFontLoaded ? "Glory" : undefined,
              }}
            >
              {item.ArticleNumber}
            </Text>
            <Text style={{ fontFamily: isFontLoaded ? "Glory" : undefined }}>
              {convertToTitleCase(item.Category)}
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                fontFamily: isFontLoaded ? "Glory" : undefined,
              }}
            >
              {isLoggedIn ? "₹" + item.ArticleRate + ".00" : ""}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  const handleFilterChange = (categories, priceRange) => {
    setSelectedCategories(categories);
    setSelectedPriceRange(priceRange);
    setSearchText(""); // Reset the search text

    // Trigger the filter function
    filterData();
  };
  const handleCloseFilter = () => {
    setIsFilterVisible((prev) => !prev);
  };

  useEffect(() => {
    const abc = nameDatas.filter(
      (item) =>
        (!selectedCategories.length ||
          selectedCategories.includes(item.Category)) &&
        item.ArticleRate >= selectedPriceRange[0] &&
        item.ArticleRate <= selectedPriceRange[1]
    );
    setFinalData(abc);
  }, [selectedCategories, selectedPriceRange]);

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
  return (
    <>
      {isLoading ? (
        <View style={styles.loader}>
          <Loader />
        </View>
      ) : (
        <View
          style={{ width: "100%", height: "100%", backgroundColor: "#FFF" }}
        >
          {isLoggedIn ? (
            <View
            style={{
              flexDirection: "row",
              backgroundColor: "#FFF",
              alignItems: "center",
              width: "100%",
              paddingStart: 3,
              paddingTop: 10,
            }}
          >
            <SearchBar
              searchPhrase={searchText}
              setSearchPhrase={setSearchText}
            />
            <TouchableOpacity
              style={{ width: "10%", alignItems: "flex-end", paddingEnd: 0 }}
              onPress={() => {
                isLoggedIn ? openFilter() : "";
              }}
            >
              <Svg
                width={width >= 720 ? 65 : 40}
                height={width >= 720 ? 65 : 40}
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
          ):(
            <View
            style={{
              flexDirection: "row",
              backgroundColor: "#FFF",
              alignItems: "center",
              width: "112%",
              paddingStart: 3,
              paddingTop: 10,
            }}
          >
            <SearchBar
              searchPhrase={searchText}
              setSearchPhrase={setSearchText}
            />
          
          </View>
          )}
          
          <View>
            <Text
              style={{
                fontSize: width >= 720 ? 25 : 15,
                fontFamily: isFontLoaded ? "Glory" : undefined,
                fontWeight: "700",
                paddingLeft: 15,
                height: width >= 720 ? 30 : 20,
                alignItems: "center",
                marginTop: 10,
              }}
            >
              Men's {convertToTitleCase(category)}
            </Text>
          </View>
          <View
            style={{
              position: "relative",
              backgroundColor: "#FFF",
              width: "100%",
              height: "74%",
              top: 10,
              paddingHorizontal: 10,
            }}
          >
            {finalData.length === 0 ? (
              (console.log(nameDatas.length, "ewqewqewqeewq"),
              (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontFamily: isFontLoaded ? "Glory" : undefined,
                      fontSize: 20,
                    }}
                  >
                    No Articles Found
                  </Text>
                </View>
              ))
            ) : (
              <FlatList
                style={{ backgroundColor: "#FFF" }}
                data={finalData}
                keyExtractor={(item) => item.Id}
                renderItem={renderItem}
                numColumns={width >= 720 ? 4 : 2}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 0 }}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                onEndReached={fetchMoreData}
                onEndReachedThreshold={0.1}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              />
            )}
          </View>
          <KeyboardAvoidingView
            behavior={isKeyboardOpen ? "padding" : null}
            style={{ flex: 1 }}
          >
            {isFilterVisible ? null : (
              <View
                style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
              >
                <ButtomNavigation navigation={navigation} page="home" />
              </View>
            )}
          </KeyboardAvoidingView>
          {isFilterVisible && (
            <View
              style={{
                flex: 1,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                justifyContent: "flex-end",
              }}
            >
              <View
                style={{
                  width: "92%",
                  backgroundColor: "#FFF",
                  position: "absolute",
                  bottom: "2%",
                  left: 1,
                  right: 0, // To make it span the full width
                  marginLeft: "4%", // Margin on the left side
                  padding: 10,
                  borderRadius: 10, // Adjust the radius as needed
                }}
              >
                <Filter
                  status={true}
                  onFilterChange={handleFilterChange}
                  onCloseFilter={handleCloseFilter}
                  Scategories={selectedCategories}
                  minArticleRate={minArticleRate}
                  maxArticleRate={maxArticleRate}
                  spr={selectedPriceRange}
                  uniquerates={nameDatas}
                />
              </View>
            </View>
          )}
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
              padding: 12,
              marginTop: 25,
              marginBottom: 25,
              height: "90%",
            }}
          >
            <CreateAccount onClose={closeCreateAccountModal} />
          </View>
        </View>
      </Modal>
    </>
  );
}
