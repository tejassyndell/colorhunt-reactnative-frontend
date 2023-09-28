import { View, Text, TouchableOpacity, TextInput, ScrollView, Dimensions } from "react-native";
import MenuBackArrow from '../../components/menubackarrow/menubackarrow';
import { useLayoutEffect } from "react";
import React, { useState } from 'react';
import { useRoute } from "@react-navigation/native";
import { Table, Row, Rows } from 'react-native-table-component';
import Textarea from 'react-native-textarea';
const OrderDetails = (props) => {
    const { navigation } = props;
    const route = useRoute()
    const { sonumber } = route.params;
    const [newPrint, setNewPrint] = useState(false);
    const { width, height } = Dimensions.get("window");


    console.log(newPrint);
    const [tableData, setTableData] = useState({
        tableHead: ['SN', 'ARTICLE', 'CATEGORY', 'SIZE’s', 'COLORWISE QTY IN PCS', 'TOTAL QTY', 'RATE', 'AMOUNT'],
        tableData: [
            ['1', 'SHIRT ASSORTED (52/67)', 'ASSORTED', '', '--:1', '1', '₹195.00', '₹195.00',],
            ['2', 'SHIRT ASSORTED (52/67)', 'ASSORTED', '', '--:1', '1', '₹195.00', '₹195.00',],
            ['3', 'SHIRT ASSORTED (52/67)', 'ASSORTED', '', '--:1', '1', '₹195.00', '₹195.00',],
            ['4', 'SHIRT ASSORTED (52/67)', 'ASSORTED', '', '--:1', '1', '₹195.00', '₹195.00',],
            ['5', 'SHIRT ASSORTED (52/67)', 'ASSORTED', '', '--:1', '1', '₹195.00', '₹195.00',],
            


        ],
    });


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

        });
    }, []);
    const widthArr = width >= 720 ? [40, 200, 100, 60, 250, 100, 100, 100] : [40, 200, 100, 60, 200, 90, 100, 100];

    // Calculate column-wise totals
    const columnTotals = tableData.tableData.reduce((totals, rowData) => {
        for (let i = 0; i < rowData.length; i++) {
            totals[i] = (totals[i] || 0) + parseFloat(rowData[i] || 0);
        }
        return totals;
    }, []);




    return (
        <View style={{ flex: 1, paddingVertical: 10, backgroundColor: '#FFFFFF', height: '100%' }}>
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
                                        }}>PARTY : <Text style={{ borderRightWidth: 2,fontSize: width >= 720 ? 18 : 15, borderColor: '#000000', fontWeight: 400, paddingLeft: 3, paddingTop: width >= 720 ? 10 : 9, }}>NIRAV SIR</Text></Text>
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
                                            paddingLeft:5,
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
                                        <Text style={{ width: 600, borderRightWidth: 2, borderColor: '#000000', fontWeight: 'bold', paddingLeft: 3,fontSize: width >= 720 ? 18 : 15, paddingTop: width >= 720 ? 10 : 9, }}>ADDRESS : <Text style={{ borderRightWidth: 2, borderColor: '#000000', fontWeight: 400, paddingLeft: 3, paddingTop: width >= 720 ? 10 : 9, }}>AHMEDABAD, GUJARAT, INDIA-380001</Text></Text>
                                        {/* <Text style={{ width: 100, borderRightWidth: 2, borderColor: '#000000' }}></Text> */}
                                        <Text style={{ width: 90, borderRightWidth: 2, borderColor: '#000000', textAlign: 'center', fontWeight: 'bold',fontSize: width >= 720 ? 18 : 15, paddingTop: width >= 720 ? 10 : 9, }}>SO NO:</Text>
                                        <Text style={{ width: width >= 720 ? 200 : 160, textAlign: 'center', fontWeight: 400,fontSize: width >= 720 ? 18 : 15, paddingTop: width >= 720 ? 10 : 9, }}>NRS(JHCPL)33/23-24</Text>
                                    </View>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        height: width >= 720 ? 50 : 40,
                                        borderColor: '#000000',
                                        borderWidth: 1,
                                    }}>
                                        <Text style={{ width: 800, borderColor: '#000000', fontWeight: 'bold', paddingLeft: 3,fontSize: width >= 720 ? 18 : 15, paddingTop: width >= 720 ? 10 : 9, }}>TRANSPORT :  </Text>

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
                                        <Text style={{ width: 90, borderRightWidth: 2, borderColor: '#000000', textAlign: 'center', fontWeight: 'bold',fontSize: width >= 720 ? 18 : 15, paddingTop: width >= 720 ? 10 : 9, }}>REMARK S</Text>
                                        <Text style={{ width: 160, textAlign: 'center', fontWeight: 400, paddingTop: width >= 720 ? 10 : 9, }}></Text>
                                    </View>
                                </View>
                                <View style={{ marginTop: 50 }}>
                                    <Table borderStyle={{ borderWidth: 2, borderColor: '#000000', }}>
                                        {/* Fixed Header Row */}
                                        <Row
                                            data={tableData.tableHead}
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
                                    <ScrollView vertical={true} style={{ maxHeight: width >= 720 ? 450 : 80  }}>
                                        <Table borderStyle={{ borderWidth: 2, borderColor: '#000000' }}>
                                            {/* Data Rows */}
                                            <Rows
                                                data={tableData.tableData}
                                                textStyle={{ margin: 6, textAlign: 'center', fontSize: width >= 720 ? 16:13 }}
                                                        style={{
                                                            height: width >= 720 ? 50:40,
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
                            <Text style={{ fontSize: 30, fontWeight: 700, color: '#FFFFFF' }}>NRS(JHCPL)</Text>
                        </TouchableOpacity>
                        <Text style={{ color: '#808080', fontSize: width >= 720 ? 25 : 20, fontWeight: 700, }}>Date: <Text style={{ color: '#000000', fontSize: width >= 720 ? 25 : 20, fontWeight: 700 }}>11/06/2023</Text></Text>
                    </View>
                    <View style={{
                        flex: 1,
                        paddingHorizontal: 20
                    }}>
                        <TextInput
                            style={{
                                height: width >= 720 ? 45:35,
                                width: '100%',
                                borderWidth: 2,
                                borderRadius: 6,
                                borderColor: '#000000',
                                paddingStart: 10,
                                fontSize: width >= 720 ? 20 : 16,
                                color: '#000000',
                                fontWeight: 'bold'
                            }}
                            value='NIRAV SIR' />
                        <Textarea
                            containerStyle={{
                                height: width >= 720 ? 120:80,
                                padding: 5,
                                borderWidth: 2,
                                borderRadius: 6,

                                borderColor: '#000000',
                                marginTop: 10,
                                backgroundColor: '#FFFFFF',
                            }}
                            style={{
                                textAlignVertical: 'top',
                                height: width >= 720 ? 200:170,
                                fontSize: width >= 720 ? 20 : 16,
                                fontWeight: 'bold',
                                color: '#000000',
                            }}
                            
                            maxLength={width >= 720 ? 200:100}
                            placeholder={'AHMEDABAD, GUJARAT, INDIA-380001'}
                            placeholderTextColor={'#000000'}
                            underlineColorAndroid={'transparent'} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                            <TextInput
                                style={{
                                    height: width >= 720 ? 45:35,

                                    width: '48%',
                                    borderWidth: 2,
                                    borderRadius: 6,
                                    borderColor: '#000000',
                                    paddingStart: 10,
                                    fontSize: width >= 720 ? 20 : 16,
                                    color: '#000000',
                                    fontWeight: 'bold'
                                }}
                                value='NRS(JHCPL)33/23-24' />
                            <TextInput
                                style={{
                                    height: width >= 720 ? 45:35,

                                    width: '48%',
                                    borderWidth: 2,
                                    borderRadius: 6,
                                    borderColor: '#808080',
                                    paddingStart: 10,
                                    fontSize: width >= 720 ? 20 : 16,
                                    color: '#000000',
                                    fontWeight: 'bold'
                                }}
                                // value='NIRAV SIR'
                                placeholder="Transport" />

                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                            <TextInput
                                style={{
                                    height: width >= 720 ? 45:35,

                                    width: '48%',
                                    borderWidth: 2,
                                    borderRadius: 6,
                                    borderColor: '#808080',
                                    paddingStart: 10,
                                    fontSize: width >= 720 ? 20 : 16,
                                    color: '#000000',
                                    fontWeight: 'bold'
                                }}
                                // value='NIRAV SIR'
                                placeholder="GST" />
                            <TextInput
                                style={{
                                    height: width >= 720 ? 45:35,

                                    width: '48%',
                                    borderWidth: 2,
                                    borderRadius: 6,
                                    borderColor: '#808080',
                                    paddingStart: 10,
                                    fontSize: width >= 720 ? 20 : 16,
                                    color: '#000000',
                                    fontWeight: 'bold'
                                }}
                                // value='NIRAV SIR'
                                placeholder="Remarks" />

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
                                                    data={tableData.tableHead}
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
                                                        data={tableData.tableData}
                                                        textStyle={{ margin: 6, textAlign: 'center', fontSize: width >= 720 ? 16:13 }}
                                                        style={{
                                                            height: width >= 720 ? 50:40,
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
                                                    <Text style={{ width: width >= 720 ? 100 : 90, borderRightWidth: 2, borderColor: '#000000', textAlign: 'center', fontWeight: 'bold', paddingTop: width >= 720 ? 10 : 9, }}>5</Text>
                                                    <Text style={{ width: 100, borderRightWidth: 2, borderColor: '#000000' }}></Text>
                                                    <Text style={{ width: 98, textAlign: 'center', fontWeight: 'bold', paddingTop: width >= 720 ? 10 : 9, }}>₹195.00</Text>
                                                </View>
                                            </ScrollView>
                                        </View>
                                    </View>
                                </ScrollView>
                            </ScrollView>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => setNewPrint(true)} style={{ alignItems: 'flex-end', marginRight: 10 }}>

                            <Text style={{ 
                                width: width >= 720 ? 40 : 30, 
                                height: width >= 720 ? 40 : 30, 
                                backgroundColor: '#000000', color: '#FFFFFF', borderRadius: 5, textAlign: 'center', fontSize: width >= 720 ? 24 : 19, fontWeight: 'bold' }}>2</Text>
                        </TouchableOpacity>
                    </View>
                </>)}



        </View>

    )
}


export default OrderDetails;