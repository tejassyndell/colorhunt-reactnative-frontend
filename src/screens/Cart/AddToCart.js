import { View, Text , Image, ScrollView} from "react-native";
import { useLayoutEffect } from "react";
import MenuBackArrow from '../../components/menubackarrow/menubackarrow';

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
            <View style={{marginRight:20,width:50,height:40,display:"flex",justifyContent:"center",alignItems:"center"}}>
                <Image source={require('../../../assets/sidebaricons/cart.png')} style={{ width:20, height:20 ,borderRadius:1, backgroundColor:"black" }} ></Image>
            </View>,
        });
    }, []);
    return (
        <View>
           <View style={{height:"100%",width:"100%",backgroundColor:"white",borderTopColor:"black",borderWidth:1,borderStyle:"solid"}}>
                <View style={{height:"60%",width:"100%",backgroundColor:"lightgreen"}}>
                    <ScrollView style={{height:"60%",width:"100%",backgroundColor:"lightred"}}>
                        <View>

                        </View>
                    </ScrollView>
                </View>
           </View>
        </View>
    )
}

export default AddToCart;