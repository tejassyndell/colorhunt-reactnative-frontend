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
            navigation.navigate('Home');
          }}
        />
      ),
      headerTitle: () => (
        <View style={{
          display: "flex",
          flexDirection: "row",
          width: "100%"
        }}>
          <Text style={{
            textAlign: "center",
            fontSize: 25, fontWeight: 700, width: "100%"
          }}>WishList</Text>
        </View>
      ),
      headerRight: () => <View style={{ position: 'absolute', left: 310 }}>
        <Image style={styles.searchIcon} source={require("../../../assets/Nevbar/Profile.png")} />
      </View>,
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
    <TouchableOpacity onPress={()=>  navigation.navigate("DetailsOfArticals", { id:item.Id })}>
    <View key={item.id} style={{
     alignItems: "center",
     height: 'auto',
     width: 180,
     marginLeft: 5,
     marginRight: 20,
     marginTop:20,
     borderRadius: 10,
     borderColor: "gray",
     backgroundColor: "white",
     // Add shadow properties for iOS
     shadowColor: "#000000",
     shadowOpacity: 0.4,
     shadowRadius: 4,
     elevation:10,
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
      <Image source={{ uri: baseImageUrl + item.article_photos }} style={{  width: 155, height: 170, borderRadius: 10 }} />
      <Text style={{ fontWeight: 'bold' }}>{item.ArticleNumber}</Text>
      <Text>{item.StyleDescription}</Text>
      <Text style={{ fontWeight: 'bold' }}>{"₹" + item.ArticleRate}</Text>
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
              <Text style={{ fontSize: 30, fontWeight: "bolder", top: 200 }}>Your WishList is Empty</Text>
              <TouchableOpacity  onPress={() => navigation.navigate("Home")} style={{height:52}}>
                <Text style={{
                  backgroundColor: "black",
                  padding: 10,
                  fontSize:20,
                  alignItems: "center",
                  borderRadius: 5,
                  flex: 1,
                  color: "white", top: 250
                }}>Containue Shopping</Text>

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
