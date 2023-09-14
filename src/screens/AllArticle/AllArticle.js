import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  getProductName,
  getWishlistData,
  getAddWishlist,
  DeleteWishlist,
} from "../../api/api";
import styles from "./styles";
import { FontAwesome } from "@expo/vector-icons";
import ButtomNavigation from "../../components/AppFooter/ButtomNavigation";
import MenuBackArrow from "../../components/menubackarrow/menubackarrow";
import SearchBar from "../../components/SearchBar/searchbar";
import { useRoute } from "@react-navigation/core";
import Filter from "../../components/Filter/Filter";

import { ActivityIndicator } from "react-native";
export default function AllArticle(props) {
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
  // uploard url image
  const baseImageUrl = "https://colorhunt.in/colorHuntApi/public/uploads/";

  // open filter

  const openFilter = () => {
    setIsFilterVisible((prev) => !prev); // Toggle the Filter component visibility
  };
  const route = useRoute();

  // getCategoriesname
  const getCategoriesname = async () => {
    if (route.params && route.params.finalData.length > 0) {
      setFinalData(route.params.finalData);
      setIsLoading(false);
    } else {
      const res = await getProductName();
      if (res.status === 200) {
        console.log(res.data);
        setNameDatas(res.data);
        setFinalData(res.data);
        setIsLoading(false);
      }
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

  // ------- add product in wishlist start-------------
  const getWishlist = async () => {
    const data = {
      party_id: 197,
    };
    const result = await getWishlistData(data).then((res) => {
      setSelectprd(res.data);
    });
  };

  const addArticleWishlist = async (i) => {
    let data = {
      user_id: 197,
      article_id: i.Id,
    };

    console.log(data);
    try {
      await getAddWishlist(data).then((res) => {
        getWishlist();
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategoriesname();
    getWishlist();
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
        <View style={{ marginRight:5, width: 50, height: 50, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity onPress={() => { navigation.navigate("Profile") }} >
            <Image  style={{ width: 38, height: 38, borderRadius: 5 }} source={require("../../../assets/Nevbar/Profile.png")} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    filterData();
  }, [searchText, nameDatas]);

  const filterData = () => {
    if (searchText === "") {
      setFinalData(nameDatas);
    } else {
      const filtered = nameDatas.filter(
        (item) =>
          item.ArticleNumber.toString().includes(searchText.toString()) ||
          item.Category.toLowerCase().includes(searchText.toLowerCase()) ||
          item.ArticleRate.toString().includes(searchText.toString()) ||
          item.StyleDescription.toLowerCase().includes(
            searchText.toLowerCase()
          ) ||
          item.Subcategory.toLowerCase().includes(searchText.toLowerCase())
      );
      console.log(filtered.length, "length");
      setFinalData(filtered);
      console.log(finalData.length, "FD");
      console.log(finalData, "final DTAA :");
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={{
        alignItems: "center",
        height: "auto",
        width: "44.8%",
        margin: 10,
        // marginLeft: 5,
        // marginRight: 20,
        // marginTop: 20,
        borderRadius: 10,
        borderColor: "gray",
        backgroundColor: "white",
        // Add shadow properties for iOS
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
      <View
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 8,
          elevation: 20,
          borderColor: "gray",
          shadowColor: "#c0c0c0",
          borderRadius: 10,
        }}
      >
        <Image
          source={{ uri: baseImageUrl + item.Photos }}
          style={{ width: "80%", height: 180, borderRadius: 10 }}
        />
      </View>
      <View
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("DetailsOfArticals", { id: item.Id })
          }
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>{item.ArticleNumber}</Text>
          <Text>{item.Category}</Text>
          <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
            {"₹" + item.ArticleRate}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  const handleFilterChange = (categories, priceRange) => {
    setSelectedCategories(categories);
    setSelectedPriceRange(priceRange);
    setSearchText(""); // Reset the search text
  };
  const handleCloseFilter = () => {
    setIsFilterVisible((prev) => !prev);
  };

  useEffect(() => {
    const filteredData = nameDatas.filter((item) => {
      const isCategoryMatch = selectedCategories.length === 0 || selectedCategories.includes(item.Category);
      const isPriceRangeMatch = (
        selectedPriceRange.length === 0 ||
        (item.ArticleRate >= selectedPriceRange[0] && item.ArticleRate <= selectedPriceRange[1])
      );
  
      return isCategoryMatch && isPriceRangeMatch;
    });
  
    setFinalData(filteredData);
    console.log(finalData.length,"fd kength")
  }, [selectedCategories, selectedPriceRange, nameDatas]);
  
  useEffect(() => {
    const minRate = finalData.reduce((min, item) => {
      const articleRate = parseFloat(item.ArticleRate); // Convert the article rate to a number
      return articleRate < min ? articleRate : min;
    }, Infinity);

    const maxRate = finalData.reduce((max, item) => {
      const articleRate = parseFloat(item.ArticleRate); // Convert the article rate to a number
      return articleRate > max ? articleRate : max;
    }, -Infinity);

    setMinArticleRate(minRate);
    console.log(minArticleRate);
    setMaxArticleRate(maxRate);
    console.log(maxArticleRate);
  }, [finalData]);
  return (
    <>
      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <View
          style={{ width: "100%", height: "100%", backgroundColor: "#FFFF" }}
        >
          <View
            style={{ flexDirection: "row", alignItems: "center", width: "87%" }}
          >
            <SearchBar
              searchPhrase={searchText}
              setSearchPhrase={setSearchText}
            />
            <TouchableOpacity onPress={openFilter}>
              <Image
                source={require("../../../assets/filetr_icone.png")}
                style={{ width: 50, height: 50, borderRadius: 10 }}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 700,
                paddingLeft: 15,
                height: 20,
                alignItems: "center",
              }}
            >
              All Articles
            </Text>
          </View>
          {/* <ScrollView showsHorizontalScrollIndicator={false} style={{ overflow: 'hidden' }}> */}
          <View style={{ position: 'relative', backgroundColor: "#FFFF", width: "100%", height: 'auto', top: 20, paddingHorizontal: 10 }}>
            {console.log(finalData.length,"when render")}
            <FlatList
              data={finalData}
              keyExtractor={(item) => item.Id}
              renderItem={renderItem}
              numColumns={2}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 10 }}
            />
          </View>
          {/* </ScrollView> */}
          {isFilterVisible ? null : (
            <View
              style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
            >
              <ButtomNavigation navigation={navigation} />
            </View>
          )}

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
                  width: "90%",
                  backgroundColor: "white",
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0, // To make it span the full width
                  marginLeft: "auto", // Margin on the left side
                  marginRight: "auto", // Margin on the right side
                  padding: 10,
                }}
              >
                <Filter
                  onFilterChange={handleFilterChange}
                  onCloseFilter={handleCloseFilter}
                  Scategories={selectedCategories}
                  minArticleRate={minArticleRate}
                  maxArticleRate={maxArticleRate}
                />
              </View>
            </View>
          )}
        </View>
      )}
    </>
  );
}
