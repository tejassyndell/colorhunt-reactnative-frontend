import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

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
    isLoggedIn ? navigation.navigate("") : "";
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
          width: "96%",
          height: width >= 768 ? 120 : 70,
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
            source={
              page === "home"
                ? require("../../../assets/AppFooterIcons/Home_down_nav_icone.png")
                : require("../../../assets/deselect_home.png")
            }
            style={{
              width: width >= 768 ? 80 : 40,
              height: width >= 768 ? 80 : 40,
            }}
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
            source={
              page === "orderhistory"
                ? require("../../../assets/on_orderhistory.png")
                : require("../../../assets/AppFooterIcons/order_down_nav_icone.png")
            }
            style={{
              width: width >= 768 ? 80 : 40,
              height: width >= 768 ? 80 : 40,
            }}
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
            style={{
              width: width >= 768 ? 80 : 40,
              height: width >= 768 ? 80 : 40,
            }}
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
            style={{
              width: width >= 768 ? 80 : 40,
              height: width >= 768 ? 80 : 40,
            }}
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
            source={
              page === "profile"
                ? require("../../../assets/select_profile.png")
                : require("../../../assets/AppFooterIcons/Profile_down_nav_icone.png")
            }
            style={{
              width: width >= 768 ? 80 : 40,
              height: width >= 768 ? 80 : 40,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ButtomNavigation;
