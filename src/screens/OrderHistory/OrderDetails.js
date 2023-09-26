import { View, Text, TouchableOpacity, TextInput, ScrollView } from "react-native";
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


    const [tableData, setTableData] = useState({
        tableHead: ['SN', 'ARTICLE', 'CATEGORY', 'SIZE’s','COLORWISE QTY IN PCS','TOTAL QTY','RATE','AMOUNT'],
        tableData: [
            ['1', 'SHIRT ASSORTED (52/67)', 'ASSORTED','','--:1','1','₹195.00','₹195.00', ],
            ['a', 'b', 'c', 'd'],
            ['1', '2', '3', '456\n789'],
            ['a', 'b', 'c', 'd']
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
                        fontSize: 25, fontWeight: 700, width: "100%"
                    }}>Orders Details</Text>
                </View>
            ),
            headerRight: () => <View />,

        });
    }, []);
    return (
        <View style={{ flex: 1, paddingVertical: 10, backgroundColor: '#FFFFFF' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10, alignItems: 'center', paddingEnd: 20 }}>
                <TouchableOpacity style={{ backgroundColor: '#212121', padding: 8, borderTopRightRadius: 10, borderBottomRightRadius: 10 }}>
                    <Text style={{ fontSize: 30, fontWeight: 700, color: '#FFFFFF' }}>NRS(JHCPL)</Text>
                </TouchableOpacity>
                <Text style={{ color: '#808080', fontSize: 20, fontWeight: 700, }}>Date: <Text style={{ color: '#000000', fontSize: 20, fontWeight: 700 }}>11/06/2023</Text></Text>
            </View>
            <View style={{
                flex: 1,
                paddingHorizontal: 20
            }}>
                <TextInput
                    style={{
                        height: 35,
                        width: '100%',
                        borderWidth: 2,
                        borderRadius: 6,
                        borderColor: '#000000',
                        paddingStart: 10,
                        fontSize: 16,
                        color: '#000000',
                        fontWeight: 'bold'
                    }}
                    value='NIRAV SIR'
                />
                <Textarea
                    containerStyle={{
                        height: 120,
                        padding: 5,
                        borderWidth: 2,
                        borderRadius: 6,

                        borderColor: '#000000',
                        marginTop: 10,
                        backgroundColor: '#FFFFFF',

                    }}
                    style={{
                        textAlignVertical: 'top',  // hack android
                        height: 170,
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#000000',
                    }}
                    // onChangeText={this.onChange}
                    // defaultValue={this.state.text}
                    maxLength={50}
                    placeholder={'AHMEDABAD, GUJARAT, INDIA-380001'}
                    placeholderTextColor={'#000000'}
                    underlineColorAndroid={'transparent'}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                    <TextInput
                        style={{
                            height: 35,
                            width: '48%',
                            borderWidth: 2,
                            borderRadius: 6,
                            borderColor: '#000000',
                            paddingStart: 10,
                            fontSize: 16,
                            color: '#000000',
                            fontWeight: 'bold'
                        }}
                        value='NRS(JHCPL)33/23-24'
                    />
                    <TextInput
                        style={{
                            height: 35,
                            width: '48%',
                            borderWidth: 2,
                            borderRadius: 6,
                            borderColor: '#808080',
                            paddingStart: 10,
                            fontSize: 16,
                            color: '#000000',
                            fontWeight: 'bold'
                        }}
                        // value='NIRAV SIR'
                        placeholder="Transport"
                    />

                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                    <TextInput
                        style={{
                            height: 35,
                            width: '48%',
                            borderWidth: 2,
                            borderRadius: 6,
                            borderColor: '#808080',
                            paddingStart: 10,
                            fontSize: 16,
                            color: '#000000',
                            fontWeight: 'bold'
                        }}
                        // value='NIRAV SIR'
                        placeholder="GST"
                    />
                    <TextInput
                        style={{
                            height: 35,
                            width: '48%',
                            borderWidth: 2,
                            borderRadius: 6,
                            borderColor: '#808080',
                            paddingStart: 10,
                            fontSize: 16,
                            color: '#000000',
                            fontWeight: 'bold'
                        }}
                        // value='NIRAV SIR'
                        placeholder="Remarks"
                    />

                </View>
            </View>
            <ScrollView
      nestedScrollEnabled={true}
      keyboardShouldPersistTaps="handled"
      style={{ maxWidth: '100%', backgroundColor: '#fff' }}
    >
        <ScrollView horizontal={true} style={{ paddingVertical: 10 }}>
      <View style={{ paddingVertical: 10 ,flex:1 }}>
          <View style={{flex:1 }}>
            <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
              {/* Fixed Header Row */}
              <Row
                data={tableData.tableHead}
                style={{
                  height: 40,
                  backgroundColor: '#f1f8ff',
                  width: 'auto',
                   // Make sure the header row is displayed horizontally
                }}
                textStyle={{ margin: 6 }}
              />
            </Table>
          </View>
          <View style={{flex:1 }}>
            <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
              {/* Data Rows */}
              <Rows
                data={tableData.tableData}
                textStyle={{ margin: 6 }}
              />
            </Table>
          </View>
      </View>
        </ScrollView>
    </ScrollView>

        </View>

    )
}


export default OrderDetails;