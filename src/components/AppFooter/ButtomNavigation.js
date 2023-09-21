import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const ButtomNavigation = (props) => {
  const route = useRoute();
  const { isLoggedIn } = route.params?.isLoggedIn||true;

const {navigation , page} = props; 
  //   const navigation = useNavigation();

  const HomePage = () => {
    isLoggedIn ? navigation.navigate("Home") : "";
  };

  const OrderList = () => {
    isLoggedIn ? navigation.navigate("") : "";
  };

  const CartPage = () => {
    isLoggedIn ? navigation.navigate("cart_list") : "";
  };

  const NotificationPage = () => {
    isLoggedIn ? navigation.navigate("") : "";
  };

  const ProfilePage = () => {
    isLoggedIn ? navigation.navigate("Profile") : "";
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          width: "96%",
          height: 70,
          backgroundColor: "#212121",
          flexDirection: "row",
          marginLeft: "2%",
          marginRight: "2%",
          marginBottom: "4%",
          borderRadius: 20,
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
            source={page==="home"?require("../../../assets/AppFooterIcons/Home_down_nav_icone.png"):require("../../../assets/deselect_home.png")}
            style={{ width: 45, height: 45 }}
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
            style={{ width: 45, height: 45 }}
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
            style={{ width: 45, height: 45 }}
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
            style={{ width: 45, height: 45 }}
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
            source={page==="profile"?require("../../../assets/select_profile.png"):require("../../../assets/AppFooterIcons/Profile_down_nav_icone.png")}
            style={{ width: 45, height: 45 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ButtomNavigation;
