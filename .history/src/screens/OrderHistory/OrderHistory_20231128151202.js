import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Button,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import MenuBackArrow from "../../components/menubackarrow/menubackarrow";
import { useState, useLayoutEffect, useEffect } from "react";
import { Pressable } from "react-native";
import { StyleSheet, Dimensions, Platform } from "react-native";
import {
  ScrollView,
  TextInput,
  RefreshControl,
} from "react-native-gesture-handler";
import {
  FilterSoNumber,
  FilteroutwardNumber,
  getCompletedSoDetails,
  getsonumber,
} from "../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ButtomNavigation from "../../components/AppFooter/ButtomNavigation";
import { Calendar } from "react-native-calendars";
import { Modal } from "react-native-paper";
import Calendersvg from "../../jssvgs/Calendersvg";
import CompletedOrderHistory from "../../jssvgs/Completedorderhistory";
import PendingSvg from "../../jssvgs/Pendingsvg";
import Loader from "../../components/Loader/Loader";
import { loadCustomFont } from "../../loadCustomFont.js";
const { width, height } = Dimensions.get("window");

const OrderHistory = (props) => {
  const { navigation } = props;
  // const [isLoading, setIsLoading] = useState(true);
  const [toggle, setToggle] = useState(true);
  const [orderstatus, setOrderstatus] = useState(true);
  const [sonumberdata, setSoNumberData] = useState([]);
  const [oldDataOfso, setOldDateOfso] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [isLoadingsodetails, setIsLoadingsodetails] = useState(true);
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("DD/MM/YYYY");
  const [selectedDateIncompleted, setSelectedDateIncompleted] =
    useState("DD/MM/YYYY");
  const [completedsodata, setcompletedsodata] = useState();
  const [olddataofcompleted, setOldDataOfCompleted] = useState([]);
  const [sodatanotfount, setSodatanotfount] = useState(false);
  const [outworddatanotfount, setOutworddatanotfount] = useState(false);

  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [filtercurrentPage, setFiltercurrentPage] = useState(0);
  const [outwardcurrentPage, setOutwardcurrentPage] = useState(0);
  const [filteroutwardcurrentPage, setFilteroutwardcurrentPage] = useState(0);
  const [filterosstatus, setFilterosstatus] = useState(false);
  const [filteroutwardstatus, setFilteroutwardstatus] = useState(false);
  const [handlerstop, sethandlerstop] = useState(false);
  const [handleroutwardstop, sethandleroutwardstop] = useState(false);
  const [Ispendingsoloading, setIspendingsoloading] = useState(false);
  const [Iscompletesoloading, setIscompletesoloading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [outwardfromdate, setOutwardfromdate] = useState(new Date());
  const [outwardtodate, setOutwardtodate] = useState(new Date());
  const [showFromDate, setShowFromDate] = useState(false);
  const [showToDate, setShowToDate] = useState(false);
  const [filteractive, setFilteractive] = useState(false);
  const fonttype = async () => {
    const status = await loadCustomFont();
  };
  useEffect(() => {
    fonttype();
  }, []);
  const onRefresh = () => {
    setSoNumberData([]);
    setOldDateOfso([]);
    setcompletedsodata([]);
    setOldDataOfCompleted([]);
    setRefreshing(true);
    getSonumber();
    getCompleteData();
  };

  const headerHeight =
    Platform.OS === "android"
      ? width >= 720
        ? 110
        : 80
      : height >= 844
      ? 110
      : 65;
  const toggleCalendar = () => {
    setCalendarVisible(!isCalendarVisible);
  };

  const filterOsDataByDate = async () => {
    let userdata = await AsyncStorage.getItem("UserData");
    userdata = await JSON.parse(userdata);
    let fdate = fromDate.toLocaleDateString("en-GB");
    const fdateParts = fdate.split("/");
    const formattedDate = new Date(
      `${fdateParts[2]}-${fdateParts[1]}-${fdateParts[0]}`
    )
      .toISOString()
      .split("T")[0];

    let tdate = toDate.toLocaleDateString("en-GB");
    const tdateParts = tdate.split("/");
    const formattedtoDate = new Date(
      `${tdateParts[2]}-${tdateParts[1]}-${tdateParts[0]}`
    )
      .toISOString()
      .split("T")[0];
    await FilterSoNumber({
      PartyId: userdata[0].Id,
      fromdate: formattedDate,
      todate: formattedtoDate,
    }).then((res) => {
      if (res.status == 200) {
        if (res.data.data.length <= 0) {
          setSodatanotfount(true);
        } else {
          setSoNumberData(res.data.data);
        }
      }
    });
  };
  const filterdataOfcompleted = async () => {
    let userdata = await AsyncStorage.getItem("UserData");
    userdata = await JSON.parse(userdata);

    let fdate = outwardfromdate.toLocaleDateString("en-GB");
    const fdateParts = fdate.split("/");
    const formattedDate = new Date(
      `${fdateParts[2]}-${fdateParts[1]}-${fdateParts[0]}`
    )
      .toISOString()
      .split("T")[0];

    let tdate = outwardtodate.toLocaleDateString("en-GB");
    const tdateParts = tdate.split("/");
    const formattedtoDate = new Date(
      `${tdateParts[2]}-${tdateParts[1]}-${tdateParts[0]}`
    )
      .toISOString()
      .split("T")[0];

    await FilteroutwardNumber({
      PartyId: userdata[0].Id,
      fromdate: formattedDate,
      todate: formattedtoDate,
    }).then((res) => {
      if (res.status == 200) {
        if (res.data.data.length <= 0) {
          setOutworddatanotfount(true);
        } else {
          setcompletedsodata(res.data.data);
        }
      }
    });
  };

  const handleDateSelect = (day) => {
    let date = new Date(day.dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    setSelectedDate(date);
  };
  const handleDateSelectOfCompleted = (day) => {
    let date = new Date(day.dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    setSelectedDateIncompleted(date);
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
            marginLeft: 14,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: width >= 720 ? 35 : 25,
              fontFamily: "GloryBold",
              width: "100%",
            }}
          >
            Orders History
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

  const getSonumber = async () => {
    let data = await AsyncStorage.getItem("UserData");
    data = await JSON.parse(data);

    await getsonumber({ PartyId: data[0].Id }).then((res) => {
      if (res && res.status == 200) {
        // console.log(res.data.hasMore, nextPage, res.data.data.length);
        if (res.data.data.length <= 0) {
          // console.log(res.data.data);
          setSodatanotfount(true);
        } else {
          setSoNumberData(res.data.data);
          setOldDateOfso(res.data.data);
        }
        setIsLoading(false);
        setRefreshing(false);
      }
    });
  };
  useEffect(() => {
    getSonumber();
    getCompleteData();
    // setOutwardcurrentPage(0);
  }, []);
  const calculateTotalArticleRate = (articleRate, outwardNoPacks) => {
    return articleRate.reduce(
      (total, value, index) =>
        total + parseInt(value, 10) * parseInt(outwardNoPacks[index], 10),
      0
    );
  };
  const inputDate = "2021-04-15T11:39:25.000Z";
  const totalpices = (outwardNoPacksArray) => {
    const flattenedArray = outwardNoPacksArray
      .flatMap((str) => str.split(",").map(Number))
      .filter(Number.isInteger); // Filter out non-integer values

    // Calculate the sum of all integers in the array
    const sum = flattenedArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    return sum;
  };

  const calculateTotalAmount = (outwardNoPacks, articleRate) => {
    let sum = 0;

    for (let i = 0; i < outwardNoPacks.length; i++) {
      const outwardValue = outwardNoPacks[i].split(",").map(Number);
      const rate = parseInt(articleRate[i]);

      for (const value of outwardValue) {
        sum += rate * value;
      }
    }
    const totalAmount = sum + 0.05 * sum;
    return Math.ceil(totalAmount);
  };

  const getCompleteData = async () => {
    let data = await AsyncStorage.getItem("UserData");
    data = await JSON.parse(data);

    await getCompletedSoDetails({
      PartyId: data[0].Id,
    }).then((res) => {
      // console.log(res.data.data.length, res.data.hasMore, res.data.hasMore, nextPage, "{}{}{{}{}{}{}");
      if (res && res.status == 200) {
        if (res.data.data.length <= 0) {
          setOutworddatanotfount(true);
          setIsLoadingsodetails(false);
          setRefreshing(false);
        } else {
          setcompletedsodata(res.data.data);
          setOldDataOfCompleted(res.data.data);
          setIsLoadingsodetails(false);
          setRefreshing(false);
        }
      }
    });
  };
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleNext = () => {
    if (orderstatus) {
      setFilterosstatus(true);
      filterOsDataByDate();
    } else {
      setFilteroutwardstatus(true);
      filterdataOfcompleted();
    }
    setFilteractive(true);
    closeModal();
  };
  const cleardate = () => {
    if (filterosstatus == true) {
      if (orderstatus) {
        setFromDate(new Date());
        setToDate(new Date());
        setSodatanotfount(false);
        setFilterosstatus(false);
        setSoNumberData(oldDataOfso);
      } else {
        setOutwardfromdate(new Date());
        setOutwardtodate(new Date());
        setOutworddatanotfount(false);
        setFilteroutwardstatus(false);
        setcompletedsodata(olddataofcompleted);
      }
      setTimeout(() => {
        setFilteractive(false);
        closeModal();
      }, 1000);
    } else {
      setFilteractive(false);
      closeModal();
    }
  };
  return (
    <>
      {isloading ? (
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
      ) : (
        <View style={styles.container}>
          <View style={styles.first_cnt}>
            <View style={styles.pendin_complete_cnt}>
              <View style={styles.pc_btn_cnt}>
                {/* <View style={{ width: "50%" }}> */}
                <Pressable
                  style={toggle ? styles.pending_btn : styles.complete_btn}
                  onPress={() => {
                    setToggle(!toggle);
                    setOrderstatus(true);
                  }}
                >
                  <Text
                    style={toggle ? styles.pending_text : styles.complete_text}
                  >
                    Pending
                  </Text>
                </Pressable>
                {/* </View> */}
                {/* <View style={{ width: "50%"  }}> */}
                <Pressable
                  style={toggle ? styles.complete_btn : styles.pending_btn}
                  onPress={() => {
                    setToggle(!toggle);
                    setOrderstatus(false);
                    // getCompleteData();
                    // setIsLoadingsodetails(true);
                  }}
                >
                  <Text
                    style={toggle ? styles.complete_text : styles.pending_text}
                  >
                    Completed
                  </Text>
                </Pressable>
                {/* </View> */}
              </View>
            </View>
            <View style={styles.calender_cnt}>
              <View style={{ paddingRight: "4%", marginTop: 10 }}>
                {/* <Button title="Select Dates" onPress={openModal} /> */}
                <TouchableOpacity
                  onPress={openModal}
                  style={{
                    height: width >= 720 ? 35 : 20,
                    width: width >= 720 ? 35 : 20,
                  }}
                >
                  <Calendersvg />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {orderstatus ? (
            sodatanotfount ? (
              <View style={orderstyles.nodataContainer}>
                <Text style={orderstyles.nodataText}>NO DATA AVAILABLE</Text>
              </View>
            ) : (
              <View style={orderstyles.order_cnt}>
                <ScrollView
                  nestedScrollEnabled={true}
                  contentContainerStyle={{ flexGrow: 0.7 }}
                  keyboardShouldPersistTaps="handled"
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={() => {
                        onRefresh();
                      }}
                    />
                  }
                >
                  {sonumberdata
                    ? sonumberdata.map((item, index) =>
                        item.status === 0 ? (
                          <TouchableOpacity
                            key={index}
                            style={orderstyles.data_cnt}
                            onPress={() => {
                              navigation.navigate("orderdetails", {
                                sonumber: item.SoNumber,
                                CreatedDate: item.CreatedDate,
                                remarks: item.Remarks,
                                transport: item.Transporter,
                                name: item.UserName,
                                startyear: item.StartYear,
                                endyear: item.EndYear,
                              });
                            }}
                          >
                            <View
                              style={{
                                width: "60%",
                                paddingVertical: "2%",

                                paddingLeft: "2%",
                              }}
                            >
                              <View style={{ gap: 8 }}>
                                <View style={orderstyles.text_cnt}>
                                  <Text style={orderstyles.txt_titile}>
                                    SO No :
                                  </Text>
                                  <Text style={orderstyles.txt_val}>
                                    {`${item.UserName}${item.SoNumber}/${item.StartYear}-${item.EndYear}`}
                                  </Text>
                                </View>
                                <View>
                                  <View style={orderstyles.text_cnt}>
                                    <Text style={orderstyles.txt_titile}>
                                      Pieces :
                                    </Text>
                                    <Text style={orderstyles.txt_val}>
                                      {item.OutwardNoPacks[0] !== null
                                        ? totalpices(item.OutwardNoPacks)
                                        : "0"}
                                    </Text>
                                  </View>
                                </View>
                                <View>
                                  <View
                                    style={[
                                      orderstyles.text_cnt,
                                      { marginBottom: 10 },
                                    ]}
                                  >
                                    <Text style={orderstyles.txt_titile}>
                                      Total Amount :
                                    </Text>
                                    <Text style={orderstyles.txt_val}>
                                      {item.OutwardNoPacks[0] !== null
                                        ? calculateTotalAmount(
                                            item.OutwardNoPacks,
                                            item.ArticleRate
                                          )
                                        : "0"}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                            <View
                              style={{
                                width: "40%",
                                paddingVertical: "2%",
                                paddingRight: "2%",
                              }}
                            >
                              <View style={{ height: "53%" }}>
                                <View
                                  style={[
                                    orderstyles.text_cnt,
                                    { justifyContent: "flex-end" },
                                  ]}
                                >
                                  <Text style={orderstyles.txt_titile}>
                                    Date :
                                  </Text>
                                  <Text style={orderstyles.txt_val}>
                                    {new Date(item.SoDate).toLocaleDateString(
                                      "en-GB",
                                      {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                      }
                                    )}
                                  </Text>
                                </View>
                              </View>
                              <View style={orderstyles.pending_icon}>
                                <View style={orderstyles.pending_icon_text}>
                                  <View
                                    style={{
                                      width: width < 720 ? 16 : 20,
                                      height: width < 720 ? 16 : 22,
                                    }}
                                  >
                                    <PendingSvg />
                                  </View>
                                  <Text
                                    style={{
                                      fontSize: width < 720 ? 13 : 16.854,
                                      fontFamily: "GloryBold",
                                      color: "#FF0203",
                                    }}
                                  >
                                    Pending
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        ) : (
                          ""
                        )
                      )
                    : ""}
                  {Ispendingsoloading ? (
                    <View
                      style={{
                        marginBottom: 100,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <ActivityIndicator size="large" color="black" />
                    </View>
                  ) : (
                    ""
                  )}
                </ScrollView>
              </View>
            )
          ) : isLoadingsodetails ? (
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
          ) : outworddatanotfount ? (
            <View style={orderstyles.nodataContainer}>
              <Text style={orderstyles.nodataText}>NO DATA AVAILABLE</Text>
            </View>
          ) : (
            <View style={orderstyles.order_cnt}>
              <ScrollView
                nestedScrollEnabled={true}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              >
                {completedsodata
                  ? completedsodata.map((item, index) =>
                      item.status === 1 ? (
                        <TouchableOpacity
                          key={index}
                          style={orderstyles.data_cnt}
                          onPress={() => {
                            navigation.navigate("orderdetails", {
                              sonumber: item.SoNumber,
                              CreatedDate: item.CreatedDate,
                              // remarks: item.Remarks,
                              transport: item.Transporter,
                              name: item.UserName,
                              OutwardNumber: item.OutwardNumber,
                              startyear: item.StartYear,
                              endyear: item.EndYear,
                              outwardArticleId: item.outwardArticleId,
                              OutwardNumberId: item.OutwardNumberId,
                            });
                          }}
                        >
                          <View
                            style={{
                              width: "60%",
                              paddingVertical: "2%",
                              paddingLeft: "2%",
                            }}
                          >
                            <View style={{ gap: 8 }}>
                              <View style={orderstyles.text_cnt}>
                                <Text style={orderstyles.txt_titile}>
                                  Outward No :
                                </Text>
                                <Text
                                  style={orderstyles.txt_val}
                                  adjustsFontSizeToFit={true}
                                >
                                  {`${item.OutwardNumber}/${item.StartYear}-${item.EndYear}`}
                                </Text>
                              </View>
                              <View>
                                <View style={orderstyles.text_cnt}>
                                  <Text style={orderstyles.txt_titile}>
                                    Pieces :
                                  </Text>
                                  <Text style={orderstyles.txt_val}>
                                    {item.OutwardNoPacks[0] !== null
                                      ? totalpices(item.OutwardNoPacks)
                                      : "0"}
                                  </Text>
                                </View>
                              </View>
                              <View>
                                <View
                                  style={[
                                    orderstyles.text_cnt,
                                    { marginBottom: 10 },
                                  ]}
                                >
                                  <Text style={orderstyles.txt_titile}>
                                    Total Amount :
                                  </Text>
                                  <Text style={orderstyles.txt_val}>
                                    {item.OutwardNoPacks[0] !== null
                                      ? calculateTotalAmount(
                                          item.OutwardNoPacks,
                                          item.ArticleRate
                                        )
                                      : "0"}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </View>
                          <View
                            style={{
                              width: "40%",
                              paddingVertical: "2%",
                              paddingRight: "2%",
                            }}
                          >
                            <View style={{ height: "53%" }}>
                              <View
                                style={[
                                  orderstyles.text_cnt,
                                  { justifyContent: "flex-end" },
                                ]}
                              >
                                <Text style={orderstyles.txt_titile}>
                                  Date :
                                </Text>
                                <Text style={orderstyles.txt_val}>
                                  {new Date(
                                    item.CreatedDate
                                  ).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                  })}
                                </Text>
                              </View>
                            </View>
                            <View style={orderstyles.pending_icon}>
                              <View style={orderstyles.complete_icon_text}>
                                <View
                                  style={{
                                    width: width < 720 ? 16 : 20,
                                    height: width < 720 ? 16 : 22,
                                  }}
                                >
                                  <CompletedOrderHistory />
                                </View>
                                <Text
                                  style={{
                                    fontSize: width < 720 ? 13 : 16.854,
                                    color: "#7AC848",
                                    fontFamily: "GloryBold",
                                  }}
                                >
                                  Completed
                                </Text>
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                      ) : (
                        ""
                      )
                    )
                  : ""}
                {Iscompletesoloading ? (
                  <View
                    style={{
                      marginBottom: 100,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ActivityIndicator size="large" color="black" />
                  </View>
                ) : (
                  ""
                )}
              </ScrollView>
            </View>
          )}

          <Modal
            animationType="slide"
            transparent={false}
            visible={isCalendarVisible}
            onRequestClose={() => {
              setCalendarVisible(!isCalendarVisible);
            }}
            style={{ margin: 20 }}
          >
            <View>
              <View style={styles.calendarModal}>
                <View
                  style={{
                    width: "80%",
                    height: 48.752,
                    gap: 12,
                    display: "flex",
                    flexDirection: "row",
                    paddingVertical: 13,
                    paddingLeft: 20,
                  }}
                >
                  <View style={{ height: 35, width: 35 }}>
                    <Image
                      style={{
                        height: "100%",
                        width: "100%",
                        resizeMode: "contain",
                      }}
                      source={require("../../../assets/gray_calender.png")}
                    ></Image>
                  </View>
                  <Text style={{ fontSize: 18, color: "#BBB" }}>
                    {orderstatus ? selectedDate : selectedDateIncompleted}
                  </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    justifyContent: "center",
                    alignItems: "flex-end",
                    paddingEnd: 10,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      toggleCalendar();
                      if (orderstatus) {
                        setSodatanotfount(false);
                        setFilterosstatus(false);
                        setSelectedDate("DD/MM/YYYY");
                      } else {
                        setOutworddatanotfount(false);
                        setFilteroutwardstatus(false);
                        setSelectedDateIncompleted("DD/MM/YYYY");
                      }
                      orderstatus
                        ? setSoNumberData(oldDataOfso)
                        : setcompletedsodata(olddataofcompleted);
                    }}
                  >
                    <Image
                      style={{
                        height: width >= 720 ? 35 : 24,
                        width: width >= 720 ? 35 : 24,
                      }}
                      source={require("../../../assets/grayclose.png")}
                    ></Image>
                  </TouchableOpacity>
                </View>
              </View>
              <Calendar
                // Customize calendar properties here
                onDayPress={(day) => {
                  orderstatus
                    ? handleDateSelect(day)
                    : handleDateSelectOfCompleted(day);
                }}
                style={{
                  borderRadius: 5.477,
                  borderWidth: 0.685,
                  borderStyle: "solid",
                  borderColor: "#DDD",
                }}
              />
              <View style={styles.calendarModal2}>
                <View style={{ width: "100%", alignItems: "flex-end" }}>
                  <Pressable
                    style={{
                      width: width >= 720 ? 200 : 100,
                      backgroundColor: "black",
                      borderRadius: 3.423,
                      height: 50,
                      justifyContent: "center",
                    }}
                    onPress={() => {
                      if (orderstatus) {
                        setFilterosstatus(true);
                        filterOsDataByDate();
                      } else {
                        setFilteroutwardstatus(true);
                        filterdataOfcompleted();
                      }
                      toggleCalendar();
                    }}
                  >
                    <Text
                      style={{
                        // fontWeight: "700",
                        color: "#FFF",
                        textAlign: "center",
                        fontSize: width >= 720 ? 25 : 16,
                      }}
                    >
                      Next
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>

          <View style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
            <ButtomNavigation navigation={navigation} page="orderhistory" />
          </View>
          <Modal
            visible={showModal}
            animationType="slide"
            style={{ padding: "5%" }}
          >
            <View style={calenderstyle.calendercontainer}>
              <View style={calenderstyle.frombox}>
                <Text style={calenderstyle.fromtext}>From Date</Text>
                <View style={{ width: "100%", flexDirection: "row" }}>
                  <View style={calenderstyle.fromdate}>
                    <View style={{ width: "80%" }}>
                      <Text style={{ color: "black" }}>
                        {orderstatus
                          ? fromDate
                            ? new Date(fromDate).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              })
                            : "Select Date"
                          : outwardfromdate
                          ? new Date(outwardfromdate).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              }
                            )
                          : "Select Date"}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        setShowFromDate(true);
                      }}
                      style={calenderstyle.calendericonecontainer}
                    >
                      <View style={{ height: 18, width: 18 }}>
                        <Calendersvg />
                      </View>
                    </TouchableOpacity>
                  </View>
                  {showFromDate && (
                    <DateTimePicker
                      value={orderstatus ? fromDate : outwardfromdate}
                      maximumDate={new Date()}
                      mode="date"
                      display="default"
                      onChange={(event, selectedDate) => {
                        setShowFromDate(false);
                        if (selectedDate) {
                          orderstatus
                            ? setFromDate(selectedDate)
                            : setOutwardfromdate(selectedDate);
                        }
                      }}
                    />
                  )}
                </View>
              </View>
              <View style={calenderstyle.tobox}>
                <Text style={calenderstyle.fromtext}>To Date</Text>
                <View style={calenderstyle.fromdate1}>
                  <View style={{ width: "80%" }}>
                    <Text style={{ color: "black" }}>
                      {orderstatus
                        ? toDate
                          ? new Date(toDate).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })
                          : "Select Date"
                        : outwardtodate
                        ? new Date(outwardtodate).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })
                        : "Select Date"}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => setShowToDate(true)}
                    style={calenderstyle.calendericonecontainer}
                  >
                    <View style={{ height: 18, width: 18 }}>
                      <Calendersvg />
                    </View>
                  </TouchableOpacity>
                </View>
                {showToDate && (
                  <DateTimePicker
                    value={orderstatus ? toDate : outwardtodate}
                    mode="date"
                    display="default"
                    minimumDate={orderstatus ? fromDate : outwardfromdate}
                    maximumDate={new Date()}
                    onChange={(event, selectedDate) => {
                      setShowToDate(false);
                      if (selectedDate) {
                        orderstatus
                          ? setToDate(selectedDate)
                          : setOutwardtodate(selectedDate);
                      }
                    }}
                  />
                )}
              </View>
            </View>

            <View style={calenderstyle.nextbuttoncontainer}>
              <Pressable
                style={calenderstyle.clearpressable}
                onPress={cleardate}
              >
                <Text style={calenderstyle.nextbuttontext}>Clear</Text>
              </Pressable>
              <Pressable
                style={calenderstyle.nextpressable}
                onPress={handleNext}
              >
                <Text style={calenderstyle.nextbuttontext}>Next</Text>
              </Pressable>
            </View>
          </Modal>
        </View>
      )}
    </>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({
  calendarModal: {
    width: "100%",
    backgroundColor: "#FFF",
    display: "flex",
    flexDirection: "row",
    borderRadius: 5.477,
    borderWidth: 0.685,
    justifyContent: "space-around",
    borderStyle: "solid",
    borderColor: "#DDD",
  },
  calendarModal2: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  calendar: {
    color: "#FFF",
    borderRadius: 5.477, // Apply your desired border radius
    width: 300, // Apply your desired width
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#FFF",

    borderTopColor: "#E0E0E0",
  },
  first_cnt: {
    width: "100%",
    height: 110,
    paddingHorizontal: "5%",
    paddingTop: 10,
  },
  pendin_complete_cnt: {
    width: "100%",
    backgroundColor: "#212121",
    paddingHorizontal: width >= 720 ? 18 : 10,
    height: width >= 720 ? 70 : 60,
    borderRadius: 5,
    justifyContent: "center",
  },
  pc_btn_cnt: {
    display: "flex",
    flexDirection: "row",
    height: 45,
  },
  pending_btn: {
    width: "50%",
    backgroundColor: "#FFF",
    justifyContent: "center",

    borderRadius: 5,
  },
  pending_text: {
    fontSize: width >= 720 ? 30 : 25,
    fontFamily: "GloryBold",
    textAlign: "center",
  },
  complete_btn: {
    width: "50%",
    backgroundColor: "#212121",
    borderRadius: 5,
    justifyContent: "center",
  },
  complete_text: {
    color: "#FFF",
    fontSize: width >= 720 ? 30 : 25,
    textAlign: "center",
    fontFamily: "GloryBold",
  },
  calender_cnt: {
    backgroundColor: "#FFF",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    // height: 25,
  },
});

const orderstyles = StyleSheet.create({
  order_cnt: {
    height: "100%",
    width: "100%",

    backgroundColor: "#FFF",
    paddingBottom: 200,
  },
  data_cnt: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    marginHorizontal: "5%",
    borderRadius: 12,
    flexDirection: "row",
    height: width >= 720 ? 150 : 115,
  },
  pending_icon: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    height: "45%",
    paddingVertical: 2,
  },
  pending_icon_text: {
    backgroundColor: "#FFD1D1",
    borderWidth: 0.659,
    paddingTop: 6,
    paddingBottom: 6.34,
    borderRadius: 5.268,
    borderColor: "#FF0203",
    width: "65%",
    marginRight: 8,
    display: "flex",
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
    alignContent: "center",
    // margin:2,
  },
  text_cnt: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    flexWrap: "wrap",
    marginBottom: 8,
  },
  txt_titile: {
    fontSize: width < 720 ? 14 : 20,
    color: "#000000B2",
    fontFamily: "GloryMedium",
  },
  txt_val: {
    fontSize: width >= 720 ? 22 : 14.4,
    fontFamily: "GloryBold",
    color: "#000000",
  },
  complete_icon_text: {
    backgroundColor: "#E1FFD3",
    borderWidth: 0.659,
    paddingTop: 6,
    paddingBottom: 6.34,
    borderRadius: 5.268,
    borderColor: "#81CD60",
    width: "65%",
    marginRight: 8,
    display: "flex",
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
    alignContent: "center",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  nodataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFF",
  },
  nodataText: {
    fontFamily: "Glory",
    fontSize: 18,
    fontStyle: "normal",
    color: "gray",
  },
});

const calenderstyle = StyleSheet.create({
  calendercontainer: {
    backgroundColor: "#FFF",
    width: "100%",
    height: "50%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    flexDirection: "row",
    gap: 10,
    marginBottom: "5%",
    backgroundColor: "lightblue",
  },
  frombox: {
    width: "45%",
    height: 100,
    // flexDirection: "column",
    backgroundColor: "red",
    // position: "relative",
  },
  tobox: {
    width: "45%",
    height: 100,
    backgroundColor: "green",
  },
  nextbuttoncontainer: {
    width: "100%",
    justifyContent: "flex-end",
    alignContent: "flex-end",
    gap: 20,
    height: "auto",
    flexDirection: "row",
  },
  nextpressable: {
    width: width >= 720 ? 200 : 100,
    backgroundColor: "black",
    borderRadius: 3.423,
    height: 50,
    justifyContent: "center",
  },
  clearpressable: {
    width: width >= 720 ? 200 : 100,
    backgroundColor: "black",
    borderRadius: 3.423,
    height: 50,
    justifyContent: "center",
  },
  nextbuttontext: {
    color: "#FFF",
    textAlign: "center",
    fontSize: width >= 720 ? 25 : 18,
    fontFamily: "GloryMedium",
  },
  fromdate: {
    // width: "100%",
    // height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    flexDirection: "row",
    backgroundColor: "pink",
    // position: "relative",
  },
  fromdate1: {
    // backgroundColor: "transparent",
    // position: "relative",
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "yellow",
  },
  calendericonecontainer: {
    width: "20%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  fromtext: {
    marginBottom: "4%",
    fontSize: 16,
    color: "#000",
    fontFamily: "GloryMedium",
  },
});
