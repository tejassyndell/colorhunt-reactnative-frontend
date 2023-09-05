import React, { useEffect, useLayoutEffect, useState } from "react";
import { Text, View, Image, ScrollView, FlatList, TouchableOpacity,Button } from "react-native";
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
        <View style={{ position: 'absolute', left: 310 }}>
          <Image style={styles.searchIcon} source={require("../../../assets/Nevbar/Profile.png")} />
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
    <View key={item.id} style={{
      alignItems: 'center',
      height: 370,
      width: 200,
      marginLeft: 5,
      marginRight: 5,
      marginBottom: 20,
      borderRadius: 10,
      borderColor: 'gray',
      backgroundColor: 'white',
      shadowColor: 'rgba(0, 0, 0, 0.2)',
      shadowOpacity: 0.8,
      shadowRadius: 4,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      elevation: 4,
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
      <Image source={{ uri: baseImageUrl + item.article_photos }} style={{ width: 200, height: 300, borderRadius: 10 }} />
      <Text style={{ fontWeight: 'bold' }}>{item.ArticleNumber}</Text>
      <Text>{item.StyleDescription}</Text>
      <Text style={{ fontWeight: 'bold' }}>{"₹" + item.ArticleRate}</Text>
    </View>
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
        <View style={{ width: '100%', height: '100%', backgroundColor: '#FFFF' }}>
          {selectedprd.length === 0 ? (
            <View style={{width:"100%",height:"100%",paddingTop:50,alignItems:"center"}}>
              <Text style={{fontSize:30,fontWeight:"bolder",top:200}}>Your WishList is Empty</Text>
              <TouchableOpacity style={styles.continueShoppingButton} onPress={() => navigation.navigate("Home")}>
               <Text style={{ backgroundColor: "black",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    flex: 1,
    color:"white",top:250}}>Containue Shopping</Text>

              </TouchableOpacity>

            </View>
          
          ):(
          <ScrollView showsHorizontalScrollIndicator={false} style={{ overflow: 'hidden' }}>
            <View style={{ position: 'relative', maxWidth: '100%', height: 'auto', top: 20 }}>
              <FlatList
                data={selectedprd}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                numColumns={2}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 10 }}
              />
            </View>
          </ScrollView>
          )}
        </View>
      )}
    </>
  );
}
