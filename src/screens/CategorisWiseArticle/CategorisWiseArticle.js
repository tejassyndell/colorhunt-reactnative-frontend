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
} from "react-native";
import {
  getProductName,
  getWishlistData,
  getAddWishlist,
  DeleteWishlist,
} from "../../api/api";
import styles from "./styles";
import { useRoute } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import ButtomNavigation from "../../components/AppFooter/ButtomNavigation";
import MenuBackArrow from "../../components/menubackarrow/menubackarrow";
import SearchBar from "../../components/SearchBar/searchbar";
import Filter from "../../components/Filter/Filter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";
import * as Font from "expo-font";

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
        console.log(res.data);
        const sdPrds = res.data.slice();
        const fildata = sdPrds.filter((item) => item.Category === category);
        setNameDatas(fildata);
        setFinalData(fildata);
        setIsLoading(false);
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

  // ------- add product in wishlist start-------------
  const getWishlist = async () => {
    const data = {
      party_id: await getpartyid(),
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
    try {
      await getAddWishlist(data).then((res) => {
        getWishlist();
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
              isLoggedIn ? navigation.navigate("Profile") : "";
            }}
          >
            <Image
              style={{
                resizeMode: "contain",
                width: width >= 720 ? 55 : 35,
                height: width >= 720 ? 55 : 35,
              }}
              source={require("../../../assets/Nevbar/Profile.png")}
            />
          </TouchableOpacity>
        </View>
      ),
      headerStyle: {
        height: headerHeight, // Increase the header height here
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
      setNoArticlesFound(filtered.length === 0);
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
            <FontAwesome name="heart-o" style={[styles.disabledIcon]} />
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{
          width: "90%",
          height: 180,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 12,
          backgroundColor: "#FFF",
          shadowColor: "#000",
          shadowOpacity: 0.2,
          shadowOffset: {
            width: 1,
            height: 1,
          },
          elevation: 5,
          marginTop: 10,
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
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <View
          style={{ width: "100%", height: "100%", backgroundColor: "#FFF" }}
        >
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
              <Image
                source={require("../../../assets/filetr_icone.png")}
                style={{
                  width: width >= 720 ? 65 : 40, // Adjust the width for tablets
                  height: width >= 720 ? 65 : 40,
                  borderRadius: 10,
                }}
              />
            </TouchableOpacity>
          </View>
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
                  bottom: 0,
                  left: 1,
                  right: 0, // To make it span the full width
                  marginLeft: "4%", // Margin on the left side
                  padding: 10,
                  borderTopLeftRadius: 10, // Adjust the radius as needed
                  borderTopRightRadius: 10,
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
