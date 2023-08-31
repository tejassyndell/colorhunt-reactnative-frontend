import { View, Text, Image, ScrollView } from "react-native";
import { useLayoutEffect } from "react";
import MenuBackArrow from '../../components/menubackarrow/menubackarrow';

const AddToCart = (props) => {
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
                    }}>Cart</Text>
                </View>
            ),
            headerRight: () =>
                <View style={{ marginRight: 20, width: 50, height: 40, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Image source={require('../../../assets/sidebaricons/icon.png')} style={{ width: 28, height: 28, borderRadius: 5, backgroundColor: "black" }} ></Image>
                </View>,
        });
    }, []);
    return (
        <View>
            <View style={{ height: "100%", width: "100%", backgroundColor: "white", borderTopColor: "black", borderWidth: 1, borderStyle: "solid" }}>
                <View style={{ display: "flex", flexDirection: "column", height: "60%", width: "100%", backgroundColor: "lightgreen" }}>
                    <ScrollView>
                        <View >
                            <View style={{
                                display: "flex",
                                flexDirection: "row",
                                width: "95%",
                                backgroundColor: "#FFF",
                                elevation: 5,
                                marginHorizontal: 9.5,
                                marginTop: 15,
                                borderRadius: 10,
                                height:120
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
                                    <Image style={{ height: "100%", width: "100%", borderRadius: 10 }} source={require("../../../assets/demo.png")}></Image>
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
                                        }}>33216</Text>
                                        <Text style={{
                                            fontSize: 14,
                                            fontWeight: 400, color: "#000"
                                        }}>Collar Tees</Text>
                                    </View>
                                    <View>
                                        <Text style={{
                                            fontSize: 14,
                                            fontWeight: 400, color: "#000"
                                        }}>Rate</Text>
                                        <Text style={{
                                            fontSize: 17,
                                            fontWeight: 700, color: "#000"
                                        }}>₹275.00</Text>
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
                                    <Image style={{ width: 20, height: 20, backgroundColor: "green" }} source={require("../../../assets/sidebaricons/edit (5) 1.png")}></Image>
                                    <Image style={{ width: 20, height: 20, backgroundColor: "black" }} source={require("../../../assets/sidebaricons/edit (5) 1.png")}></Image>
                                </View>
                            </View>
                            <View style={{
                                display: "flex",
                                flexDirection: "row",
                                width: "95%",
                                backgroundColor: "#FFF",
                                elevation: 5,
                                marginHorizontal: 9.5,
                                marginTop: 15,
                                borderRadius: 10,
                                height:120
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
                                    <Image style={{ height: "100%", width: "100%", borderRadius: 10 }} source={require("../../../assets/demo.png")}></Image>
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
                                        }}>33216</Text>
                                        <Text style={{
                                            fontSize: 14,
                                            fontWeight: 400, color: "#000"
                                        }}>Collar Tees</Text>
                                    </View>
                                    <View>
                                        <Text style={{
                                            fontSize: 14,
                                            fontWeight: 400, color: "#000"
                                        }}>Rate</Text>
                                        <Text style={{
                                            fontSize: 17,
                                            fontWeight: 700, color: "#000"
                                        }}>₹275.00</Text>
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
                                    <Image style={{ width: 20, height: 20, backgroundColor: "green" }} source={require("../../../assets/sidebaricons/edit (5) 1.png")}></Image>
                                    <Image style={{ width: 20, height: 20, backgroundColor: "black" }} source={require("../../../assets/sidebaricons/edit (5) 1.png")}></Image>
                                </View>
                            </View>
                            <View style={{
                                display: "flex",
                                flexDirection: "row",
                                width: "95%",
                                backgroundColor: "#FFF",
                                elevation: 5,
                                marginHorizontal: 9.5,
                                marginTop: 15,
                                borderRadius: 10,
                                height:120
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
                                    <Image style={{ height: "100%", width: "100%", borderRadius: 10 }} source={require("../../../assets/demo.png")}></Image>
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
                                        }}>33216</Text>
                                        <Text style={{
                                            fontSize: 14,
                                            fontWeight: 400, color: "#000"
                                        }}>Collar Tees</Text>
                                    </View>
                                    <View>
                                        <Text style={{
                                            fontSize: 14,
                                            fontWeight: 400, color: "#000"
                                        }}>Rate</Text>
                                        <Text style={{
                                            fontSize: 17,
                                            fontWeight: 700, color: "#000"
                                        }}>₹275.00</Text>
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
                                    <Image style={{ width: 20, height: 20, backgroundColor: "green" }} source={require("../../../assets/sidebaricons/edit (5) 1.png")}></Image>
                                    <Image style={{ width: 20, height: 20, backgroundColor: "black" }} source={require("../../../assets/sidebaricons/edit (5) 1.png")}></Image>
                                </View>
                            </View>
                            <View style={{
                                display: "flex",
                                flexDirection: "row",
                                width: "95%",
                                backgroundColor: "#FFF",
                                elevation: 5,
                                marginHorizontal: 9.5,
                                marginTop: 15,
                                borderRadius: 10,
                                height:120
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
                                    <Image style={{ height: "100%", width: "100%", borderRadius: 10 }} source={require("../../../assets/demo.png")}></Image>
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
                                        }}>33216</Text>
                                        <Text style={{
                                            fontSize: 14,
                                            fontWeight: 400, color: "#000"
                                        }}>Collar Tees</Text>
                                    </View>
                                    <View>
                                        <Text style={{
                                            fontSize: 14,
                                            fontWeight: 400, color: "#000"
                                        }}>Rate</Text>
                                        <Text style={{
                                            fontSize: 17,
                                            fontWeight: 700, color: "#000"
                                        }}>₹275.00</Text>
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
                                    <Image style={{ width: 20, height: 20, backgroundColor: "green" }} source={require("../../../assets/sidebaricons/edit (5) 1.png")}></Image>
                                    <Image style={{ width: 20, height: 20, backgroundColor: "black" }} source={require("../../../assets/sidebaricons/edit (5) 1.png")}></Image>
                                </View>
                            </View>
                        </View>
                        
                    </ScrollView>

                </View>
            </View>
        </View>
    )
}

export default AddToCart;