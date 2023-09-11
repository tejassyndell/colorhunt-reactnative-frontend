import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, Pressable } from "react-native";
import { useLayoutEffect } from "react";
import MenuBackArrow from '../../components/menubackarrow/menubackarrow';
import { useEffect, useState } from "react";
import axios from 'axios'
import { ActivityIndicator } from "react-native";
import { cartdetails, deletecartitem } from "../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseImageUrl = 'https://colorhunt.in/colorHuntApi/public/uploads/'

const AddToCart = (props) => {
    const { navigation } = props;
    const [isLoading, setIsLoading] = useState(true);

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
                    width: "100%"
                }}>
                    <Text style={{
                        textAlign: "center",
                        fontSize: 25, fontWeight: 700, width: "100%"
                    }}>Cart</Text>
                </View>
            ),
            headerRight: () => <View />
        });
    }, []);


    // const navigate = useNavigate()
    const [promoCode, setPromoCode] = useState('')
    const [orderItems, setOrderItems] = useState([])

    const cartDetails = async () => {
        await cartdetails().then((response) => {
            // console.log('Api response :', response.data)
            const parsedOrderItems = response.data.map((item) => ({
                ...item,
                Quantity: JSON.parse(item.Quantity),
            }))
            setOrderItems(parsedOrderItems)
            setIsLoading(false);
        })
            .catch((error) => {
                console.log('Error fetching data:', error)
            })
    }
    useEffect(() => {
        cartDetails();
    }, [])

    const handlePromoCodeChange = (event) => {
        setPromoCode(event.target.value)
    }

    const handleApplyPromoCode = () => {
        // Implement logic to apply the promo code here
    }

    const handleAddMoreItems = () => {
        navigation.navigate("Home");
    }

    const handleGoBack = () => {
        //   navigate(-1)
    }

    const handleGoToOrderList = () => {
        //   navigate('/orderplaced')
    }

    const handleProceedToCheckout = () => {
        const datatopass = [orderItems]
        console.log(orderItems);
        AsyncStorage.setItem('Orderlist', JSON.stringify(orderItems));
        navigation.navigate('Orderlist');
    }

    const handleDeleteOrder = async (article_id) => {
        // console.log(article_id);
        const data = {
            party_id: 197,
            article_id: article_id,
        }
        try {
            await deletecartitem(data);
            const updatedcartitems = orderItems.filter((item) => item.article_id !== article_id)
            setOrderItems(updatedcartitems)
            console.log("Done");
        } catch (error) {
            console.log('Erro deleting article:', error)
        }
    }
    const handleEditOrder = (article_id) => {
        const id = article_id
        navigation.navigate('DetailsOfArticals',{ id });

    }
    const totalItems = orderItems.length
    const totalPrice = orderItems.reduce((total, item) => total + item.rate, 0)
    const cartIsEmpty = orderItems.length === 0

    const getSingaleartical = (item) => {
        const ArticalId = item.article_id
        // console.log(ArticalId)
        //   navigate(`/Articles-details/${ArticalId}`) // Pass the ArticalId as a URL parameter to /Articles-details screen
        navigation.navigate("DetailsOfArticals", { id: ArticalId });
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
                orderItems.length === 0 ? 
                <View style={{ width: "100%", height: "100%", paddingTop: 50, alignItems: "center" }}>
                    <Text style={{ fontSize: 40, fontWeight: "bolder", top: 200, textAlign: 'center', fontWeight: 700, color: "#808080" }}>Your Cart is {"\n"} Empty</Text>
                    <TouchableOpacity
                        style={{
                            width: 189,
                            height: 50,
                            borderRadius: 10,
                            backgroundColor: "black",
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: 380,
                        }}
                        onPress={() => navigation.navigate("Home")}
                    >
                        <Text style={{ color: "white" }}>Create Order</Text>
                    </TouchableOpacity>


                </View>
            : 
                <View style={{ width: "100%", height: "100%", backgroundColor: "#FFF",borderTopColor: "#828282", borderTopWidth: 1 }}>
                    <View style={{ width: "100%", backgroundColor: "#FFF" }}>

                        <ScrollView nestedScrollEnabled={true}  >
                            <View style={{ width: "100%", backgroundColor: "#FFF", borderTopColor: "black", }}>
                                <ScrollView nestedScrollEnabled={true} style={{ backgroundColor: "#FFF", height: "auto", maxHeight: 450 }}>
                                    <View style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                                        <View style={{ paddingBottom: 20 }}>
                                            {orderItems.map((item) =>
                                                <View key={item.id} style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    width: "95%",
                                                    backgroundColor: "#FFF",
                                                    elevation: 10,
                                                    shadowColor:"gray",
                                                    marginHorizontal: 9.5,
                                                    marginTop: 15,
                                                    borderRadius: 10,
                                                    height: 150,
                                                    paddingVertical: 5,

                                                    // maxHeight: "45%"
                                                }}>
                                                    <View style={{
                                                        width: "35%",
                                                        // width: 120,
                                                        // height: 102.746,
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        marginLeft: 2,
                                                        marginVertical: 10,
                                                        borderRadius: 10,
                                                    }}>
                                                        <Image style={{
                                                            height: "100%",
                                                            width: "68%",
                                                            borderRadius: 10,
                                                        }} resizeMode="cover" source={{ uri: baseImageUrl + item.Photos.split(',')[0] }}></Image>
                                                    </View>
                                                    <View style={{
                                                        width: "35%",
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
                                                        <TouchableOpacity
                                                            onPress={() => handleEditOrder(item.article_id)}
                                                        >

                                                            <Image alt="edite"
                                                                style={{ width: 20, height: 20, backgroundColor: "green" }} source={require("../../../assets/edite1.png")}></Image>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            onPress={() => handleDeleteOrder(item.article_id)}
                                                        >
                                                            <Image alt="Delete"
                                                                style={{ width: 20, height: 20, backgroundColor: "black" }} source={require("../../../assets/delete1.png")}></Image>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            )}
                                        </View>
                                    </View>
                                </ScrollView>

                            </View>
                        </ScrollView>




                        <View >
                            <View nestedScrollEnabled={true} style={{ width: "100%", backgroundColor: "#FFF" }}>
                                <View style={{ padding: 10 }}>
                                    <TextInput
                                        value={promoCode}
                                        onChange={handlePromoCodeChange}
                                        style={{
                                            width: "100%",
                                            height: 56,
                                            borderWidth: 1, paddingVertical: 18,
                                            paddingLeft: 15, borderRadius: 10,
                                            fontSize: 18, backgroundColor: "#EEE", borderColor: "#E4E7EA"
                                        }} keyboardType="default" placeholder="Promo Code">
                                    </TextInput>
                                    <Pressable onPress={handleApplyPromoCode} style={{
                                        width: "100%",
                                        position: "absolute",
                                        top: "30.5%",
                                        left: "74%",
                                        right: 0
                                    }}>
                                        <Text style={{
                                            color: "white",
                                            backgroundColor: "#212121",
                                            borderRadius: 7.6, width: 100, paddingHorizontal: 18,
                                            paddingVertical: 9,
                                            fontSize: 18, fontWeight: 600,
                                            textAlign: "center"
                                        }}>Apply</Text>
                                    </Pressable>
                                </View>

                                {/* </View> */}

                            </View>

                        </View>

                    </View>
                    <View style={{
                        position: 'absolute',
                        bottom: 0,
                        backgroundColor: "#FFF",
                        width: '100%'
                    }}>
                        <View style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "flex-end",
                            width: "100%",
                            backgroundColor: "#FFF",
                            marginBottom: "2%"
                        }}>
                            <Pressable onPress={handleAddMoreItems} style={{ marginRight: 10 }}>
                                <Text style={{
                                    color: "white",
                                    backgroundColor: "#212121",
                                    borderRadius: 7.6, width: 150, paddingHorizontal: 22,
                                    paddingVertical: 9,
                                    fontSize: 18, fontWeight: 600,
                                    textAlign: "center"
                                }}>
                                    Add More
                                </Text>
                            </Pressable>
                        </View>
                        <View style={{
                            display: "flex",
                            flexDirection: "row", gap: 5,
                            width: "100%",
                            justifyContent:"flex-end",
                            alignItems:"flex-end",
                            paddingRight:12,
                            marginTop:6
                        }}>
                            <Text style={{ fontSize: 12, fontWeight: 700}}>Total price</Text>
                        </View>
                        <View style={{
                            display: "flex",
                            flexDirection: "row",
                            backgroundColor: "#FFF"
                        }}>
                            <View style={{ width: "50%", paddingLeft: "2.8%", marginBottom: 4 }}>
                                <Text style={{ fontSize: 18, fontWeight: 600 }}>Total ({totalItems} item) :</Text>
                            </View>
                            <View style={{
                                display: "flex",
                                flexDirection: "row", gap: 5,
                                width: "50%",
                                justifyContent:"flex-end",
                                alignItems:"flex-end",
                                paddingRight:12,
                                // paddingLeft: "14%"
                            }}>
                                <Text style={{ fontSize: 18, fontWeight: 700 }}>₹{totalPrice}.00</Text>
                            </View>
                        </View>
                        <View style={{ padding: 10 }}>
                            <Pressable disabled={totalPrice != 0 ? false : true} style={{ width: "100%" }} onPress={handleProceedToCheckout}>
                                <Text style={{
                                    color: "white",
                                    backgroundColor: totalPrice != 0 ? "#212121" : "#212121B2",
                                    borderRadius: 10, paddingHorizontal: 20,
                                    paddingVertical: 15,
                                    fontSize: 18, fontWeight: 600,
                                    textAlign: "left"
                                }}>
                                    Proceed to Checkout
                                </Text>
                                <Image style={{
                                    width: 30, height: 30,
                                    position: "absolute",
                                    top: "20%",
                                    left: "89%",
                                    right: 0
                                }} source={require("../../../assets/arrow(1).png")}></Image>
                            </Pressable>
                        </View>
                    </View>
                </View>
            
                    )
            }
        </>

    )
}

export default AddToCart;