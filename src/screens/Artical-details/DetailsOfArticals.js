import {
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
  Pressable,
  Modal,
} from "react-native";
import {
  ArticleDetails,
  addto_cart,
  findfromthecart,
  updateCartArticale,
} from "../../api/api";
import Carousel from "react-native-snap-carousel";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import styles from "./styles";
import stylesRecipe from "../Recipe/styles";
import { ScrollView } from "react-native-gesture-handler";
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
  const { id } = route.params;
  console.log(id);
  const handleSizeClick = (size) => {};
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
    combinedArray.forEach((item) => {
      defaultQuantities[item.index] = 0;
    });
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
      ),
      headerTitle: () => <View />,
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

  return (
    <>
      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <View style={{ backgroundColor: "#FFF" }}>
          <ScrollView nestedScrollEnabled={true}>
            <View style={{ zIndex: 1 }}>
              <View
                style={{ backgroundColor: "#FFF", width: "100%", height: 400 }}
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

            <View
              style={{
                zIndex: 2,
                position: "absolute",
                top: "41.5%",
                left: 0,
                right: 0,
                bottom: 0,
              }}
            >
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
              <View
                style={{
                  backgroundColor: "#FFF",
                  elevation: 12,
                  shadowColor: "black",
                  width: "100%",
                  height: "100%",
                  borderTopLeftRadius: 30,
                  borderTopRightRadius: 30,
                }}
              >
                <View>
                  <View style={styles.product_detail}>
                    <View style={styles.product_detail_sec}>
                      <Text style={styles.size_label}>Size</Text>
                      <View style={styles.size_container1}>
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
                      </View>
                    </View>
                    <View></View>
                    <View style={styles.product_detail_sec2}>
                      <Text style={styles.size_label1}>Category</Text>
                      <View style={styles.size_container2}>
                        <View style={styles.size_options}>
                          <Text style={styles.size_p}>{subcategory}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.product_detail}>
                    <View style={styles.container_grid}>
                      <View style={styles.head_grid}>
                        <View style={styles.color_Text}>
                          <Text style={styles.color_title}>Color</Text>
                        </View>
                        <View style={styles.available_Text}>
                          <Text style={styles.available_title}>
                            Available in Stock
                          </Text>
                        </View>
                        <View style={styles.qty_Text}>
                          <Text style={styles.qty_title}>Add Qty.</Text>
                        </View>
                      </View>
                      <View style={styles.body_main_con}>
                        {combinedArray.map((item) => (
                          <View key={item.Id}>
                            <View style={styles.row}>
                              <View style={styles.color_box_Text}>
                                <Text style={styles.color_box}>
                                  {item.Name}
                                </Text>
                              </View>
                              <View style={styles.available_box_Text}>
                                <Text style={styles.available_box}>
                                  {item.available}
                                </Text>
                              </View>

                              <View style={styles.qty_box_Text}>
                                <View style={styles.qty_box}>
                                  <View style={styles.top_row}>
                                    <View style={styles.box1}>
                                      <Pressable
                                        style={styles.box1_btn}
                                        onPress={() =>
                                          handleDecrease(item.index)
                                        }
                                        disabled={quantities[item.index] <= 0}
                                      >
                                        <Text style={styles.box1_btn_text}>
                                          -
                                        </Text>
                                      </Pressable>
                                    </View>
                                    <View style={styles.box2}>
                                      <Text
                                        style={{
                                          textAlign: "center",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        {quantities[item.index]}
                                      </Text>
                                    </View>
                                    <View style={styles.box3}>
                                      <Pressable
                                        style={styles.box3_btn}
                                        onPress={() =>
                                          handleIncrease(item.index)
                                        }
                                        disabled={
                                          quantities[item.index] >=
                                          item.available
                                        }
                                      >
                                        <Text style={styles.box1_btn_text}>
                                          +
                                        </Text>
                                      </Pressable>
                                    </View>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </View>
                        ))}
                      </View>
                    </View>
                  </View>
                  <View style={styles.article_ratio_Section}>
                    <View style={styles.article_ratio_container}>
                      <Text style={styles.articallabel}>Article Ratio</Text>
                      <Text
                        style={[
                          styles.article_ratio_content,
                          styles.article_content_r,
                        ]}
                      >
                        {articleRatio}
                      </Text>
                    </View>

                    <View style={styles.article_rate_container}>
                      <Text style={styles.articallabel1}>Article Rate</Text>
                      <Text
                        style={[
                          styles.article_rate_content,
                          styles.article_content_r,
                        ]}
                      >
                        {articleRate / 10}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.total_price_container}>
                    <View style={styles.main_total_div}>
                      <Text style={{ fontSize: 10, fontWeight: 400 }}>
                        Total Price
                      </Text>
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
                    <View style={styles.addto_card_container}>
                      <Pressable
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
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          <Image
                            source={require("../../../assets/icons/icon.png")}
                            style={{ marginRight: 2, marginLeft: 10 }}
                          />
                          <Text
                            style={{
                              color: "white",
                              textAlign: "center",
                              fontWeight: 600,
                              fontSize: 18,
                              width: "80%",
                            }}
                          >
                            Add To Cart
                          </Text>
                        </View>
                      </Pressable>
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
              <TouchableWithoutFeedback
                onPress={() => setIsModalVisible(false)}
              >
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
                      style={{
                        width: 100,
                        height: 100,
                        marginBottom: 20,
                        marginTop: 30,
                      }}
                    />

                    <Text
                      style={{
                        fontSize: 24,
                        textAlign: "center",
                        marginBottom: 30,
                        fontWeight: 500,
                        color: "rgba(0, 0, 0, 0.70)",
                      }}
                    >
                      Are you sure {"\n"} you want to update this {"\n"} artical
                      in cart.
                    </Text>
                    <View
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        position: "absolute",
                        bottom: 0,
                      }}
                    >
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
                          borderColor: "white",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: 700,
                            color: "white",
                            paddingHorizontal: 15,
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
                          borderColor: "white",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: 700,
                            color: "white",
                            paddingHorizontal: 15,
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
    </>
  );
};

export default DetailsOfArticals;
