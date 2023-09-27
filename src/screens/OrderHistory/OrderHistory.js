const { View, Text, Image, TouchableOpacity, ActivityIndicator, Dimensions } = require("react-native")
import MenuBackArrow from '../../components/menubackarrow/menubackarrow';
import { useState, useLayoutEffect, useEffect } from 'react';
import { Pressable } from 'react-native';
import { StyleSheet } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { getsonumber } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtomNavigation from "../../components/AppFooter/ButtomNavigation";
import { Calendar } from 'react-native-calendars';
import { Modal } from 'react-native-paper';
const { width, height } = Dimensions.get("window");

const OrderHistory = (props) => {
    const { navigation } = props;
    // const [isLoading, setIsLoading] = useState(true);
    const [toggle, setToggle] = useState(true)
    const [orderstatus, setOrderstatus] = useState(true);
    const [sonumberdata, setSoNumberData] = useState([]);
    const [oldDataOfso, setOldDateOfso] = useState([]);
    const [isloading, setIsLoading] = useState(true);
    const [isCalendarVisible, setCalendarVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState('DD/MM/YYYY');
    const [selectedDateIncompleted, setSelectedDateIncompleted] = useState('DD/MM/YYYY');
    const [completedsodata, setcompletedsodata] = useState();
    const toggleCalendar = () => {
        setCalendarVisible(!isCalendarVisible);
    };

    const filterOsDataByDate = () => {
        if (selectedDate !== "DD/MM/YYYY") {
            let data = sonumberdata;
            let filterdata = data.filter((item) => {
                let val = new Date(item.SoDate).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                })
                if (item.SoDate) {
                    if (new Date(item.SoDate).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                    }) === selectedDate) {
                        // console.log(val, "{}{}{}{}{}", date);
                        return item;
                    }
                }
            })
            setSoNumberData(filterdata);
        }
    }
    const filterdataOfcompleted = () => {
        if (selectedDate !== "DD/MM/YYYY") {
            let data = completedsodata;
            let filterdata = data.filter((item) => {
                let val = new Date(item.SoDate).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                })
                if (item.SoDate) {
                    if (new Date(item.SoDate).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                    }) === selectedDate) {
                        // console.log(val, "{}{}{}{}{}", date);
                        return item;
                    }
                }
            })
            setcompletedsodata(filterdata);
        }
    }

    const handleDateSelect = (day) => {
        let date = new Date(day.dateString).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        })
        setSelectedDate(date);
    };
    const handleDateSelectOfCompleted = (day) => {
        let date = new Date(day.dateString).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        })
        setSelectedDateIncompleted(date);
    };
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={{ marginTop: 2 }}>
                    <MenuBackArrow
                        onPress={() => {
                            navigation.navigate('Home');
                        }}
                    />
                </View>

            ),
            headerTitle: () => (
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignContent: "center",
                    paddingLeft: "10%",
                    width: parseInt(width) >= 768 ? "95%" : "100%"
                }}>
                    <Text style={{
                        textAlign: "center",
                        fontSize: width * 0.05,
                        fontWeight: "700",
                        width: "100%",
                    }}>Orders History</Text>

                </View>
            ),
            headerRight: () => <View />,
            headerStyle: {
                height: width >= 768 ? 120 : 90, // Increase the header height here
            },

        });
    }, []);

    const getSonumber = async () => {
        // let data = await AsyncStorage.getItem("UserData");
        // data = await JSON.parse(data);
        // await getsonumber({ PartyId: data[0].Id }).then((res) => {
        //     setSoNumberData(res.data)
        //     setOldDateOfso(res.data)
        //     setcompletedsodata(res.data);
        setIsLoading(false);
        // })
    }
    useEffect(() => {
        getSonumber();
    }, [])
    const calculateTotalArticleRate = (articleRate, outwardNoPacks) => {
        return articleRate.reduce((total, value, index) => total + (parseInt(value, 10) * parseInt(outwardNoPacks[index], 10)), 0);
    };
    const inputDate = "2021-04-15T11:39:25.000Z";

    return (
        <>
            {isloading ?
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator
                        size="large"
                        color="black"
                    />
                </View> :
                <View style={styles.container}>
                    <View style={styles.first_cnt}>
                        <View style={styles.pendin_complete_cnt}>
                            <View style={styles.pc_btn_cnt}>
                                {/* <View style={{ width: "50%" }}> */}
                                <Pressable style={toggle ? styles.pending_btn : styles.complete_btn} onPress={() => { setToggle(!toggle); setOrderstatus(true) }}>
                                    <Text style={toggle ? styles.pending_text : styles.complete_text}>Pending</Text>
                                </Pressable>
                                {/* </View> */}
                                {/* <View style={{ width: "50%"  }}> */}
                                <Pressable style={toggle ? styles.complete_btn : styles.pending_btn} onPress={() => { setToggle(!toggle); setOrderstatus(false) }}>
                                    <Text style={toggle ? styles.complete_text : styles.pending_text}>Completed</Text>
                                </Pressable>
                                {/* </View> */}
                            </View>
                        </View>
                        <View style={styles.calender_cnt}>
                            <View style={{ padding: "2%", paddingRight: "4%" }}>
                                <TouchableOpacity onPress={() => toggleCalendar()} style={{ height: height * 0.035, width: width * 0.035 }}>
                                    <Image style={{ height: "100%", width: "100%", resizeMode: "contain" }} source={require("../../../assets/calaender.png")}></Image>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                    {/* {orderstatus ?
                        <View style={orderstyles.order_cnt}>
                            <ScrollView nestedScrollEnabled={true}>
                                {sonumberdata ? sonumberdata.map((item) =>
                                    item.status === 0 ?
                                        <TouchableOpacity style={orderstyles.data_cnt} onPress={() => { navigation.navigate("orderdetails", { sonumber: item.SoNumber, CreatedDate: item.CreatedDate }) }}>
                                            <View style={{ width: "62%" }}>
                                                <View style={{ gap: 8 }}>
                                                    <View style={orderstyles.text_cnt}>
                                                        <Text style={orderstyles.txt_titile}>SO No  :</Text>
                                                        <Text style={orderstyles.txt_val}>{item.SoNumber}</Text>
                                                    </View>
                                                    <View >
                                                        <View style={orderstyles.text_cnt}>
                                                            <Text style={orderstyles.txt_titile}>Pieces :</Text>
                                                            <Text style={orderstyles.txt_val}>{
                                                                item.OutwardNoPacks !== null ?
                                                                    item.OutwardNoPacks.reduce((acc, currentValue) => {
                                                                        return acc + parseFloat(currentValue);
                                                                    }, 0) : "0"}</Text>
                                                        </View>
                                                    </View>
                                                    <View >
                                                        <View style={orderstyles.text_cnt}>
                                                            <Text style={orderstyles.txt_titile}>Order Total :</Text>
                                                            <Text style={orderstyles.txt_val}>{calculateTotalArticleRate(item.ArticleRate, item.OutwardNoPacks)}</Text>
                                                        </View>
                                                    </View>
                                                </View>

                                            </View>
                                            <View style={{ width: "38%" }}>
                                                <View style={{ height: "53%" }}>
                                                    <View style={orderstyles.text_cnt}>
                                                        <Text style={orderstyles.txt_titile}>Date :</Text>
                                                        <Text style={orderstyles.txt_val}>{new Date(item.SoDate).toLocaleDateString('en-GB', {
                                                            day: '2-digit',
                                                            month: '2-digit',
                                                            year: 'numeric',
                                                        })}</Text>
                                                    </View>
                                                </View>
                                                <View style={orderstyles.pending_icon}>
                                                    <View style={orderstyles.pending_icon_text}>
                                                        <Image style={{ width: 15, height: 16 }} source={require("../../../assets/timer_1.png")}></Image>
                                                        <Text style={{ fontSize: 10.854, fontWeight: 700, color: '#FF0203' }} >Pending</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                        : ""
                                ) : ""}

                            </ScrollView>
                        </View>
                        :
                        <View style={orderstyles.order_cnt}>
                            <ScrollView nestedScrollEnabled={true}>
                                {completedsodata ? completedsodata.map((item) =>
                                    item.status === 1 ?
                                        <View style={orderstyles.data_cnt}>
                                            <View style={{ width: "62%" }}>
                                                <View style={{ gap: 8 }}>
                                                    <View style={orderstyles.text_cnt}>
                                                        <Text style={orderstyles.txt_titile}>Outward No :</Text>
                                                        <Text style={orderstyles.txt_val}>{item.OutwardNumber}</Text>
                                                    </View>
                                                    <View >
                                                        <View style={orderstyles.text_cnt}>
                                                            <Text style={orderstyles.txt_titile}>Pieces :</Text>
                                                            <Text style={orderstyles.txt_val}>{
                                                                item.OutwardNoPacks !== null ?
                                                                    item.OutwardNoPacks.reduce((acc, currentValue) => {
                                                                        return acc + parseFloat(currentValue);
                                                                    }, 0) : "0"}</Text>
                                                        </View>
                                                    </View>
                                                    <View >
                                                        <View style={orderstyles.text_cnt}>
                                                            <Text style={orderstyles.txt_titile}>Order Total :</Text>
                                                            <Text style={orderstyles.txt_val}>{calculateTotalArticleRate(item.ArticleRate, item.OutwardNoPacks)}</Text>
                                                        </View>
                                                    </View>
                                                </View>

                                            </View>
                                            <View style={{ width: "38%" }}>
                                                <View style={{ height: "53%" }}>
                                                    <View style={orderstyles.text_cnt}>
                                                        <Text style={orderstyles.txt_titile}>Date :</Text>
                                                        <Text style={orderstyles.txt_val}>{new Date(inputDate).toLocaleDateString('en-GB', {
                                                            day: '2-digit',
                                                            month: '2-digit',
                                                            year: 'numeric',
                                                        })}</Text>
                                                    </View>
                                                </View>
                                                <View style={orderstyles.pending_icon}>
                                                    <View style={orderstyles.complete_icon_text}>
                                                        <Image style={{ width: 15, height: 16 }} source={require("../../../assets/Right_complete.png")}></Image>
                                                        <Text style={{ fontSize: 10.854, fontWeight: 700, color: '#7AC848' }} >Completed</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View> : "") : ''}
                            </ScrollView>

                        </View>
                    } */}


                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={isCalendarVisible}
                        onRequestClose={() => {
                            setCalendarVisible(!isCalendarVisible);
                        }}
                        style={{ margin: 20 }}
                    >
                        <View >
                            <View style={styles.calendarModal}>
                                <View style={{ width: "80%", height: 48.752, gap: 12, display: "flex", flexDirection: "row", paddingVertical: 13, paddingLeft: 20 }}>
                                    <View style={{ height: 25, width: 25, }}>
                                    <Image style={{ height: "100%", width: "100%", resizeMode:"contain"}} source={require("../../../assets/gray_calender.png")}></Image>
                                    </View>
                                    <Text style={{ fontSize: 18, fontWeight: 400, color: "#BBB" }}>{orderstatus ? selectedDate : selectedDateIncompleted}</Text>
                                </View>
                                <View style={{ width: "20%", justifyContent: "center", alignItems: 'flex-end', paddingEnd: 10 }}>
                                    <TouchableOpacity onPress={() => { toggleCalendar(); setSelectedDate("DD/MM/YYYY"); setSoNumberData(oldDataOfso); }}>
                                        <Image style={{ height: width >= 768 ? 35 : 24, width: width >= 768 ? 35 : 24, }} source={require("../../../assets/grayclose.png")}></Image>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Calendar
                                // Customize calendar properties here
                                onDayPress={(day) => { orderstatus ? handleDateSelect(day) : handleDateSelectOfCompleted(day) }}
                                style={{ borderRadius: 5.477, borderWidth: 0.685, borderStyle: "solid", borderColor: "#DDD" }}
                            />
                            <View style={styles.calendarModal2}>
                                <View style={{ width: '100%', alignItems: "flex-end" }}>
                                    <Pressable style={{ width:200, backgroundColor: "black", borderRadius: 3.423 , height:50,justifyContent:"center" }} onPress={() => { orderstatus ? filterOsDataByDate() : filterdataOfcompleted(); toggleCalendar() }}>
                                        <Text style={{ fontWeight: 700, color: "#FFF", textAlign: "center", fontSize: width >= 768 ? 25 : 16 }}>Next</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <View
                        style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
                    >
                        <ButtomNavigation navigation={navigation} page="orderhistory" />
                    </View>
                </View>

            }
        </>
    )
}

export default OrderHistory;

const styles = StyleSheet.create({

    calendarModal: {
        width: "100%",
        backgroundColor: "#FFF",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        borderRadius: 5.477,
        borderWidth: 0.685,
        borderStyle: "solid",
        borderColor: "#DDD"
    },
    calendarModal2: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 20
    },
    calendar: {
        color: "#FFF",
        borderRadius: 5.477, // Apply your desired border radius
        width: 300, // Apply your desired width
        height: "auto", // Apply your desired height
    },
    container: {
        width: '100%',
        height: "100%",
        backgroundColor: "#FFF",
        borderTopWidth: 1,
        borderTopColor: "#828282"
    },
    first_cnt: {
        width: "100%",
        height: height * 0.13,
        backgroundColor: "#FFF",
        padding: "5%"
    },
    pendin_complete_cnt: {
        width: "100%",
        height: width>=768 ?height * 0.075:height * 0.055,
        backgroundColor: "#212121",
        paddingVertical: "2%",
        paddingHorizontal: "3%",
        borderRadius: 5,
        // margin: 20,
        marginBottom: 0
    },
    pc_btn_cnt: {
        display: "flex",
        flexDirection: "row",
        //   backgroundColor: "blue",
        // paddingVertical: "2.5%",
        // paddingHorizontal: "3.5%",
        // width: "100%",
        gap: 6,
        // justifyContent: "center",
    },
    pending_btn: {
        width: "50%",
        backgroundColor: "#FFF",
        borderRadius: 5,
        // paddingTop: "1.5%",
        // paddingBottom: "2.5%"
    },
    pending_text: {
        fontSize: width * 0.05,
        fontWeight: 700,
        textAlign: "center"
    },
    complete_btn: {
        width: "50%",
        backgroundColor: "#212121",
        borderRadius: 5,
        // paddingTop: "1.5%",
        // paddingBottom: "2.5%"
    },
    complete_text: {
        color: "#FFF",
        fontSize: width * 0.05,
        fontWeight: 700,
        textAlign: "center",
        paddingBottom: "2%"
    },
    calender_cnt: {
        backgroundColor: "#FFF",
        display: 'flex',
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-end"
    }
});

const orderstyles = StyleSheet.create({
    order_cnt: {
        height: "100%",
        width: "100%",
        backgroundColor: "#FFF",
        marginTop: 14
    },
    data_cnt: {
        backgroundColor: "#FFF",
        margin: 14,
        borderRadius: 12,
        padding: 10,
        display: "flex",
        flexDirection: "row",
        gap: 8,
        height: 100,
        elevation: 5
    },
    pending_icon: {
        display: 'flex', flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end",
        height: "45%", paddingVertical: 2
    },
    pending_icon_text: {
        backgroundColor: "#FFD1D1",
        borderWidth: 0.659,
        paddingTop: 6,
        paddingBottom: 6.34,
        borderRadius: 5.268,
        borderColor: "#FF0203",
        width: "65%", marginRight: 8,
        display: 'flex', flexDirection: "row",
        gap: 10,
        justifyContent: "center",
        alignContent: "center",
        // margin:2,
    },
    text_cnt: {
        display: "flex",
        flexDirection: "row",
        gap: 5
    },
    txt_titile: {
        fontSize: 14,
        fontWeight: 500,
        color: "#000000B2"
    },
    txt_val: {
        fontSize: 15,
        fontWeight: 700,
        color: "#000000"
    },
    complete_icon_text: {
        backgroundColor: "#E1FFD3",
        borderWidth: 0.659,
        paddingTop: 6,
        paddingBottom: 6.34,
        borderRadius: 5.268,
        borderColor: "#81CD60",
        width: "68%", marginRight: 8,
        display: 'flex', flexDirection: "row",
        gap: 10,
        justifyContent: "center",
        alignContent: "center",
    }
});