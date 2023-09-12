import {
  View,
  Text,
  Image,
  TouchableHighlight,
  Dimensions,
  Modal,
  TouchableOpacity,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import { ArticleDetails, addto_cart } from "../../api/api";
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
import ImageZoom from "react-native-image-pan-zoom";

const DetailsOfArticals = (props) => {
  const { navigation } = props;
  const { width: viewportWidth } = Dimensions.get("window");
  const route = useRoute();
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
  const [isLoading, setIsLoading] = useState(true);
  const [isImageZoomVisible, setImageZoomVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState("");

  const ArticleDetailsData = async () => {
    let data = {
      ArticleId: id,
      PartyId: 197,
    };
    try {
      const res = await ArticleDetails(data);
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
      // const salesnopackstoArray = res.data.calculatedData[0].SalesNoPacks.split(",");
      // const salesnopackstoArray = [1, 2, 3, 4]
      const salesnopackstoArray = [nopacks];
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
      const response = await addto_cart(data);
      console.log("APi Response:", response.data);
    } catch (error) {
      console.log("Error Adding to Cart:", error);
    }
    // navigate('/cart_list', { state: { totalPrice } })
    navigation.navigate("cart_list", { totalPrice });
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

  const openImageZoom = (index) => {
    console.log(index);
    setSelectedImageIndex(index);
    setImageZoomVisible(true);
  };

  const renderImage = ({ item, index }) => (
    <TouchableOpacity onPress={() => openImageZoom(item)}>
      <View style={stylesRecipe.imageContainer}>
        <Image
          style={stylesRecipe.image}
          source={{ uri: baseImageUrl + item }}
        />
      </View>
    </TouchableOpacity>
  );

  const closeModal = () => {
    setImageZoomVisible(false);
  };
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
  return (
    <>
      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <>
          <ScrollView
            nestedScrollEnabled={true}
            style={{ borderTopWidth: 1, borderColor: "black" }}
          >
            <View style={stylesRecipe.carouselContainer}>
              <Carousel
                data={articlePhotos}
                renderItem={renderImage}
                sliderWidth={viewportWidth}
                itemWidth={viewportWidth}
                loop={true}
                autoplay={true}
                autoplayInterval={3000}
              />
            </View>
            <View
              style={{
                width: "100%",
                position: "absolute",
                top: "75%",
                height: "100%",
                // shadowOffset: { width: "100%", height: 0 },
                elevation: 15,
                elevation: 50,
                shadowOffset: { width: 0, height: 0 }, // Offset the shadow upwards
                shadowColor: "#000000", // Specify a shadow color
                shadowOpacity: 0.9, // Set the shadow opacity within the valid range (0-1)
                shadowRadius: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 26,
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                Article No:{articleNumber}
              </Text>
            </View>
          </ScrollView>
          <View
            style={{
              width: "100%",
              height: 50,
              backgroundColor: "transparent",
              position: "absolute",
              zIndex: 2,
              top: "41.5%",
              borderRadius: 30,
              elevation: 16, // Use elevation to create a shadow on Android
              shadowOffset: { width: 0, height: 50 }, // Offset the shadow downwards
              shadowColor: " #f8f8ff",
              shadowOpacity: 0.5,
            }}
          ></View>
          <View style={styles.productDetails}>
            <ScrollView
              style={{ maxHeight: "100%" }}
              nestedScrollEnabled={true}
            >
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
                            <Text style={styles.color_box}>{item.Name}</Text>
                          </View>
                          <View style={styles.available_box_Text}>
                            <Text style={styles.available_box}>{nopacks}</Text>
                          </View>

                          <View style={styles.qty_box_Text}>
                            <View style={styles.qty_box}>
                              <View style={styles.top_row}>
                                <View style={styles.box1}>
                                  <Pressable
                                    style={styles.box1_btn}
                                    onPress={() => handleDecrease(item.index)}
                                    disabled={quantities[item.index] <= 0}
                                  >
                                    <Text style={styles.box1_btn_text}>-</Text>
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
                                    onPress={() => handleIncrease(item.index)}
                                    disabled={quantities[item.index] >= nopacks}
                                  >
                                    <Text style={styles.box1_btn_text}>+</Text>
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
                    style={{ fontSize: 16, fontWeight: 600, color: "black" }}
                  >
                    {formatPrice(totalPrice)}
                  </Text>
                </View>
                <View style={styles.addto_card_container}>
                  <Pressable
                    style={[
                      styles.addto_cart_btn,
                      {
                        backgroundColor: totalQuantity === 0 ? "gray" : "black",
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
            </ScrollView>
          </View>
        </>
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
