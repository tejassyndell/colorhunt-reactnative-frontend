import { View, Text, TouchableOpacity,Image } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const ButtomNavigation = (props) => {
  const route = useRoute();
  const {navigation} = props; 
//   const navigation = useNavigation();




  const HomePage = () =>{
    navigation.navigate('Home');
   
  }

  const OrderList = () => {
    navigation.navigate('');
  }
 

  const CartPage = () =>{
    navigation.navigate("cart_list")
  }

  const NotificationPage = () =>{
    navigation.navigate('')
  }

  const ProfilePage = () =>[
    navigation.navigate("Profile")
  ]
 

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          width: "98%",
          height: 70,
          backgroundColor: "#212121",
          flexDirection: "row",
          marginLeft:5,
          marginBottom:10,
          borderRadius:20,
          justifyContent: "space-evenly",
        }}
      >
        <TouchableOpacity
          style={{
            width: "20%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={HomePage}

        >
          <Image
            source={require("../../../assets/AppFooterIcons/Home_down_nav_icone.png")}
            style={{ width: 30, height: 30 }}
            
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "20%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={OrderList}
          
        >
          <Image
            source={require("../../../assets/AppFooterIcons/order_down_nav_icone.png")}
            style={{ width: 30, height: 30 }}
            
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "20%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={CartPage}
        >
          <Image
            source={require("../../../assets/AppFooterIcons/cart_down_nav_icone.png")}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "20%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={NotificationPage}
        >
          <Image
            source={require("../../../assets/AppFooterIcons/Notification_down_nav_icone.png")}
            style={{ width: 30, height: 35 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "20%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={ProfilePage}
        >
          <Image
            source={require("../../../assets/AppFooterIcons/Profile_down_nav_icone.png")}
            style={{ width: 30, height: 35 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ButtomNavigation;
