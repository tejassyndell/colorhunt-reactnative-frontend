const { View, Text, Image, TouchableOpacity } = require("react-native")
import MenuBackArrow from '../../components/menubackarrow/menubackarrow';
import { useState, useLayoutEffect } from 'react';
import { Pressable } from 'react-native';
import { StyleSheet } from 'react-native';

const OrderHistory = (props) => {
    const { navigation } = props;
    const [isLoading, setIsLoading] = useState(true);
    const [toggle, setToggle] = useState(true)
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
            headerRight: () => <View />
        });
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.first_cnt}>
                <View style={styles.pendin_complete_cnt}>
                    <View style={styles.pc_btn_cnt}>
                        <View style={{ width: "49%" }}>
                            <Pressable style={toggle ? styles.pending_btn : styles.complete_btn} onPress={() => setToggle(!toggle)}>
                                <Text style={toggle ? styles.pending_text : styles.complete_text}>Pending</Text>
                            </Pressable>
                        </View>
                        <View style={{ width: "49%" }}>
                            <Pressable style={toggle ? styles.complete_btn : styles.pending_btn} onPress={() => setToggle(!toggle)}>
                                <Text style={toggle ? styles.complete_text : styles.pending_text}>Completed</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                <View style={styles.calender_cnt}>
                    <View style={{ padding: 10,paddingRight:25 }}>
                        <TouchableOpacity onPress={()=>console.log("calender")}>
                            
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
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
        backgroundColor: "pink"
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
        backgroundColor: "lightgreen",
        display: 'flex',
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-end"
    }
});