import { useLayoutEffect, useState, useEffect } from "react";
import MenuBackArrow from "../../components/menubackarrow/menubackarrow";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Pressable,
  Modal,
  Platform,
  StyleSheet,
  RefreshControl
} from "react-native";
import { addso, gettransportation } from "../../api/api";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const baseImageUrl =
  "https://webportalstaging.colorhunt.in/colorHuntApiStaging/public/uploads/";
import { TouchableWithoutFeedback } from "react-native";
import * as Font from "expo-font";
import Svg, { G, Path } from 'react-native-svg';
import Loader from "../../components/Loader/Loader"
import Ordersuccessful from "../../jssvgs/Ordersucseccful";
const Orderlist = (props) => {
  const { navigation } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [destinationVal, setDestinationVal] = useState("");
  const [showTransporatation, setshowTransporatation] = useState(false);
  const [transportationVal, setTransportationVal] = useState();
  const [fillvalue, setValue] = useState(false);
  const [userdata, setUserdata] = useState("");
  const baseImageUrl =
    "https://webportalstaging.colorhunt.in/colorHuntApiStaging/public/uploads/";

  // const OldTransportation = ["T-shirte", "Black_shirte", "white_shirte", "Blue_shirte", "Green_shirte"]
  const [Transportation, setTransportation] = useState([]);
  const [OldTransportation, setOldTransportation] = useState([]);
  const [ParsedData, setParsedData] = useState([]);
  const currentDate = new Date();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const windowwidthe = parseInt(Dimensions.get("window").width);
  const windowheight = parseInt(Dimensions.get("window").height);
  const { width, height } = Dimensions.get("window");
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isfailed, setisFailed] = useState("");


  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);

    // Add any logic here that you want to execute when the user triggers a refresh.
    // For example, you can reload data or perform any other action.

    // Simulate a delay to hide the loading indicator after 3 seconds (adjust as needed)
   // 3 seconds

   
      setIsLoading(false);
      setRefreshing(false);
    
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

    loadCustomFont();
  }, []);

  const getpartydata = async () => {
    let data = await AsyncStorage.getItem("UserData");
    data = await JSON.parse(data);
    setUserdata(data);
  };
  useEffect(() => {
    getpartydata();
  }, []);
  const headerHeight =
    Platform.OS === "android"
      ? width >= 720
        ? 110
        : 80
      : height >= 844
        ? 110
        : 65;
  const AddSo = async () => {
    setIsLoading2(true);
    let userdata = await AsyncStorage.getItem("UserData");
    userdata = await JSON.parse(userdata);
    let Articldata = ParsedData.map(
      ({
        article_id,
        articleRate,
        ArticleColor,
        ArticleOpenFlag,
        Quantity,
      }) => ({
        article_id,
        articleRate,
        ArticleColor,
        ArticleOpenFlag,
        Quantity,
      })
    );
    const data = {
      Date: currentDate,
      Destination: destinationVal,
      Transporter: transportationVal,
      GSTType: userdata[0].GSTNumber ? userdata[0].GSTType : "null",
      GST: "",
      GST_Percentage: userdata[0].GSTNumber ? "5" : "",
      PartyId: userdata[0].Id,
      Remarks: "",
      SoNumberId: "Add",
      UserId: userdata[0].UserId,
      DataArticle: Articldata,
      NoPacksNew: null,
    };
    console.log("-=-=-=-", data);
    await addso(data).then((res) => {
      if (res.status === 200) {
        setIsLoading2(false);
        setRefreshing(false)
        setIsSuccess(true);
      } else {
        setisFailed(true);
      }
    });
  };
  const showSuccessModal = () => {
    if (!fillvalue) {
      setIsModalVisible(true);
      if (destinationVal) {
        AddSo();
      } else {
        setValue(true);
      }
    }
  };
  // let ParsedData = [];
  const formattedDate = `${currentDate.getMonth() + 1
    }/${currentDate.getDate()}/${currentDate.getFullYear()}`;
  AsyncStorage.getItem("Orderlist")
    .then((Storagedata) => {
      if (Storagedata !== null) {
        setParsedData(JSON.parse(Storagedata));
      } else {
        console.log("No data found");
      }
    })
    .catch((error) => {
      console.error("Error retrieving data:", error);
    });

  const GetTransportation = async () => {
    await gettransportation()
      .then((response) => {
        setTransportation(response.data);
        setTransportationVal(response.data[0].Name);
        setOldTransportation(response.data);
        setIsLoading(false);
        setRefreshing(false)
      })
      .catch((error) => {
        console.error("Error fetching transportation data:", error);
      });
  };
  useEffect(() => {
    GetTransportation();
    // setIsLoading(false);
  }, []);
  let totalrate = "";
  let gstamount = "";
  if (ParsedData) {
    totalrate = ParsedData.reduce(
      (total, item) => total + parseInt(item.rate),
      0
    );
    gstamount =
      ParsedData.reduce((total, item) => total + parseInt(item.rate), 0) * 0.05;
  } else {
    console.log(ParsedData);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <MenuBackArrow
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerTitle: () => (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: parseInt(windowwidthe) >= 720 ? "100%" : "100%",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: windowwidthe * 0.05,
              fontFamily: isFontLoaded ? "Glory" : undefined,
              fontWeight: "700",
              width: "100%",
            }}
          >
            Sales Order
          </Text>
        </View>
      ),
      headerRight: () => (
        // <View style={{ marginRight: 20, width: 50, height: 40, display: "flex", justifyContent: "center", alignItems: "center" }}>
        //     <TouchableOpacity  onPress={handleGoToOrderList}>
        //     <Image  source={require('../../../assets/sidebaricons/icon.png')} style={{ width: 28, height: 28, borderRadius: 5, backgroundColor: "black" }} ></Image>
        //     </TouchableOpacity>
        <View />
      ),
      headerStyle: {
        height: headerHeight, // Increase the header height here
        elevation: 0, // Remove the shadow on Android
        shadowOpacity: 0, // Remove the shadow on iOS
      },
    });
  }, []);

  const filterTransportationValue = (e) => {
    setTransportationVal(e);
    console.log(e);
    setshowTransporatation(true);
    if (e !== "") {
      let filterVal = Transportation.filter((item) =>
        item.Name.toLocaleLowerCase().includes(e.toLocaleLowerCase())
      );
      console.log(filterVal);
      setTransportation(filterVal);
    } else {
      setTransportation(OldTransportation);
      setshowTransporatation(false);
    }
  };

  const handlePressIn = (item) => {
    setHoveredItem(item.Id);
  };

  const handlePressOut = () => {
    setHoveredItem(null);
  };
  return (
    <>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor:'#FFF'
          }}
        >
           <Loader/>
        </View>
      ) : (
        <View
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "white",
          }}
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
                height: "100%",
                width: "100%",
                marginTop: 20,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  height: "auto",
                  backgroundColor: "#FFF",
                }}
              >
                <View
                  style={{
                    paddingHorizontal: "5%",
                    paddingVertical: "1%",
                    gap: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: windowwidthe < 720 ? windowwidthe * 0.045 : 24,
                      fontWeight: "500",
                      fontFamily: isFontLoaded ? "Glory" : undefined,
                      color: "#000",
                    }}
                  >
                    Date
                  </Text>
                  <View
                    style={{
                      width: "100%",
                      borderWidth: 1,
                      paddingVertical: "2.5%",
                      paddingLeft: "3%",
                      borderRadius: 6,
                      borderColor: "#E4E7EA",
                      backgroundColor: "#EEE",
                    }}
                  // value={formattedDate}
                  // disableFullscreenUI
                  >
                    <Text
                      style={{
                        color: "#626262",
                        fontFamily: isFontLoaded ? "Glory" : undefined,
                        fontSize:
                          windowwidthe < 720 ? windowwidthe * 0.045 : 26,
                        fontWeight: "500",
                      }}
                    >
                      {new Date(currentDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    paddingHorizontal: "5%",
                    paddingTop: "2.8%",
                    gap: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: windowwidthe < 720 ? windowwidthe * 0.045 : 24,
                      fontWeight: "500",
                      fontFamily: isFontLoaded ? "Glory" : undefined,
                      color: "#000",
                    }}
                  >
                    Destination
                  </Text>
                  <TextInput
                    value={destinationVal}
                    style={{
                      width: "100%",
                      borderWidth: 1,
                      paddingVertical: "2%",
                      paddingLeft: "3%",
                      borderRadius: 6,
                      borderColor: "#E4E7EA",
                      fontSize: windowwidthe < 720 ? windowwidthe * 0.045 : 26,
                      backgroundColor: "#EEE",
                      fontFamily: isFontLoaded ? "Glory" : undefined,
                    }}
                    onChangeText={(e) => {
                      setDestinationVal(e);
                      e ? setValue(false) : setValue(true);
                    }}
                  ></TextInput>
                  <View>
                    <Text
                      style={{
                        fontSize: windowwidthe * 0.03,
                        color: "red",
                        fontFamily: isFontLoaded ? "Glory" : undefined,
                        fontWeight: "500",
                      }}
                    >
                      {fillvalue ? "Filed cannot be empty" : ""}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    paddingHorizontal: "5%",
                    paddingBottom: "3%",
                    paddingTop: 2,
                    gap: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: windowwidthe < 720 ? windowwidthe * 0.045 : 24,
                      fontWeight: "500",
                      fontFamily: isFontLoaded ? "Glory" : undefined,
                      color: "#000",
                    }}
                  >
                    Transportation
                  </Text>

                  <View
                    style={{
                      width: "100%",
                      borderWidth: 1,
                      paddingVertical: "2.5%",
                      paddingLeft: "3%",
                      borderRadius: 6,

                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                      borderColor: "#E4E7EA",
                      backgroundColor: "#EEE",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        color: "#626262",
                        fontSize:
                          windowwidthe < 720 ? windowwidthe * 0.045 : 26,
                        fontWeight: "500",
                        fontFamily: isFontLoaded ? "Glory" : undefined,
                      }}
                    >
                      {transportationVal.toUpperCase()}
                    </Text>
                    <View
                      style={{
                        position: "absolute",
                        top: width >= 720 ? "52%" : "52%",
                        right: "1%",
                        justifyContent: "center",
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          width: width >= 720 ? 50 : 30,
                          height: width >= 720 ? 50 : 30
                        }}
                        onPress={() => {
                          Transportation.length !== 0
                            ? setshowTransporatation(!showTransporatation)
                            : "";
                        }}
                      >
                        {/* <Image
                          style={{
                            width: "100%",
                            height: "100%",
                            resizeMode: "contain",
                          }}
                          source={require("../../../assets/DownArrow(1).png")}
                        ></Image> */}
                        <Svg width="100%" height="100%" viewBox="0 0 30 30" fill="none">
                          <G id="download_2">
                            <Path
                              id="Vector"
                              d="M16.3603 7.18008L10.4603 13.7201C10.2203 14.0001 9.78034 14.0001 9.54034 13.7201L3.64034 7.18008C3.26034 6.76008 3.54034 6.08008 4.10034 6.08008H15.9003C16.4603 6.08008 16.7403 6.76008 16.3603 7.18008Z"
                              fill="#1A1A1A"
                            />
                          </G>
                        </Svg>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                {showTransporatation && Transportation.length !== 0 && (
                  <ScrollView
                    style={{
                      // height: "auto",
                      maxHeight: "50%",
                      borderWidth: 1,
                      backgroundColor: "#EEEEEE",
                      marginHorizontal: "5%",
                      borderRadius: 6,
                      borderColor: "#E4E7EA",
                      paddingHorizontal: "2.5%",
                      paddingBottom: "4.5%",
                      width: "90%",
                      position: "relative",
                      borderTopLeftRadius: 0,
                      borderTopRightRadius: 0,
                      bottom: 14,
                    }}
                    nestedScrollEnabled={true}
                  >
                    <View>
                      {Transportation.map((item) => (
                        <TouchableOpacity
                          key={item.Id}
                          onPress={() => {
                            setTransportationVal(item.Name);
                            setshowTransporatation(!showTransporatation);
                          }}
                        // onPressIn={() => handlePressIn(item)}
                        // onPressOut={handlePressOut}
                        >
                          <View
                            style={[
                              styles.item,
                              {
                                backgroundColor:
                                  hoveredItem === item.Id
                                    ? "black"
                                    : "transparent",
                              },
                            ]}
                          >
                            <Text
                              style={[
                                {
                                  fontSize:
                                    windowwidthe < 720
                                      ? windowwidthe * 0.045
                                      : 26,
                                  color:
                                    hoveredItem === item.Id
                                      ? "#fff"
                                      : "#626262",
                                  fontWeight: "500",
                                },
                              ]}
                            >
                              {item.Name.toUpperCase()}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </ScrollView>
                )}
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  maxHeight: "30%",
                  width: "100%",
                }}
              >
                <ScrollView nestedScrollEnabled={true}>
                  {ParsedData &&
                    ParsedData.map((item, index) => (
                      <View key={item.id}>
                        <View
                          style={{
                            flexDirection: "row",
                            width: "90%",
                            backgroundColor: "#FFF",
                            padding: "3%",
                            height: width >= 720 ? 200 : 100,
                            marginHorizontal: "5%",
                            marginVertical: width >= 720 ? 20 : 10,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: "rgba(0,0,0,0.2)",
                          }}
                        >
                          <TouchableOpacity
                            style={{
                              // backgroundColor: "pink",
                              // width: windowwidthe * 0.3,
                              // shadowOpacity: 1,
                              // shadowOffset: {
                              //   width: 1,
                              //   height: 1,
                              // },
                              width: width >= 720 ? 130 : "20%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: 10,
                              borderWidth: 1,
                              borderColor: "rgba(0,0,0,0.2)",
                            }}
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
                                uri: baseImageUrl + item.Photos.split(",")[0],
                              }}
                            ></Image>
                          </TouchableOpacity>
                          <View
                            style={{
                              width: "60%",
                              marginHorizontal: "3%",
                              marginBottom: "1%",
                              justifyContent: "center",
                              paddingTop: 10,
                              borderRadius: 10,
                            }}
                          >
                            <View style={{ paddingBottom: 1 }}>
                              <Text
                                style={{
                                  fontSize: width >= 720 ? 30 : 18,
                                  fontFamily: isFontLoaded
                                    ? "Glory"
                                    : undefined,
                                  fontWeight: "700",
                                }}
                              >
                                {item.ArticleNumber}
                              </Text>
                              <Text
                                style={{
                                  fontSize: width >= 720 ? 30 : 18,
                                  fontFamily: isFontLoaded
                                    ? "Glory"
                                    : undefined,
                                  fontWeight: "400",
                                }}
                              >
                                {item.StyleDescription}
                              </Text>
                            </View>
                            <View
                              style={{
                                marginTop: "2%",
                                justifyContent: "center",
                                paddingTop: "3%",
                                position: "relative",
                                height: "50%",
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: width >= 720 ? 30 : 18,
                                  fontFamily: isFontLoaded
                                    ? "Glory"
                                    : undefined,
                                  fontWeight: "700",
                                }}
                              >
                                ₹{item.rate}.00
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    ))}
                </ScrollView>
              </View>
            </View>
            <Modal
              visible={isModalVisible}
              transparent={true}
              animationType="slide"
              onRequestClose={() => setIsModalVisible(false)}
            >
              {isLoading2 && (
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
                      height: 390,
                      backgroundColor: "white",
                      borderRadius: 25,
                      justifyContent: "center",
                      alignItems: "center",
                      alignContent:"center",
                      padding: 5,
                    }}
                  >
                     <Loader/>
                  </View>
                </View>
              )}
              {isSuccess && (
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
                        height: 390,
                        backgroundColor: "white",
                        borderRadius: 25,
                        alignItems: "center",
                        padding: 5,
                      }}
                    >

                      <Ordersuccessful />

                      <Text
                        style={{
                          fontSize: 32,
                          fontFamily: isFontLoaded ? "Glory" : undefined,
                          fontWeight: "700",
                          marginBottom: 10,
                        }}
                      >
                        Successful!
                      </Text>

                      <Text
                        style={{
                          fontSize: 24,
                          fontFamily: isFontLoaded ? "Glory" : undefined,
                          textAlign: "center",
                          marginBottom: 20,
                          fontWeight: "500",
                          color: "rgba(0, 0, 0, 0.70)",
                        }}
                      >
                        "Your Order Is {"\n"} Confirmed Successfully"
                      </Text>

                      <TouchableOpacity
                        onPress={() => {
                          setIsModalVisible(false);
                          navigation.navigate("Home");
                        }}
                        style={{
                          backgroundColor: "black",
                          width: 189,
                          height: 50,
                          borderRadius: 10,
                          justifyContent: "center",
                          alignItems: "center",
                          marginVertical: 20,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 18,
                            fontFamily: isFontLoaded ? "Glory" : undefined,
                            fontWeight: "700",
                            color: "white",
                            paddingHorizontal: 15,
                          }}
                        >
                          Continue Shopping
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              )}
              {isfailed && (
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
                        height: 390,
                        backgroundColor: "white",
                        borderRadius: 25,
                        alignItems: "center",
                        padding: 5,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 32,
                          fontFamily: isFontLoaded ? "Glory" : undefined,
                          fontWeight: "700",
                          marginBottom: 10,
                          marginTop: 50,
                        }}
                      >
                        Failed
                      </Text>

                      <Text
                        style={{
                          fontSize: 24,
                          fontFamily: isFontLoaded ? "Glory" : undefined,
                          textAlign: "center",
                          marginBottom: 20,
                          fontWeight: "500",
                          color: "rgba(0, 0, 0, 0.70)",
                        }}
                      >
                        "Your Order Is {"\n"} Failed to Place.{"\n"} Please Try
                        Again Later"
                      </Text>

                      <TouchableOpacity
                        onPress={() => {
                          setIsModalVisible(false);
                          navigation.navigate("Home");
                        }}
                        style={{
                          backgroundColor: "black",
                          width: 189,
                          height: 50,
                          borderRadius: 10,
                          justifyContent: "center",
                          alignItems: "center",
                          marginVertical: 20,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 18,
                            fontFamily: isFontLoaded ? "Glory" : undefined,
                            fontWeight: "700",
                            color: "white",
                            paddingHorizontal: 15,
                          }}
                        >
                          Continue Shopping
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              )}
            </Modal>
          </ScrollView>
          <View
            style={{
              // height:"auto",
              backgroundColor: "#FFF",
              position: "absolute",
              bottom: 0,
              paddingHorizontal: "2.5%",
            }}
          >
            <View
              style={{
                width: "100%",
                // height:"100%",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  width: "100%",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    paddingVertical: "1.0%",
                    width: "100%",
                  }}
                >
                  <View
                    style={{ width: "76%", paddingTop: 2, paddingRight: "2%" }}
                  >
                    <Text
                      style={{
                        fontSize: width >= 720 ? 22 : 12,
                        fontFamily: isFontLoaded ? "Glory" : undefined,
                        fontWeight: "400",
                        color: "#00000080",
                        textAlign: "right",
                      }}
                    >
                      Rate
                    </Text>
                  </View>
                  <View style={{ width: "24%" }}>
                    <Text
                      style={{
                        fontSize: width >= 720 ? 22 : 12,
                        fontFamily: isFontLoaded ? "Glory" : undefined,
                        fontWeight: "500",
                        color: "#00000080",
                        textAlign: "right",
                      }}
                    >
                      ₹{totalrate}.00
                    </Text>
                  </View>
                </View>
                {userdata !== "" ? (
                  userdata[0].GSTNumber && userdata[0].GSTType === "GST" ? (
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        paddingVertical: "1.0%",
                        width: "100%",
                      }}
                    >
                      <View style={{ width: "76%", paddingTop: 2 }}>
                        <Text
                          style={{
                            fontSize: width >= 720 ? 22 : 12,
                            fontFamily: isFontLoaded ? "Glory" : undefined,
                            fontWeight: "400",
                            color: "#00000080",
                            textAlign: "right",
                          }}
                        >
                          GST {userdata[0].GSTNumber ? "5%" : "0.0%"}
                        </Text>
                      </View>
                      <View style={{ width: "24%" }}>
                        <Text
                          style={{
                            fontSize: width >= 720 ? 22 : 12,
                            fontFamily: isFontLoaded ? "Glory" : undefined,
                            fontWeight: "500",
                            color: "#00000080",
                            textAlign: "right",
                          }}
                        >
                          ₹{parseInt(totalrate * 0.05)}.00
                        </Text>
                      </View>
                    </View>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
                {userdata !== "" ? (
                  userdata[0].GSTType === "IGST" &&
                    userdata[0].GSTNumber !== "" ? (
                    <>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          paddingVertical: "1.0%",
                          width: "100%",
                        }}
                      >
                        <View style={{ width: "76%", paddingTop: 2 }}>
                          <Text
                            style={{
                              fontSize: width >= 720 ? 22 : 12,
                              fontFamily: isFontLoaded ? "Glory" : undefined,
                              fontWeight: "400",
                              color: "#00000080",
                              textAlign: "right",
                            }}
                          >
                            SGST {userdata[0].GSTNumber ? "2.5%" : "0.0%"}
                          </Text>
                        </View>
                        <View style={{ width: "24%" }}>
                          <Text
                            style={{
                              fontSize: width >= 720 ? 22 : 12,
                              fontFamily: isFontLoaded ? "Glory" : undefined,
                              fontWeight: "500",
                              color: "#00000080",
                              textAlign: "right",
                            }}
                          >
                            ₹{parseInt(totalrate * 0.025)}.00
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          paddingVertical: "1.0%",
                          width: "100%",
                        }}
                      >
                        <View style={{ width: "76%", paddingTop: 2 }}>
                          <Text
                            style={{
                              fontSize: width >= 720 ? 22 : 12,
                              fontFamily: isFontLoaded ? "Glory" : undefined,
                              fontWeight: "400",
                              color: "#00000080",
                              textAlign: "right",
                            }}
                          >
                            CGST {userdata[0].GSTNumber ? "2.5%" : "0.0%"}
                          </Text>
                        </View>
                        <View style={{ width: "24%" }}>
                          <Text
                            style={{
                              fontSize: width >= 720 ? 22 : 12,
                              fontFamily: isFontLoaded ? "Glory" : undefined,
                              fontWeight: "500",
                              color: "#00000080",
                              textAlign: "right",
                            }}
                          >
                            ₹{parseInt(totalrate * 0.025)}.00
                          </Text>
                        </View>
                      </View>
                    </>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
                <View style={{ width: "30%", marginLeft: "70%" }}>
                  <View
                    style={{
                      borderWidth: 0.8,
                      width: "70%",
                      position: "relative",
                      left: 40,
                    }}
                  ></View>
                </View>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                backgroundColor: "#FFF",
                height: "auto",
                flexDirection: "row",
                marginBottom: "5%",
              }}
            >
              <View style={{ width: "50%" }}>
                <Pressable
                  style={{
                    // width: windowwidthe < 720 ? windowwidthe * 0.4:"70%",
                    padding: windowwidthe < 720 ? 12 : 20,
                    // padin
                    marginLeft: "2.5%",
                    backgroundColor: destinationVal == "" ? "gray" : "#212121",
                    borderRadius: 7.6,
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    showSuccessModal();
                  }}
                  disabled={destinationVal == "" ? true : false}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: width >= 720 ? 25 : 15,
                      fontFamily: isFontLoaded ? "Glory" : undefined,
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                  >
                    Place Order
                  </Text>
                </Pressable>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 5,
                  // paddingLeft: 30,
                  justifyContent: "flex-end",
                  // paddingTop: "2%",
                  width: "50%",
                  alignItems: "flex-end",
                  height: windowheight * 0.06,
                  paddingBottom: 20,
                  backgroundColor: "#FFF",
                }}
              >
                <View style={{ paddingBottom: 2 }}>
                  <Text
                    style={{
                      fontSize: width >= 720 ? 22 : 12,
                      fontFamily: isFontLoaded ? "Glory" : undefined,
                      fontWeight: "500",
                    }}
                  >
                    Total Price
                  </Text>
                </View>
                <View style={{}}>
                  <Text
                    style={{
                      fontSize: width >= 720 ? 22 : 12,
                      fontFamily: isFontLoaded ? "Glory" : undefined,
                      fontWeight: "700",
                    }}
                  >
                    ₹{parseInt(totalrate + gstamount)}.00
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default Orderlist;

const styles = StyleSheet.create({
  item: {
    borderRadius: 6,
    padding: 10,
  },
});
