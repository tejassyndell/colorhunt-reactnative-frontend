import React, { useEffect, useLayoutEffect, useState } from "react";
import { Text, View, Image, ScrollView, Pressable, TouchableOpacity, Keyboard, TextInput, Button } from "react-native";
import MenuImage from "../../components/MenuImage/MenuImage";
import styles from "./styles";
import { getProductName, getcateGorywithphotos } from "../../api/api";
import ButtomNavigation from '../../components/AppFooter/ButtomNavigation'
import SearchBar from '../../components/SearchBar/searchbar'

import { useNavigation } from '@react-navigation/native';

export default function HomeScreen(props) {
  const { navigation } = props;
  const [categoryName, setCategoryName] = useState()
  const [ApplyStatushBack, setApplyStatushBack] = useState(true);
  const [nameData, setNameData] = useState([]);
  const [nameDatas, setNameDatas] = useState([]);
  const [applyrData, setApplyData] = useState([]);


  // uploard url image
  const baseImageUrl = 'https://colorhunt.in/colorHuntApi/public/uploads/';
  //getCategoriesname
  const getCategoriesname = async () => {
    const result = await getcateGorywithphotos().then((res) => {

      if (res.status === 200) {

        setCategoryName(res.data)
        setNameData(res.data)
        setApplyData(res.data)
      }
    })
    const resul = await getProductName().then((res) => {

      if (res.status === 200) {

        setCategoryName(res.data)
        setNameDatas(res.data)
        setApplyData(res.data)
      }
    })

  }

  useEffect(() => {
    getCategoriesname()
  }, [])


  const viewAllArticles = () => {

    navigation.navigate('AllArticle'); // Replace 'AllArticlesScreen' with the name of your target screen
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

          <Pressable >
          </Pressable>
        </View>
      ),
      headerRight: () => <View />,
    });
  }, []);

  const onPressRecipe = (item) => {
    const id = 883;
    navigation.navigate("DetailsOfArticals", { id: id });
  };

  const handlePress = (item) => {
    // ategoryNames(item);
    console.log(item);
    navigation.navigate("CategorisWiseArticle", { item: item });
  };


  return (

    <View style={{ width: '100%', height: '100%', backgroundColor: '#FFFF' }}>
      <View style={{marginTop:10}}>
        <View >
        <Text style={{fontSize:25,fontWeight:700,paddingLeft:20,height:40,alignItems:'center'}}>Welcome...</Text>
        </View>
        <View style={{flexDirection:'row',alignItems:'center',width:'87%'}}>

        <SearchBar  />
        <Image source={require('../../../assets/Nevbar/Group8922.png')} style={{ width: 50, height: 50, borderRadius: 10 }}/>
        </View>
      </View>
      <ScrollView showsHorizontalScrollIndicator={false} style={{ overflow: 'hidden' }}>

        <View style={{ width: '100%', flexDirection: "row", top: 10 }}>

          <Text style={{ start: 10 }}>Men's </Text>
          <Text style={{ position: 'absolute', end: 10 }} onPress={viewAllArticles}>View All</Text>
        </View>

        <View style={{ position: 'relative', maxWidth: '100%', height: 'auto', flexDirection: "row", top: 20 }}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ flex: 1, overflow: 'hidden' }}>
            {ApplyStatushBack === true ? (
              nameData.map((item) => (
                <View key={item.id} style={{
                  alignItems: 'center',
                  height: 370,
                  width: 200,
                  marginLeft: 5,
                  marginRight: 5,
                  borderRadius: 10,
                  borderColor: 'gray',
                  backgroundColor: 'white',
                  // Add shadow properties for iOS
                  shadowColor: 'rgba(0, 0, 0, 0.2)',
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
                  <TouchableOpacity onPress={() => { handlePress(item) }} >
                    <Image source={require('../../../assets/demo.png')} style={{ width: 200, height: 300, borderRadius: 10 }} />

                  </TouchableOpacity>
                  <Text style={{ marginTop: 10, fontWeight: 'bold' }}>{item.Category}</Text>
                </View>
              ))
            ) : (
              applyrData.map((item) => (
                <View key={item.id} style={{ alignItems: 'center', justifyContent: 'center', width: 200, marginLeft: 5, marginRight: 5 }}>
                  <TouchableOpacity onPress={() => { handlePress(item) }} >

                    <Image source={require('../../../assets/demo.png')} style={{ width: 200, height: 300, borderRadius: 10 }} />
                  </TouchableOpacity>
                  <Text style={{ marginTop: 10, fontWeight: 'bold' }}>{item.Category}</Text>

                </View>
              ))
            )}
          </ScrollView>
        </View>
        <View>

          <View style={{ width: '100%', flexDirection: "row", top: 10, marginTop: 20 }}>

            <Text style={{ start: 10 }}>Kid’s </Text>
            <Text style={{ position: 'absolute', end: 10 }} onPress={viewAllArticles}>View All</Text>
          </View>

          <View style={{ position: 'relative', maxWidth: '100%', height: 'auto', flexDirection: "row", top: 20 }}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ flex: 1, overflow: 'hidden' }}>
              {ApplyStatushBack === true ? (
                nameDatas.map((item) => (
                  <View key={item.id} style={{
                    alignItems: 'center',
                    height: 370,
                    width: 200,
                    marginLeft: 5,
                    marginRight: 5,
                    marginBottom: 120,
                    borderRadius: 10,
                    borderColor: 'gray',
                    backgroundColor: 'white',

                    // Add shadow properties for iOS
                    shadowColor: 'rgba(0, 0, 0, 0.2)',
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
                    <Image source={{ uri: baseImageUrl + item.Photos }} style={{ width: 200, height: 300, borderRadius: 10 }} />
                    <Text style={{ fontWeight: 'bold' }}>{item.ArticleNumber}</Text>
                    <Text>{item.Category}</Text>
                    <Text style={{ fontWeight: 'bold' }}>{"₹" + item.ArticleRate}</Text>
                  </View>
                ))
              ) : (
                applyrData.map((item) => (
                  <View key={item.id} style={{ alignItems: 'center', justifyContent: 'center', width: 200, marginLeft: 5, marginRight: 5 }}>
                    <Image source={{ uri: baseImageUrl + item.Photos }} style={{ width: 200, height: 200, borderRadius: 10 }} />
                    <Text style={{ fontWeight: 'bold' }}>{item.ArticleNumber}</Text>
                    <Text>{item.Category}</Text>
                    <Text style={{ fontWeight: 'bold' }}>{"₹" + item.ArticleRate}</Text>
                  </View>
                ))
              )}
            </ScrollView>
          </View>

        </View>


      </ScrollView>
      <View style={{ position: 'absolute', bottom: 10 }}>

        <ButtomNavigation />
      </View>

    </View>
  );
}
