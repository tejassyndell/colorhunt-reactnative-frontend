import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Platform,
  RefreshControl,
  Alert,
} from "react-native";
import { getProductName, getWishlistData, DeleteWishlist } from "../../api/api";
import styles from "./styles.js";
import { FontAwesome } from "@expo/vector-icons";
import MenuBackArrow from "../../components/menubackarrow/menubackarrow";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../../components/Loader/Loader";

import { ActivityIndicator } from "react-native";
import * as Font from "expo-font";
export default function WishList(props) {
  const { navigation } = props;

  const [nameDatas, setNameDatas] = useState([]);
  const [selectedprd, setSelectprd] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { width, height } = Dimensions.get("window");
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);

    // Add your refreshing logic here (e.g., fetch new data or update existing data).

    // Simulate a delay to hide the loading indicator after a few seconds (adjust as needed).
    setTimeout(() => {
      setRefreshing(false);
    }, 3000); // 3 seconds
  };

  const headerHeight =
    Platform.OS === "android"
      ? width >= 720
        ? 110
        : 80
      : height >= 844
      ? 110
      : 65;
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
  // uploard url image
  const baseImageUrl =
    "https://webportalstaging.colorhunt.in/colorHuntApiStaging/public/uploads/";
  const getpartyid = async () => {
    let partydata = await AsyncStorage.getItem("UserData");
    partydata = await JSON.parse(partydata);
    console.log(partydata[0].Id, "[][][[][]");
    return partydata[0].Id;
  };

  // getCategoriesname
  const getCategoriesname = async () => {
    const res = await getProductName();
    if (res.status === 200) {
      setNameDatas(res.data);
    } else {
      Alert.alert("Server is not responding", [
        {
          text: "OK",
          onPress: () => {
            // Call namdemo function when the user clicks 'OK'
            getCategoriesname();
          },
        },
      ]);
    }
  };
  const rmvProductWishlist = async (i) => {
    console.log(i, "r");
    let id = await getpartyid();
    let data = {
      party_id: id,
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
      party_id: await getpartyid(),
      status: "true",
    };
    const result = await getWishlistData(data).then((res) => {
      if (res.status == 200) {
        console.log(res.data);
        setSelectprd(res.data);
        setIsLoading(false);
      } else {
        Alert.alert("Server is not responding", [
          {
            text: "OK",
            onPress: () => {
              // Call namdemo function when the user clicks 'OK'
              getWishlist();
            },
          },
        ]);
      }
    });
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
      headerTitle: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignContent: "center",
            paddingLeft: "10%",
            width: parseInt(width) >= 720 ? "95%" : "100%",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: width >= 720 ? 35 : 25,
              fontFamily: isFontLoaded ? "Glory" : undefined,
              fontWeight: "700",
              width: "100%",
            }}
          >
            Wishlist
          </Text>
        </View>
      ),
      headerRight: () => <View />,
      headerStyle: {
        height: headerHeight, // Increase the header height here
        elevation: 0, // Remove the shadow on Android
        shadowOpacity: 0, // Remove the shadow on iOS
      },
    });
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("DetailsOfArticals", { id: item.Id })}
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
            width: "90%",
            height: 180,
            flex: 1,
            resizeMode: "contain",
            borderRadius: 10,

            marginTop: 10,
          }}
          onError={() => {
            console.log(
              "Error loading image ================?>>>>>>>>>>>>>>>>>>>>>>.:",
              baseImageUrl + item.Photos
            );
            // You can display a placeholder image or error message here.
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
              style={{ fontWeight: "bold", fontSize: width >= 720 ? 18 : 12 }}
            >
              {item.ArticleNumber}
            </Text>
            <Text style={{ fontSize: width >= 720 ? 15 : 10 }}>
              {item.Title}
            </Text>
            <Text
              style={{ fontWeight: "bold", fontSize: width >= 720 ? 18 : 12 }}
            >
              {"₹" + item.ArticleRate + ".00"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      {isLoading ? (
        <View style={styles.loader}>
          <Loader />
        </View>
      ) : selectedprd.length === 0 ? (
        <View
          style={{
            flex: 1,
            backgroundColor: "#FFF",
            borderTopColor: "#828282",
            borderTopWidth: 0,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: width * 0.1,
                fontFamily: isFontLoaded ? "Glory" : undefined,
                textAlign: "center",
                fontWeight: "700",
                color: "#808080",
              }}
            >
              Your Wishlist is {"\n"} Empty
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            {/* <TouchableOpacity
              style={{
                width: width * 0.4,
                height: height * 0.06,
                borderRadius: 10,
                backgroundColor: "black",
                alignItems: "center",
                justifyContent: "center",
                // marginTop: "100%",
              }}
              onPress={() => navigation.navigate("Home")}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: width * 0.035,
                  fontFamily: isFontLoaded ? "Glory" : undefined,
                }}
              >
                Go to home page
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>
      ) : (
        <View
          style={{ width: "100%", height: "100%", backgroundColor: "#FFFF" }}
        >
          {/* {/ <ScrollView showsHorizontalScrollIndicator={false} style={{ overflow: 'hidden' }}> /} */}

          <View
            style={{
              position: "relative",
              maxWidth: "100%",
              height: "auto",
              // top: 20,
            }}
          >
            <FlatList
              data={selectedprd}
              initialNumToRender={10}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              numColumns={width >= 720 ? 4 : 2}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 10 }}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          </View>

          {/* {/ </ScrollView> /} */}
        </View>
      )}
    </>
  );
}
