import { View, Text , Image} from "react-native";
import { useLayoutEffect } from "react";
import MenuBackArrow from '../../components/menubackarrow/menubackarrow';
import cartIcone from '../../../assets/sidebaricons/cart.png';
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
            <View >
                <Image source={cartIcone}></Image>
            </View>,
        });
    }, []);
    return (
        <View>
            <Text>AddToCart</Text>
        </View>
    )
}

export default AddToCart;