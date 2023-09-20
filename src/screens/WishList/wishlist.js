import React, { useEffect, useLayoutEffect, useState } from "react";
import { Text, View, Image, ScrollView, FlatList, TouchableOpacity } from "react-native";
import { getProductName, getWishlistData, getAddWishlist, DeleteWishlist } from "../../api/api";
import styles from "./styles.js";
import { FontAwesome } from '@expo/vector-icons';
import MenuBackArrow from '../../components/menubackarrow/menubackarrow';
import { ActivityIndicator } from "react-native";
export default function WishList(props) {
  const { navigation } = props;

  const [nameDatas, setNameDatas] = useState([]);
  const [selectedprd, setSelectprd] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // uploard url image
  const baseImageUrl = 'https://colorhunt.in/colorHuntApi/public/uploads/';

  // getCategoriesname
  const getCategoriesname = async () => {
    const res = await getProductName();
    if (res.status === 200) {
      setNameDatas(res.data);

    }
  }
  const rmvProductWishlist = async (i) => {
    console.log(i, 'r')
    let data = {
      party_id: 197,
      article_id: i.Id,
    }
    console.log(data)

    try {
      await DeleteWishlist(data).then((res) => {
        if (res.status === 200) {
          getWishlist()
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  // ------- add product in wishlist start-------------
  const getWishlist = async () => {
    const data = {
      party_id: 197,
    }
    const result = await getWishlistData(data).then((res) => {
      setSelectprd(res.data)
      setIsLoading(false)
    })
  }

  useEffect(() => {
    getCategoriesname();
    getWishlist()
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
        <View style={{
          flexDirection: "row",
          width: "100%"
        }}>
          <Text style={{
            textAlign: "center",
            fontSize: 25,
            left: 10,
            fontWeight: "700",
            width: "100%"
          }}>Wishlist</Text>

        </View>
      ),
      headerRight: () => (
        <View style={{ marginHorizontal: 10, width: "auto", height: "auto", padding: 4 }}>
          <TouchableOpacity onPress={() => { navigation.navigate("Profile") }}>
            <Image style={styles.searchIcon} source={require("../../../assets/Nevbar/Profile.png")} />
          </TouchableOpacity>
        </View>
      )
    });
  }, []);

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     // headerright: () => (

  //     // ),
  //     headerRight: () => <View />,
  //   });
  // }, []);


  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate("DetailsOfArticals", { id: item.Id })}>
      <View key={item.id} style={{
        alignItems: "center",
        height: 'auto',
        width: 180,
        marginLeft: 5,
        marginRight: 20,
        marginTop: 20,
        borderRadius: 10,
        borderColor: "gray",
        // Add shadow properties for iOS

      }}>
        <View style={{
          width: 155,
          height: 190,
          borderColor: "gray",
          shadowColor: "#000000",
          shadowOpacity: 0.9,
          shadowRadius: 4,
          elevation: 10, // For Android, use elevation
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
              <></>
            )}
          </View>

          <Image source={{ uri: baseImageUrl + item.article_photos }} style={{ width: "92%", height: 190, borderRadius: 10 }} />

        </View>
        <Text style={{ fontWeight: 'bold', marginTop: 12 }}>{item.ArticleNumber}</Text>
        <Text style={{ marginTop: 3 }}>{item.Title}</Text>
        <Text style={{ fontWeight: 'bold', marginTop: 3 }}>{"₹" + item.ArticleRate + '.00'}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator
            size="large"
            color="black"
          />
        </View>
      ) : (
        selectedprd.length === 0 ?
          <View style={{ width: "100%", height: "100%", paddingTop: 50, alignItems: "center" }}>
            <Text style={{ fontSize: 40, fontWeight: "bolder", top: 200, textAlign: 'center', fontWeight: 700, color: "#808080" }}>Your WishList is {"\n"} Empty</Text>
            <TouchableOpacity
              style={{
                width: 189,
                height: 50,
                borderRadius: 10,
                backgroundColor: "black",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 380,
              }}
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={{ color: "white" }}>Continue Shopping</Text>
            </TouchableOpacity>
          </View> :
          <View style={{ width: '100%', height: '100%', backgroundColor: '#FFFF' }}>
            {/* <ScrollView showsHorizontalScrollIndicator={false} style={{ overflow: 'hidden' }}> */}

            <View style={{ position: 'relative', maxWidth: '100%', height: 'auto', top: 20 }}>
              <FlatList
                data={selectedprd}
                initialNumToRender={10}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                numColumns={2}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 10 }}
              />
            </View>

            {/* </ScrollView> */}
          </View>




      )}
    </>
  );
}
