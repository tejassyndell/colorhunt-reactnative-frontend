import React, { useEffect, useLayoutEffect, useState } from "react";
import { Text, View, TouchableHighlight, Image,ScrollView } from "react-native";
import MenuImage from "../../components/MenuImage/MenuImage";
import{getProductName,getcateGorywithphotos} from "../../api/api";
import ButtomNavigation from '../../components/AppFooter/ButtomNavigation'

export default function HomeScreen(props) {
  const { navigation } = props;

  const [categoryName,setCategoryName] = useState()
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
        console.log(res.data);

        setCategoryName(res.data)
        setNameData(res.data)
        setApplyData(res.data)
      }
    })
    const resul = await getProductName().then((res) => {

      if (res.status === 200) {
        console.log(res.data);

        setCategoryName(res.data)
        setNameDatas(res.data)
        setApplyData(res.data)
      }
    })

  }

  useEffect(() =>{
    getCategoriesname()
  },[])

  console.log(categoryName);


  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, []);

  const onPressRecipe = (item) => {
    navigation.navigate("Recipe", { item });
  };

  const renderRecipes = () => (
    
    <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" /* onPress={() => onPressRecipe(item)} */>
      {/* <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.photo_url }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
      </View> */}
      
     
    </TouchableHighlight>
  );

  return (
    <View style={{width:'100%',height:'100%',backgroundColor:'#FFFF'}}>
      <ScrollView  showsHorizontalScrollIndicator={false} style={{overflow: 'hidden' }}>

      {/* <FlatList vertical showsVerticalScrollIndicator={false} numColumns={2} data={recipes} renderItem={renderRecipes} keyExtractor={(item) => `${item.recipeId}`} /> */}
      <View style={{width:'100%',flexDirection:"row",top:10}}>
        
        <Text style={{start:10}}>Men's </Text>
        <Text style={{position:'absolute',end:10}}>View All</Text>
      </View>
      
      <View style={{ position: 'relative', maxWidth: '100%', height:'auto', flexDirection: "row", top: 20 }}>
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
        <Image source={require('../../../assets/demo.png')} style={{ width: 200, height: 300, borderRadius: 10 }} />
        <Text style={{marginTop:10,fontWeight: 'bold'}}>{item.Category}</Text>
      </View>
      ))
    ) : (
      applyrData.map((item) => (
        <View key={item.id} style={{ alignItems: 'center', justifyContent: 'center', width: 200, marginLeft: 5, marginRight: 5 }}>
         <Image source={require('../../../assets/demo.png')} style={{ width: 200, height: 300, borderRadius: 10 }} />
         <Text style={{ marginTop: 10, fontWeight: 'bold' }}>{item.Category}</Text>

        </View>
      ))
    )}
  </ScrollView>
</View>
<View>

<View style={{width:'100%',flexDirection:"row",top:10,marginTop:20}}>
        
        <Text style={{start:10}}>Kid’s </Text>
        <Text style={{position:'absolute',end:10}} /* onPress={()=>{viewAllArtical}} */>View All</Text>
      </View>
      
      <View style={{ position: 'relative', maxWidth: '100%', height:'auto', flexDirection: "row", top: 20 }}>
  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ flex: 1, overflow: 'hidden' }}>
    {ApplyStatushBack === true ? (
      nameDatas.map((item) => (
        <View key={item.id} style={{
          alignItems: 'center',
          height: 370,
          width: 200,
          marginLeft: 5,
          marginRight: 5,
          marginBottom:120,
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
        <Text style={{fontWeight: 'bold'}}>{item.ArticleNumber}</Text>
        <Text>{item.Category}</Text>
        <Text style={{fontWeight: 'bold'}}>{"₹" + item.ArticleRate}</Text>
      </View>
      ))
    ) : (
      applyrData.map((item) => (
        <View key={item.id} style={{ alignItems: 'center', justifyContent: 'center', width: 200, marginLeft: 5, marginRight: 5 }}>
          <Image source={{ uri: baseImageUrl + item.Photos }} style={{ width: 200, height: 200, borderRadius: 10 }} />
          <Text style={{fontWeight: 'bold'}}>{item.ArticleNumber}</Text>
          <Text>{item.Category}</Text>
          <Text style={{fontWeight: 'bold'}}>{"₹" + item.ArticleRate}</Text>
        </View>
      ))
    )}
  </ScrollView>
</View>
  
</View>


</ScrollView>
<View style={{position:'absolute',bottom:10}}>

<ButtomNavigation/>
</View>

    </View>
  );
}
