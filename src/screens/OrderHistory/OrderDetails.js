import { View, Text } from "react-native";
import MenuBackArrow from '../../components/menubackarrow/menubackarrow';
import { useLayoutEffect } from "react";
import { useRoute } from "@react-navigation/native";
const OrderDetails = (props) => {
    const { navigation } = props;
    const route = useRoute()
    const {sonumber} = route.params;
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
        <View>
            <Text>Orders Details  {sonumber}</Text>
        </View>
    )
}

export default OrderDetails;