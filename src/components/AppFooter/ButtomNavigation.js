import { View, Text, TouchableOpacity, Image, Modal, Dimensions } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Footersvg from "../../jssvgs/Footersvg";
import CreateAccount from "../CreateAccount/CreateAccount";

const ButtomNavigation = (props) => {

  const [isCreateAccountVisible, setCreateAccountVisible] = useState(false);

  const route = useRoute();
  const {} = props;
  // const {navigation , page , isLoggedIn} = props;
  const { navigation, page, isLoggedIn = true } = props;

  console.log(isLoggedIn, "+++++");
  //   const navigation = useNavigation();

 

  const openCreateAccountModal = () => {
    console.log("done");
    setCreateAccountVisible(true);
  };


  const closeCreateAccountModal = () => {
    setCreateAccountVisible(false);
  };
  const HomePage = () => {
    isLoggedIn ? navigation.navigate("Home") :  openCreateAccountModal();
    // navigation.navigate("Home")
  };

  const OrderList = () => {
    isLoggedIn ? navigation.navigate("ordershistroy") : openCreateAccountModal();
    // navigation.navigate("")
  };

  const CartPage = () => {
    isLoggedIn ? navigation.navigate("cart_list") :  openCreateAccountModal();
    // navigation.navigate("cart_list")
  };

  const NotificationPage = () => {
    isLoggedIn ? navigation.navigate("Notification") :  openCreateAccountModal();
    // navigation.navigate("")
  };

  const ProfilePage = () => {
    isLoggedIn ? navigation.navigate("Profile") : openCreateAccountModal();
    // navigation.navigate("Profile")
  };
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const { width, height } = Dimensions.get("window");

  return (
    <>
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
    <Modal
        visible={isCreateAccountVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeCreateAccountModal}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              width: "95%",
              backgroundColor: "#fff",
              borderRadius: 10,
              padding: 10,
              marginTop: 25,
              marginBottom: 25,
            }}
          >
            <CreateAccount onClose={closeCreateAccountModal} />
          </View>
        </View>
      </Modal>
    </>
    
    
  );
};

export default ButtomNavigation;
