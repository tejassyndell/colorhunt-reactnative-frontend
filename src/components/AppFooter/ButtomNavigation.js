import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Footersvg from "../../jssvgs/Footersvg";

const ButtomNavigation = (props) => {
  const route = useRoute();
  const {} = props;
  // const {navigation , page , isLoggedIn} = props;
  const { navigation, page, isLoggedIn = true } = props;

  console.log(isLoggedIn, "+++++");
  //   const navigation = useNavigation();

  const HomePage = () => {
    isLoggedIn ? navigation.navigate("Home") : "";
    // navigation.navigate("Home")
  };

  const OrderList = () => {
    isLoggedIn ? navigation.navigate("ordershistroy") : "";
    // navigation.navigate("")
  };

  const CartPage = () => {
    isLoggedIn ? navigation.navigate("cart_list") : "";
    // navigation.navigate("cart_list")
  };

  const NotificationPage = () => {
    isLoggedIn ? navigation.navigate("Notification") : "";
    // navigation.navigate("")
  };

  const ProfilePage = () => {
    isLoggedIn ? navigation.navigate("Profile") : "";
    // navigation.navigate("Profile")
  };
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const { width, height } = Dimensions.get("window");

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          width: width >= 720 ? "70%" : "96%",
          height: width >= 720 ? 110 : 70,
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
          <Footersvg val="home" status={page === "home" ? true : false} />
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
          <Footersvg
            val="orderhistory"
            status={page === "orderhistory" ? true : false}
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
          <Footersvg val="cart" status={false} />
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
          <Footersvg
            val="notification"
            status={page === "notification" ? true : false}
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
          <Footersvg val="profile" status={page === "profile" ? true : false} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ButtomNavigation;
