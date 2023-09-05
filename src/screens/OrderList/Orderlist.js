import { useLayoutEffect, useState, useEffect } from "react";
import MenuBackArrow from '../../components/menubackarrow/menubackarrow';
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, Pressable } from "react-native";
import { gettransportation } from "../../api/api";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const baseImageUrl = 'https://colorhunt.in/colorHuntApi/public/uploads/'

const Orderlist = (props) => {
    const { navigation } = props;
    const [isLoading, setIsLoading] = useState(true);
    const [showTransporatation, setshowTransporatation] = useState(false);
    const [transportationVal, setTransportationVal] = useState();
    const baseImageUrl = 'https://colorhunt.in/colorHuntApi/public/uploads/'

    // const OldTransportation = ["T-shirte", "Black_shirte", "white_shirte", "Blue_shirte", "Green_shirte"]
    const [Transportation, setTransportation] = useState([])
    const [OldTransportation, setOldTransportation] = useState([])
    const [ParsedData, setParsedData] = useState([])
    const currentDate = new Date()

    // let ParsedData = [];
    const formattedDate = `${currentDate.getMonth() + 1
        }/${currentDate.getDate()}/${currentDate.getFullYear()}`
    AsyncStorage.getItem('Orderlist').then((Storagedata) => {
        if (Storagedata !== null) {
            setParsedData(JSON.parse(Storagedata));
        } else {
            console.log('No data found');
        }
    })
        .catch((error) => {
            console.error('Error retrieving data:', error);
        });


    const GetTransportation = async () => {
        await gettransportation().then((response) => {
            setTransportation(response.data)
            setOldTransportation(response.data)
            setIsLoading(false);
        })
            .catch((error) => {
                console.error('Error fetching transportation data:', error)
            })
    }
    useEffect(() => {
        GetTransportation();
        // setIsLoading(false);
    }, [])
    let totalrate = "";
    if (ParsedData) {
        totalrate = ParsedData.reduce((total, item) => total + parseInt(item.rate), 0)
    }
    else {
        console.log(ParsedData);
    }

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



    const filterTransportationValue = (e) => {
        setTransportationVal(e);
        console.log(e);
        setshowTransporatation(true)
        if (e !== "") {
            let filterVal = Transportation.filter((item) => item.Name.toLocaleLowerCase().includes(e.toLocaleLowerCase()))
            console.log(filterVal);
            setTransportation(filterVal)
        }
        else {
            setTransportation(OldTransportation)
            setshowTransporatation(false)
        }
    }
    return (
        <>
            {isLoading ? (
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator
                        size="large"
                        color="black"
                    />
                </View>
            ) : (
                <ScrollView nestedScrollEnabled={true}>
                    <View style={{ height: "100%", width: "100%", backgroundColor: "white", borderTopColor: "black", borderWidth: 1, borderStyle: "solid" }}>
                        <View style={{ display: "flex", flexDirection: "column", width: "100%", backgroundColor: "white" }}>
                            <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                                <Text style={{ fontSize: 18, fontWeight: 500, color: "#000" }}>Date:</Text>
                                <View style={{
                                    width: "100%",
                                    borderWidth: 1, paddingVertical: 10,
                                    paddingLeft: 15, borderRadius: 10,
                                    fontSize: 18, backgroundColor: "#EEE"
                                }}
                                // value={formattedDate}
                                // disableFullscreenUI
                                ><Text>{formattedDate}</Text></View>

                            </View>
                            <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                                <Text style={{ fontSize: 18, fontWeight: 500, color: "#000" }}>Destination:</Text>
                                <TextInput value="" style={{
                                    width: "100%",
                                    borderWidth: 1, paddingVertical: 5,
                                    paddingLeft: 15, borderRadius: 10,
                                    fontSize: 16, backgroundColor: "#EEE"
                                }}></TextInput>

                            </View>
                            <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                                <Text style={{ fontSize: 18, fontWeight: 500, color: "#000" }}>Transportation:</Text>
                                <TextInput value={transportationVal} onChangeText={(e) => filterTransportationValue(e)} style={{
                                    width: "100%",
                                    borderWidth: 1, paddingVertical: 5,
                                    paddingLeft: 15, borderRadius: 10,
                                    fontSize: 16, backgroundColor: "#EEE"
                                }} placeholder="Select transportation"></TextInput>
                                <TouchableOpacity style={{
                                    position: "absolute",
                                    top: "64%",
                                    left: "95%",
                                    right: 0
                                }} onPress={() => { Transportation.length !== 0 ? setshowTransporatation(!showTransporatation) : "" }}>
                                    <Image style={{
                                        width: 25, height: 25,

                                    }} source={require("../../../assets/DownArrow(1).jpg")}></Image>
                                </TouchableOpacity>
                            </View>
                            {
                                showTransporatation && Transportation.length !== 0 &&
                                <ScrollView style={{
                                    // height: "auto",
                                    maxHeight: "30%",
                                    borderWidth: 2,
                                    backgroundColor: "#EEEEEE",
                                    marginHorizontal: 20,
                                    borderRadius: 10,
                                    paddingHorizontal: 10,
                                    paddingBottom: 18
                                }} nestedScrollEnabled={true}>

                                    <View>

                                        {Transportation.map((item) =>
                                            <TouchableOpacity key={item.Id} onPress={() => setTransportationVal(item.Name)}>
                                                <Text style={{
                                                    fontSize: 18,
                                                    fontWeight: 500,
                                                    marginVertical: 10
                                                }
                                                }>{item.Name}</Text>
                                            </TouchableOpacity>
                                        )
                                        }
                                    </View>

                                </ScrollView>
                            }
                        </View>
                        <ScrollView nestedScrollEnabled={true} style={{ height: "100%" }}>
                            <View style={{ display: "flex", flexDirection: "column", width: "100%", backgroundColor: "white" }}>
                                {ParsedData&&ParsedData.map((item, index) => (
                                    <View key={item.id} style={{ paddingBottom: 20 }}>

                                        <View style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            width: "95%",
                                            backgroundColor: "#FFF",
                                            elevation: 5,
                                            marginHorizontal: 9.5,
                                            marginTop: 15,
                                            borderRadius: 10,
                                            height: 150
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

                                                <Image source={{ uri: baseImageUrl + item.Photos }} style={{ height: "100%", width: "100%", borderRadius: 10 }} ></Image>

                                            </View>
                                            <View style={{
                                                width: "45%",
                                                marginHorizontal: 4,
                                                marginVertical: 10,
                                                borderRadius: 10
                                            }}>
                                                <View style={{ height: "50%" }}>
                                                    <Text style={{
                                                        fontSize: 18,
                                                        fontWeight: 700, color: "#000"
                                                    }}>{item.ArticleNumber}</Text>
                                                    <Text style={{
                                                        fontSize: 14,
                                                        fontWeight: 400, color: "#000"
                                                    }}>{item.StyleDescription}</Text>
                                                </View>
                                                <View style={{ marginTop: "10%", position: "relative", height: "50%" }}>
                                                    <Text style={{
                                                        fontSize: 14,
                                                        fontWeight: 400, color: "#000"
                                                    }}>Rate:</Text>
                                                    <Text style={{
                                                        fontSize: 17,
                                                        fontWeight: 700, color: "#000"
                                                    }}>₹ {item.rate}</Text>
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
                                ))}
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
                                            <Text style={{ fontSize: 18, fontWeight: 500, color: "#00000080", textAlign: "right" }}>₹ {totalrate}</Text>
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
                                            <Text style={{ fontSize: 18, fontWeight: 500, color: "#00000080", textAlign: "right" }}>₹2.7</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: "50%", marginLeft: "45%" }}>

                                        <View style={{ borderWidth: 1 }}>

                                        </View>
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row", paddingVertical: 5 }}>
                                        <View style={{ width: '95%' }}>
                                            <Text style={{ fontSize: 18, fontWeight: 500, color: "#212121", textAlign: "right" }}>₹280.40</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row", paddingVertical: 5 }}>
                                        <View style={{ width: '50%', paddingTop: 2 }}>
                                            <Text style={{ fontSize: 14, fontWeight: 400, color: "#00000080", textAlign: "right" }}>Discount</Text>

                                        </View>
                                        <View style={{ width: '45%' }}>
                                            <Text style={{ fontSize: 18, fontWeight: 500, color: "#212121", textAlign: "right" }}>₹28.04</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: "50%", marginLeft: "45%" }}>

                                        <View style={{ borderWidth: 1 }}>

                                        </View>
                                    </View>
                                </View>

                            </View>
                            <View style={{ display: "flex", backgroundColor:"#FFF", height: "100%", flexDirection: "row" }}>
                                <View style={{width:"50%"}}>
                                    <Pressable style={{
                                        width: 165,
                                        height: 50,
                                        marginLeft:5
                                    }}>
                                        <Text style={{
                                            color: "white",
                                            backgroundColor: "#212121",
                                            borderRadius: 7.6, paddingHorizontal: 33,
                                            paddingBottom:15,
                                            paddingTop:12,
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
                                    paddingLeft: 32,
                                    paddingTop: "2%",
                                    width:"50%"
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
            )}</>

    )
}


export default Orderlist;