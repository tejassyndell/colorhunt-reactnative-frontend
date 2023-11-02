import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";

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

  const onRefresh = () => {
    setRefreshing(true);

    // Add any logic here that you want to execute when the user triggers a refresh.
    // For example, you can reload data or perform any other action.

    // Simulate a delay to hide the loading indicator after 3 seconds (adjust as needed)
    const delay = 3000; // 3 seconds

    setTimeout(() => {
      setIsLoading(false);
      setRefreshing(false);
    }, delay);
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
    const nextPage = filtercurrentPage + 1;
    let userdata = await AsyncStorage.getItem("UserData");
    userdata = await JSON.parse(userdata);
    if (selectedDate !== "DD/MM/YYYY") {
      const dateParts = selectedDate.split("/");

      // Create a new Date object with the parts and format it as "YYYY-MM-DD"
      const formattedDate = new Date(
        `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
      )
        .toISOString()
        .split("T")[0];
      console.log({
        PartyId: userdata[0].Id,
        page: nextPage,
        pageSize: 10,
        filterdate: formattedDate,
      });
      await FilterSoNumber({
        PartyId: userdata[0].Id,
        page: nextPage,
        pageSize: 10,
        filterdate: formattedDate,
      }).then((res) => {
        if (res.status == 200) {
          if (res.data.data.length <= 0) {
            setSodatanotfount(true);
          } else {
            if (res.data.hasMore) {
              setFiltercurrentPage(nextPage);
              setSoNumberData((prevData) => [...prevData, ...res.data.data]);
              handlefilterscroll();
            } else {
              console.log(res.data);
              setFiltercurrentPage(0);
              setSoNumberData(res.data.data);
            }
          }
        }
      });
    }
  };
  const filterdataOfcompleted = async () => {
    const nextPage = filteroutwardcurrentPage + 1;
    let userdata = await AsyncStorage.getItem("UserData");
    userdata = await JSON.parse(userdata);
    if (selectedDateIncompleted !== "DD/MM/YYYY") {
      const dateParts = selectedDateIncompleted.split("/");

      // Create a new Date object with the parts and format it as "YYYY-MM-DD"
      const formattedDate = new Date(
        `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
      )
        .toISOString()
        .split("T")[0];
      console.log(formattedDate);

      await FilteroutwardNumber({
        PartyId: userdata[0].Id,
        page: nextPage,
        pageSize: 10,
        filterdate: formattedDate,
      }).then((res) => {
        if (res.status == 200) {
          if (res.data.data.length <= 0) {
            setOutworddatanotfount(true);
          } else {
            if (res.data.hasMore) {
              setFilteroutwardcurrentPage(nextPage);
              setcompletedsodata((prevData) => [...prevData, ...res.data.data]);
              handlefilterscroll();
            } else {
              console.log("second time");
              setFilteroutwardcurrentPage(0);
              setcompletedsodata(res.data.data);
            }
          }
        }
      });
    }
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
            flexDirection: "row",
            alignItems: "center",
            alignContent: "center",
            paddingLeft: "10%",
            width: parseInt(width) >= 720 ? "95%" : "100%",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: width >= 720 ? 35 : 20,
              fontWeight: "700",
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
  const handleScroll = ({ nativeEvent }) => {
    const { contentOffset, contentSize, layoutMeasurement } = nativeEvent;
    const isEndOfList =
      contentOffset.y + layoutMeasurement.height + 1 >= contentSize.height;

    if (isEndOfList) {
      // User has reached the end of the list, load the next page

      if (orderstatus) {
        if (filterosstatus == false && handlerstop == false) {
          getSonumber();
        }
      } else {
        if (filteroutwardstatus == false && handleroutwardstop == false) {
          getCompleteData();
        }
      }
    }
  };
  const handlefilterscroll = () => {
    if (orderstatus) {
      if (filterosstatus == true) {
        filterOsDataByDate();
      }
    } else {
      if (filteroutwardstatus == true) {
        filterdataOfcompleted();
      }
    }
  };
  const getSonumber = async () => {
    const nextPage = currentPage + 1;
    let data = await AsyncStorage.getItem("UserData");
    data = await JSON.parse(data);
    await getsonumber({
      PartyId: data[0].Id,
      page: nextPage,
      pageSize: 10,
    }).then((res) => {
      if (res && res.status == 200) {
        if (res.data.data.length <= 0) {
          console.log(res.data.data);
          setSodatanotfount(true);
        } else {
          if (res.data.hasMore == false) {
            sethandlerstop(true);
          }
          setSoNumberData((prevData) => [...prevData, ...res.data.data]);
          setOldDateOfso((prevData) => [...prevData, ...res.data.data]);
          setCurrentPage(nextPage);
        }
      } else {
        console.log(res, "_+_+_+");
        Alert.alert("Server is not responding", [
          {
            text: "OK",
            onPress: () => {
              // Call namdemo function when the user clicks 'OK'
              getSonumber();
            },
          },
        ]);
      }

      setIsLoading(false);
      setRefreshing(false);
    });
  };
  useEffect(() => {
    getSonumber();
    setOutwardcurrentPage(0);
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
    return Math.floor(totalAmount);
  };

  const getCompleteData = async () => {
    const nextPage = outwardcurrentPage + 1;

    let data = await AsyncStorage.getItem("UserData");
    data = await JSON.parse(data);

    await getCompletedSoDetails({
      PartyId: data[0].Id,
      page: nextPage,
      pageSize: 10,
    }).then((res) => {
      console.log(
        res.data.data.length,
        res.data.hasMore,
        res.data.hasMore,
        nextPage,
        "{}{}{{}{}{}{}"
      );
      if (res && res.status == 200) {
        if (res.data.data.length <= 0) {
          setOutworddatanotfount(true);
          setIsLoadingsodetails(false);
        } else {
          if (nextPage == 1) {
            console.log("first time");
            setcompletedsodata(res.data.data);
            setOldDataOfCompleted(res.data.data);
          } else {
            if (res.data.hasMore == false) {
              sethandleroutwardstop(true);
            }
            console.log("second time");
            setcompletedsodata((prevData) => [...prevData, ...res.data.data]);
            setOldDataOfCompleted((prevData) => [
              ...prevData,
              ...res.data.data,
            ]);
          }

          if (res.data.hasMore == false) {
            setOutwardcurrentPage(0);
          } else {
            setOutwardcurrentPage(nextPage);
          }
          setIsLoadingsodetails(false);
        }
      } else {
        Alert.alert("Server is not responding", [
          {
            text: "OK",
            onPress: () => {
              // Call namdemo function when the user clicks 'OK'
              getCompleteData();
            },
          },
        ]);
      }
    });
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
                    getCompleteData();
                    setIsLoadingsodetails(true);
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
              <View style={{ paddingTop: 10, paddingRight: 10 }}>
                <TouchableOpacity
                  onPress={() => toggleCalendar()}
                  style={{ height: 20, width: 20 }}
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
                      onRefresh={onRefresh}
                    />
                  }
                  onScroll={(event) => {
                    handleScroll(event);
                  }}
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
                                      width: width < 720 ? 15 : 20,
                                      height: width < 720 ? 16 : 22,
                                    }}
                                  >
                                    <PendingSvg />
                                  </View>
                                  <Text
                                    style={{
                                      fontSize: width < 720 ? 10.854 : 16.854,
                                      fontWeight: "700",
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
              <ScrollView nestedScrollEnabled={true} onScroll={handleScroll}>
                {completedsodata
                  ? completedsodata.map((item) =>
                      item.status === 1 ? (
                        <TouchableOpacity
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
                                    width: width < 720 ? 15 : 20,
                                    height: width < 720 ? 16 : 22,
                                  }}
                                >
                                  <CompletedOrderHistory />
                                </View>
                                <Text
                                  style={{
                                    fontSize: width < 720 ? 10.854 : 16.854,
                                    fontWeight: "700",
                                    color: "#7AC848",
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
                  <View style={{ height: 25, width: 25 }}>
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
  },
  first_cnt: {
    width: "100%",
    // height: height >= 844 ? "15%" : "19%",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#FFF",
  },
  pendin_complete_cnt: {
    width: "100%",
    backgroundColor: "#212121",
    paddingHorizontal: width >= 720 ? 18 : 13,
    height: width >= 720 ? 70 : 55,
    borderRadius: 5,
    justifyContent: "center",
  },
  pc_btn_cnt: {
    display: "flex",
    flexDirection: "row",
  },
  pending_btn: {
    width: "50%",
    backgroundColor: "#FFF",
    borderRadius: 5,
    // paddingTop: "1.5%",
    // paddingBottom: "2.5%"
    height: 40,
    justifyContent: "center",
  },
  pending_text: {
    fontSize: width >= 720 ? 28 : 22,
    fontWeight: "700",
    textAlign: "center",
  },
  complete_btn: {
    width: "50%",
    backgroundColor: "#212121",
    borderRadius: 5,
  },
  complete_text: {
    color: "#FFF",
    fontSize: width >= 720 ? 28 : 22,
    fontWeight: "700",
    height: 40,
    justifyContent: "center",
    textAlign: "center",
    paddingTop: 6,
  },
  calender_cnt: {
    backgroundColor: "#FFF",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
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
    height: width < 720 ? 115 : 150,
    // elevation: 5,
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
    gap: 10,
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
    fontWeight: "400",
    color: "#000000B2",
  },
  txt_val: {
    fontSize: width >= 720 ? 22 : 13,
    fontWeight: "700",
    color: "#000000",
  },
  complete_icon_text: {
    backgroundColor: "#E1FFD3",
    borderWidth: 0.659,
    paddingTop: 6,
    paddingBottom: 6.34,
    borderRadius: 5.268,
    borderColor: "#81CD60",
    width: "68%",
    marginRight: 8,
    display: "flex",
    flexDirection: "row",
    gap: 10,
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
