import { View, Text, Image, TouchableHighlight, TouchableOpacity, Pressable, ScrollView, Modal,Dimensions } from "react-native"
import { ArticleDetails, addto_cart, findfromthecart, updateCartArticale } from '../../api/api'
import Carousel from "react-native-snap-carousel";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import styles from "./styles";
import stylesRecipe from "../Recipe/styles"
// import { ScrollView } from "react-native-gesture-handler";
import { useLayoutEffect } from "react";
import MenuBackArrow from "../../components/menubackarrow/menubackarrow";
import { ActivityIndicator } from "react-native";
import bagicon from "../../../assets/icons/icon.png";
import { TouchableWithoutFeedback } from "react-native";
import ImageZoom from "react-native-image-pan-zoom";

const DetailsOfArticals = (props) => {
  const { navigation } = props;
  const { width: viewportWidth } = Dimensions.get("window");
  const route = useRoute();
  const [isImageZoomVisible, setImageZoomVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState("");
  const { id, Quantity = 0 } = route.params;
  console.log(id);
  const handleSizeClick = (size) => { };
  // const { id } = useParams()//Use this with navigate
  useEffect(() => {
    ArticleDetailsData();
  }, []);
  const [availableStock, setAvailableStock] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [articlePhotos, setArticlePhotos] = useState([]);
  const [articleCategory, setArticleCategory] = useState();
  const [articleRatio, setArticleRatio] = useState();
  const [articleRate, setArticleRate] = useState();
  const [articleSizeData, setArticleSizeData] = useState();
  const [articleColorver, setArticleColorver] = useState([]);
  const [articleNumber, setArticlenumber] = useState();
  const [salesnopacks, setSalesnopacks] = useState("");
  const [nopacks, setNopacks] = useState(0);
  const [combinedArray, setCombinedArray] = useState([]);
  const [subcategory, setSubcategory] = useState();
  const [isZoomed, setIsZoomed] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updateCart, setUpdateCart] = useState(false);
  const [articalCartId, setArticalCartId] = useState();



  const ArticleDetailsData = async () => {
    let data = {
      ArticleId: id,
      PartyId: 197,
    };
    try {
      const res = await ArticleDetails(data);
      console.log(res.data);
      console.log("dd", res.data.photos);
      setArticlePhotos(res.data.photos);
      setArticleCategory(res.data.calculatedData[0].Category);
      setSubcategory(res.data.calculatedData[0].subcategory);
      setArticleRatio(res.data.calculatedData[0].ArticleRatio);
      setArticleRate(res.data.calculatedData[0].ArticleRate);
      setArticleSizeData(JSON.parse(res.data.calculatedData[0].ArticleSize));
      setArticleColorver(JSON.parse(res.data.calculatedData[0].ArticleColor));
      setArticlenumber(res.data.calculatedData[0].ArticleNumber);
      setSalesnopacks(res.data.calculatedData[0].SalesNoPacks);
      setNopacks(res.data.calculatedData[0].NoPacks);
      console.log(nopacks);
      const salesnopackstoArray =
        res.data.calculatedData[0].SalesNoPacks.split(",");
      // const salesnopackstoArray = [1, 2, 3, 4]
      // const salesnopackstoArray = [nopacks]
      setAvailableStock(salesnopackstoArray.map((stock) => parseInt(stock)));
      console.log(availableStock);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const colorwithindex = articleColorver.map((element, index) => ({
      ...element,
      index: index,
    }));
    const stockswithindex = availableStock.map((element, index) => ({
      value: element,
      index: index,
    }));
    const combinedArray = colorwithindex.map((coloritem) => {
      const stockitem = stockswithindex.find(
        (stockitem) => stockitem.index === coloritem.index
      );
      return {
        ...coloritem,
        available: stockitem ? stockitem.value : 0,
        Rate: articleRate,
      };
    });
    setCombinedArray(combinedArray);
    const defaultQuantities = {};
    if (Quantity === 0) {
      combinedArray.forEach((item) => {
        defaultQuantities[item.index] = 0;
      });
    }
    else {
      if (Quantity.includes(',')) {
        let initialQuantities = Quantity.split(',').map((value) => parseInt(value.trim()));
        combinedArray.forEach((item) => {
          defaultQuantities[item.index] = parseInt(initialQuantities[item.index]);
        });
      }
      else {
        combinedArray.forEach((item) => {
          defaultQuantities[item.index] = parseInt(Quantity);
        });
      }
    }
    setQuantities(defaultQuantities);
  }, [articleColorver, availableStock, articleRate]);

  const addtocart = async (PartyId, ArticleId) => {
    if (!combinedArray) {
      console.log("undefined");
      return;
    }
    const colorwiseQuantities = combinedArray.map(
      (coloritem) => quantities[coloritem.index]
    );
    console.log("colorwise quantity :", colorwiseQuantities);
    const colorwiseQuantitiesTOstring = colorwiseQuantities.join(",");
    console.log("cqty to string ", colorwiseQuantitiesTOstring);
    console.log(totalPrice);
    const data = {
      party_id: PartyId,
      article_id: ArticleId,
      Quantity: colorwiseQuantitiesTOstring,
      rate: totalPrice,
    };
    try {
      console.log(data);
      await findfromthecart(data).then(async (res) => {
        if (res.data.id == -1) {
          await addto_cart(data);
          navigation.navigate("cart_list", { totalPrice });
        } else {
          setIsModalVisible(true);

          setArticalCartId(res.data[0].id);
        }
      });
    } catch (error) {
      console.log("Error Adding to Cart:", error);
    }
    // navigate('/cart_list', { state: { totalPrice } })
  };

  const totalPrice = Object.keys(quantities).reduce(
    (total, colorIndex) =>
      total + quantities[colorIndex] * (combinedArray[colorIndex].Rate / 10),
    0
  );
  const formatPrice = (value) => {
    return `₹${value.toFixed(2)}`;
  };
  // uploard url image
  const baseImageUrl = "https://colorhunt.in/colorHuntApi/public/uploads/";
  const imageElements = articlePhotos.map((fileName, index) => (
    <Image
      source={{ uri: baseImageUrl + fileName }}
      style={{ width: 100, height: 100 }}
      key={index}
    />
  ));
  const handleIncrease = (colorIndex) => {
    if (!combinedArray || !combinedArray[colorIndex]) {
      return;
    }
    console.log(quantities[colorIndex]);
    console.log(combinedArray[colorIndex].available);
    if (quantities[colorIndex] < nopacks) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [colorIndex]: prevQuantities[colorIndex] + 1,
      }));
    }
  };
  const handleDecrease = (colorIndex) => {
    if (!combinedArray || !combinedArray[colorIndex]) {
      return;
    }
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [colorIndex]: Math.max(prevQuantities[colorIndex] - 1, 0),
    }));
  };
  const totalQuantity = Object.values(quantities).reduce(
    (total, quantity) => total + quantity,
    0
  );
  console.log(totalQuantity);

  // const [magnifyStatus, setMagnifyStatus] = useState(false);
  // const [prdImage, setPrdImage] = useState();
  const openImageZoom = (index) => {
    console.log(index);
    setSelectedImageIndex(index);
    setImageZoomVisible(true);
  };

  const renderImage = ({ item, index }) => (
    <TouchableOpacity onPress={() => openImageZoom(item)}>
      <View>
        <Image
          style={{ width: "100%", height: 550 }}
          source={{ uri: baseImageUrl + item }}
        />
      </View>
    </TouchableOpacity>
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <MenuBackArrow
          onPress={() => {
            navigation.goBack();
          }}
        />
      ), headerTitle: () => (
        <View />
      )
    });
  }, []);

  const updateArticalInCart = async () => {
    if (!combinedArray) {
      console.log("undefined");
      return;
    }
    const colorwiseQuantities = combinedArray.map(
      (coloritem) => quantities[coloritem.index]
    );
    console.log("colorwise quantity :", colorwiseQuantities);
    const colorwiseQuantitiesTOstring = colorwiseQuantities.join(",");
    console.log("cqty to string ", colorwiseQuantitiesTOstring);
    console.log(totalPrice);
    const data = {
      id: articalCartId,
      Quantity: colorwiseQuantitiesTOstring,
      rate: totalPrice,
    };
    await updateCartArticale(data).then((res) => {
      console.log(res.data);
      navigation.navigate("cart_list", { totalPrice });
    });
  };
  const closeModal = () => {
    setImageZoomVisible(false);
  };


// const getfontsize=(size)=>{
//   const screenwidth = Dimensions.get("window").width;
//   const fontSize =  screenwidth > 400 ? 16 : 10;
//   console.log(fontSize);
//   return fontSize;
// }

const windowWidth = Dimensions.get("window").width
return (
  <>
    {isLoading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="black" />
      </View>
    ) : (
      <View style={{ backgroundColor: "#FFF",flex:1 }}>
        <ScrollView nestedScrollEnabled={true}>
          <View style={{ zIndex: 1,flex:1 }}>
            <View
              style={{  width: "100%", height: viewportWidth >= 720 ? '50%' : 400,flex:1 }}
            >
              <Carousel
                data={articlePhotos}
                renderItem={renderImage}
                sliderWidth={viewportWidth}
                itemWidth={viewportWidth}
                loop={true}
                autoplay={true}
                autoplayInterval={3000}
              ></Carousel>
            </View>
          </View>

          <View style={{ zIndex: 2, position: 'absolute', top: viewportWidth >= 720 ? '57%' : 340, left: 0, right: 0, bottom: 0 }}>
            <Image
              style={{ width: "100%", height: 74 }}
              source={require("../../../assets/Rectangle_18898.png")}
            />
            <View
              style={{
                zIndex: 3,
                position: "absolute",
                top: 20,
                left: 0,
                right: 0,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 26,
                  textAlign: "center",
                  fontWeight: 600,
                  color: "black",
                }}
              >
                Article No: {articleNumber}
              </Text>
            </View>
          </View>

          <View style={{ zIndex: 2 }}>
            <View style={{ backgroundColor: "#FFF", elevation: 12, shadowColor: "black", width: '100%', height: "100%", borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 10 }}>
              <View>
                <View style={styles.product_detail} >
                  <View style={styles.product_detail_sec}>
                    <Text style={styles.size_label}>Size</Text>
                    <View style={styles.size_container1}>
                      <ScrollView horizontal={true} nestedScrollEnabled={true} style={{ width: "100%", display: "flex", flexDirection: "row" }}>
                        {articleSizeData &&
                          articleSizeData.map((item, index) => (
                            <View style={styles.size_options} key={index}>
                              <View style={styles.size}>
                                <Text
                                  href="/"
                                  style={styles.size_a}
                                  onPress={() => handleSizeClick(item.Name)}
                                >
                                  {item.Name}
                                </Text>
                              </View>
                            </View>
                          ))}
                      </ScrollView>
                    </View>
                  </View>
                  <View></View>
                  <View style={styles.product_detail_sec2}>
                    <Text style={styles.size_label1}>Category</Text>
                    <View style={styles.size_container2}>
                      <View style={styles.size_options2}>
                        <Text style={styles.size_p}>{subcategory}</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{ flex: 1, marginVertical: 15, marginTop: 18, marginLeft: 2.5, marginRight: 7 }}>
                  <View style={{ flex: 1, flexDirection: 'row', gap: 12 }}>
                    <View style={{ flex: 1.18 }}>
                      <Text style={{ fontSize: 15, fontWeight: 600 }}>Color</Text>
                    </View>
                    <View style={{ flex: 1.21 }}>
                      <Text style={{ fontSize: 15, fontWeight: 600 }}>Available in Stock</Text>
                    </View>
                    <View style={{ flex: 1, paddingLeft: 2 }}>
                      <Text style={{ fontSize: 15, fontWeight: 600 }}>Add Qty.</Text>
                    </View>
                  </View>
                  {combinedArray.map((item, key) => (
                    <View style={{ flex: 1, flexDirection: 'row', gap: 12 }}>

                      <View style={{ flex: 1, borderRadius: 10, borderWidth: 1, borderColor: "#0000001d", marginTop: 8, justifyContent: "center", alignContent: "center", alignItems: "center", backgroundColor: "#FFF", paddingVertical: 8, height: 42.953, paddingHorizontal: 8, elevation: 2, shadowColor: 'gray', shadowOpacity: 0.5 }}>
                        <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 500, color: "#626262" }}>{item.Name}</Text>
                      </View>
                      <View style={{ flex: 1.1, borderRadius: 10, borderWidth: 1, borderColor: "#0000001d", marginTop: 8, justifyContent: "center", alignContent: "center", alignItems: "center", backgroundColor: "#FFF", paddingVertical: 8, height: 42.953, paddingHorizontal: 8, elevation: 2, shadowColor: 'gray', shadowOpacity: 0.5 }}>
                        <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 500, color: "#626262" }}>{item.available}</Text>
                      </View>
                      <View style={{ flex: 1, flexDirection: "row", borderRadius: 10, borderWidth: 1, borderColor: "#0000001d", marginTop: 8, justifyContent: "center", alignContent: "center", alignItems: "center", backgroundColor: "#FFF", height: 42.953, elevation: 2, shadowColor: 'gray', shadowOpacity: 0.5 }}>
                        <Pressable onPress={() => handleDecrease(item.index)}
                          disabled={quantities[item.index] <= 0}
                          style={{
                            flex: 1.2, borderWidth: 1,
                            width: "100%", height: '100%',
                            borderColor: "#0000001d", borderRadius: 10,
                            justifyContent: "center", alignContent: "center",
                            alignItems: "center"
                          }}
                        >

                          <Text style={{ fontSize: 24, fontWeight: 800 }}>-</Text>

                        </Pressable>
                        <View style={{ flex: 1 }}>
                          <Text style={{ fontSize: 16, textAlign: "center", fontWeight: 600, color: '#000' }}>{quantities[item.index]}</Text>
                        </View>
                        <Pressable
                          onPress={() => handleIncrease(item.index)}
                          disabled={quantities[item.index] >= item.available}
                          style={{
                            flex: 1.2,
                            justifyContent: "center", alignContent: "center", alignItems: "center",
                            borderWidth: 1, width: "100%",
                            height: '100%', borderColor: "#0000001d",
                            borderRadius: 10
                          }}
                        >
                          <Text style={{ fontSize: 21, textAlign: "center", paddingBottom: 0 }}>+</Text>
                        </Pressable>
                      </View>
                    </View>
                  ))}

                </View>
                <View style={styles.article_ratio_Section}>
                  <View style={styles.article_ratio_container}>
                    <Text style={styles.articallabel}>Article Ratio</Text>
                    <View style={styles.article_content_r}>
                      <Text style={[styles.article_ratio_content]}>{articleRatio}</Text>
                    </View>
                  </View>

                  <View style={styles.article_rate_container}>
                    <Text style={styles.articallabel1}>Article Rate</Text>
                    <View style={styles.article_content_r}>
                      <Text style={[styles.article_rate_content]}>{articleRate / 10}</Text>
                    </View>
                  </View>
                </View>
               
              </View>
            </View>
          </View>
          <Modal
            visible={isModalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setIsModalVisible(false)}
          >
            <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
              >
                <View
                  style={{
                    width: 360,
                    height: 320,
                    backgroundColor: "white",
                    borderRadius: 25,
                    alignItems: "center",
                    // padding: 5
                  }}
                >
                  <Image
                    source={require("../../../assets/update_cart.png")}
                    style={{ width: 100, height: 100, marginBottom: 20, marginTop: 30 }}
                  />

                  <Text style={{ fontSize: 24, textAlign: "center", marginBottom: 30, fontWeight: 500, color: "rgba(0, 0, 0, 0.70)" }}>
                    Are you sure {"\n"} you want to update this {"\n"} artical in cart.
                  </Text>
                  <View style={{

                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    position: "absolute",
                    bottom: 0
                  }}>
                    <TouchableOpacity
                      onPress={() => {
                        setIsModalVisible(false);
                      }}
                      style={{
                        backgroundColor: "black",
                        width: "50%",
                        height: 50,
                        borderBottomLeftRadius: 25,
                        justifyContent: "center",
                        alignItems: "center",
                        borderWidth: 1,
                        borderColor: "white"
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: 700,
                          color: "white",
                          paddingHorizontal: 15
                        }}
                      >
                        No
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setIsModalVisible(false);
                        updateArticalInCart();
                      }}
                      style={{
                        backgroundColor: "black",
                        width: "50%",
                        height: 50,
                        borderBottomRightRadius: 25,
                        justifyContent: "center",
                        alignItems: "center",
                        borderWidth: 1,
                        borderColor: "white"
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: 700,
                          color: "white",
                          paddingHorizontal: 15
                        }}
                      >
                        Yes
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </ScrollView>
      </View>
    )}
    <Modal visible={isImageZoomVisible} transparent={true}>
      <View style={styles.modalContainer} onPress={closeModal}>
        <ImageZoom
          style={[styles.ZoomImage, ,]}
          cropWidth={Dimensions.get("window").width}
          cropHeight={Dimensions.get("window").height}
          imageWidth={Dimensions.get("window").width}
          imageHeight={Dimensions.get("window").height}
        >
          <Image
            style={[styles.modalImage]}
            source={{ uri: baseImageUrl + selectedImageIndex }}
            resizeMode="contain"
          />
        </ImageZoom>
        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
      </View>
    </Modal>
    <View style={{ position: "absolute", flexDirection:"row",padding:8,paddingHorizontal:14,bottom: 0, flex: 1, backgroundColor: "#FFF" }}>
      <View style={{ flex: 1 ,justifyContent:"center"}}>
        <View>
          <Text style={{ fontSize: 10, fontWeight: 400 }}>
            Total Price
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "black",
            }}
          >
            {formatPrice(totalPrice)}
          </Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <View>
          <TouchableOpacity
            style={[
              styles.addto_cart_btn,
              {
                backgroundColor:
                  totalQuantity === 0 ? "gray" : "black",
                opacity: totalQuantity === 0 ? 0.5 : 1,
              },
            ]}
            onPress={() => addtocart(197, id)}
            disabled={totalQuantity === 0}
          >
            <View style={{ flexDirection: 'row', justifyContent: "center", alignContent: "center", alignItems: 'center', width: '100%', paddingVertical: 3 }}>
              <Image source={require('../../../assets/icons/icon.png')} style={{ marginRight: 0, marginLeft: 10 }} />
              <Text style={{ color: "white", textAlign: "center", fontWeight: 600, fontSize: 18, width: '70%' }}>Add to cart</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </>
);
};

export default DetailsOfArticals;
