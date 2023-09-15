import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { getProductName } from "../../api/api";
import styles from "./styles";
import Filter from "../../components/Fliter/Filter";
import SearchBar from "../../components/SearchBar/searchbar";
import { useRoute } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import ButtomNavigation from "../../components/AppFooter/ButtomNavigation";
import MenuBackArrow from "../../components/menubackarrow/menubackarrow";
export default function AllArticle(props) {
  const { navigation } = props;

  const [nameDatas, setNameDatas] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  //Search Functionaity - Harshil
  const [searchText, setSearchText] = useState(""); // To store the search text
  const [filteredData, setFilteredData] = useState([...nameDatas]); // Initialize with your data
  const [filterDataSearch, setFilterDataSearch] = useState([]);
  const route = useRoute();
  const { item } = route.params;

  //   console.log('.............',item.Category);
  const category = item.Category;

  // uploard url image
  const baseImageUrl = "https://colorhunt.in/colorHuntApi/public/uploads/";

  // getCategoriesname
  //   const getCategoriesname = async () => {
  //     // const res = await getProductName();
  //     if (res.status === 200) {
  //       setNameDatas(res.data);
  //     }
  //   }

  const getproductname = async () => {
    try {
      const res = await getProductName();
      if (res.status === 200) {
        // setAlldata(res.data)
        const sdPrds = res.data.slice(); // Use the fetched data
        const fildata = sdPrds.filter((item) => item.Category === category);
        setNameDatas(fildata);
        setFilterDataSearch(fildata);
        // setFiltereddata(fildata)
        // setFilterDataSearch(fildata)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getproductname();
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
      headerTitle: () => (
        <View style={{ position: "absolute", left: 280 }}>
          <Image
            style={styles.searchIcon}
            source={require("../../../assets/Nevbar/Profile.png")}
          />
        </View>
      ),
      headerRight: () => <View />,
    });
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      // headerright: () => (

      // ),
      headerRight: () => <View />,
    });
  }, []);

  const renderItem = ({ item }) => (
    // console.log(item,"fffffff"),

    <View
      key={item.id}
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
        shadowColor: "#000000",
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 10,
        shadowOffset: {
          width: 0,
          height: 0,
        },
      }}
    >
      <View
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 8,
          elevation: 15,
          shadowColor: "grey",
          borderRadius: 10,
        }}
      >
        <Image
          source={{ uri: baseImageUrl + item.Photos }}
          style={{ width: "78%", height: 180, borderRadius: 10 }}
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

  // open filter

  const openFilter = () => {
    setIsFilterVisible((prev) => !prev); // Toggle the Filter component visibility
  };
  const filterData = () => {
    if (searchText === "") {
      setFilteredData(nameDatas);
    } else {
      console.log(filterDataSearch.length);
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
      setFilteredData(filtered);
      console.log(filteredData.length);
      setNameDatas(filtered);
    }
  };
  useEffect(() => {
    filterData();
  }, [searchText]);
  return (
    <View style={{ width: "100%", height: "100%", backgroundColor: "#FFFF" }}>
      <View
        style={{ flexDirection: "row", alignItems: "center", width: "87%" }}
      >
        <SearchBar searchPhrase={searchText} setSearchPhrase={setSearchText} />
        <TouchableOpacity onPress={openFilter}>
          <Image
            source={require("../../../assets/filetr_icone.png")}
            style={{ width: 50, height: 50, borderRadius: 10 }}
          />
        </TouchableOpacity>
      </View>
      {/* <ScrollView showsHorizontalScrollIndicator={false} style={{ overflow: 'hidden' }}> */}
      <View
        style={{
          position: "relative",
          width: "100%",
          backgroundColor: "#FFFF",
          height: "auto",
          top: 20,
        }}
      >
        <FlatList
          data={nameDatas}
          initialNumToRender={10}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 10 }}
        />
      </View>
      {/* </ScrollView> */}
      {isFilterVisible ? null : (
        <View style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
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
              categoriesData={nameDatas}
              clearFilters={() => setIsFilterVisible(false)}
              applyFilters={() => {
                // Handle applying filters here
                setIsFilterVisible(false);
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
}
