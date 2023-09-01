import React, { useEffect, useLayoutEffect, useState } from "react";
<<<<<<< HEAD
import { Text, View, Image, ScrollView, FlatList, Pressable } from "react-native";
import MenuImage from "../../components/MenuImage/MenuImage";
import { getProductName } from "../../api/api";
import styles from "./styles";
import { TextInput } from "react-native-gesture-handler";
import ButtomNavigation from '../../components/AppFooter/ButtomNavigation';
=======
import { Text, View, Image, ScrollView, FlatList,TouchableOpacity } from "react-native";
import { getProductName,getWishlistData,getAddWishlist,DeleteWishlist } from "../../api/api";
import styles from "./styles";
import { FontAwesome } from '@expo/vector-icons';
>>>>>>> upstream/31_08_23
import MenuBackArrow from '../../components/menubackarrow/menubackarrow';
export default function AllArticle(props) {
  const { navigation } = props;

  const [nameDatas, setNameDatas] = useState([]);
<<<<<<< HEAD
=======
  const [selectedprd, setSelectprd] = useState([])

>>>>>>> upstream/31_08_23

  // uploard url image
  const baseImageUrl = 'https://colorhunt.in/colorHuntApi/public/uploads/';

  // getCategoriesname
  const getCategoriesname = async () => {
    const res = await getProductName();
    if (res.status === 200) {
      setNameDatas(res.data);
    }
  }
<<<<<<< HEAD

  useEffect(() => {
    getCategoriesname();
=======
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
      })
    }

    const addArticleWishlist = async (i) => {
      let data = {
        user_id: 197,
        article_id: i.Id,
      }
  
      console.log(data)
      try {
        await getAddWishlist(data).then((res) => {
          getWishlist()
        })
      } catch (error) {
        console.log(error)
      }
    }

  useEffect(() => {
    getCategoriesname();
    getWishlist()
>>>>>>> upstream/31_08_23
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
        
        
          <View style={{position:'absolute',left:310}}>
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
<<<<<<< HEAD
=======
  
>>>>>>> upstream/31_08_23

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
<<<<<<< HEAD
=======
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
>>>>>>> upstream/31_08_23
      <Image source={{ uri: baseImageUrl + item.Photos }} style={{ width: 200, height: 300, borderRadius: 10 }} />
      <Text style={{ fontWeight: 'bold' }}>{item.ArticleNumber}</Text>
      <Text>{item.Category}</Text>
      <Text style={{ fontWeight: 'bold' }}>{"₹" + item.ArticleRate}</Text>
    </View>
  );

  return (
    <View style={{ width: '100%', height: '100%', backgroundColor: '#FFFF' }}>
<<<<<<< HEAD
=======
     
>>>>>>> upstream/31_08_23
      <ScrollView showsHorizontalScrollIndicator={false} style={{ overflow: 'hidden' }}>
        <View style={{ position: 'relative', maxWidth: '100%', height: 'auto', top: 20 }}>
          <FlatList
            data={nameDatas}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            numColumns={3}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 10 }}
          />
        </View>
      </ScrollView>
      {/* <View style={{position:'absolute',bottom:10}}>
        <ButtomNavigation/>
      </View> */}
    </View>
  );
}
