import { View, Text, TouchableOpacity,Image } from "react-native";
import React from "react";
<<<<<<< HEAD
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
 

=======

const ButtomNavigation = () => {
>>>>>>> upstream/31_08_23
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          width: "98%",
          height: 70,
<<<<<<< HEAD
          backgroundColor: "black",
=======
          backgroundColor: "red",
>>>>>>> upstream/31_08_23
          flexDirection: "row",
          marginLeft:5,
          borderRadius:20,
          justifyContent: "space-evenly",
        }}
      >
        <TouchableOpacity
          style={{
<<<<<<< HEAD
            width: "20%",
=======
            width: "22%",
>>>>>>> upstream/31_08_23
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
<<<<<<< HEAD
          onPress={HomePage}

=======
>>>>>>> upstream/31_08_23
        >
          <Image
            source={require("../../../assets/AppFooterIcons/Vector.svg")}
            style={{ width: 30, height: 30 }}
<<<<<<< HEAD
            
=======
>>>>>>> upstream/31_08_23
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
<<<<<<< HEAD
            width: "20%",
=======
            width: "22%",
>>>>>>> upstream/31_08_23
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
<<<<<<< HEAD
          onPress={OrderList}
          
=======
>>>>>>> upstream/31_08_23
        >
          <Image
            source={require("../../../assets/AppFooterIcons/History.svg")}
            style={{ width: 30, height: 30 }}
<<<<<<< HEAD
            
=======
>>>>>>> upstream/31_08_23
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
<<<<<<< HEAD
            width: "20%",
=======
            width: "22%",
>>>>>>> upstream/31_08_23
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
<<<<<<< HEAD
          onPress={CartPage}
=======
>>>>>>> upstream/31_08_23
        >
          <Image
            source={require("../../../assets/AppFooterIcons/cart.svg")}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
<<<<<<< HEAD
            width: "20%",
=======
            width: "22%",
>>>>>>> upstream/31_08_23
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
<<<<<<< HEAD
          onPress={NotificationPage}
        >
          <Image
            source={require("../../../assets/AppFooterIcons/notification.svg")}
            style={{ width: 30, height: 35 }}
=======
        >
          <Image
            source={require("../../../assets/AppFooterIcons/notification.svg")}
            style={{ width: 30, height: 30 }}
>>>>>>> upstream/31_08_23
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
<<<<<<< HEAD
            width: "20%",
=======
            width: "22%",
>>>>>>> upstream/31_08_23
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
<<<<<<< HEAD
          onPress={ProfilePage}
        >
          <Image
            source={require("../../../assets/AppFooterIcons/1000005774.svg")}
            style={{ width: 30, height: 35 }}
=======
        >
          <Image
            source={require("../../../assets/AppFooterIcons/1000005774.svg")}
            style={{ width: 30, height: 30 }}
>>>>>>> upstream/31_08_23
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ButtomNavigation;
