import { useLayoutEffect, useState, useEffect } from "react";
import MenuBackArrow from '../../components/menubackarrow/menubackarrow';
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, Pressable, Modal } from "react-native";
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
    const [fillvalue,setValue]=useState(false);
    const baseImageUrl = 'https://colorhunt.in/colorHuntApi/public/uploads/'

    // const OldTransportation = ["T-shirte", "Black_shirte", "white_shirte", "Blue_shirte", "Green_shirte"]
    const [Transportation, setTransportation] = useState([])
    const [OldTransportation, setOldTransportation] = useState([])
    const [ParsedData, setParsedData] = useState([])
    const currentDate = new Date()
    const [isModalVisible, setIsModalVisible] = useState(false);

    const AddSo = async () => {
        let Articldata = ParsedData.map(({ article_id, articleRate, ArticleColor, ArticleOpenFlag, Quantity }) => ({ article_id, articleRate, ArticleColor, ArticleOpenFlag, Quantity }))
        const data = {
            Date: currentDate,
            Destination: destinationVal,
            Transporter: transportationVal,
            GSTType: "GST",
            GST: "",
            GST_Percentage: "",
            PartyId: 197,
            Remarks: "",
            SoNumberId: "Add",
            UserId: 38,
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
        if(destinationVal){
            AddSo();
        }else{
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
                        navigation.goBack();
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
                <View />,
               
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
                                <View style={{ paddingHorizontal: 20, paddingVertical: 10 ,gap:5}}>
                                    <Text style={{ fontSize: 18, fontWeight: 500, color: "#000" }}>Date</Text>
                                    <View style={{
                                        width: "100%",
                                        borderWidth: 1, paddingVertical: 10,
                                        paddingLeft: 15, borderRadius: 6,
                                        borderColor: "#E4E7EA",
                                        fontSize: 18, backgroundColor: "#EEE"
                                    }}
                                    // value={formattedDate}
                                    // disableFullscreenUI
                                    ><Text style={{color:"#626262",fontSize:18,fontWeight:500}}>{formattedDate}</Text></View>

                                </View>
                                <View style={{ paddingHorizontal: 20,paddingTop:8,gap:5 }}>
                                    <Text style={{ fontSize: 18, fontWeight: 500, color: "#000" }}>Destination</Text>
                                    <TextInput value={destinationVal} style={{
                                        width: "100%",
                                        borderWidth: 1, paddingVertical: 5,
                                        paddingLeft: 15, borderRadius: 6,
                                        borderColor: "#E4E7EA",
                                        color:"#626262",
                                        fontSize: 18, backgroundColor: "#EEE"
                                    }} onChangeText={(e) => { setDestinationVal(e); e?setValue(false):setValue(true)}}></TextInput>
                                    <View>
                                        <Text style={{color:"red",fontWeight:500}}>{fillvalue?"Filed cannot be empty":""}</Text>
                                    </View>
                                </View>
                                <View style={{ paddingHorizontal: 20 ,paddingBottom:10,paddingTop:2,gap:5}}>
                                    <Text style={{ fontSize: 18, fontWeight: 500, color: "#000" }}>Transportation</Text>

                                    {/* <TextInput  value={transportationVal} onChangeText={(e) => filterTransportationValue(e)}   style={{
                                        width: "100%",
                                        borderWidth: 1, paddingVertical: 5,
                                        paddingLeft: 15, borderRadius: 6,
                                        borderColor: "#E4E7EA",
                                        fontSize: 16, backgroundColor: "#EEE"
                                        
                                    }} editable={false}  placeholder="Select transportation"></TextInput> */}
                                    <View style={{
                                        width: "100%",
                                        borderWidth: 1, paddingVertical: 10,
                                        paddingLeft: 15, borderRadius: 6,
                                        borderColor: "#E4E7EA",
                                        fontSize: 16, backgroundColor: "#EEE",
                                        display: "flex",
                                        flexDirection: "row"
                                    }}>
                                        <Text style={{color:"#626262",fontSize:18,fontWeight:500}}>{transportationVal}</Text>
                                        <TouchableOpacity style={{
                                            position: "absolute",
                                            top: "64%",
                                            left: "95%",
                                            right: 0
                                        }} onPress={() => { Transportation.length !== 0 ? setshowTransporatation(!showTransporatation) : "" }}>

                                            <Image style={{
                                                width: 20, height: 20,

                                            }} source={require("../../../assets/DownArrow(1).png")}></Image>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {
                                    showTransporatation && Transportation.length !== 0 &&
                                    <ScrollView style={{
                                        // height: "auto",
                                        maxHeight: "30%",
                                        borderWidth: 1,
                                        backgroundColor: "#EEEEEE",
                                        marginHorizontal: 20,
                                        borderRadius: 6,
                                        borderColor: "#E4E7EA",
                                        paddingHorizontal: 10,
                                        paddingBottom: 18,
                                        width: "90%",
                                    }} nestedScrollEnabled={true}>

                                        <View>

                                            {Transportation.map((item) =>
                                                <TouchableOpacity key={item.Id} onPress={() => { setTransportationVal(item.Name); setshowTransporatation(!showTransporatation) }}>
                                                    <Text style={{
                                                        fontSize: 16,
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
                            <View style={{ display: "flex", flexDirection: "column", height: 380, width: "100%", backgroundColor: "#FFFFFF" }}>
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
                                                marginHorizontal: 20,
                                                marginTop: 15,
                                                borderRadius: 10,
                                                height: 150,
                                                paddingVertical: 5,
                                                backgroundColor: "#FFF"
                                            }}>
                                                <View style={{
                                                    width: "35%",
                                                    // height: 102.746,
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    marginVertical: 10,
                                                    borderRadius: 10,
                                                }}>

                                                    <Image source={{ uri: baseImageUrl + item.Photos }} style={{
                                                        height: "100%",
                                                        width: "70%", borderRadius: 10,
                                                    }} ></Image>

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
                                                        }}>Rate</Text>
                                                        <Text style={{
                                                            fontSize: 17,
                                                            fontWeight: 700, color: "#000"
                                                        }}>₹{item.rate}.00</Text>
                                                    </View>
                                                </View>
                                                {/* <View style={{
                                                width: "15%",
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "flex-end",
                                                gap: 8,
                                                marginLeft: 15,
                                                marginVertical: 10,
                                                borderRadius: 10,

                                            }}>
                                            </View> */}
                                            </View>
                                        </View>
                                    ))}
                                </ScrollView>
                            </View>
                            <View style={{
                                height: 250,
                                // height:"auto",
                                backgroundColor: "#FFF",
                                paddingHorizontal:10
                            }}>
                                <View style={{
                                    width: "100%",
                                    // height:"100%",
                                    display: "flex",
                                    flexDirection: "row",
                                    paddingTop: 30
                                }}>
                                    <View style={{ width: "100%", paddingLeft: "60%" }}>
                                        <View style={{ display: "flex", flexDirection: "row", paddingVertical: 5 }}>
                                            <View style={{ width: '50%', paddingTop: 2,paddingRight:4 }}>
                                                <Text style={{ fontSize: 14, fontWeight: 400, color: "#00000080", textAlign: "right"}}>Rate</Text>
                                            </View>
                                            <View style={{ width: '45%' }}>
                                                <Text style={{ fontSize: 18, fontWeight: 500, color: "#00000080", textAlign: "right" }}>₹{totalrate}.00</Text>
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
                                        {/* <View style={{ display: "flex", flexDirection: "row", paddingVertical: 5 }}>
                                            <View style={{ width: '50%', paddingTop: 2 }}>
                                                <Text style={{ fontSize: 14, fontWeight: 400, color: "#00000080", textAlign: "right" }}>Discount</Text>

                                            </View>
                                            <View style={{ width: '45%' }}>
                                                <Text style={{ fontSize: 18, fontWeight: 500, color: "#212121", textAlign: "right" }}>₹28.04</Text>
                                            </View>
                                        </View> */}
                                        <View style={{ width: "50%", marginLeft: "45%" }}>

                                            <View style={{ borderWidth: 1 }}>

                                            </View>
                                        </View>
                                    </View>

                                </View>
                                <View style={{ display: "flex", backgroundColor: "#FFF", height: "auto", flexDirection: "row" }}>
                                    <View style={{ width: "50%" }}>
                                        <Pressable style={{
                                            width: 165,
                                            height: 50,
                                            marginLeft: 5
                                        }} onPress={showSuccessModal}>
                                            <Text style={{
                                                color: "white",
                                                backgroundColor: "#212121",
                                                borderRadius: 7.6, paddingHorizontal: 33,
                                                paddingBottom: 15,
                                                paddingTop: 12,
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
                                        // paddingLeft: 30,
                                        justifyContent: "flex-end",
                                        // paddingTop: "2%",
                                        width: "50%",
                                        alignItems: "flex-end",
                                        height: 50,
                                        gap: 5,
                                        paddingBottom: 20, paddingRight: 4
                                    }}>
                                        <View style={{ paddingBottom: 2 }}>
                                            <Text style={{ fontSize: 15, fontWeight: 500 }}>Total price</Text>
                                        </View>
                                        <View style={{}}>
                                            <Text style={{ fontSize: 20, fontWeight: 700 }}>₹500.00</Text>
                                        </View>
                                    </View>
                                </View>
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
                </View>
            )}</>

    )
}


export default Orderlist;