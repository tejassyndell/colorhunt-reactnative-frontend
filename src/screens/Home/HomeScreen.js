import React, { useEffect, useLayoutEffect, useState } from "react";
import { Text, View, Image, ScrollView, Pressable,TouchableOpacity} from "react-native";
import MenuImage from "../../components/MenuImage/MenuImage";
import styles from "./styles";
import { getProductName, getcateGorywithphotos } from "../../api/api";
import ButtomNavigation from "../../components/AppFooter/ButtomNavigation";
import { useNavigation } from "@react-navigation/native";
import Filter from "../../components/Fliter/filter";

export default function HomeScreen(props) {
  const { navigation } = props;
  const [categoryName, setCategoryName] = useState();
  const [ApplyStatushBack, setApplyStatushBack] = useState(true);
  const [nameData, setNameData] = useState([]);
  const [nameDatas, setNameDatas] = useState([]);
  const [applyrData, setApplyData] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false); 

  // uploard url image
  const baseImageUrl = "https://colorhunt.in/colorHuntApi/public/uploads/";

  // Filter 
  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const getCategoriesname = async () => {
    const result = await getcateGorywithphotos().then((res) => {
      if (res.status === 200) {
        setCategoryName(res.data);
        setNameData(res.data);
        setApplyData(res.data);
      }
    });
    const resul = await getProductName().then((res) => {
      if (res.status === 200) {
        setCategoryName(res.data);
        setNameDatas(res.data);
        setApplyData(res.data);
      }
    });
  };

  useEffect(() => {
    getCategoriesname();
  }, []);

  const viewAllArticles = () => {
    navigation.navigate("AllArticle");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerTitle: () => (
        <View style={styles.searchContainer}>
          <Pressable>
            <Image
              style={styles.searchIcon}
              source={require("../../../assets/FilterIcon/filter.png")}
            />
          </Pressable>
        </View>
      ),
      headerRight: () => <View />,
    });
  }, [navigation.isFilterVisible]);

  return (
    
    
    <View style={{ flex: 1,  }}>
       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          width: "98%",
          height: 70,
          flexDirection: "row",
          marginLeft:5,
          borderRadius:20,
          justifyContent: "end",
        }}
      >
         {isFilterVisible && (
        <Filter
          categoriesData={categoryName}
          selectedCategories={selectedCategories}
          setCategories={setSelectedCategories}
          clearFilters={() => {
            setSelectedCategories([]);
          }}
          applyFilters={() => {
            // Apply your filter logic here
            // Update your applyData or other relevant state variables
          }}
        />
      )}
        <TouchableOpacity
          style={{
            width: "20%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}

        >
          <Image
            source={require("../../../assets/FilterIcon/filter.png")}
            style={{ width: 30, height: 30 }}
            
          />
        </TouchableOpacity>
       
      </View>
    </View>
      
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={{ overflow: "hidden", overflow: "hidden" }}
      >
        {/* <FlatList vertical showsVerticalScrollIndicator={false} numColumns={2} data={recipes} renderItem={renderRecipes} keyExtractor={(item) => `${item.recipeId}`} /> */}
        <View style={{ width: "100%", flexDirection: "row", top: 10 }}>
          <Text style={{ start: 10 }}>Men's </Text>
          <Text
            style={{ position: "absolute", end: 10 }}
            onPress={viewAllArticles}
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
            {ApplyStatushBack === true
              ? nameData.map((item) => (
                  <View
                    key={item.id}
                    style={{
                      alignItems: "center",
                      height: 270,
                      width: 200,
                      marginLeft: 5,
                      marginRight: 5,
                      borderRadius: 10,
                      borderColor: "gray",
                      backgroundColor: "white",
                      // Add shadow properties for iOS
                      shadowColor: "rgba(0, 0, 0, 0.2)",
                      shadowOpacity: 0.8,
                      shadowRadius: 4,
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      // Add elevation for Android
                      elevation: 4,
                    }}
                  >
                    <Image
                      source={require("../../../assets/demo.png")}
                      style={{ width: 200, height: 200, borderRadius: 10 }}
                    />
                    <Text style={{ marginTop: 10, fontWeight: "bold" }}>
                      {item.Category}
                    </Text>
                  </View>
                ))
              : applyrData.map((item) => (
                  <View
                    key={item.id}
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      width: 200,
                      marginLeft: 5,
                      marginRight: 5,
                    }}
                  >
                    <Image
                      source={require("../../../assets/demo.png")}
                      style={{ width: 200, height: 300, borderRadius: 10 }}
                    />
                    <Text style={{ marginTop: 10, fontWeight: "bold" }}>
                      {item.Category}
                    </Text>
                  </View>
                ))}
          </ScrollView>
        </View>
        <View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              top: 10,
              marginTop: 20,
            }}
          >
            <Text style={{ start: 10 }}>Kid’s </Text>
            <Text
              style={{ position: "absolute", end: 10 }}
              onPress={viewAllArticles}
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
              top: 40,
            }}
          >
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{ flex: 1, overflow: "hidden" }}
            >
              {ApplyStatushBack === true
                ? nameDatas.map((item) => (
                    <View
                      key={item.id}
                      style={{
                        alignItems: "center",
                        height: 270,
                        width: 200,
                        marginLeft: 5,
                        marginRight: 5,
                        marginBottom: 120,
                        borderRadius: 10,
                        borderColor: "gray",
                        backgroundColor: "white",

                        // Add shadow properties for iOS
                        shadowColor: "rgba(0, 0, 0, 0.2)",
                        shadowOpacity: 0.8,
                        shadowRadius: 4,
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        // Add elevation for Android
                        elevation: 4,
                      }}
                    >
                      <Image
                        source={{ uri: baseImageUrl + item.Photos }}
                        style={{ width: 200, height: 200, borderRadius: 10 }}
                      />
                      <Text style={{ fontWeight: "bold" }}>
                        {item.ArticleNumber}
                      </Text>
                      <Text>{item.Category}</Text>
                      <Text style={{ fontWeight: "bold" }}>
                        {"₹" + item.ArticleRate}
                      </Text>
                    </View>
                  ))
                : applyrData.map((item) => (
                    <View
                      key={item.id}
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        width: 200,
                        marginLeft: 5,
                        marginRight: 5,
                      }}
                    >
                      <Image
                        source={{ uri: baseImageUrl + item.Photos }}
                        style={{ width: 200, height: 200, borderRadius: 10 }}
                      />
                      <Text style={{ fontWeight: "bold" }}>
                        {item.ArticleNumber}
                      </Text>
                      <Text>{item.Category}</Text>
                      <Text style={{ fontWeight: "bold" }}>
                        {"₹" + item.ArticleRate}
                      </Text>
                    </View>
                  ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
      <View style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
        <ButtomNavigation navigation={navigation} />
      </View>
    </View>
  );
}
