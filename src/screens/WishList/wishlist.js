import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {
  getProductName,
  getWishlistData,
  getAddWishlist,
  DeleteWishlist,
} from "../../api/api";
import styles from "./styles.js";
import { FontAwesome } from "@expo/vector-icons";
import MenuBackArrow from "../../components/menubackarrow/menubackarrow";
import { ActivityIndicator } from "react-native";
export default function WishList(props) {
  const { navigation } = props;

  const [nameDatas, setNameDatas] = useState([]);
  const [selectedprd, setSelectprd] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { width, height } = Dimensions.get("window");

  // uploard url image
  const baseImageUrl = "https://colorhunt.in/colorHuntApi/public/uploads/";

  // getCategoriesname
  const getCategoriesname = async () => {
    const res = await getProductName();
    if (res.status === 200) {
      setNameDatas(res.data);
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
      setIsLoading(false);
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
              fontSize: width * 0.05,
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
        height: width >= 720 ? 120 : 120, // Increase the header height here
      },
    });
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("DetailsOfArticals", { id: item.Id })}
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 1,
          height: 2,
        },
        shadowOpacity: 0.25,

        alignItems: "center",
        elevation: 10,
        height: "auto",
        width: width >= 720 ? "22%" : "45%",
        marginHorizontal: 12,
        marginTop: 10,
        borderColor: "grey",
        backgroundColor: "#FFFFFF",
        paddingBottom: 15,
        borderRadius: 10,
        marginVertical: 15,
        paddingTop: width >= 720 ? 10 : 20,
      }}
    >
      <View
        key={item.id}
        style={{
          alignItems: "center",
          height: "auto",
          width: width >= 720 ? 180 : 180,
        }}
      >
        <View
          style={{
            width: width >= 720 ? "80%" : "80%", // Adjust the width for tablets
            height: width >= 720 ? 200 : 190,
            borderColor: "gray",
            shadowColor: "#000000",
            shadowOpacity: 0.9,
            shadowRadius: 4,
            borderRadius: 10,
            elevation: 5, // For Android, use elevation
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
              <></>
            )}
          </View>

          <Image
            source={{ uri: baseImageUrl + item.article_photos }}
            style={{ flex: 1, borderRadius: 10 }}
          />
        </View>
        <Text style={{ fontWeight: "bold", marginTop: 12 }}>
          {item.ArticleNumber}
        </Text>
        <Text style={{ marginTop: 3 }}>{item.Title}</Text>
        <Text style={{ fontWeight: "bold", marginTop: 3 }}>
          {"₹" + item.ArticleRate + ".00"}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : selectedprd.length === 0 ? (
        <View
          style={{
            flex: 1,
            backgroundColor: "#FFF",
            borderTopColor: "#828282",
            borderTopWidth: 0.5,
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
                fontWeight: "bolder",
                textAlign: "center",
                fontWeight: 700,
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
            <TouchableOpacity
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
              <Text style={{ color: "white", fontSize: width * 0.035 }}>
                Continue Shopping
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View
          style={{ width: "100%", height: "100%", backgroundColor: "#FFFF" }}
        >
          {/* <ScrollView showsHorizontalScrollIndicator={false} style={{ overflow: 'hidden' }}> */}

          <View
            style={{
              position: "relative",
              maxWidth: "100%",
              height: "auto",
              top: 20,
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
            />
          </View>

          {/* </ScrollView> */}
        </View>
      )}
    </>
  );
}
