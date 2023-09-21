import React, { useEffect, useLayoutEffect, useState } from "react";
import { Text, View, Image, ScrollView, FlatList, Pressable, TouchableOpacity } from "react-native";
import { getProductName, getWishlistData, getAddWishlist, DeleteWishlist } from "../../api/api";
import styles from "./styles";
import SearchBar from "../../components/SearchBar/searchbar";
import { useRoute } from "@react-navigation/native";
import ButtomNavigation from "../../components/AppFooter/ButtomNavigation";
import MenuBackArrow from '../../components/menubackarrow/menubackarrow';
import Filter from "../../components/Filter/Filter";
import { FontAwesome } from '@expo/vector-icons';

export default function AllArticle(props) {
  const { navigation } = props;

  const [nameDatas, setNameDatas] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  //Search Functionaity - Harshil
  const [searchText, setSearchText] = useState(""); // To store the search text
  const [filteredData, setFilteredData] = useState([...nameDatas]); // Initialize with your data
  const [filterDataSearch, setFilterDataSearch] = useState([])
  const [minArticleRate, setMinArticleRate] = useState(null);
  const [selectedprd, setSelectprd] = useState([])
  const [maxArticleRate, setMaxArticleRate] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [finalData, setFinalData] = useState([])
  const route = useRoute();
  const { item } = route.params;

  //   console.log('.............',item.Category);
  const convertToTitleCase=(str) =>{
    return str
      .toLowerCase()
      .split('-') // Split the string at hyphens
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('-'); // Join the words with hyphens
  }
  const category = (item.Category);

  const titlename = convertToTitleCase(item.Category);


  useEffect(() => {
    setSelectedCategories([category]);
  }, []);

  // uploard url image
  const baseImageUrl = 'https://colorhunt.in/colorHuntApi/public/uploads/';

  const getproductname = async () => {
    try {
      const res = await getProductName()
      if (res.status === 200) {
        const sdPrds = res.data.slice()
        const fildata = sdPrds.filter((item) => item.Category === category)
        setNameDatas(fildata)
        setSelectprd(fildata)
        setFilterDataSearch(fildata)
        setFinalData(fildata)
      }
    } catch (error) {
      console.log(error)
    }
  }

  

 const addArticleWishlist = async (i) => {
  let data = {
    user_id: 197,
    article_id: i.Id,
  };
  try {
    await getAddWishlist(data).then((res) => {
      console.log("Item added to wishlist:", i.Id);
      console.log("Wishlist data after adding:", res.data);
      // Assuming getAddWishlist returns the updated wishlist data
      const updatedWishlistData = res.data; // Update this based on your API response
      setSelectprd(updatedWishlistData); // Update the selectedprd state
      setFinalData(updatedWishlistData); // Update the finalData state (if necessary)
    });
  } catch (error) {
    console.log("Error adding item to wishlist:", error);
  }
};

const rmvProductWishlist = async (i) => {
  let data = {
    party_id: 197,
    article_id: i.Id,
  };
  console.log("Removing item from wishlist:", i.Id);
  try {
    await DeleteWishlist(data).then((res) => {
      if (res.status === 200) {
        console.log("Item removed from wishlist:", i.Id);
        console.log("Wishlist data after removal:", res.data);
        // Assuming DeleteWishlist returns the updated wishlist data
        const updatedWishlistData = res.data; // Update this based on your API response
        setSelectprd(updatedWishlistData); // Update the selectedprd state
        setFinalData(updatedWishlistData); // Update the finalData state (if necessary)
      }
    });
  } catch (error) {
    console.log("Error removing item from wishlist:", error);
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
        <View />
      ),
      headerRight: () => (
        <View style={{ marginRight:5, width: 50, height: 50, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity onPress={() => { navigation.navigate("Profile") }} >
            <Image  style={{ width: 38, height: 38, borderRadius: 5 }} source={require("../../../assets/Nevbar/Profile.png")} />
          </TouchableOpacity>
        </View>),
        
    });
  }, []);



  const renderItem = ({ item }) => (
    // console.log(item,"fffffff"),

    <View key={item.id} style={{
      alignItems: "center",
      height: 'auto',
      width: "44.8%",
      margin: 10,
      borderRadius: 10,
      borderColor: "gray",
      backgroundColor: "#FFFFFF",
      // Add shadow properties for iOS
      shadowColor: "gray",
      shadowOpacity: 0.4,
      shadowRadius: 4,
      elevation: 2,
      shadowOffset: {
        width: 0,
        height: 0,
      },
    }}>
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

      <View style={{
        width: "100%", display: "flex", justifyContent: "center", alignItems: "center",
        paddingTop: 8,
        elevation: 20,
        borderColor: "gray",
        shadowColor: '#c0c0c0',
        borderRadius: 10
      }}>
        <Image source={{ uri: baseImageUrl + item.Photos }} style={{  width: "90%",
         height: 180,
          
          zIndex:1,
          shadowColor: "gray",
          shadowOpacity: 0.4,
          // shadowRadius: 4,
          elevation: 2,
          borderRadius:10,
          shadowOffset: {
            width: 0,
            height: 0,
          },
          
          }} />
      </View>
      <View style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigation.navigate("DetailsOfArticals", { id: item.Id })} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>

        <View style={{width:180,alignItems:'center',paddingTop: 10,paddingBottom:10,borderRadius:10}}>
            <Text style={{ fontWeight: 'bold', }}>{item.ArticleNumber}</Text>
          <Text>{convertToTitleCase(item.Category)}</Text>
          <Text style={{ fontWeight: 'bold'}}>{"₹" + item.ArticleRate + ".00"}</Text>

            </View>
        </TouchableOpacity>
      </View>

    </View>

  );

  // open filter

  const openFilter = () => {
    setIsFilterVisible((prev) => !prev); // Toggle the Filter component visibility
  };
  const filterData = () => {
    if (searchText === '') {
      setFilteredData(nameDatas)
    } else {
      console.log(filterDataSearch.length)
      console.log(searchText)
      const filtered = filterDataSearch.filter((item) =>
        item.ArticleNumber.toString().includes(searchText.toString()) ||
        item.Category.toLowerCase().includes(searchText.toLowerCase()) ||
        item.ArticleRate.toString().includes(searchText.toString()) ||
        item.StyleDescription.toLowerCase().includes(searchText.toLowerCase()) ||
        item.Subcategory.toLowerCase().includes(searchText.toLowerCase()),
      )
      setFilteredData(filtered)
      console.log(filteredData.length)
      setNameDatas(filtered)
      setFinalData(filtered)
    }
  }
  useEffect(() => {
    filterData();
  }, [searchText])
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
    console.log(minArticleRate)
    setMaxArticleRate(maxRate);
    console.log(maxArticleRate)
  }, [nameDatas]);
  const handleFilterChange = (categories, priceRange) => {
    setSelectedCategories(categories);
    setSelectedPriceRange(priceRange);
    // setSearchText(""); // Reset the search text
  };
  const handleCloseFilter = () => {
    setIsFilterVisible((prev) => !prev)
  };

  useEffect(() => {
    // Filter products based on the selected price range and update the filteredNameDatas state
    const filteredProducts = nameDatas.filter((item) =>
      item.ArticleRate >= selectedPriceRange[0] && item.ArticleRate <= selectedPriceRange[1]
    );
    setFinalData(filteredProducts)
  }, [selectedPriceRange, nameDatas]);

  return (

    <View style={{ width: '100%', height: '100%', backgroundColor: '#FFF' }}>
      <View
        style={{ flexDirection: "row", alignItems: "center", width: "87%" }}
      >
        <SearchBar searchPhrase={searchText}
          setSearchPhrase={setSearchText} />
        <TouchableOpacity onPress={openFilter}>
          <Image
            source={require("../../../assets/filetr_icone.png")}
            style={{ width: 40, height: 40, borderRadius: 10 }}
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
              Men's {titlename}
            </Text>
          </View>
      {/* <ScrollView showsHorizontalScrollIndicator={false} style={{ overflow: 'hidden' }}> */}
      <View style={{ position: 'relative', width: '100%', backgroundColor: "#FFF", height: 'auto', top: 20 }}>
        <FlatList
          data={finalData}
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
          <ButtomNavigation isLoggedIn={true} navigation={navigation} page="home"/>
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
              backgroundColor: "#FFF",
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0, // To make it span the full width
              marginLeft: "auto", // Margin on the left side
              marginRight: "auto", // Margin on the right side
              padding: 10,
            }}
          >
            <Filter onFilterChange={handleFilterChange}
              onCloseFilter={handleCloseFilter} Scategories={selectedCategories} minArticleRate={minArticleRate}
              maxArticleRate={maxArticleRate} />
          </View>
        </View>
      )}
    </View>
  );
}
