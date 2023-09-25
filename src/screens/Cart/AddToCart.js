import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Pressable,
  Platform,
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
} from "../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { ImageZoomProps } from "react-native-image-pan-zoom";

const baseImageUrl = "https://colorhunt.in/colorHuntApi/public/uploads/";

const AddToCart = (props) => {
  const { navigation } = props;
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchprofiledata();
  }, []);
  const fetchprofiledata = async () => {
    try {
      let partyData = await AsyncStorage.getItem("UserData");
      partyData = JSON.parse(partyData);
      console.log(partyData);
      const data = { party_id: partyData[0].Id };
      const response = await Profiledata(data);
      setprofile(response.data);
    } catch (err) {
      console.log(err, "error in fetching data");
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ marginTop: 2 }}>
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
            display: "flex",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 25,
              fontWeight: 700,
              width: "100%",
            }}
          >
            Cart
          </Text>
        </View>
      ),
      headerRight: () => <View />,
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
      console.log(res.data.data);
      setcompreInward(res.data.data);
      TotalPrice(parsedOrderItems, res.data.data);
    });
  };
  const cartDetails = async () => {
    await cartdetails()
      .then((response) => {
        console.log("Api response :", response.data[0]);
        let arr1 = response.data.map((item) => item.article_id);
        const parsedOrderItems = response.data.map((item) => ({
          ...item,
          Quantity: JSON.parse(item.Quantity),
        }));
        getDetailsOfInward(arr1, parsedOrderItems);

        console.log(parsedOrderItems);
        setOrderItems(parsedOrderItems);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
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
  };

  const handleGoBack = () => {
    //   navigate(-1)
  };

  const handleGoToOrderList = () => {
    //   navigate('/orderplaced')
  };

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
          console.log(item, it.article_id);
        }
      });
    });
    console.log("Frash data_1", array_1);
    console.log("Frash data_2", new_arr);

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
          for (let i = 0; i < stringNumbers.length; i++) {
            for (let j = 0; j < quntitynumber.length; j++) {
              const e = stringNumbers[i];
              const f = quntitynumber[j];
              console.log(e, f, "()()()()");
              if (
                parseInt(e) < parseInt(f) &&
                it.ArticleId === item.article_id
              ) {
                listOfOutOfProduct = listOfOutOfProduct.filter((item) => {
                  if (item !== it.ArticleId) {
                    return item;
                  }
                });
                break;
              } else {
                if (!listOfOutOfProduct.includes(item.article_id)) {
                  listOfOutOfProduct.push(item.article_id);
                }
              }
            }
          }
        } else {
          if (
            parseInt(it.SalesNoPacks) > parseInt(item.Quantity) &&
            it.ArticleId === item.article_id
          ) {
            listOfOutOfProduct.push(item.article_id);
          } else {
            console.log(
              "11111111",
              parseInt(it.SalesNoPacks),
              parseInt(item.Quantity),
              it.ArticleId,
              item.article_id
            );
          }
        }
      });
    });
    console.log(listOfOutOfProduct);
    setArray_1(listOfOutOfProduct);
    let total = 0;
    orderItems.map((it) => {
      listOfOutOfProduct.filter((item) => {
        if (parseInt(item) === parseInt(it.article_id)) {
          total += it.rate;
        } else {
          console.log(item, it.article_id);
        }
      });
    });
    setTotalPrice(total);
  };
  const handleDeleteOrder = async (article_id) => {
    // console.log(article_id);
    const data = {
      party_id: party_id,
      article_id: article_id,
    };
    try {
      await deletecartitem(data);
      const updatedcartitems = orderItems.filter(
        (item) => item.article_id !== article_id
      );
      setOrderItems(updatedcartitems);
      console.log("Done");
    } catch (error) {
      console.log("Erro deleting article:", error);
    }
  };
  const handleEditOrder = (article_id) => {
    const id = article_id;
    navigation.navigate("DetailsOfArticals", { id });
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
      for (let i = 0; i < stringNumbers.length; i++) {
        const e = stringNumbers[i];

        if (
          parseInt(e) < parseInt(item.Quantity) &&
          it.ArticleId === item.article_id
        ) {
          outOfStock = true;
          break; // Exit the loop
        }
      }
      if (outOfStock) {
        return (
          // <View style={{width:"100%"}}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 500,
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
              fontSize: 14,
              fontWeight: 400,
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

    // Return null if the item is not out of stock
    // return null;
  };

  return (
    <>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : orderItems.length === 0 ? (
        <View
          style={{
            width: "100%",
            height: "100%",
            paddingTop: 50,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 40,
              fontWeight: "bolder",
              top: 200,
              textAlign: "center",
              fontWeight: 700,
              color: "#808080",
            }}
          >
            Your Cart is {"\n"} Empty
          </Text>
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
            <Text style={{ color: "white" }}>Create Order</Text>
          </TouchableOpacity>
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
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "#FFF",
                borderTopColor: "#828282",
                borderTopWidth: 1,
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
                    <ScrollView
                      nestedScrollEnabled={true}
                      style={{
                        backgroundColor: "#FFF",
                        height: "auto",
                        maxHeight: 450,
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
                          {orderItems.map((item) =>
                            array_1.length > 0 ? (
                              array_1.includes(item.article_id) ? (
                                // id === item.article_id ?
                                <View
                                  key={item.id}
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    width: "95%",
                                    backgroundColor: "#FFF",
                                    elevation: 10,
                                    shadowColor: "gray",
                                    marginHorizontal: 9.5,
                                    marginTop: 15,
                                    borderRadius: 12,
                                    height: 150,
                                    paddingVertical: 5,
                                    // maxHeight: "45%"
                                  }}
                                >
                                  <View
                                    style={{
                                      width: "35%",
                                      // width: 120,
                                      // height: 102.746,
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      marginLeft: 2,
                                      marginVertical: 10,
                                      borderRadius: 10,
                                    }}
                                  >
                                    <Image
                                      style={{
                                        height: "100%",
                                        width: "68%",
                                        borderRadius: 10,
                                      }}
                                      resizeMode="cover"
                                      source={{
                                        uri:
                                          baseImageUrl +
                                          item.Photos.split(",")[0],
                                      }}
                                    ></Image>
                                  </View>
                                  <View
                                    style={{
                                      width: "35%",
                                      marginHorizontal: 4,
                                      marginVertical: 10,
                                      borderRadius: 10,
                                    }}
                                  >
                                    <View style={{ height: "50%" }}>
                                      <Text
                                        style={{
                                          fontSize: 18,
                                          fontWeight: 700,
                                          color: "#000",
                                        }}
                                      >
                                        {item.ArticleNumber}
                                      </Text>
                                      <Text
                                        style={{
                                          fontSize: 14,
                                          fontWeight: 400,
                                          color: "#000",
                                        }}
                                      >
                                        {item.StyleDescription}
                                      </Text>
                                    </View>
                                    <View
                                      style={{
                                        marginTop: "10%",
                                        position: "relative",
                                        height: "50%",
                                      }}
                                    >
                                      <Text
                                        style={{
                                          fontSize: 14,
                                          fontWeight: 400,
                                          color: "#000",
                                        }}
                                      >
                                        Rate
                                      </Text>
                                      <Text
                                        style={{
                                          fontSize: 17,
                                          fontWeight: 700,
                                          color: "#000",
                                        }}
                                      >
                                        ₹{item.rate}.00
                                      </Text>
                                      {/* {compreInward ? compreInward.map((it) => (
                                                                        checkOutOfStock(it, item)
                                                                        // console.log(it.SalesNoPacks)
                                                                    )) : ""} */}
                                    </View>
                                  </View>
                                  <View
                                    style={{
                                      width: "25%",
                                      display: "flex",
                                      flexDirection: "column",
                                      height: "90%",
                                    }}
                                  >
                                    <View
                                      style={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "flex-end",
                                        gap: 8,
                                        paddingRight: 5,
                                        marginVertical: 10,
                                        borderRadius: 10,
                                      }}
                                    >
                                      <TouchableOpacity
                                        onPress={() =>
                                          handleEditOrder(item.article_id)
                                        }
                                      >
                                        <Image
                                          alt="edite"
                                          style={{
                                            width: 20,
                                            height: 20,
                                            backgroundColor: "green",
                                          }}
                                          source={require("../../../assets/edite1.png")}
                                        ></Image>
                                      </TouchableOpacity>
                                      <TouchableOpacity
                                        onPress={() =>
                                          handleDeleteOrder(item.article_id)
                                        }
                                      >
                                        <Image
                                          alt="Delete"
                                          style={{
                                            width: 20,
                                            height: 20,
                                            backgroundColor: "black",
                                          }}
                                          source={require("../../../assets/delete1.png")}
                                        ></Image>
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
                                    width: "95%",
                                    backgroundColor: "#FFF",
                                    elevation: 10,
                                    shadowColor: "gray",
                                    marginHorizontal: 9.5,
                                    marginTop: 15,
                                    borderRadius: 12,
                                    height: 150,
                                    paddingVertical: 5,

                                    // maxHeight: "45%"
                                  }}
                                >
                                  <View
                                    style={{
                                      width: "35%",
                                      opacity: 0.4,
                                      // width: 120,
                                      // height: 102.746,
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      marginLeft: 2,
                                      marginVertical: 10,
                                      borderRadius: 10,
                                    }}
                                  >
                                    <Image
                                      style={{
                                        height: "100%",
                                        width: "68%",
                                        borderRadius: 10,
                                        filter: "blur(20)",
                                      }}
                                      resizeMode="cover"
                                      source={{
                                        uri:
                                          baseImageUrl +
                                          item.Photos.split(",")[0],
                                      }}
                                    ></Image>
                                  </View>
                                  <View
                                    style={{
                                      width: "35%",
                                      marginHorizontal: 4,
                                      marginVertical: 10,
                                      borderRadius: 10,
                                    }}
                                  >
                                    <View style={{ height: "50%" }}>
                                      <Text
                                        style={{
                                          fontSize: 18,
                                          fontWeight: 700,
                                          color: "#00000040",
                                        }}
                                      >
                                        {item.ArticleNumber}
                                      </Text>
                                      <Text
                                        style={{
                                          fontSize: 14,
                                          fontWeight: 400,
                                          color: "#00000040",
                                        }}
                                      >
                                        {item.StyleDescription}
                                      </Text>
                                    </View>
                                    <View
                                      style={{
                                        marginTop: "10%",
                                        position: "relative",
                                        height: "50%",
                                      }}
                                    >
                                      <Text
                                        style={{
                                          fontSize: 14,
                                          fontWeight: 400,
                                          color: "#00000040",
                                        }}
                                      >
                                        Rate
                                      </Text>
                                      <Text
                                        style={{
                                          fontSize: 17,
                                          fontWeight: 700,
                                          color: "#00000040",
                                        }}
                                      >
                                        ₹{item.rate}.00
                                      </Text>
                                      {/* {compreInward ? compreInward.map((it) => (
                                                                            checkOutOfStock(it, item)
                                                                            // console.log(it.SalesNoPacks)
                                                                        )) : ""} */}
                                    </View>
                                  </View>
                                  <View
                                    style={{
                                      width: "25%",
                                      display: "flex",
                                      flexDirection: "column",
                                      height: "90%",
                                    }}
                                  >
                                    <View
                                      style={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "flex-end",
                                        gap: 8,
                                        paddingRight: 5,
                                        marginVertical: 10,
                                        borderRadius: 10,
                                      }}
                                    >
                                      <TouchableOpacity
                                        onPress={() =>
                                          handleEditOrder(item.article_id)
                                        }
                                      >
                                        <Image
                                          alt="edite"
                                          style={{
                                            width: 20,
                                            height: 20,
                                            backgroundColor: "green",
                                          }}
                                          source={require("../../../assets/edite1.png")}
                                        ></Image>
                                      </TouchableOpacity>
                                      <TouchableOpacity
                                        onPress={() =>
                                          handleDeleteOrder(item.article_id)
                                        }
                                      >
                                        <Image
                                          alt="Delete"
                                          style={{
                                            width: 20,
                                            height: 20,
                                            backgroundColor: "black",
                                          }}
                                          source={require("../../../assets/delete1.png")}
                                        ></Image>
                                      </TouchableOpacity>
                                    </View>
                                    <View
                                      style={{
                                        width: "100%",
                                        position: "absolute",
                                        bottom: 0,
                                        paddingRight: 5,
                                      }}
                                    >
                                      {compreInward
                                        ? compreInward.map(
                                            (it) => checkOutOfStock(it, item)
                                            // console.log(it.SalesNoPacks)
                                          )
                                        : ""}
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
                                  width: "95%",
                                  backgroundColor: "#FFF",
                                  elevation: 10,
                                  shadowColor: "gray",
                                  marginHorizontal: 9.5,
                                  marginTop: 15,
                                  borderRadius: 12,
                                  height: 150,
                                  paddingVertical: 5,
                                  // maxHeight: "45%"
                                }}
                              >
                                <View
                                  style={{
                                    width: "35%",
                                    // width: 120,
                                    // height: 102.746,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginLeft: 2,
                                    marginVertical: 10,
                                    borderRadius: 10,
                                  }}
                                >
                                  <Image
                                    blurRadius={6}
                                    style={{
                                      height: "100%",
                                      width: "68%",
                                      borderRadius: 10,
                                      filter: "blur(20)",
                                    }}
                                    resizeMode="cover"
                                    source={{
                                      uri:
                                        baseImageUrl +
                                        item.Photos.split(",")[0],
                                    }}
                                  ></Image>
                                </View>
                                <View
                                  style={{
                                    width: "35%",
                                    marginHorizontal: 4,
                                    marginVertical: 10,
                                    borderRadius: 10,
                                  }}
                                >
                                  <View style={{ height: "50%" }}>
                                    <Text
                                      style={{
                                        fontSize: 18,
                                        fontWeight: 700,
                                        color: "#00000040",
                                      }}
                                    >
                                      {item.ArticleNumber}
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: 14,
                                        fontWeight: 400,
                                        color: "#00000040",
                                      }}
                                    >
                                      {item.StyleDescription}
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      marginTop: "10%",
                                      position: "relative",
                                      height: "50%",
                                    }}
                                  >
                                    <Text
                                      style={{
                                        fontSize: 14,
                                        fontWeight: 400,
                                        color: "#00000040",
                                      }}
                                    >
                                      Rate
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: 17,
                                        fontWeight: 700,
                                        color: "#00000040",
                                      }}
                                    >
                                      ₹{item.rate}.00
                                    </Text>
                                    {/* {compreInward ? compreInward.map((it) => (
                                                                            checkOutOfStock(it, item)
                                                                            // console.log(it.SalesNoPacks)
                                                                        )) : ""} */}
                                  </View>
                                </View>
                                <View
                                  style={{
                                    width: "25%",
                                    display: "flex",
                                    flexDirection: "column",
                                    height: "90%",
                                  }}
                                >
                                  <View
                                    style={{
                                      width: "100%",
                                      display: "flex",
                                      flexDirection: "row",
                                      justifyContent: "flex-end",
                                      gap: 8,
                                      paddingRight: 5,
                                      marginVertical: 10,
                                      borderRadius: 10,
                                    }}
                                  >
                                    <TouchableOpacity
                                      onPress={() =>
                                        handleEditOrder(item.article_id)
                                      }
                                    >
                                      <Image
                                        alt="edite"
                                        style={{
                                          width: 20,
                                          height: 20,
                                          backgroundColor: "green",
                                        }}
                                        source={require("../../../assets/edite1.png")}
                                      ></Image>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                      onPress={() =>
                                        handleDeleteOrder(item.article_id)
                                      }
                                    >
                                      <Image
                                        alt="Delete"
                                        style={{
                                          width: 20,
                                          height: 20,
                                          backgroundColor: "black",
                                        }}
                                        source={require("../../../assets/delete1.png")}
                                      ></Image>
                                    </TouchableOpacity>
                                  </View>
                                  <View
                                    style={{
                                      width: "100%",
                                      position: "absolute",
                                      bottom: 0,
                                      paddingRight: 5,
                                    }}
                                  >
                                    {compreInward
                                      ? compreInward.map(
                                          (it) => checkOutOfStock(it, item)
                                          // console.log(it.SalesNoPacks)
                                        )
                                      : ""}
                                  </View>
                                </View>
                              </View>
                            )
                          )}
                        </View>
                      </View>
                    </ScrollView>
                  </View>
                </ScrollView>
                <View>
                  <View
                    nestedScrollEnabled={true}
                    style={{ width: "100%", backgroundColor: "#FFF" }}
                  >
                    <View style={{ padding: 10 }}>
                      <TextInput
                        value={promoCode}
                        onChange={handlePromoCodeChange}
                        style={{
                          width: "100%",
                          height: 56,
                          borderWidth: 1,
                          paddingVertical: 18,
                          paddingLeft: 15,
                          borderRadius: 10,
                          fontSize: 18,
                          backgroundColor: "#EEE",
                          borderColor: "#E4E7EA",
                        }}
                        keyboardType="default"
                        placeholder="Promo Code"
                      ></TextInput>
                      <Pressable
                        onPress={handleApplyPromoCode}
                        style={{
                          width: "100%",
                          position: "absolute",
                          top: "30.5%",
                          left: "74%",
                          right: 0,
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            backgroundColor: "#212121",
                            borderRadius: 7.6,
                            width: 100,
                            paddingHorizontal: 18,
                            paddingVertical: 9,
                            fontSize: 18,
                            fontWeight: 600,
                            textAlign: "center",
                          }}
                        >
                          Apply
                        </Text>
                      </Pressable>
                    </View>

                    {/* </View> */}
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
                  <Pressable
                    onPress={handleAddMoreItems}
                    style={{ marginRight: 10 }}
                  >
                    <Text
                      style={{
                        color: "white",
                        backgroundColor: "#212121",
                        borderRadius: 7.6,
                        width: 150,
                        paddingHorizontal: 22,
                        paddingVertical: 9,
                        fontSize: 18,
                        fontWeight: 600,
                        textAlign: "center",
                      }}
                    >
                      Add More
                    </Text>
                  </Pressable>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 5,
                    width: "100%",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    paddingRight: 12,
                    marginTop: 6,
                  }}
                >
                  <Text
                    style={{ fontSize: 12, fontWeight: 700, color: "#AAAAAA" }}
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
                        fontSize: 18,
                        fontWeight: 600,
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
                      paddingRight: 12,
                      // paddingLeft: "14%"
                    }}
                  >
                    <Text
                      style={{ fontSize: 18, fontWeight: 800, color: "#000" }}
                    >
                      ₹{totalprice}.00
                    </Text>
                  </View>
                </View>
                <View style={{ padding: 10 }}>
                  <Pressable
                    disabled={totalPrice != 0 ? false : true}
                    style={{ width: "100%" }}
                    onPress={handleProceedToCheckout}
                  >
                    <Text
                      style={{
                        color: "white",
                        backgroundColor:
                          totalPrice != 0 ? "#212121" : "#212121B2",
                        borderRadius: 10,
                        paddingHorizontal: 20,
                        paddingVertical: 15,
                        fontSize: 18,
                        fontWeight: 600,
                        textAlign: "left",
                      }}
                    >
                      Proceed to Checkout
                    </Text>
                    <Image
                      style={{
                        width: 30,
                        height: 30,
                        position: "absolute",
                        top: "20%",
                        left: "89%",
                        right: 0,
                      }}
                      source={require("../../../assets/arrow(1).png")}
                    ></Image>
                  </Pressable>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </>
  );
};

export default AddToCart;
