import { View, Text, TouchableOpacity, TextInput, ScrollView, Dimensions, Image, Platform, ActivityIndicator } from "react-native";
import MenuBackArrow from '../../components/menubackarrow/menubackarrow';
import { useEffect, useLayoutEffect } from "react";
import React, { useState } from 'react';
import { ThemeProvider, useRoute } from "@react-navigation/native";
import { Table, Row, Rows } from 'react-native-table-component';
import Textarea from 'react-native-textarea';
import { getSoArticleDetails } from "../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import RNHTMLtoPDF from "react-native-html-to-pdf"

const OrderDetails = (props) => {
    const { navigation } = props;
    const route = useRoute()
    const { sonumber, CreatedDate, remarks, transport = null, gst = null,name="",endyear=0,startyear=0 ,OutwardNumber=0} = route.params;
    console.log(remarks, "{}{}{}{}{}{}{}{}");
    const [newPrint, setNewPrint] = useState(false);
    const [isloading, setIsLoading] = useState(true);
    const { width, height } = Dimensions.get("window");
    const [partydata, setpartydata] = useState();
    const [sodetails, setsodetials] = useState([]);
    const headerHeight = Platform.OS === 'android' ? (width >= 720 ? 120 : 100) : 120;

    console.log(newPrint);


    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={{ marginTop: 2 }}>
                    <MenuBackArrow
                        onPress={() => {
                            navigation.navigate('ordershistroy');
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
                        fontSize: width >= 720 ? 35 : 25,
                        fontWeight: 700, width: "100%"
                    }}>Orders Details</Text>
                </View>
            ),
            headerRight: () => <View />,
            headerStyle: {
                height: headerHeight // Increase the header height here
            },


        });
    }, []);
    const widthArr = width >= 720 ? [40, 200, 100, 60, 250, 100, 100, 100] : [40, 200, 100, 60, 200, 90, 100, 100];

    // Calculate column-wise total
    const columnTotals = tableData ? tableData.tableData.reduce((totals, rowData) => {
        for (let i = 0; i < rowData.length; i++) {
            totals[i] = (totals[i] || 0) + parseFloat(rowData[i] || 0);
        }
        return totals;
    }, []) : ""

    const transformArticleSize = (articleSize) => {
        const sizes = JSON.parse(articleSize).map((size) => size.Name);
        return sizes.join(', ');
    };
    const transformSodetailsToTableData = (sodetails) => {
        return sodetails.map((item, index) => {
            // Parse ArticleSize JSON string to extract sizes
            const sizes = JSON.parse(item.ArticleSize).map(sizeObj => sizeObj.Name).join(', ');

            // Parse ArticleColor JSON string to extract color names
            const colors = item.ArticleColor.length > 0 ? JSON.parse(item.ArticleColor).map(colorObj => colorObj.Name) : "";

            // Split OutwardNoPacks by commas and map to integers
            const outwardNoPacksArray = item.OutwardNoPacks.split(',').map(value => parseInt(value, 10));

            // Calculate the total quantity from OutwardNoPacks
            const totalQuantity = outwardNoPacksArray.reduce((accumulator, quantity) => accumulator + quantity, 0);

            // Combine ArticleColor and OutwardNoPacks
            const colorPacksCombination = (

                <View style={{ flexDirection: 'row', flexWrap: "wrap", justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                    {colors.length > 0 ? colors.map((color, i) => (
                        <Text key={i} style={{ marginHorizontal: 2 }}>
                            <Text style={{ fontWeight: 'bold' }}>{color ? color : "--"}:</Text>
                            {String(outwardNoPacksArray[i] || 0).padStart(2, '0')}<Text>,</Text>
                        </Text>
                    )) : outwardNoPacksArray.map((nopack, i) => (
                        <Text key={i} style={{ marginHorizontal: 2 }}>
                            <Text style={{ fontWeight: 'bold' }}>--:</Text>
                            {String(nopack || 0).padStart(2, '0')}<Text>,</Text>
                        </Text>))}
                </View>
            );

            // Calculate the total amount for this item
            const totalAmount = item.ArticleRate * totalQuantity;

            return [
                (index + 1).toString(), // SN
                item.Title, // ARTICLE
                item.CategoryId.toString(), // CATEGORY (You may need to map CategoryId to the actual category name)
                sizes, // SIZE's
                colorPacksCombination, // COLOR:PACKS combination
                totalQuantity.toString(), // TOTAL QTY
                '₹' + item.ArticleRate + '.00', // RATE
                '₹' + totalAmount.toFixed(2), // AMOUNT
            ];
        });
    };


    const [tableData, setTableData] = useState({});
    const [totalval, setotalval] = useState(0);
    const [totalqty, settotalqty] = useState(0)
    const settotle = (sodetails) => {
        let totalRate = 0;

        sodetails.forEach((item) => {
            const outwardNoPacksArray = item.OutwardNoPacks.split(',').map((value) => parseInt(value, 10));
            const articleRate = parseInt(item.ArticleRate);

            // Calculate the total rate for this item based on quantities in OutwardNoPacks
            const itemTotalRate = outwardNoPacksArray.reduce((accumulator, quantity) => {
                return accumulator + quantity * articleRate;
            }, 0);

            // Add the item's total rate to the overall total
            totalRate += itemTotalRate;
        });
        setotalval(totalRate)
    }
    const settotalqut = (sodetails) => {
        let totalOutwardNoPacks = 0;

        sodetails.forEach((item) => {
            const outwardNoPacksArray = item.OutwardNoPacks.split(',').map((value) => parseInt(value, 10));

            // Calculate the sum of quantities in OutwardNoPacks for this item
            const itemTotalOutwardNoPacks = outwardNoPacksArray.reduce((accumulator, quantity) => {
                return accumulator + quantity;
            }, 0);

            // Add the item's total quantity to the overall total
            totalOutwardNoPacks += itemTotalOutwardNoPacks;
        });
        settotalqty(totalOutwardNoPacks);
    }
    const orderdetils = async () => {
        let ptdata = await AsyncStorage.getItem('UserData')
        ptdata = JSON.parse(ptdata);
        if (ptdata !== null) {
            setpartydata(ptdata);
            console.log(ptdata);
        } else {
            console.log('No data found');
        }

        const date = new Date(CreatedDate);

        // Format the Date object as desired
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 to month because it's zero-based
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        // Formatted date string
        const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        const data = {
            sonumber: parseInt(sonumber),
            party_id: ptdata[0].Id,
            CreatedDate: formattedDateTime
        }
        await getSoArticleDetails(data).then((res) => {
            if (res.status === 200) {
                console.log(res.data);
                setTableData({
                    tableHead: ['SN', 'ARTICLE', 'CATEGORY', 'SIZES', 'COLORWISE QTY IN PCS', 'TOTAL QTY', 'RATE', 'AMOUNT'],
                    tableData: sodetails ? transformSodetailsToTableData(res.data) : [],
                })

                settotle(res.data)
                settotalqut(res.data)
                setsodetials(res.data)
                setIsLoading(false)

                // console.log(res.data);
            }
        })
    }
    const calculateRowHeight = (rowData) => {
        // You can adjust this logic based on your data and requirements
        // For example, you can calculate the height based on the length of text in the row.
        const textLength = rowData.someField.length; // Adjust to the actual field in your data
        console.log(textLength * 40, 'ksadksakndk');
        return textLength * 40; // Adjust the multiplier based on your desired row height calculation
    };

    useEffect(() => {
        orderdetils()
    }, [])
    useEffect(() => { console.log(sodetails); }, [sodetails])

    const generatePDF = async () => {

    }
    const getgstamount = (val) => {
        console.log(typeof val);
        let gsttotal = val * 0.05;
        let totalamount = val + gsttotal;
        return parseInt(totalamount);
    }

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
                </View> : <View style={{ flex: 1, paddingVertical: 10, backgroundColor: '#FFFFFF', height: '100%' }}>
                    {newPrint === true ? (
                        <View>
                            <TouchableOpacity style={{ backgroundColor: '#212121', padding: 8, }}>
                                <Text style={{ fontSize: 30, fontWeight: 700, color: '#FFFFFF', textAlign: 'center' }}>NRS(JHCPL)</Text>
                            </TouchableOpacity>
                            <ScrollView
                                nestedScrollEnabled={true}
                                keyboardShouldPersistTaps="handled"
                                style={{ maxWidth: '100%', backgroundColor: '#fff' }}
                            >
                                <ScrollView horizontal={true} style={{ paddingVertical: 10 }}>
                                    <View style={{ paddingVertical: 10, }}>
                                        <View>
                                            <View style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                height: width >= 720 ? 50 : 40,
                                                borderColor: '#000000',
                                                borderWidth: 1,
                                            }}>
                                                <Text style={{
                                                    width: 600,
                                                    borderRightWidth: 2,
                                                    borderColor: '#000000',
                                                    fontWeight: 'bold',
                                                    paddingLeft: 3,
                                                    fontSize: width >= 720 ? 18 : 15,
                                                    paddingTop: width >= 720 ? 10 : 9,
                                                }}>PARTY : <Text style={{ borderRightWidth: 2, fontSize: width >= 720 ? 18 : 15, borderColor: '#000000', fontWeight: 400, paddingLeft: 3, paddingTop: width >= 720 ? 10 : 9, }}>{partydata[0].Name}</Text></Text>
                                                {/* <Text style={{ width: 100, borderRightWidth: 2, borderColor: '#000000' }}></Text> */}
                                                <Text style={{
                                                    width: 90,
                                                    borderRightWidth: 2,
                                                    borderColor: '#000000',
                                                    textAlign: 'center',
                                                    fontWeight: 'bold',
                                                    paddingTop: width >= 720 ? 10 : 9,
                                                    fontSize: width >= 720 ? 18 : 15
                                                }}>DATE:</Text>
                                                <Text style={{
                                                    width: 100,
                                                    textAlign: 'center',
                                                    fontWeight: 400,
                                                    paddingLeft: 5,
                                                    paddingTop: width >= 720 ? 10 : 9,
                                                    fontSize: width >= 720 ? 18 : 15
                                                }}>15/06/2023</Text>
                                            </View>
                                            <View style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                height: width >= 720 ? 50 : 40,
                                                borderColor: '#000000',
                                                borderWidth: 1,
                                            }}>
                                                <Text style={{ width: 600, borderRightWidth: 2, borderColor: '#000000', fontWeight: 'bold', paddingLeft: 3, fontSize: width >= 720 ? 18 : 15, paddingTop: width >= 720 ? 10 : 9, }}>ADDRESS : <Text style={{ borderRightWidth: 2, borderColor: '#000000', fontWeight: 400, paddingLeft: 3, paddingTop: width >= 720 ? 10 : 9, }}>AHMEDABAD, GUJARAT, INDIA-380001</Text></Text>
                                                {/* <Text style={{ width: 100, borderRightWidth: 2, borderColor: '#000000' }}></Text> */}
                                                <Text style={{ width: 90, borderRightWidth: 2, borderColor: '#000000', textAlign: 'center', fontWeight: 'bold', fontSize: width >= 720 ? 18 : 15, paddingTop: width >= 720 ? 10 : 9, }}>SO NO:</Text>
                                                <Text style={{ width: width >= 720 ? 200 : 160, textAlign: 'center', fontWeight: 400, fontSize: width >= 720 ? 18 : 15, paddingTop: width >= 720 ? 10 : 9, }}>{`${name}${sonumber}/${startyear}-${endyear}`}</Text>
                                            </View>
                                            <View style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                height: width >= 720 ? 50 : 40,
                                                borderColor: '#000000',
                                                borderWidth: 1,
                                            }}>
                                                <Text style={{ width: 800, borderColor: '#000000', fontWeight: 'bold', paddingLeft: 3, fontSize: width >= 720 ? 18 : 15, paddingTop: width >= 720 ? 10 : 9, }}>TRANSPORT :  </Text>

                                            </View>
                                            <View style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                height: width >= 720 ? 50 : 40,
                                                borderColor: '#000000',
                                                borderWidth: 1,
                                            }}>
                                                <Text style={{ width: 600, borderRightWidth: 2, borderColor: '#000000', fontWeight: 'bold', paddingLeft: 3, fontSize: width >= 720 ? 18 : 15, paddingTop: width >= 720 ? 10 : 9, }}>GST : <Text style={{ borderRightWidth: 2, borderColor: '#000000', fontWeight: 400, paddingLeft: 3, paddingTop: width >= 720 ? 10 : 9, }}></Text></Text>
                                                {/* <Text style={{ width: 100, borderRightWidth: 2, borderColor: '#000000' }}></Text> */}
                                                <Text style={{ width: 90, borderRightWidth: 2, borderColor: '#000000', textAlign: 'center', fontWeight: 'bold', fontSize: width >= 720 ? 18 : 15, paddingTop: width >= 720 ? 10 : 9, }}>REMARK S</Text>
                                                <Text style={{ width: 160, textAlign: 'center', fontWeight: 400, paddingTop: width >= 720 ? 10 : 9, }}></Text>
                                            </View>
                                        </View>
                                        <View style={{ marginTop: 50 }}>
                                            <Table borderStyle={{ borderWidth: 2, borderColor: '#000000', }}>
                                                {/* Fixed Header Row */}
                                                <Row
                                                    data={tableData ? tableData.tableHead : ""}
                                                    textStyle={{ textAlign: 'center', fontWeight: 'bold', fontSize: width >= 720 ? 18 : 15, }}

                                                    style={{
                                                        height: 60,
                                                        // Make sure the header row is displayed horizontally
                                                    }}
                                                    widthArr={widthArr}

                                                />
                                            </Table>
                                        </View>
                                        <View >
                                            <ScrollView vertical={true} style={{ maxHeight: width >= 720 ? 450 : 80 }}>
                                                <Table borderStyle={{ borderWidth: 2, borderColor: '#000000' }}>
                                                    {/* Data Rows */}
                                                    <Rows
                                                        data={tableData ? tableData.tableData : ""}
                                                        textStyle={{ margin: 6, textAlign: 'center', fontSize: width >= 720 ? 16 : 13 }}
                                                        style={{
                                                            height: width >= 720 ? 50 : 'auto',
                                                            paddingHorizontal: 20,
                                                            width: 'auto',
                                                        }}
                                                        widthArr={widthArr} // Apply column widths to the data rows
                                                    />
                                                </Table>
                                            </ScrollView>
                                            <ScrollView>
                                                <View style={{
                                                    flex: 1,
                                                    flexDirection: 'row',
                                                    height: 40,
                                                    borderColor: '#000000',
                                                    borderWidth: 2,

                                                }}>
                                                    <Text style={{ width: width >= 720 ? 650 : 600, borderRightWidth: 2, borderColor: '#000000', fontWeight: 'bold', paddingLeft: 3, paddingTop: width >= 720 ? 10 : 9, }}>TOTAL</Text>
                                                    <Text style={{ width: 90, borderRightWidth: 2, borderColor: '#000000', textAlign: 'center', fontWeight: 'bold', paddingTop: width >= 720 ? 10 : 9, }}>5</Text>
                                                    <Text style={{ width: 100, borderRightWidth: 2, borderColor: '#000000' }}></Text>
                                                    <Text style={{ width: 94, textAlign: 'center', fontWeight: 'bold', paddingTop: width >= 720 ? 10 : 9, }}>₹195.00</Text>
                                                </View>
                                            </ScrollView>
                                        </View>
                                    </View>
                                </ScrollView>
                            </ScrollView>
                        </View>) : (<>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10, alignItems: 'center', paddingEnd: 20 }}>
                                <TouchableOpacity style={{ backgroundColor: '#212121', padding: 8, borderTopRightRadius: 10, borderBottomRightRadius: 10 }}>
                                    <Text style={{ fontSize: 30, fontWeight: 700, color: '#FFFFFF' }}>{name}</Text>
                                </TouchableOpacity>
                                <Text style={{ color: '#808080', fontSize: width >= 720 ? 25 : 20, fontWeight: 700, }}>Date: <Text style={{ color: '#000000', fontSize: width >= 720 ? 25 : 20, fontWeight: 700 }}>{new Date(CreatedDate).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                })}</Text></Text>
                            </View>
                            <View style={{
                                flex: 1,
                                paddingHorizontal: 20
                            }}>
                                <View>
                                    <Text style={{ fontSize: width < 720 ? width * 0.040 : 24, fontWeight: 500, color: "#808080" }}>Name:</Text>
                                </View>
                                <View
                                    style={{
                                        height: width >= 720 ? 45 : 35,
                                        width: '100%',
                                        borderWidth: 2,
                                        borderRadius: 6,
                                        borderColor: '#000000',
                                        paddingStart: 10,
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Text style={{
                                        fontSize: width >= 720 ? 20 : 16,
                                        color: '#000000',
                                        fontWeight: 'bold'
                                    }}>{partydata ? partydata[0].Name : ""}</Text>
                                </View>

                                <View style={{ marginTop: 10 }}>
                                    <Text style={{ fontSize: width < 720 ? width * 0.040 : 24, fontWeight: 500, color: "#808080" }}>Address:</Text>
                                </View>
                                <View
                                    style={{
                                        textAlignVertical: 'top',
                                        height: width >= 720 ? 200 : 170,
                                        height: width >= 720 ? 120 : 80,
                                        padding: 5,
                                        borderWidth: 2,
                                        borderRadius: 6,
                                        borderColor: '#000000',
                                        backgroundColor: '#FFFFFF',
                                    }}
                                >
                                    <Text style={{
                                        fontSize: width >= 720 ? 20 : 16,
                                        fontWeight: 'bold',
                                        color: partydata ? '#000000' : "#00000080",
                                    }}>{partydata ? partydata[0].Address : "Address"}</Text>
                                </View>
                                <View style={{ marginTop: 10, flexDirection: "row" }}>
                                    <View style={{ flex: 1.1 }}>
                                        <Text style={{ fontSize: width < 720 ? width * 0.040 : 24, fontWeight: 500, color: "#808080" }}>SoNumber:</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontSize: width < 720 ? width * 0.040 : 24, fontWeight: 500, color: "#808080" }}>Transport:</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View
                                        style={{
                                            height: width >= 720 ? 45 : 35,
                                            width: '48%',
                                            borderWidth: 2,
                                            borderRadius: 6,
                                            borderColor: '#000000',
                                            paddingStart: 10,
                                            justifyContent: "center"
                                        }}
                                    >
                                        <Text style={{
                                            fontSize: width >= 720 ? 20 : 16,
                                            color: '#000000',
                                            fontWeight: 'bold'
                                        }}adjustsFontSizeToFit={true} numberOfLines={1}>{`${name}${OutwardNumber!==0?OutwardNumber:sonumber}/${startyear}-${endyear}`}</Text>
                                    </View>

                                    <View
                                        style={{
                                            height: width >= 720 ? 45 : 35,
                                            width: '48%',
                                            borderWidth: 2,
                                            borderRadius: 6,
                                            borderColor: transport !== null ? "black" : '#808080',
                                            paddingStart: 10,
                                            justifyContent: "center"
                                        }}
                                    >
                                        <Text style={{
                                            fontSize: width >= 720 ? 20 : 16,
                                            color: '#000000',
                                            fontWeight: 'bold',
                                            color: transport !== null ? "black" : "#00000080"
                                        }}>{transport !== null ? transport : "Transport"}</Text>
                                    </View>


                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <Text style={{ fontSize: width < 720 ? width * 0.040 : 24, fontWeight: 500, color: "#808080" }}>GST:</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: "nowrap" }}>

                                    <View
                                        style={{
                                            height: width >= 720 ? 45 : 35,
                                            width: '100%',
                                            borderWidth: 2,
                                            borderRadius: 6,
                                            borderColor: partydata.length > 0 ? partydata[0].GSTNumber !== null ? "black" : "#00000080" : "#00000080",
                                            paddingStart: 10,
                                            justifyContent: "center"
                                        }}
                                    >
                                        <Text style={{
                                            fontSize: width >= 720 ? 20 : 16,
                                            color: '#000000',
                                            fontWeight: 'bold',
                                            color: partydata.length > 0 ? partydata[0].GSTNumber !== null ? "black" : "#00000080" : "#00000080"
                                        }}>{partydata.length > 0 ? partydata[0].GSTNumber !== null ? partydata[0].GSTNumber : "GST" : "GST"}</Text>
                                    </View>

                                    {/* <View
                                        style={{
                                            height: width >= 720 ? 45 : 35,
                                            width: '48%',
                                            borderWidth: 2,
                                            borderRadius: 6,
                                            borderColor: remarks !== "" ? "black" : '#808080',
                                            paddingStart: 10,
                                            justifyContent: 'center'
                                        }}
                                    // value='NIRAV SIR'
                                    >
                                        <Text style={{
                                            fontSize: width >= 720 ? 20 : 16,
                                            color: '#000000',
                                            fontWeight: 'bold',
                                            color: remarks !== "" ? "black" : "#00000080"
                                        }}>{remarks !== "" ? remarks : "Remarks"}</Text>
                                    </View> */}

                                </View>
                                <View>
                                    <ScrollView
                                        nestedScrollEnabled={true}
                                        keyboardShouldPersistTaps="handled"
                                        style={{ maxWidth: '100%', backgroundColor: '#fff' }}
                                    >
                                        <ScrollView horizontal={true} style={{ paddingVertical: 10 }}>
                                            <View style={{ paddingVertical: 10, }}>
                                                <View>
                                                    <Table borderStyle={{ borderWidth: 2, borderColor: '#000000' }}>
                                                        {/* Fixed Header Row */}
                                                        <Row
                                                            data={tableData ? tableData.tableHead : ""}
                                                            textStyle={{ textAlign: 'center', fontWeight: 'bold', fontSize: width >= 720 ? 18 : 15, }}

                                                            style={{
                                                                height: 60,
                                                                // Make sure the header row is displayed horizontally
                                                            }}
                                                            widthArr={widthArr} />
                                                    </Table>
                                                </View>
                                                <View>
                                                    <ScrollView vertical={true} style={{ maxHeight: width >= 720 ? 450 : 80 }}>
                                                        <Table borderStyle={{ borderWidth: 2, borderColor: '#000000' }}>
                                                            {/* Data Rows */}
                                                            <Rows
                                                                data={tableData ? tableData.tableData : ""}
                                                                textStyle={{ margin: 6, textAlign: 'center', fontSize: width >= 720 ? 16 : 13 }}
                                                                style={({ index }) => ({
                                                                    height: calculateRowHeight(tableData.tableData[index]), // Call a function to calculate row height based on content
                                                                    width: 'auto',
                                                                })}
                                                                widthArr={widthArr} // Apply column widths to the data rows
                                                            />
                                                        </Table>
                                                    </ScrollView>

                                                    <ScrollView>
                                                        <View style={{
                                                            flex: 1,
                                                            flexDirection: 'row',
                                                            height: 40,
                                                            borderColor: '#000000',
                                                            borderWidth: 1,
                                                            borderTopWidth: 2
                                                        }}>
                                                            <Text style={{ width: width >= 720 ? 650 : 600, borderRightWidth: 2, borderColor: '#000000', fontWeight: 'bold', paddingLeft: 3, paddingTop: width >= 720 ? 10 : 9, }}>TOTAL</Text>
                                                            <Text style={{ width: width >= 720 ? 100 : 90, borderRightWidth: 2, borderColor: '#000000', textAlign: 'center', fontWeight: 'bold', paddingTop: width >= 720 ? 10 : 9, }}>{totalqty}</Text>
                                                            <Text style={{ width: 100, borderRightWidth: 2, borderColor: '#000000' }}></Text>
                                                            <Text style={{ width: 98, textAlign: 'center', fontWeight: 'bold', paddingTop: width >= 720 ? 10 : 9, }}>₹{totalval}.00</Text>
                                                        </View>
                                                    </ScrollView>
                                                    {partydata.length > 0 ?
                                                        partydata[0].GSTType === "GST" ?
                                                            <ScrollView>
                                                                <View style={{
                                                                    flex: 1,
                                                                    flexDirection: 'row',
                                                                    height: 40,
                                                                    borderColor: '#000000',
                                                                    borderWidth: 1,
                                                                    borderTopWidth: 2
                                                                }}>
                                                                    <Text style={{ width: width >= 720 ? 650 : 600, borderRightWidth: 2, borderColor: '#000000', fontWeight: 'bold', paddingLeft: 3, paddingTop: width >= 720 ? 10 : 9, }}></Text>
                                                                    <Text style={{ width: width >= 720 ? 100 : 90, borderRightWidth: 2, borderColor: '#000000', textAlign: 'center', fontWeight: 'bold', paddingTop: width >= 720 ? 10 : 9, }}></Text>
                                                                    <Text style={{ width: 100, borderRightWidth: 2, borderColor: '#000000', borderRightWidth: 2, borderColor: '#000000', textAlign: 'center', fontWeight: 'bold', paddingTop: width >= 720 ? 10 : 9, }}>GST 5%</Text>
                                                                    <Text style={{ width: 98, textAlign: 'center', fontWeight: 'bold', paddingTop: width >= 720 ? 10 : 9, }}>₹{parseInt(totalval * 0.05)}.00</Text>
                                                                </View>
                                                                <View style={{
                                                                    flex: 1,
                                                                    flexDirection: 'row',
                                                                    height: 40,
                                                                    borderColor: '#000000',
                                                                    borderWidth: 1,
                                                                    borderTopWidth: 1
                                                                }}>
                                                                    <Text style={{ width: width >= 720 ? 650 : 600, borderRightWidth: 2, borderColor: '#000000', fontWeight: 'bold', paddingLeft: 3, paddingTop: width >= 720 ? 10 : 9, }}>TOTAL</Text>
                                                                    <Text style={{ width: width >= 720 ? 100 : 90, borderRightWidth: 2, borderColor: '#000000', textAlign: 'center', fontWeight: 'bold', paddingTop: width >= 720 ? 10 : 9, }}></Text>
                                                                    <Text style={{ width: 100, borderRightWidth: 2, borderColor: '#000000' }}></Text>
                                                                    <Text style={{ width: 98, textAlign: 'center', fontWeight: 'bold', paddingTop: width >= 720 ? 10 : 9, }}>₹{getgstamount(totalval)}.00</Text>
                                                                </View>
                                                            </ScrollView> :
                                                            "" :
                                                        ""
                                                    }
                                                    {partydata.length > 0 ?
                                                        partydata[0].GSTType === "IGST" ?
                                                            <ScrollView>
                                                                <View style={{
                                                                    flex: 1,
                                                                    flexDirection: 'row',
                                                                    height: 40,
                                                                    borderColor: '#000000',
                                                                    borderWidth: 1,
                                                                }}>
                                                                    <Text style={{ width: width >= 720 ? 650 : 600, borderRightWidth: 2, borderColor: '#000000', fontWeight: 'bold', paddingLeft: 3, paddingTop: width >= 720 ? 10 : 9, }}></Text>
                                                                    <Text style={{ width: width >= 720 ? 100 : 90, borderRightWidth: 2, borderColor: '#000000', textAlign: 'center', fontWeight: 'bold', paddingTop: width >= 720 ? 10 : 9, }}></Text>
                                                                    <Text style={{ width: 100, borderRightWidth: 2, borderColor: '#000000', borderRightWidth: 2, borderColor: '#000000', textAlign: 'center', fontWeight: 'bold', paddingTop: width >= 720 ? 10 : 9, }}>SGST 2.5%</Text>
                                                                    <Text style={{ width: 98, textAlign: 'center', fontWeight: 'bold', paddingTop: width >= 720 ? 10 : 9, }}>₹{parseInt(totalval * 0.025)}.00</Text>
                                                                </View>
                                                                <View style={{
                                                                    flex: 1,
                                                                    flexDirection: 'row',
                                                                    height: 40,
                                                                    borderColor: '#000000',
                                                                    borderWidth: 1,
                                                                }}>
                                                                    <Text style={{ width: width >= 720 ? 650 : 600, borderRightWidth: 2, borderColor: '#000000', fontWeight: 'bold', paddingLeft: 3, paddingTop: width >= 720 ? 10 : 9, }}></Text>
                                                                    <Text style={{ width: width >= 720 ? 100 : 90, borderRightWidth: 2, borderColor: '#000000', textAlign: 'center', fontWeight: 'bold', paddingTop: width >= 720 ? 10 : 9, }}></Text>
                                                                    <Text style={{ width: 100, borderRightWidth: 2, borderColor: '#000000', borderRightWidth: 2, borderColor: '#000000', textAlign: 'center', fontWeight: 'bold', paddingTop: width >= 720 ? 10 : 9, }}>CGST 2.5%</Text>
                                                                    <Text style={{ width: 98, textAlign: 'center', fontWeight: 'bold', paddingTop: width >= 720 ? 10 : 9, }}>₹{parseInt(totalval * 0.025)}.00</Text>
                                                                </View>
                                                                <ScrollView>
                                                                    <View style={{
                                                                        flex: 1,
                                                                        flexDirection: 'row',
                                                                        height: 40,
                                                                        borderColor: '#000000',
                                                                        borderWidth: 1,
                                                                        borderTopWidth: 1
                                                                    }}>
                                                                        <Text style={{ width: width >= 720 ? 650 : 600, borderRightWidth: 2, borderColor: '#000000', fontWeight: 'bold', paddingLeft: 3, paddingTop: width >= 720 ? 10 : 9, }}>TOTAL</Text>
                                                                        <Text style={{ width: width >= 720 ? 100 : 90, borderRightWidth: 2, borderColor: '#000000', textAlign: 'center', fontWeight: 'bold', paddingTop: width >= 720 ? 10 : 9, }}></Text>
                                                                        <Text style={{ width: 100, borderRightWidth: 2, borderColor: '#000000' }}></Text>
                                                                        <Text style={{ width: 98, textAlign: 'center', fontWeight: 'bold', paddingTop: width >= 720 ? 10 : 9, }}>₹{getgstamount(totalval)}.00</Text>
                                                                    </View>
                                                                </ScrollView>
                                                            </ScrollView> : "" : ""}

                                                </View>
                                            </View>
                                        </ScrollView>
                                    </ScrollView>
                                </View>
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => generatePDF()} style={{ alignItems: 'flex-end', marginRight: 10 }}>

                                    {/* <Text style={{
                                width: width >= 720 ? 40 : 30,
                                height: width >= 720 ? 40 : 30,
                                backgroundColor: '#000000', color: '#FFFFFF', borderRadius: 5, textAlign: 'center', fontSize: width >= 720 ? 24 : 19, fontWeight: 'bold'
                            }}>2</Text> */}
                                    <View style={{
                                        width: width >= 720 ? 70 : 50,
                                        height: width >= 720 ? 70 : 50,
                                        borderRadius: 5
                                    }}>
                                        <Image source={require("../../../assets/pdf.png")} style={{ width: "100%", height: "100%", resizeMode: 'contain' }} >

                                        </Image>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </>)}



                </View>}
        </>


    )
}


export default OrderDetails;