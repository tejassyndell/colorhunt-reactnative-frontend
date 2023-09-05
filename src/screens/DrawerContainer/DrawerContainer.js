import React from "react";
import { View, Image, Text,TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import MenuButton from "../../components/MenuButton/MenuButton";

export default function DrawerContainer(props) {
  const { navigation,onPress } = props;

  return (
    <View style={styles.content}>
      <View style={styles.container}>
        <View style={{ width: '100%', height: 50, marginTop: 20, marginBottom: 40, paddingRight: 20, paddingLeft: 10, justifyContent: 'center', flexDirection: "row" }}>
          <View style={{ flexDirection: "row", alignItems: "center", width: '100%', marginTop: 30 }} >

            <Image source={require('../../../assets/sidebaricons/1171274903.png')} style={{ width: 50, height: 50 }} />
            <Text style={{ color: '#ffff', left: 10 }} onPress={() => navigation.navigate("Profile")}>NIRAV SIR</Text>

          </View>
          <View style={{ marginTop: 12 }}>
            <MenuButton
              source={require('../../../assets/sidebaricons/menu.png')}

              onPress={() => {
                navigation.closeDrawer();

              }}
            />
          </View>

          <View>
          </View>
        </View>

          <MenuButton
            title="Orders History"
            source={require("../../../assets/sidebaricons/order.png")}
            onPress={() => {
              navigation.navigate("Orderlist");
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="Cart"
            source={require("../../../assets/sidebaricons/cart.png")}
            onPress={() => {
              navigation.navigate("cart_list");
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="Wishlist"
            source={require("../../../assets/sidebaricons/Wishlist.png")}
            onPress={() => {
              navigation.navigate("Wishlist");
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="Notifications"
            source={require("../../../assets/sidebaricons/notification.png")}
            onPress={() => {
              navigation.navigate("Search");
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="About us"
            source={require("../../../assets/sidebaricons/1000005827.png")}
            onPress={() => {
              navigation.navigate("Search");
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="Contact Us"
            source={require("../../../assets/sidebaricons/1000005828.png")}
            onPress={() => {
              navigation.navigate("Contact");
              navigation.closeDrawer();
            }}
          />

      
         <TouchableOpacity onPress={() =>{
           navigation.navigate("Search");
           navigation.closeDrawer();
         }} style={{flexDirection:'row',marginLeft:10,marginTop:50}}>
      <Image source={require("../../../assets/sidebaricons/download-4.png")} style={{ width: 20, height: 20 }} />
      <Text style={{fontSize:15,color:'#FFF',marginLeft:8}}>Logout</Text>
    </TouchableOpacity>
        <View>


        </View>
        <View style={{ height: '41%', width: '100%', alignItems: "center",justifyContent:'flex-end' }}>
          <Image source={require('../../../assets/sidebaricons/image_98.png')} style={{ width: 161, height: 161, position: 'absolute', bottom: '1%' }} />
          <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 12, position: 'absolute', bottom: '-3%' }}>Design By SYNDELL Inc.</Text>
        </View>
      </View>


    </View>
  );
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};
