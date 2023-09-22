const { View, Text, Image, TouchableOpacity } = require("react-native")
import MenuBackArrow from '../../components/menubackarrow/menubackarrow';
import { useState, useLayoutEffect, useEffect } from 'react';
import { Pressable } from 'react-native';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getsonumber } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderHistory = (props) => {
    const { navigation } = props;
    const [isLoading, setIsLoading] = useState(true);
    const [toggle, setToggle] = useState(true)
    const [orderstatus, setOrderstatus] = useState(true);
    const [sonumberdata, setSoNumberData] = useState([]);
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
                    display: "flex",
                    flexDirection: "row",
                    width: "100%", marginLeft: 14
                }}>
                    <Text style={{
                        textAlign: "center",
                        fontSize: 25, fontWeight: 700, width: "100%"
                    }}>Orders History</Text>
                </View>
            ),
            headerRight: () => <View />,

        });
    }, []);

    const getSonumber = async () => {
        let data = await AsyncStorage.getItem("UserData");
        data = await JSON.parse(data);
        await getsonumber({ PartyId: data[0].Id }).then((res) => {
            // console.log(res.data);
            setSoNumberData(res.data)
        })
    }
    useEffect(() => {
        getSonumber();
    }, [])
    const inputDate = "2021-04-15T11:39:25.000Z";
    return (
        <View style={styles.container}>
            <View style={styles.first_cnt}>
                <View style={styles.pendin_complete_cnt}>
                    <View style={styles.pc_btn_cnt}>
                        <View style={{ width: "49%" }}>
                            <Pressable style={toggle ? styles.pending_btn : styles.complete_btn} onPress={() => { setToggle(!toggle); setOrderstatus(true) }}>
                                <Text style={toggle ? styles.pending_text : styles.complete_text}>Pending</Text>
                            </Pressable>
                        </View>
                        <View style={{ width: "49%" }}>
                            <Pressable style={toggle ? styles.complete_btn : styles.pending_btn} onPress={() => { setToggle(!toggle); setOrderstatus(false) }}>
                                <Text style={toggle ? styles.complete_text : styles.pending_text}>Completed</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                <View style={styles.calender_cnt}>
                    <View style={{ padding: 10, paddingRight: 32 }}>
                        <TouchableOpacity onPress={() => console.log("done")}>
                            <Image style={{ height: 20, width: 20 }} source={require("../../../assets/calaender.png")}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {orderstatus ?
                <View style={orderstyles.order_cnt}>
                    <ScrollView nestedScrollEnabled={true}>
                        {sonumberdata ? sonumberdata.map((item) =>
                            item.status === 0 ?
                                <View style={orderstyles.data_cnt}>
                                    <View style={{ width: "62%" }}>
                                        <View style={{ gap: 8 }}>
                                            <View style={orderstyles.text_cnt}>
                                                <Text style={orderstyles.txt_titile}>SO No  :</Text>
                                                <Text style={orderstyles.txt_val}>{item.SoNumber}</Text>
                                            </View>
                                            <View >
                                                <View style={orderstyles.text_cnt}>
                                                    <Text style={orderstyles.txt_titile}>Pieces :</Text>
                                                    <Text style={orderstyles.txt_val}>1</Text>
                                                </View>
                                            </View>
                                            <View >
                                                <View style={orderstyles.text_cnt}>
                                                    <Text style={orderstyles.txt_titile}>Order Total :</Text>
                                                    <Text style={orderstyles.txt_val}>195</Text>
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
                                </View> : ""
                        ) : ""}

                    </ScrollView>
                </View>
                :
                <View style={orderstyles.order_cnt}>
                    <ScrollView nestedScrollEnabled={true}>
                        {sonumberdata ? sonumberdata.map((item) =>
                            item.status === 1 ?
                                <View style={orderstyles.data_cnt}>
                                    <View style={{ width: "62%" }}>
                                        <View style={{ gap: 8 }}>
                                            <View style={orderstyles.text_cnt}>
                                                <Text style={orderstyles.txt_titile}>Outward No :</Text>
                                                <Text style={orderstyles.txt_val}>140/23-24</Text>
                                            </View>
                                            <View >
                                                <View style={orderstyles.text_cnt}>
                                                    <Text style={orderstyles.txt_titile}>Pieces :</Text>
                                                    <Text style={orderstyles.txt_val}>1</Text>
                                                </View>
                                            </View>
                                            <View >
                                                <View style={orderstyles.text_cnt}>
                                                    <Text style={orderstyles.txt_titile}>Order Total :</Text>
                                                    <Text style={orderstyles.txt_val}>195</Text>
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
                        <View style={orderstyles.data_cnt}>
                            <View style={{ width: "62%" }}>
                                <View style={{ gap: 8 }}>
                                    <View style={orderstyles.text_cnt}>
                                        <Text style={orderstyles.txt_titile}>Outward No :</Text>
                                        <Text style={orderstyles.txt_val}>140/23-24</Text>
                                    </View>
                                    <View >
                                        <View style={orderstyles.text_cnt}>
                                            <Text style={orderstyles.txt_titile}>Pieces :</Text>
                                            <Text style={orderstyles.txt_val}>1</Text>
                                        </View>
                                    </View>
                                    <View >
                                        <View style={orderstyles.text_cnt}>
                                            <Text style={orderstyles.txt_titile}>Order Total :</Text>
                                            <Text style={orderstyles.txt_val}>195</Text>
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
                        </View>

                    </ScrollView>
                </View>
            }

        </View>
    )
}

export default OrderHistory;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: "100%",
        backgroundColor: "#FFF",
        borderTopWidth: 1,
        borderTopColor: "#828282"
    },
    first_cnt: {
        width: "100%",
        height: 100,
        backgroundColor: "#FFF"
    },
    pendin_complete_cnt: {
        width: "89%",
        height: 50,
        backgroundColor: "#212121",
        borderRadius: 5,
        margin: 20,
        marginBottom: 0
    },
    pc_btn_cnt: {
        display: "flex",
        flexDirection: "row",
        paddingVertical: 8,
        paddingHorizontal: 10,
        width: "100%",
        gap: 6
    },
    pending_btn: {
        backgroundColor: "#FFF",
        borderRadius: 5,
        paddingTop: 3,
        paddingBottom: 5
    },
    pending_text: {
        fontSize: 20,
        fontWeight: 700,
        textAlign: "center"
    },
    complete_btn: {
        backgroundColor: "#212121",
        borderRadius: 5,
        paddingTop: 3,
        paddingBottom: 5
    },
    complete_text: {
        color: "#FFF",
        fontSize: 20,
        fontWeight: 700,
        textAlign: "center"
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