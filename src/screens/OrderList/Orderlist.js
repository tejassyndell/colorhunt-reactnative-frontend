import { useLayoutEffect, useState, useEffect } from "react";
import MenuBackArrow from '../../components/menubackarrow/menubackarrow';
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions, TextInput, Pressable, Modal, Platform } from "react-native";
import { addso, gettransportation } from "../../api/api";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const baseImageUrl = 'https://colorhunt.in/colorHuntApi/public/uploads/'
import { TouchableWithoutFeedback } from "react-native";

const Orderlist = (props) => {
    const { navigation } = props;
    const [isLoading, setIsLoading] = useState(true);
    const [destinationVal, setDestinationVal] = useState("");
    const [showTransporatation, setshowTransporatation] = useState(false);
    const [transportationVal, setTransportationVal] = useState();
    const [fillvalue, setValue] = useState(false);
    const [userdata, setUserdata] = useState([]);
    const baseImageUrl = 'https://colorhunt.in/colorHuntApi/public/uploads/'

    // const OldTransportation = ["T-shirte", "Black_shirte", "white_shirte", "Blue_shirte", "Green_shirte"]
    const [Transportation, setTransportation] = useState([])
    const [OldTransportation, setOldTransportation] = useState([])
    const [ParsedData, setParsedData] = useState([])
    const currentDate = new Date()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const windowwidthe = parseInt(Dimensions.get("window").width);
    const windowheight = parseInt(Dimensions.get("window").height);
    const { width, height } = Dimensions.get("window");
    const headerHeight = Platform.OS === 'android' ? (windowwidthe >= 720 ? 120 : 90) : 120;

    useEffect(async()=>{
        let data = await AsyncStorage.getItem('UserData')
        data = await JSON.parse(data)
        setUserdata(data);
    },[])
    const AddSo = async () => {
        let userdata = await AsyncStorage.getItem('UserData')
        userdata = await JSON.parse(userdata)
        let Articldata = ParsedData.map(({ article_id, articleRate, ArticleColor, ArticleOpenFlag, Quantity }) => ({ article_id, articleRate, ArticleColor, ArticleOpenFlag, Quantity }))
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
            NoPacksNew: null
        }
        console.log("-=-=-=-", data);
        await addso(data).then((res) => {
            if (res.status === 200) {
                setIsModalVisible(true);
            }
        })
    }
    const showSuccessModal = () => {
        if (destinationVal) {
            AddSo();
        } else {
            setValue(true)
        }
    };
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
            setTransportationVal(response.data[0].Name)
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
    let gstamount = "";
    if (ParsedData) {
        totalrate = ParsedData.reduce((total, item) => total + parseInt(item.rate), 0);
        gstamount = ParsedData.reduce((total, item) => total + parseInt(item.rate), 0) * 0.05;
    }
    else {
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
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    width: parseInt(windowwidthe) >= 720 ? "100%" : "100%",
                }}>
                    <Text style={{
                        textAlign: "center",
                        fontSize: windowwidthe * 0.05, fontWeight: 700, width: "100%"
                    }}>Sales order</Text>
                </View>
            ),
            headerRight: () =>
                // <View style={{ marginRight: 20, width: 50, height: 40, display: "flex", justifyContent: "center", alignItems: "center" }}>
                //     <TouchableOpacity  onPress={handleGoToOrderList}>
                //     <Image  source={require('../../../assets/sidebaricons/icon.png')} style={{ width: 28, height: 28, borderRadius: 5, backgroundColor: "black" }} ></Image>
                //     </TouchableOpacity>
                <View />,
            headerStyle: {
                height: headerHeight // Increase the header height here
            },

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
                <View style={{ height: "100%", width: "100%", backgroundColor: "white" }}>
                    <ScrollView nestedScrollEnabled={true}>
                        <View style={{ height: "100%", width: "100%", backgroundColor: "white", borderTopColor: "#828282", borderTopWidth: 1, borderStyle: "solid" }}>
                            <View style={{ display: "flex", flexDirection: "column", width: "100%", height: "auto", backgroundColor: "#FFF" }}>
                                <View style={{ paddingHorizontal: "5%", paddingVertical: "2.8%", gap: 5 }}>
                                    <Text style={{ fontSize: windowwidthe < 720 ? windowwidthe * 0.045 : 24, fontWeight: 500, color: "#000" }}>Date</Text>
                                    <View style={{
                                        width: "100%",
                                        borderWidth: 1, paddingVertical: "2.5%",
                                        paddingLeft: '3%', borderRadius: 6,
                                        borderColor: "#E4E7EA",
                                        backgroundColor: "#EEE"
                                    }}
                                    // value={formattedDate}
                                    // disableFullscreenUI
                                    ><Text style={{ color: "#626262", fontSize: windowwidthe < 720 ? windowwidthe * 0.045 : 26, fontWeight: 500 }}>{new Date(currentDate).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    })}</Text></View>

                                </View>
                                <View style={{ paddingHorizontal: "5%", paddingTop: "2.8%", gap: 5 }}>
                                    <Text style={{ fontSize: windowwidthe < 720 ? windowwidthe * 0.045 : 24, fontWeight: 500, color: "#000" }}>Destination</Text>
                                    <TextInput value={destinationVal} style={{
                                        width: "100%",
                                        borderWidth: 1, paddingVertical: "2%",
                                        paddingLeft: '3%', borderRadius: 6,
                                        borderColor: "#E4E7EA",
                                        fontSize: windowwidthe < 720 ? windowwidthe * 0.045 : 26, backgroundColor: "#EEE"
                                    }} onChangeText={(e) => { setDestinationVal(e); e ? setValue(false) : setValue(true) }}></TextInput>
                                    <View>
                                        <Text style={{ fontSize: windowwidthe * 0.03, color: "red", fontWeight: 500 }}>{fillvalue ? "Filed cannot be empty" : ""}</Text>
                                    </View>
                                </View>
                                <View style={{ paddingHorizontal: "5%", paddingBottom: "3%", paddingTop: 2, gap: 5 }}>
                                    <Text style={{ fontSize: windowwidthe < 720 ? windowwidthe * 0.045 : 24, fontWeight: 500, color: "#000" }}>Transportation</Text>

                                    {/* <TextInput  value={transportationVal} onChangeText={(e) => filterTransportationValue(e)}   style={{
                                        width: "100%",
                                        borderWidth: 1, paddingVertical: 5,
                                        paddingLeft: 15, borderRadius: 6,
                                        borderColor: "#E4E7EA",
                                        fontSize: 16, backgroundColor: "#EEE"
                                        
                                    }} editable={false}  placeholder="Select transportation"></TextInput> */}
                                    <View style={{
                                        width: "100%",
                                        borderWidth: 1, paddingVertical: "2.5%",
                                        paddingLeft: "3%", borderRadius: 6,
                                        borderColor: "#E4E7EA",
                                        backgroundColor: "#EEE",
                                        display: "flex",
                                        flexDirection: "row"
                                    }}>
                                        <Text style={{ color: "#626262", fontSize: windowwidthe < 720 ? windowwidthe * 0.045 : 26, fontWeight: 500 }}>{transportationVal}</Text>
                                        <View style={{
                                            position: "absolute",
                                            top: windowwidthe < 720 ? "50%" : "52%",
                                            right: "2.5%",
                                            justifyContent: "center",
                                        }}>
                                            <TouchableOpacity style={{
                                                width: windowwidthe < 720 ? windowwidthe * 0.05 : 30, height: windowwidthe < 720 ? windowwidthe * 0.05 : 30
                                            }} onPress={() => { Transportation.length !== 0 ? setshowTransporatation(!showTransporatation) : "" }}>

                                                <Image style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    resizeMode: "contain"
                                                }} source={require("../../../assets/DownArrow(1).png")}></Image>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                {
                                    showTransporatation && Transportation.length !== 0 &&
                                    <ScrollView style={{
                                        // height: "auto",
                                        maxHeight: "30%",
                                        borderWidth: 1,
                                        backgroundColor: "#EEEEEE",
                                        marginHorizontal: '5%',
                                        borderRadius: 6,
                                        borderColor: "#E4E7EA",
                                        paddingHorizontal: '2.5%',
                                        paddingBottom: '4.5%',
                                        width: "90%",
                                    }} nestedScrollEnabled={true}>

                                        <View>

                                            {Transportation.map((item) =>
                                                <TouchableOpacity key={item.Id} onPress={() => { setTransportationVal(item.Name); setshowTransporatation(!showTransporatation) }}>
                                                    <Text style={{
                                                        fontSize: windowwidthe < 720 ? windowwidthe * 0.045 : 26,
                                                        marginVertical: '2.5%',
                                                        color: "#626262",
                                                        fontWeight: 500
                                                    }
                                                    }>{item.Name}</Text>
                                                </TouchableOpacity>
                                            )
                                            }
                                        </View>

                                    </ScrollView>
                                }
                            </View>
                            <View style={{ display: "flex", flexDirection: "column", height: windowheight * 0.20, width: "100%", }}>
                                <ScrollView nestedScrollEnabled={true} >
                                    {ParsedData && ParsedData.map((item, index) => (
                                        <View key={item.id} style={{ paddingBottom: 20 }}>

                                            <View style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                width: "90%",
                                                backgroundColor: "#FFF",
                                                elevation: 5,
                                                shadowColor: 'gray',
                                                shadowOpacity: 0.5,
                                                marginHorizontal: "5%",
                                                marginTop: "5%",
                                                borderRadius: 10,
                                                height: windowheight * 0.142,
                                                paddingVertical: "1.5%",
                                            }}>
                                                <TouchableOpacity style={{
                                                    width: windowwidthe * 0.18,
                                                    margin: "3.8%",
                                                    marginTop: "1.5%",
                                                    height: windowheight * 0.108,
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    // marginVertical: 10,
                                                    borderRadius: 10,
                                                }} >

                                                    <Image style={{
                                                        flex: 1, resizeMode: "contain", height: '100%', width: "100%",
                                                        borderRadius: 10,
                                                    }} source={{ uri: baseImageUrl + item.Photos.split(',')[0] }}></Image>
                                                </TouchableOpacity>
                                                <View style={{
                                                    width: "60%",
                                                    marginHorizontal: "1%",
                                                    marginBottom: "1%",
                                                    marginTop: "0.8%",
                                                    borderRadius: 10
                                                }}>
                                                    <View style={{ height: "50%", paddingBottom: 1 }}>
                                                        <Text style={{
                                                            fontSize: windowwidthe * 0.035,
                                                            fontWeight: 700,
                                                        }}>{item.ArticleNumber}</Text>
                                                        <Text style={{
                                                            fontSize: windowwidthe * 0.025,
                                                            fontWeight: 400,
                                                        }}>{item.StyleDescription}</Text>
                                                    </View>
                                                    <View style={{ marginTop: "2%", justifyContent: "center", paddingTop: '3%', position: "relative", height: "50%" }}>
                                                        <Text style={{
                                                            fontSize: windowwidthe * 0.035,
                                                            fontWeight: 700,
                                                        }}>₹{item.rate}.00</Text>
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
                            <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
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
                                            padding: 5
                                        }}
                                    >
                                        <Image
                                            source={require("../../../assets/icons/Modalicon.png")}
                                            style={{ width: 100, height: 100, marginBottom: 20, marginTop: 30 }}
                                        />

                                        <Text style={{ fontSize: 32, fontWeight: 700, marginBottom: 10 }}>
                                            Successful!
                                        </Text>

                                        <Text style={{ fontSize: 24, textAlign: "center", marginBottom: 20, fontWeight: 500, color: "rgba(0, 0, 0, 0.70)" }}>
                                            "Your Order Is {"\n"} Confirmed Successfully"
                                        </Text>

                                        <TouchableOpacity
                                            onPress={() => {
                                                setIsModalVisible(false);
                                                navigation.navigate('Home');
                                            }}
                                            style={{
                                                backgroundColor: "black",
                                                width: 189,
                                                height: 50,
                                                borderRadius: 10,
                                                justifyContent: "center",
                                                alignItems: "center",
                                                marginVertical: 20
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: 18,
                                                    fontWeight: 700,
                                                    color: "white",
                                                    paddingHorizontal: 15
                                                }}
                                            >
                                                Continue Shopping
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </Modal>
                    </ScrollView>
                    <View style={{
                        // height:"auto",
                        backgroundColor: "#FFF",
                        position: 'absolute',
                        bottom: 0,
                        paddingHorizontal: '2.5%',
                    }}>
                        <View style={{
                            width: "100%",
                            // height:"100%",
                            display: "flex",
                            flexDirection: "row",

                        }}>
                            <View style={{ width: "100%", justifyContent: "flex-end", alignItems: "flex-end" }}>
                                <View style={{ display: "flex", flexDirection: "row", paddingVertical: '1.0%', width: "100%" }}>
                                    <View style={{ width: '76%', paddingTop: 2, paddingRight: '2%' }}>
                                        <Text style={{ fontSize: width >= 720 ? 22 : 12, fontWeight: 400, color: "#00000080", textAlign: "right" }}>Rate</Text>
                                    </View>
                                    <View style={{ width: '24%' }}>
                                        <Text style={{ fontSize: width >= 720 ? 22 : 12, fontWeight: 500, color: "#00000080", textAlign: "right" }}>₹{totalrate}.00</Text>
                                    </View>
                                </View>
                                {userdata.length > 0 ? userdata[0].GSTNumber && userdata[0].GSTType === "GST" ?
                                    <View style={{ display: "flex", flexDirection: "row", paddingVertical: '1.0%', width: "100%" }}>
                                        <View style={{ width: '76%', paddingTop: 2 }}>
                                            <Text style={{ fontSize: width >= 720 ? 22 : 12, fontWeight: 400, color: "#00000080", textAlign: "right" }}>GST {userdata.length > 0 ? userdata[0].GSTNumber ? "5%" : "0.0%" : ""}</Text>
                                        </View>
                                        <View style={{ width: '24%' }}>
                                            <Text style={{ fontSize: width >= 720 ? 22 : 12, fontWeight: 500, color: "#00000080", textAlign: "right" }}>₹{parseInt(totalrate * 0.05)}.00</Text>
                                        </View>
                                    </View> :
                                    "" : ""}
                                {
                                    userdata.length > 0 ?
                                        userdata[0].GSTType === "IGST" && userdata[0].GSTNumber ?
                                            <>
                                                <View style={{ display: "flex", flexDirection: "row", paddingVertical: '1.0%', width: "100%" }}>
                                                    <View style={{ width: '76%', paddingTop: 2 }}>
                                                        <Text style={{ fontSize: width >= 720 ? 22 : 12, fontWeight: 400, color: "#00000080", textAlign: "right" }}>SGST {userdata.length > 0 ? userdata[0].GSTNumber ? "2.5%" : "0.0%" : ""}</Text>
                                                    </View>
                                                    <View style={{ width: '24%' }}>
                                                        <Text style={{ fontSize: width >= 720 ? 22 : 12, fontWeight: 500, color: "#00000080", textAlign: "right" }}>₹{parseInt(totalrate * 0.025)}.00</Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: "flex", flexDirection: "row", paddingVertical: '1.0%', width: "100%" }}>
                                                    <View style={{ width: '76%', paddingTop: 2 }}>
                                                        <Text style={{ fontSize: width >= 720 ? 22 : 12, fontWeight: 400, color: "#00000080", textAlign: "right" }}>CGST {userdata.length > 0 ? userdata[0].GSTNumber ? "2.5%" : "0.0%" : ""}</Text>
                                                    </View>
                                                    <View style={{ width: '24%' }}>
                                                        <Text style={{ fontSize: width >= 720 ? 22 : 12, fontWeight: 500, color: "#00000080", textAlign: "right" }}>₹{parseInt(totalrate * 0.025)}.00</Text>
                                                    </View>
                                                </View>
                                            </> : "" : ""
                                }
                                <View style={{ width: "30%", marginLeft: "70%" }}>

                                    <View style={{ borderWidth: 0.8 }}>

                                    </View>
                                </View>
                                {/* <View style={{ display: "flex", flexDirection: "row", paddingVertical: '2.5%', width: "100%" }}>
                                    <View style={{ width: '100%' }}>
                                        <Text style={{ fontSize: width >= 720 ? 22 : 12, fontWeight: 500, color: "#212121", textAlign: "right" }}>₹{parseInt(totalrate + gstamount)}.00</Text>
                                    </View>
                                </View> */}
                                {/* <View style={{ display: "flex", flexDirection: "row", paddingVertical: 5 }}>
                                            <View style={{ width: '50%', paddingTop: 2 }}>
                                                <Text style={{ fontSize: 14, fontWeight: 400, color: "#00000080", textAlign: "right" }}>Discount</Text>

                                            </View>
                                            <View style={{ width: '45%' }}>
                                                <Text style={{ fontSize: 18, fontWeight: 500, color: "#212121", textAlign: "right" }}>₹28.04</Text>
                                            </View>
                                        </View> */}
                                {/* <View style={{ width: "30%", marginLeft: "70%" }}>

                                    <View style={{ borderWidth: 0.8 }}>

                                    </View>
                                </View> */}
                            </View>

                        </View>
                        <View style={{ display: "flex", backgroundColor: "#FFF", height: "auto", flexDirection: "row", marginBottom: "5%" }}>
                            <View style={{ width: "50%" }}>
                                <Pressable style={{
                                    // width: windowwidthe < 720 ? windowwidthe * 0.4:"70%",
                                    padding: windowwidthe < 720 ? 12 : 20,
                                    // padin
                                    marginLeft: "2.5%",
                                    backgroundColor: "#212121",
                                    borderRadius: 7.6,
                                    justifyContent: "center"
                                }} onPress={showSuccessModal}>
                                    <Text style={{
                                        color: "white",
                                        fontSize: width >= 720 ? 25 : 15, fontWeight: 600,
                                        textAlign: "center"
                                    }}>
                                        Place Order
                                    </Text>
                                </Pressable>
                            </View>
                            <View style={{
                                display: "flex",
                                flexDirection: "row", gap: 5,
                                // paddingLeft: 30,
                                justifyContent: "flex-end",
                                // paddingTop: "2%",
                                width: "50%",
                                alignItems: "flex-end",
                                height: windowheight * 0.06,
                                gap: 5,
                                paddingBottom: 20,
                                backgroundColor: "#FFF",
                            }}>
                                <View style={{ paddingBottom: 2 }}>
                                    <Text style={{ fontSize: width >= 720 ? 22 : 12, fontWeight: 500 }}>Total price</Text>
                                </View>
                                <View style={{}}>
                                    <Text style={{ fontSize: width >= 720 ? 22 : 12, fontWeight: 700 }}>₹{parseInt(totalrate + gstamount)}.00</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View >
            )}</>

    )
}


export default Orderlist;