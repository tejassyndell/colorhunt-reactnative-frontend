import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Pressable,
  Platform,
  RefreshControl,
  Keyboard,
  Alert,
} from "react-native";
import React, { useLayoutEffect } from "react";
import MenuBackArrow from "../../components/menubackarrow/menubackarrow";
import { useEffect, useState } from "react";
import axios from "axios";
import { ActivityIndicator, KeyboardAvoidingView } from "react-native";
import {
  CollectInwardForCartArticals,
  cartdetails,
  deletecartitem,
  cartcount,
} from "../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { ImageZoomProps } from "react-native-image-pan-zoom";
import * as Font from "expo-font";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
import Loader from "../../components/Loader/Loader";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/action";
import { loadCustomFont } from "../../loadCustomFont";

const baseImageUrl =
  "https://webportalstaging.colorhunt.in/colorHuntApiStaging/public/uploads/";

const AddToCart = (props) => {
  const { navigation } = props;
  const [isLoading, setIsLoading] = useState(true);
  const windowwidthe = parseInt(Dimensions.get("window").width);
  const windowheight = parseInt(Dimensions.get("window").height);
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const { width, height } = Dimensions.get("window");
  const [maxHeight, setMaxHeight] = useState(windowwidthe * 1.1);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const [refreshing, setRefreshing] = useState(false);
  const dispach = useDispatch();
  const getcountofcart = async () => {
    let data = await AsyncStorage.getItem("UserData");
    data = await JSON.parse(data);
    const response = await cartcount({ PartyId: data[0].Id }).then((res) => {
      dispach(addToCart(res.data[0]));
    });
  };
  useEffect(() => {
    getcountofcart();
  }, []);
  const onRefresh = () => {
    setRefreshing(true);
    cartDetails();
  };
  const fonttype = async () => {
    const status = await loadCustomFont();
  };
  useEffect(() => {
    const loadCustomFont = async () => {
      try {
        await Font.loadAsync({
          Glory: require("../../../assets/Fonts/Glory.ttf"),
        });
        setIsFontLoaded(true);
      } catch (error) {
        console.error("Error loading custom font:", error);
      }
    };
    fonttype();
    loadCustomFont();
  }, []);

  const updateMaxHeight = () => {
    const windowWidth = Dimensions.get("window").width;
    const windowheight = Dimensions.get("window").height;

    // Add your media query conditions here
    const mediaQueryCondition = windowWidth >= 720 || windowheight >= 844;

    // Adjust the maxHeight based on media query conditions
    const newMaxHeight = mediaQueryCondition
      ? windowWidth * 0.9
      : windowWidth * 0.9;

    setMaxHeight(newMaxHeight);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
        updateMaxHeight();
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
        updateMaxHeight();
      }
    );

    // Cleanup listeners
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    // Initial update
    updateMaxHeight();
  }, []);
  const deletsvg = (
    <Svg width="100%" height="100%" viewBox="0 0 15 17" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.3829 2.69815C14.7065 2.69815 14.976 2.96688 14.976 3.30883V3.62499C14.976 3.95861 14.7065 4.23567 14.3829 4.23567H0.593923C0.269452 4.23567 0 3.95861 0 3.62499V3.30883C0 2.96688 0.269452 2.69815 0.593923 2.69815H3.0198C3.51258 2.69815 3.94143 2.34788 4.05229 1.85368L4.17933 1.28626C4.37677 0.513336 5.02653 0 5.77014 0H9.20583C9.9414 0 10.5984 0.513336 10.7885 1.2455L10.9245 1.85285C11.0346 2.34788 11.4634 2.69815 11.957 2.69815H14.3829ZM13.1504 14.2555C13.4037 11.8952 13.8471 6.28752 13.8471 6.23096C13.8633 6.05956 13.8075 5.89732 13.6966 5.7667C13.5777 5.6444 13.4271 5.57201 13.2613 5.57201H1.72101C1.55433 5.57201 1.39573 5.64440 1.28568 5.7667C1.17402 5.89732 1.11899 6.05956 1.12709 6.23096C1.12857 6.24135 1.14448 6.43887 1.17108 6.76907C1.28925 8.23613 1.61838 12.3221 1.83106 14.2555C1.98156 15.6799 2.91614 16.5751 4.26987 16.6076C5.31451 16.6317 6.39068 16.64 7.49116 16.64C8.52767 16.64 9.5804 16.6317 10.6574 16.6076C12.0581 16.5834 12.9918 15.7040 13.1504 14.2555Z"
        fill="#212121"
      />
    </Svg>
  );

  const editesvg = (
    <Svg
      width="100%"
      height="100%"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G id="edit (5) 1">
        <Path
          id="Path 2689"
          d="M6.03789 17.1004C5.47099 17.1004 4.92731 16.8752 4.52645 16.4743C4.12559 16.0735 3.90039 15.5298 3.90039 14.9629V4.03789C3.90039 3.47099 4.12559 2.92731 4.52645 2.52645C4.92731 2.12559 5.47099 1.90039 6.03789 1.90039H12.9254C13.1144 1.90039 13.2956 1.97546 13.4292 2.10908C13.5628 2.2427 13.6379 2.42392 13.6379 2.61289C13.6379 2.80186 13.5628 2.98309 13.4292 3.11671C13.2956 3.25032 13.1144 3.32539 12.9254 3.32539H6.03789C5.94432 3.32539 5.85167 3.34382 5.76523 3.37963C5.67878 3.41543 5.60024 3.46792 5.53408 3.53408C5.46792 3.60024 5.41543 3.67878 5.37963 3.76523C5.34382 3.85167 5.32539 3.94432 5.32539 4.03789V14.9629C5.32539 15.0565 5.34382 15.1491 5.37963 15.2356C5.41543 15.322 5.46792 15.4005 5.53408 15.4667C5.60024 15.5329 5.67878 15.5853 5.76523 15.6212C5.85167 15.657 5.94432 15.6754 6.03789 15.6754H16.9629C17.1519 15.6754 17.3331 15.6003 17.4667 15.4667C17.6003 15.3331 17.6754 15.1519 17.6754 14.9629V8.31289C17.6754 8.12392 17.7505 7.9427 17.8841 7.80908C18.0177 7.67546 18.1989 7.60039 18.3879 7.60039C18.5769 7.60039 18.7581 7.67546 18.8917 7.80908C19.0253 7.9427 19.1004 8.12392 19.1004 8.31289V14.9629C19.1004 15.5298 18.8752 16.0735 18.4743 16.4743C18.0735 16.8752 17.5298 17.1004 16.9629 17.1004H6.03789ZM7.59827 12.9837L8.10018 10.0443C8.09957 10.0422 8.09957 10.04 8.10018 10.0379L11.4568 6.68127L15.8245 2.3176C15.9566 2.18514 16.1135 2.08008 16.2863 2.00848C16.4591 1.93688 16.6444 1.90015 16.8315 1.90039C17.0199 1.90024 17.2065 1.93722 17.3807 2.00921C17.5548 2.08121 17.7131 2.1868 17.8464 2.31998L18.2636 2.73718L18.6832 3.15677C18.9503 3.42399 19.1003 3.78634 19.1003 4.16416C19.1003 4.54198 18.9503 4.90434 18.6832 5.17156L14.3163 9.53918L10.9613 12.8958C10.9592 12.8964 10.957 12.8964 10.9549 12.8958L8.01547 13.397C7.99508 13.4006 7.97443 13.4024 7.95372 13.4025C7.9015 13.4024 7.84993 13.3909 7.80257 13.3689C7.7552 13.3469 7.71318 13.3149 7.67938 13.2751C7.64559 13.2353 7.62084 13.1886 7.60683 13.1383C7.59283 13.088 7.58991 13.0353 7.59827 12.9837ZM12.4662 7.69143L9.42622 10.7314L9.25285 11.7448L10.2662 11.5714L13.3062 8.53139L17.6754 4.16535L17.2558 3.74577L16.8362 3.32618L12.4662 7.69143Z"
          fill="#212121"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_304_1302">
          <Rect width={19} height={19} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
  const headerHeight =
    Platform.OS === "android"
      ? width >= 720
        ? 110
        : 80
      : height >= 844
      ? 110
      : 65;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ marginTop: 0 }}>
          <MenuBackArrow
            onPress={() => {
              navigation.navigate("Home");
            }}
          />
        </View>
      ),
      headerTitle: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignContent: "center",
            paddingLeft: "10%",
            width: parseInt(windowwidthe) >= 720 ? "95%" : "100%",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: width >= 720 ? 35 : 30,
              fontFamily: "GloryBold",
              width: "100%",
            }}
          >
            Cart
          </Text>
        </View>
      ),
      headerRight: () => <View />,
      headerStyle: {
        height: headerHeight, // Increase the header height here
        elevation: 0, // Remove the shadow on Android
        shadowOpacity: 0, // Remove the shadow on iOS
      },
    });
  }, []);

  // const navigate = useNavigate()
  const [promoCode, setPromoCode] = useState("");
  const [orderItems, setOrderItems] = useState([]);
  const [cartDataIdArray, setCartDataIdArray] = useState([]);
  const [compreInward, setcompreInward] = useState();
  const [totalprice, setTotalPrice] = useState(0);
  const [array_1, setArray_1] = useState([]);
  const getDetailsOfInward = async (arr1, parsedOrderItems) => {
    await CollectInwardForCartArticals({ arr1 }).then((res) => {
      // console.log(res.data.data);
      setcompreInward(res.data.data);
      TotalPrice(parsedOrderItems, res.data.data);
      setIsLoading(false);
    });
  };
  const cartDetails = async () => {
    let data = await AsyncStorage.getItem("UserData");
    data = await JSON.parse(data);
    await cartdetails({ party_id: data[0].Id })
      .then((response) => {
        // console.log(response);
        if (response.status == 200) {
          // console.log("Api response :", response.data[0]);
          let arr1 = response.data.map((item) => item.article_id);
          const parsedOrderItems = response.data.map((item) => ({
            ...item,
            Quantity: JSON.parse(item.Quantity),
          }));
          getDetailsOfInward(arr1, parsedOrderItems);

          // console.log(parsedOrderItems, "-=-==-=-=-=--=-=-=");
          setOrderItems(parsedOrderItems);
          setRefreshing(false);
        }
      })
      .catch((error) => {
        // console.log("Error fetching data:", error);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      cartDetails();
    }, [])
  );
  // useEffect(() => {
  //     cartDetails();
  // },[])

  const handlePromoCodeChange = (event) => {
    setPromoCode(event.target.value);
  };

  const handleApplyPromoCode = () => {
    // Implement logic to apply the promo code here
  };

  const handleAddMoreItems = () => {
    navigation.navigate("Home");
    Keyboard.dismiss();
  };
  cartIsEmpty;

  const getSendPlaceorderdetails = () => {
    handleProceedToCheckout();
  };
  const handleProceedToCheckout = () => {
    let new_arr = [];
    orderItems.map((it) => {
      array_1.filter((item) => {
        if (parseInt(item) === parseInt(it.article_id)) {
          new_arr.push(it);
        } else {
          // console.log(item, it.article_id);
        }
      });
    });
    // console.log("Frash data_1", array_1);
    // console.log("Frash data_2", new_arr);

    if (new_arr.length > 0) {
      AsyncStorage.setItem("Orderlist", JSON.stringify(new_arr));
      navigation.navigate("Orderlist");
    }
  };
  const TotalPrice = (orderItems, compreInward) => {
    let listOfOutOfProduct = [];

    orderItems.map((item) => {
      compreInward.map((it) => {
        const searchString = ",";
        if (
          it.SalesNoPacks.includes(searchString) &&
          item.Quantity.includes(searchString)
        ) {
          let saleNumber = it.SalesNoPacks;
          const stringNumbers = saleNumber
            .split(",")
            .map((num) => parseInt(num.trim()));
          const quntitynumber = item.Quantity.split(",").map((num) =>
            parseInt(num.trim())
          );
          let outofstockcount = 0;
          let status = false;
          for (let i = 0; i < stringNumbers.length; i++) {
            for (let j = 0; j < quntitynumber.length; j++) {
              const e = stringNumbers[i];
              const f = quntitynumber[j];
              // console.log(e, f, "()()()()");
              if (
                parseInt(e) < parseInt(f) &&
                it.ArticleId === item.article_id
              ) {
                status = false;
                listOfOutOfProduct = listOfOutOfProduct.filter((item) => {
                  if (item !== it.ArticleId) {
                    return item;
                  }
                });
                break;
              } else {
                if (!listOfOutOfProduct.includes(item.article_id)) {
                  // listOfOutOfProduct.push(item.article_id);
                  // outofstockcount+=1;
                  status = true;
                }
              }
            }
            if (status == true) {
              outofstockcount += 1;
            }
          }
          // console.log(outofstockcount,stringNumbers.length,"{}{}{}{}");
          if (outofstockcount > 0) {
            listOfOutOfProduct.push(item.article_id);
          }
        } else {
          if (
            parseInt(it.SalesNoPacks) >= parseInt(item.Quantity) &&
            it.ArticleId === item.article_id
          ) {
            listOfOutOfProduct.push(item.article_id);
          } else {
            // console.log(
            //   "11111111",
            //   parseInt(it.SalesNoPacks),
            //   parseInt(item.Quantity),
            //   it.ArticleId,
            //   item.article_id
            // );
          }
        }
      });
    });
    // console.log(listOfOutOfProduct);
    setArray_1(listOfOutOfProduct);
    let total = 0;
    orderItems.map((it) => {
      listOfOutOfProduct.filter((item) => {
        if (parseInt(item) === parseInt(it.article_id)) {
          total += it.rate;
        } else {
          // console.log(item, it.article_id);
        }
      });
    });
    setTotalPrice(total);
  };

  const handleDeleteOrder = async (article_id) => {
    let partydata = await AsyncStorage.getItem("UserData");
    partydata = await JSON.parse(partydata);
    const data = {
      party_id: partydata[0].Id,
      article_id: article_id,
    };
    try {
      await deletecartitem(data).then((res) => {
        getcountofcart();
      });
      const updatedcartitems = orderItems.filter(
        (item) => item.article_id !== article_id
      );
      setOrderItems(updatedcartitems);

      // console.log("Done");
    } catch (error) {
      // console.log("Erro deleting article:", error);
    }
  };
  const handleEditOrder = (article_id, qty) => {
    const id = article_id;
    const Quantity = qty;
    navigation.navigate("DetailsOfArticals", { id, Quantity });
  };
  const totalItems = orderItems.length;
  const totalPrice = orderItems.reduce((total, item) => total + item.rate, 0);
  const cartIsEmpty = orderItems.length === 0;

  const getSingaleartical = (item) => {
    const ArticalId = item.article_id;
    // console.log(ArticalId)
    //   navigate(`/Articles-details/${ArticalId}`) // Pass the ArticalId as a URL parameter to /Articles-details screen
    navigation.navigate("DetailsOfArticals", { id: ArticalId });
  };
  const checkOutOfStock = (it, item) => {
    const searchString = ",";

    if (it.SalesNoPacks.includes(searchString)) {
      const stringNumbers = it.SalesNoPacks.split(",").map((num) =>
        parseInt(num.trim())
      );
      let outOfStock = false;
      let outofstokecount = 0;
      for (let i = 0; i < stringNumbers.length; i++) {
        const e = stringNumbers[i];

        if (
          parseInt(e) < parseInt(item.Quantity) &&
          it.ArticleId === item.article_id
        ) {
          // outOfStock = true;
          // break; // Exit the loop
          outofstokecount += 1;
        }
      }

      if (outofstokecount === stringNumbers.length) {
        outOfStock = true;
      }
      if (outOfStock) {
        return (
          // <View style={{width:"100%"}}>
          <Text
            style={{
              fontSize: windowwidthe * 0.035,
              fontFamily: isFontLoaded ? "GloryMedium" : undefined,
              color: "red",
              textAlign: "right",
            }}
          >
            Out of stock
          </Text>
          // </View>
        );
      }
    } else {
      if (
        parseInt(it.SalesNoPacks) < parseInt(item.Quantity) &&
        it.ArticleId === item.article_id
      ) {
        // setCartDataIdArray((itme)=>[...itme,it.ArticalId])
        return (
          <Text
            style={{
              fontSize: windowwidthe * 0.035,
              fontFamily: isFontLoaded ? "GloryMedium" : undefined,
              color: "red",
            }}
          >
            Out of stock
          </Text>
        );
      }
    }

    // Return null if the item is not out of stock
    // return null;
  };
  const sendOtheThanOutOfStock = (it, item) => {
    const searchString = ",";

    if (it.SalesNoPacks.includes(searchString)) {
      const stringNumbers = it.SalesNoPacks.split(",").map((num) =>
        parseInt(num.trim())
      );

      for (let i = 0; i < stringNumbers.length; i++) {
        const e = stringNumbers[i];

        if (
          parseInt(e) < parseInt(item.Quantity) &&
          it.ArticleId === item.article_id
        ) {
          setCartDataIdArray((i) => [...i, it.ArticleId]);
          break; // Exit the loop
        }
      }
    } else {
      if (
        parseInt(it.SalesNoPacks) < parseInt(item.Quantity) &&
        it.ArticleId === item.article_id
      ) {
        setCartDataIdArray((i) => [...i, it.ArticalId]);
      }
    }
  };

  const geticondeHeighte = () => {
    if (parseInt(windowwidthe) >= 720) {
      // console.log("same and above 800");
      return windowheight * 0.05;
    } else {
      // console.log("below 800");
      return windowheight * 0.04;
    }
  };
  return (
    <>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#FFF",
          }}
        >
          <Loader />
        </View>
      ) : orderItems.length === 0 ? (
        <View
          style={{
            flex: 1,
            backgroundColor: "#FFF",
          }}
        >
          <View
            style={{
              height: "100%",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: windowwidthe * 0.1,
                fontFamily: isFontLoaded ? "GloryMedium" : undefined,
                textAlign: "center",
                color: "#808080",
              }}
            >
              Your Cart is {"\n"} Empty
            </Text>
          </View>

          <View
            style={{
              height: "20%",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              bottom: 40,
              left: "30%",
            }}
          >
            <TouchableOpacity
              style={{
                width: 170,
                height: 50,
                borderRadius: 10,
                backgroundColor: "black",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("Home")}
            >
              <Text
                style={{
                  color: "white",
                  fontFamily: isFontLoaded ? "GloryMedium" : undefined,
                  fontSize: width >= 720 ? 45 : 25,
                }}
              >
                Create Order
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            nestedScrollEnabled={true}
            contentContainerStyle={{ flex: 1 }}
            keyboardShouldPersistTaps="handled"
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "#FFF",
              }}
            >
              <View style={{ width: "100%", backgroundColor: "#FFF" }}>
                <ScrollView nestedScrollEnabled={true}>
                  <View
                    style={{
                      width: "100%",
                      backgroundColor: "#FFF",
                      borderTopColor: "black",
                    }}
                  >
                    <KeyboardAvoidingView
                      behavior="padding"
                      style={{ flex: 1 }}
                    >
                      <ScrollView
                        nestedScrollEnabled={true}
                        style={{
                          backgroundColor: "#FFF",
                          height: "auto",
                          maxHeight: maxHeight,
                          // maxHeight: "40%",
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                          }}
                        >
                          <View style={{ paddingBottom: 20 }}>
                            {orderItems.map((item, index) =>
                              array_1.length > 0 ? (
                                array_1.includes(item.article_id) ? (
                                  // id === item.article_id ?
                                  <View
                                    key={index}
                                    style={{
                                      flexDirection: "row",
                                      width: "94%",

                                      marginHorizontal: "3%",
                                      marginTop: "5%",
                                      borderRadius: 10,
                                      paddingVertical: 5,
                                      backgroundColor: "#FFF",
                                      borderWidth: 1,
                                      borderColor: "rgba(0,0,0,0.2)",
                                    }}
                                  >
                                    <View
                                      style={{
                                        marginHorizontal: 5,
                                        borderRadius: 10,
                                        shadowColor: "#000",
                                        shadowOffset: {
                                          width: 1,
                                          height: 1,
                                        },
                                        shadowOpacity: 0.1,
                                      }}
                                    >
                                      <TouchableOpacity
                                        style={{
                                          width:
                                            windowwidthe >= 720 ? 150 : 100,
                                          height:
                                            windowwidthe >= 720 ? 140 : 110,
                                          borderRadius: 12,
                                          borderColor: "rgba(0,0,0,0.2)",
                                          borderWidth: 1,
                                          marginRight: 10,
                                        }}
                                        onPress={() =>
                                          handleEditOrder(
                                            item.article_id,
                                            item.Quantity
                                          )
                                        }
                                      >
                                        <Image
                                          style={{
                                            flex: 1,
                                            // resizeMode: "contain",
                                            height: "100%",
                                            width: "100%",
                                            borderRadius: 10,
                                          }}
                                          source={{
                                            uri:
                                              baseImageUrl +
                                              item.Photos.split(",")[0],
                                          }}
                                        ></Image>
                                      </TouchableOpacity>
                                    </View>
                                    <View
                                      style={{
                                        width:
                                          windowwidthe >= 720 ? "60%" : "50%",
                                        borderRadius: 10,
                                      }}
                                    >
                                      <View
                                        style={{
                                          paddingVertical: 10,
                                        }}
                                      >
                                        <Text
                                          style={{
                                            fontSize: width >= 720 ? 20 : 18,
                                            fontFamily: isFontLoaded
                                              ? "Glory"
                                              : undefined,
                                            fontWeight: 600,
                                          }}
                                        >
                                          {item.ArticleNumber}
                                        </Text>
                                        <Text
                                          style={{
                                            fontSize: width >= 720 ? 16 : 14,
                                            fontFamily: isFontLoaded
                                              ? "Glory"
                                              : undefined,
                                            fontWeight: 400,
                                          }}
                                        >
                                          {item.StyleDescription}
                                        </Text>
                                      </View>
                                      <View
                                        style={{
                                          marginTop: "1%",
                                          justifyContent: "center",
                                          paddingTop: "2.5%",
                                          position: "relative",
                                        }}
                                      >
                                        <Text
                                          style={{
                                            fontSize: width >= 720 ? 16 : 14,
                                            fontFamily: "Glory",
                                            fontWeight: 400,
                                          }}
                                        >
                                          Rate
                                        </Text>
                                        <Text
                                          style={{
                                            fontSize: width >= 720 ? 19 : 17,
                                            fontFamily: "Glory",
                                          }}
                                        >
                                          ₹{item.rate}.00
                                        </Text>
                                      </View>
                                    </View>
                                    <View
                                      style={{
                                        width: "15%",
                                        display: "flex",
                                        flexDirection: "column",
                                      }}
                                    >
                                      <View
                                        style={{
                                          width: "100%",
                                          display: "flex",
                                          flexDirection: "row",
                                          justifyContent: "flex-end",
                                          gap: 10,
                                          paddingRight: "5%",
                                          marginVertical: "5%",
                                          borderRadius: 10,
                                          // height: "auto",
                                        }}
                                      >
                                        <TouchableOpacity
                                          onPress={() =>
                                            handleEditOrder(
                                              item.article_id,
                                              item.Quantity
                                            )
                                          }
                                          style={{
                                            width: width >= 720 ? 30 : 20,
                                            height: width >= 720 ? 30 : 20,
                                          }}
                                        >
                                          {editesvg}
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                          onPress={() =>
                                            handleDeleteOrder(item.article_id)
                                          }
                                          style={{
                                            width: width >= 720 ? 30 : 20,
                                            height: width >= 720 ? 30 : 20,
                                          }}
                                        >
                                          {deletsvg}
                                        </TouchableOpacity>
                                      </View>
                                    </View>
                                  </View>
                                ) : (
                                  <View
                                    key={item.id}
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      width: "94%",
                                      backgroundColor: "#FFF",
                                      elevation: 1,
                                      shadowColor: "gray",
                                      shadowOpacity: 0.5,
                                      marginHorizontal: "3%",
                                      marginTop: width >= 720 ? "1%" : "5%",
                                      borderRadius: 10,
                                      height: width >= 720 ? 160 : 130,
                                      paddingVertical: "1.5%",
                                      borderColor: "rgba(0,0,0,0.2)",
                                      borderWidth: 1,
                                      padding: 0,
                                      paddingBottom: 1,
                                    }}
                                  >
                                    <TouchableOpacity
                                      style={{
                                        width: windowwidthe >= 720 ? 150 : 100,
                                        height: windowwidthe >= 720 ? 140 : 110,
                                        borderRadius: 12,

                                        marginRight:
                                          windowwidthe >= 720 ? 15 : 10,
                                      }}
                                      onPress={() =>
                                        handleEditOrder(
                                          item.article_id,
                                          item.Quantity
                                        )
                                      }
                                    >
                                      <Image
                                        style={{
                                          flex: 1,
                                          resizeMode: "contain",
                                          height: "100%",
                                          width: "100%",
                                          borderRadius: 10,
                                          borderColor: "rgba(0,0,0,0.2)",
                                          borderWidth: 1,
                                          marginBottom: width >= 720 ? 10 : 5,
                                          marginStart:
                                            windowwidthe >= 720 ? 10 : 5,
                                        }}
                                        source={{
                                          uri:
                                            baseImageUrl +
                                            item.Photos.split(",")[0],
                                        }}
                                      ></Image>
                                    </TouchableOpacity>
                                    <View
                                      style={{
                                        width:
                                          windowwidthe >= 720 ? "46%" : "40%",
                                        marginHorizontal: "1%",
                                        marginBottom: "1%",
                                        marginTop: "0.8%",
                                        borderRadius: 10,
                                      }}
                                    >
                                      <View
                                        style={{
                                          height: "50%",
                                          paddingBottom: 1,
                                        }}
                                      >
                                        <Text
                                          style={{
                                            fontSize: width >= 720 ? 20 : 18,
                                            fontFamily: isFontLoaded
                                              ? "Glory"
                                              : undefined,
                                            color: "#00000040",
                                            fontWeight: 600,
                                          }}
                                        >
                                          {item.ArticleNumber}
                                        </Text>
                                        <Text
                                          style={{
                                            fontSize: width >= 720 ? 16 : 14,
                                            fontFamily: isFontLoaded
                                              ? "Glory"
                                              : undefined,
                                            color: "#00000040",
                                            fontWeight: "400",
                                          }}
                                        >
                                          {item.StyleDescription}
                                        </Text>
                                      </View>
                                      <View
                                        style={{
                                          marginTop: "1%",
                                          justifyContent: "center",
                                          paddingTop: width >= 720 ? 0 : 10,
                                          position: "relative",
                                          height: "50%",
                                        }}
                                      >
                                        <Text
                                          style={{
                                            fontSize: width >= 720 ? 16 : 14,
                                            fontFamily: isFontLoaded
                                              ? "Glory"
                                              : undefined,
                                            color: "#00000040",
                                            fontWeight: "400",
                                          }}
                                        >
                                          Rate
                                        </Text>
                                        <Text
                                          style={{
                                            fontSize: width >= 720 ? 19 : 17,
                                            fontFamily: isFontLoaded
                                              ? "Glory"
                                              : undefined,
                                            color: "#00000040",
                                            fontWeight: "700",
                                          }}
                                        >
                                          ₹{item.rate}.00
                                        </Text>
                                      </View>
                                    </View>
                                    <View
                                      style={{
                                        width: "28%",
                                        display: "flex",
                                        flexDirection: "column",
                                        height: "100%",
                                      }}
                                    >
                                      <View
                                        style={{
                                          width: "100%",
                                          display: "flex",
                                          flexDirection: "row",
                                          justifyContent: "flex-end",
                                          gap: windowwidthe * 0.025,
                                          paddingRight: "5%",
                                          marginVertical: "5%",
                                          borderRadius: 10,

                                          height: "auto",
                                        }}
                                      >
                                        <TouchableOpacity
                                          onPress={() =>
                                            handleEditOrder(
                                              item.article_id,
                                              item.Quantity
                                            )
                                          }
                                          style={{
                                            width: width >= 720 ? 30 : 20,
                                            height: width >= 720 ? 30 : 20,
                                          }}
                                        >
                                          {editesvg}
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                          onPress={() =>
                                            handleDeleteOrder(item.article_id)
                                          }
                                          style={{
                                            width: width >= 720 ? 30 : 20,
                                            height: width >= 720 ? 30 : 20,
                                          }}
                                        >
                                          {deletsvg}
                                        </TouchableOpacity>
                                      </View>
                                      <View
                                        style={{
                                          width: "100%",
                                          position: "absolute",
                                          bottom: 0,
                                          paddingRight: "5%",
                                        }}
                                      >
                                        <Text
                                          style={{
                                            fontSize: windowwidthe * 0.035,
                                            fontFamily: isFontLoaded
                                              ? "Glory"
                                              : undefined,
                                            fontWeight: "500",
                                            color: "red",
                                            textAlign: "right",
                                            paddingBottom: 10,
                                          }}
                                        >
                                          Out of stock
                                        </Text>
                                      </View>
                                    </View>
                                  </View>
                                )
                              ) : (
                                <View
                                  key={item.id}
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    width: "90%",
                                    backgroundColor: "#FFF",
                                    elevation: 5,
                                    shadowColor: "gray",

                                    shadowOpacity: 0.5,
                                    marginHorizontal: "5%",
                                    marginTop: "5%",
                                    borderRadius: 10,
                                    height: windowheight * 0.142,
                                    paddingVertical: "1.5%",
                                  }}
                                >
                                  <TouchableOpacity
                                    style={{
                                      width: windowwidthe * 0.18,
                                      margin: "3.8%",
                                      marginTop: "1.5%",
                                      height: windowheight * 0.108,
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      // marginVertical: 10,
                                      borderRadius: 10,
                                      opacity: 0.6,
                                    }}
                                    onPress={() =>
                                      handleEditOrder(
                                        item.article_id,
                                        item.Quantity
                                      )
                                    }
                                  >
                                    <Image
                                      style={{
                                        flex: 1,
                                        resizeMode: "contain",
                                        height: "100%",
                                        width: "100%",
                                        borderRadius: 10,
                                      }}
                                      source={{
                                        uri:
                                          baseImageUrl +
                                          item.Photos.split(",")[0],
                                      }}
                                    ></Image>
                                  </TouchableOpacity>
                                  <View
                                    style={{
                                      width: "40%",
                                      marginHorizontal: "1%",
                                      marginBottom: "1%",
                                      marginTop: "0.8%",
                                      borderRadius: 10,
                                    }}
                                  >
                                    <View
                                      style={{
                                        height: "50%",
                                        paddingBottom: 1,
                                      }}
                                    >
                                      <Text
                                        style={{
                                          fontSize: windowwidthe * 0.035,
                                          fontFamily: isFontLoaded
                                            ? "Glory"
                                            : undefined,
                                          color: "#00000040",
                                          fontWeight: "700",
                                        }}
                                      >
                                        {item.ArticleNumber}
                                      </Text>
                                      <Text
                                        style={{
                                          fontSize: windowwidthe * 0.025,
                                          fontFamily: isFontLoaded
                                            ? "Glory"
                                            : undefined,
                                          color: "#00000040",
                                          fontWeight: "400",
                                        }}
                                      >
                                        {item.StyleDescription}
                                      </Text>
                                    </View>
                                    <View
                                      style={{
                                        marginTop: "1%",
                                        justifyContent: "center",
                                        paddingTop: 10,
                                        position: "relative",
                                        height: "50%",
                                      }}
                                    >
                                      <Text
                                        style={{
                                          fontSize: windowwidthe * 0.025,
                                          fontFamily: isFontLoaded
                                            ? "Glory"
                                            : undefined,
                                          color: "#00000040",
                                          fontWeight: "400",
                                        }}
                                      >
                                        Rate
                                      </Text>
                                      <Text
                                        style={{
                                          fontSize: windowwidthe * 0.035,
                                          fontFamily: isFontLoaded
                                            ? "Glory"
                                            : undefined,
                                          color: "#00000040",
                                          fontWeight: "700",
                                        }}
                                      >
                                        ₹{item.rate}.00
                                      </Text>
                                    </View>
                                  </View>
                                  <View
                                    style={{
                                      width: "28%",
                                      display: "flex",
                                      flexDirection: "column",
                                      height: "100%",
                                    }}
                                  >
                                    <View
                                      style={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "flex-end",
                                        gap: windowwidthe * 0.025,
                                        paddingRight: "5%",
                                        marginVertical: "5%",
                                        borderRadius: 10,
                                        height: "auto",
                                      }}
                                    >
                                      <TouchableOpacity
                                        onPress={() =>
                                          handleEditOrder(
                                            item.article_id,
                                            item.Quantity
                                          )
                                        }
                                        style={{
                                          width: windowwidthe * 0.038,
                                          height: windowheight * 0.038,
                                        }}
                                      >
                                        {editesvg}
                                      </TouchableOpacity>
                                      <TouchableOpacity
                                        onPress={() =>
                                          handleDeleteOrder(item.article_id)
                                        }
                                        style={{
                                          width: windowwidthe * 0.038,
                                          height: windowheight * 0.038,
                                        }}
                                      >
                                        {deletsvg}
                                      </TouchableOpacity>
                                    </View>
                                    <View
                                      style={{
                                        width: "100%",
                                        position: "absolute",
                                        bottom: 0,
                                        paddingRight: "5%",
                                      }}
                                    >
                                      <Text
                                        style={{
                                          fontSize: windowwidthe * 0.035,
                                          fontFamily: isFontLoaded
                                            ? "Glory"
                                            : undefined,
                                          fontWeight: "500",
                                          color: "red",
                                          textAlign: "right",
                                        }}
                                      >
                                        Out of stock
                                      </Text>
                                    </View>
                                  </View>
                                </View>
                              )
                            )}
                          </View>
                        </View>
                      </ScrollView>
                    </KeyboardAvoidingView>
                  </View>
                </ScrollView>
                <View>
                  <View style={{ width: "100%" }}>
                    <View style={{ marginHorizontal: "3%" }}>
                      <TextInput
                        value={promoCode}
                        onChange={handlePromoCodeChange}
                        style={{
                          width: "100%",
                          height: width >= 720 ? 90 : 60,

                          borderWidth: 1,
                          paddingLeft: "5%",
                          borderRadius: 10,
                          fontSize: width >= 720 ? 40 : 18,
                          fontFamily: isFontLoaded ? "Glory" : undefined,
                          backgroundColor: "#EEE",
                          borderColor: "#E4E7EA",
                        }}
                        placeholder="Promo Code"
                      ></TextInput>
                      <View
                        style={{
                          position: "absolute",
                          top: width >= 720 ? 14 : 7,
                          right: width >= 720 ? 10 : 10,
                          position: "absolute",
                          justifyContent: "flex-end",
                          alignItems: "flex-end",
                        }}
                      >
                        <TouchableOpacity
                          onPress={handleApplyPromoCode}
                          style={{
                            backgroundColor: "#212121",
                            borderRadius: 10,
                            width: width >= 720 ? 150 : 100,
                            height: width >= 720 ? 60 : 45,
                            justifyContent: "center",
                          }}
                        >
                          <Text
                            style={{
                              color: "white",
                              fontSize: width >= 720 ? 35 : 22,
                              fontFamily: isFontLoaded
                                ? "GloryMedium"
                                : undefined,
                              textAlign: "center",
                            }}
                          >
                            Apply
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  backgroundColor: "#FFF",
                  width: "100%",
                }}
              >
                {keyboardVisible === true ? (
                  ""
                ) : (
                  <>
                    <View
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                        width: "100%",
                        backgroundColor: "#FFF",
                        marginBottom: "2%",
                      }}
                    >
                      <TouchableOpacity
                        onPress={handleAddMoreItems}
                        style={{
                          marginRight: "2.5%",
                          backgroundColor: "#212121",
                          borderRadius: 7.6,
                          width: width >= 720 ? 200 : 100,
                          paddingVertical: windowwidthe >= 720 ? "2%" : "2.5%",
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontSize: width >= 720 ? 35 : 18,
                            fontFamily: isFontLoaded ? "Glory" : undefined,
                            fontWeight: "600",
                            textAlign: "center",
                          }}
                        >
                          Add More
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 5,
                        width: "100%",
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                        paddingRight: "3%",
                        marginTop: "2%",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: width >= 720 ? 20 : 11,
                          fontFamily: isFontLoaded ? "Glory" : undefined,
                          fontWeight: "700",
                          color: "#AAAAAA",
                        }}
                      >
                        Total price
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        backgroundColor: "#FFF",
                      }}
                    >
                      <View
                        style={{
                          width: "50%",
                          paddingLeft: "2.8%",
                          marginBottom: 4,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: width >= 720 ? 25 : 18,
                            fontFamily: isFontLoaded ? "Glory" : undefined,
                            fontWeight: "600",
                            color: "#585656",
                          }}
                        >
                          Total ({totalItems} item) :
                        </Text>
                      </View>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 5,
                          width: "50%",
                          justifyContent: "flex-end",
                          alignItems: "flex-end",
                          paddingRight: windowwidthe * 0.03,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: width >= 720 ? 30 : 18,
                            fontFamily: isFontLoaded ? "Glory" : undefined,
                            fontWeight: "800",
                            color: "#000",
                          }}
                        >
                          ₹{totalprice}.00
                        </Text>
                      </View>
                    </View>
                    <View style={{ padding: "2.5%" }}>
                      <TouchableOpacity
                        disabled={totalPrice != 0 ? false : true}
                        style={{
                          width: "100%",
                          backgroundColor:
                            totalPrice != 0 ? "#212121" : "#212121B2",
                          borderRadius: 10,
                          paddingHorizontal: "5%",
                          paddingVertical: windowwidthe < 720 ? "4%" : "3%",
                        }}
                        onPress={handleProceedToCheckout}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontSize: width >= 720 ? 35 : 18,
                            fontFamily: isFontLoaded ? "Glory" : undefined,
                            fontWeight: "600",
                            textAlign: "left",
                          }}
                        >
                          Proceed to Checkout
                        </Text>
                        <View
                          style={{
                            width:
                              windowwidthe < 720 ? windowwidthe * 0.08 : 50,
                            height:
                              windowwidthe < 720 ? geticondeHeighte() : 50,
                            position: "absolute",
                            top: "50%",
                            right: "3%",
                          }}
                        >
                          <Svg
                            width="100%"
                            height="100%"
                            viewBox="0 0 30 30"
                            fill="none"
                            {...props}
                          >
                            <G id="arrow">
                              <G id="BG">
                                <Rect
                                  id="Rectangle_45"
                                  width={30}
                                  height={30}
                                  rx={7}
                                  fill="white"
                                />
                              </G>
                              <G id="icon">
                                <Path
                                  id="Vector"
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M13.5292 15.0055L13.5305 15.3006C13.5406 16.471 13.6112 17.5152 13.7328 18.177C13.7328 18.1889 13.8656 18.8453 13.9501 19.0637C14.0828 19.3795 14.3228 19.6475 14.6238 19.8173C14.8647 19.9385 15.1173 20 15.3819 20C15.5898 19.9903 15.9328 19.8858 16.1776 19.798L16.381 19.72C17.7282 19.1848 20.3037 17.4362 21.29 16.3668L21.3628 16.2921L21.6873 15.9418C21.8918 15.6738 22 15.3461 22 14.9936C22 14.6778 21.9037 14.362 21.7109 14.1068C21.6532 14.0242 21.5603 13.9181 21.4776 13.8285L21.1617 13.4978C20.0746 12.3964 17.721 10.8515 16.501 10.3396C16.501 10.3286 15.7428 10.0119 15.3819 10H15.3337C14.7801 10 14.2628 10.3158 13.9982 10.8261C13.926 10.9657 13.8567 11.239 13.804 11.479L13.7092 11.9323C13.601 12.6611 13.5292 13.7792 13.5292 15.0055ZM8.25271 13.7347C7.5609 13.7347 7 14.3011 7 14.9997C7 15.6982 7.5609 16.2646 8.25271 16.2646L11.3354 15.9919C11.8781 15.9919 12.3181 15.5486 12.3181 14.9997C12.3181 14.4516 11.8781 14.0073 11.3354 14.0073L8.25271 13.7347Z"
                                  fill="black"
                                />
                              </G>
                            </G>
                          </Svg>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </>
  );
};

export default AddToCart;
