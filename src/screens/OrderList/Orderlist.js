import { useLayoutEffect } from "react";
import MenuBackArrow from '../../components/menubackarrow/menubackarrow';
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, Pressable } from "react-native";
const baseImageUrl = 'https://colorhunt.in/colorHuntApi/public/uploads/'

const Orderlist = (props) => {
    const { navigation } = props;
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <MenuBackArrow
                    onPress={() => {
                        navigation.navigate('Home');
                    }}
                />
            ),
            headerTitle: () => (
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%"
                }}>
                    <Text style={{
                        textAlign: "center",
                        fontSize: 25, fontWeight: 700, width: "100%"
                    }}>Sales order</Text>
                </View>
            ),
            headerRight: () =>
                // <View style={{ marginRight: 20, width: 50, height: 40, display: "flex", justifyContent: "center", alignItems: "center" }}>
                //     <TouchableOpacity  onPress={handleGoToOrderList}>
                //     <Image  source={require('../../../assets/sidebaricons/icon.png')} style={{ width: 28, height: 28, borderRadius: 5, backgroundColor: "black" }} ></Image>
                //     </TouchableOpacity>
                <View />
        });
    }, []);
    return (
        <ScrollView nestedScrollEnabled={true}>
            <View style={{ height: "100%", width: "100%", backgroundColor: "white", borderTopColor: "black", borderWidth: 1, borderStyle: "solid" }}>
                <View style={{ display: "flex", flexDirection: "column", width: "100%", backgroundColor: "white" }}>
                    <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: 500, color: "#000" }}>Date:</Text>
                        <TextInput dataDetectorTypes="calendarEvent" style={{
                            width: "100%",
                            borderWidth: 1, paddingVertical: 10,
                            paddingLeft: 15, borderRadius: 10,
                            fontSize: 18, backgroundColor: "#EEE"
                        }}></TextInput>

                    </View>
                    <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: 500, color: "#000" }}>Destination:</Text>
                        <TextInput dataDetectorTypes="calendarEvent" style={{
                            width: "100%",
                            borderWidth: 1, paddingVertical: 10,
                            paddingLeft: 15, borderRadius: 10,
                            fontSize: 18, backgroundColor: "#EEE"
                        }}></TextInput>
                    </View>
                    <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: 500, color: "#000" }}>Transportation:</Text>
                        <TextInput dataDetectorTypes="calendarEvent" style={{
                            width: "100%",
                            borderWidth: 1, paddingVertical: 10,
                            paddingLeft: 15, borderRadius: 10,
                            fontSize: 18, backgroundColor: "#EEE"
                        }}></TextInput>
                    </View>
                </View>
                <ScrollView nestedScrollEnabled={true} style={{ height: "100%" }}>
                    <View style={{ display: "flex", flexDirection: "column", width: "100%", backgroundColor: "white" }}>
                        <View style={{ paddingBottom: 20 }}>

                            <View style={{
                                display: "flex",
                                flexDirection: "row",
                                width: "95%",
                                backgroundColor: "#FFF",
                                elevation: 5,
                                marginHorizontal: 9.5,
                                marginTop: 15,
                                borderRadius: 10,
                                height: 120
                            }}>
                                <View style={{
                                    width: "25%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginLeft: 15,
                                    marginVertical: 10,
                                    borderRadius: 10,
                                }}>
                                    {/* <Image style={{ height: "100%", width: "100%", borderRadius: 10 }} source={{ uri: baseImageUrl + item.Photos.split(',')[0] }}></Image>
                                     */}
                                    <Image style={{ height: "100%", width: "100%", borderRadius: 10 }} source={require("../../../assets/sidebaricons/image 122.png")}></Image>

                                </View>
                                <View style={{
                                    width: "45%",
                                    marginHorizontal: 4,
                                    marginVertical: 10,
                                    borderRadius: 10
                                }}>
                                    <View>
                                        <Text style={{
                                            fontSize: 18,
                                            fontWeight: 700, color: "#000"
                                        }}>ArticleNumber</Text>
                                        <Text style={{
                                            fontSize: 14,
                                            fontWeight: 400, color: "#000"
                                        }}>StyleDescription</Text>
                                    </View>
                                    <View style={{ marginTop: "10%" }}>
                                        <Text style={{
                                            fontSize: 14,
                                            fontWeight: 400, color: "#000"
                                        }}>Rate:</Text>
                                        <Text style={{
                                            fontSize: 17,
                                            fontWeight: 700, color: "#000"
                                        }}>₹550.00</Text>
                                    </View>
                                </View>
                                <View style={{
                                    width: "18%",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "flex-end",
                                    gap: 8,
                                    marginLeft: 15,
                                    marginVertical: 10,
                                    borderRadius: 10,

                                }}>
                                </View>
                            </View>
                        </View>
                        <View style={{ paddingBottom: 20 }}>
                            <View style={{
                                display: "flex",
                                flexDirection: "row",
                                width: "95%",
                                backgroundColor: "#FFF",
                                elevation: 5,
                                marginHorizontal: 9.5,
                                marginTop: 15,
                                borderRadius: 10,
                                height: 120
                            }}>
                                <View style={{
                                    width: "25%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginLeft: 15,
                                    marginVertical: 10,
                                    borderRadius: 10,
                                }}>
                                    {/* <Image style={{ height: "100%", width: "100%", borderRadius: 10 }} source={{ uri: baseImageUrl + item.Photos.split(',')[0] }}></Image>
         */}
                                    <Image style={{ height: "100%", width: "100%", borderRadius: 10 }} source={require("../../../assets/sidebaricons/image 122.png")}></Image>

                                </View>
                                <View style={{
                                    width: "45%",
                                    marginHorizontal: 4,
                                    marginVertical: 10,
                                    borderRadius: 10
                                }}>
                                    <View>
                                        <Text style={{
                                            fontSize: 18,
                                            fontWeight: 700, color: "#000"
                                        }}>ArticleNumber</Text>
                                        <Text style={{
                                            fontSize: 14,
                                            fontWeight: 400, color: "#000"
                                        }}>StyleDescription</Text>
                                    </View>
                                    <View style={{ marginTop: "10%" }}>
                                        <Text style={{
                                            fontSize: 14,
                                            fontWeight: 400, color: "#000"
                                        }}>Rate:</Text>
                                        <Text style={{
                                            fontSize: 17,
                                            fontWeight: 700, color: "#000"
                                        }}>₹550.00</Text>
                                    </View>
                                </View>
                                <View style={{
                                    width: "18%",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "flex-end",
                                    gap: 8,
                                    marginLeft: 15,
                                    marginVertical: 10,
                                    borderRadius: 10,

                                }}>
                                </View>
                            </View>
                        </View>
                        <View style={{ paddingBottom: 20 }}>
                            <View style={{
                                display: "flex",
                                flexDirection: "row",
                                width: "95%",
                                backgroundColor: "#FFF",
                                elevation: 5,
                                marginHorizontal: 9.5,
                                marginTop: 15,
                                borderRadius: 10,
                                height: 120
                            }}>
                                <View style={{
                                    width: "25%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginLeft: 15,
                                    marginVertical: 10,
                                    borderRadius: 10,
                                }}>
                                    {/* <Image style={{ height: "100%", width: "100%", borderRadius: 10 }} source={{ uri: baseImageUrl + item.Photos.split(',')[0] }}></Image>
         */}
                                    <Image style={{ height: "100%", width: "100%", borderRadius: 10 }} source={require("../../../assets/sidebaricons/image 122.png")}></Image>

                                </View>
                                <View style={{
                                    width: "45%",
                                    marginHorizontal: 4,
                                    marginVertical: 10,
                                    borderRadius: 10
                                }}>
                                    <View>
                                        <Text style={{
                                            fontSize: 18,
                                            fontWeight: 700, color: "#000"
                                        }}>ArticleNumber</Text>
                                        <Text style={{
                                            fontSize: 14,
                                            fontWeight: 400, color: "#000"
                                        }}>StyleDescription</Text>
                                    </View>
                                    <View style={{ marginTop: "10%" }}>
                                        <Text style={{
                                            fontSize: 14,
                                            fontWeight: 400, color: "#000"
                                        }}>Rate:</Text>
                                        <Text style={{
                                            fontSize: 17,
                                            fontWeight: 700, color: "#000"
                                        }}>₹550.00</Text>
                                    </View>
                                </View>
                                <View style={{
                                    width: "18%",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "flex-end",
                                    gap: 8,
                                    marginLeft: 15,
                                    marginVertical: 10,
                                    borderRadius: 10,

                                }}>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={{
                    height: "30%",
                    backgroundColor: "white"
                }}>
                    <View style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        marginTop: 30
                    }}>
                        <View style={{ width: "100%", paddingLeft: "60%" }}>
                            <View style={{ display: "flex", flexDirection: "row", paddingVertical: 5 }}>
                                <View style={{ width: '50%', paddingTop: 2 }}>
                                    <Text style={{ fontSize: 14, fontWeight: 400, color: "#00000080", textAlign: "right" }}>Rate</Text>
                                </View>
                                <View style={{ width: '45%' }}>
                                    <Text style={{ fontSize: 18, fontWeight: 500, color: "#00000080", textAlign: "right" }}>₹1560</Text>
                                </View>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", paddingVertical: 5 }}>
                                <View style={{ width: '50%', paddingTop: 2 }}>
                                    <Text style={{ fontSize: 14, fontWeight: 400, color: "#00000080", textAlign: "right" }}>SGST 1%</Text>
                                </View>
                                <View style={{ width: '45%' }}>
                                    <Text style={{ fontSize: 18, fontWeight: 500, color: "#00000080", textAlign: "right" }}>₹2.7</Text>

                                </View>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", paddingVertical: 5 }}>
                                <View style={{ width: '50%', paddingTop: 2 }}>
                                    <Text style={{ fontSize: 14, fontWeight: 400, color: "#00000080", textAlign: "right" }}>SGST 1%</Text>
                                </View>
                                <View style={{ width: '45%' }}>
                                    <Text style={{ fontSize: 18, fontWeight: 500, color: "#00000080", textAlign: "right" }}>₹1.7</Text>
                                </View>
                            </View>
                            <View style={{ width: "50%", marginLeft: "45%" }}>
                                {/* ---- */}
                                <View style={{ borderWidth: 1 }}>

                                </View>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", paddingVertical: 5 }}>
                                <View style={{ width: '95%' }}>
                                    <Text style={{ fontSize: 18, fontWeight: 500, color: "#212121", textAlign: "right" }}>₹280.00</Text>
                                </View>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", paddingVertical: 5 }}>
                                <View style={{ width: '50%', paddingTop: 2 }}>
                                    <Text style={{ fontSize: 14, fontWeight: 400, color: "#00000080", textAlign: "right" }}>Discount</Text>

                                </View>
                                <View style={{ width: '45%' }}>
                                    <Text style={{ fontSize: 18, fontWeight: 500, color: "#212121", textAlign: "right" }}>₹28.00</Text>
                                </View>
                            </View>
                            <View style={{ width: "50%", marginLeft: "45%" }}>
                                {/* ---- */}
                                <View style={{ borderWidth: 1 }}>

                                </View>
                            </View>
                        </View>

                    </View>
                    <View style={{ display: "flex",height:"100%", flexDirection: "row", padding: 10 }}>
                        <View>
                            <Pressable style={{
                                width: 165,
                                height: 50
                            }}>
                                <Text style={{
                                    color: "white",
                                    backgroundColor: "#212121",
                                    borderRadius: 7.6, paddingHorizontal: 33,
                                    paddingVertical: 15,
                                    fontSize: 18, fontWeight: 600,
                                    textAlign: "center"
                                }}>
                                    Place Order
                                </Text>
                            </Pressable>
                        </View>
                        <View style={{
                            display: "flex",
                            flexDirection: "row", gap: 5,
                           paddingLeft:"12%",
                           paddingTop:"2%"
                        }}>
                            <View style={{ paddingTop: 5 }}>
                                <Text style={{ fontSize: 15, fontWeight: 500 }}>Total price:</Text>
                            </View>
                            <View style={{}}>
                                <Text style={{ fontSize: 22, fontWeight: 700 }}>₹500.00</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}


export default Orderlist;