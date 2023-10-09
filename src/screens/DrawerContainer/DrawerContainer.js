import React, { useState, useEffect } from "react";
import { View, Image, Text, TouchableOpacity, Dimensions } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import MenuButton from "../../components/MenuButton/MenuButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";

export default function DrawerContainer(props) {
  const { navigation, isLoggedIn, name } = props;
  const [userName, setUserName] = useState("");
  console.log(isLoggedIn);
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  useEffect(() => {
    const loadCustomFont = async () => {
      try {
        await Font.loadAsync({
          Glory: require("../../../assets/Fonts/Glory-Regular.ttf"),
        });
        setIsFontLoaded(true);
      } catch (error) {
        console.error("Error loading custom font:", error);
      }
    };

    loadCustomFont();
  }, []);
  const fetchUserName = async () => {
    try {
      let storedName = await AsyncStorage.getItem("UserData");
      storedName = JSON.parse(storedName);
      if (storedName && storedName.length > 0) {
        setUserName(storedName[0].Name);
      }
    } catch (error) {
      console.error("Error fetching user's name from AsyncStorage:", error);
    }
  };

  useEffect(() => {
    fetchUserName();
  }, []);

  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log("AsyncStorage cleared successfully");
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error);
    }
  };
  const { width, height } = Dimensions.get("window");

  return (
    <View style={styles.content}>
      <View style={styles.container}>
        <View
          style={{
            width: "100%",
            // backgroundColor: "red",
            height: width >= 720 ? 150 : 50,
            marginTop: 20,
            marginBottom: 40,
            paddingRight: 20,
            paddingLeft: 10,
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              marginTop: 30,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                isLoggedIn ? navigation.navigate("Profile") : "";
              }}
            >
              <Image
                source={require("../../../assets/sidebaricons/1171274903.png")}
                style={{ width: 50, height: 50 }}
              />
            </TouchableOpacity>

            <Text
              style={{
                color: "#FFF",
                left: 10,
                fontSize: width >= 720 ? 25 : 17,
                fontFamily: isFontLoaded ? 'Glory' : undefined,
                height: 'auto',
                
            
                fontWeight: 700,
                width: "60%",
                
              }}
            >
              {name ? name : "Guest"}
            </Text>
          </View>
            <TouchableOpacity
              onPress={() => {
                navigation.closeDrawer();
              }}
            >
              <Image
                source={require("../../../assets/sidebaricons/menu.png")}
                style={{
                  position:'absolute',
                  right:0,
                  top:width >= 720 ? 75 : 30,
                  width: width >= 720 ? 30 : 20,
                  height: width >= 720 ? 30 : 20,
                }}
              />
            </TouchableOpacity>
        </View>

        {isLoggedIn ? ( // If user is logged in
          <>
            <MenuButton
              title="Order History"
              source={require("../../../assets/sidebaricons/order.png")}
              onPress={() => {
                navigation.navigate("ordershistroy");
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
                navigation.navigate("Notification");
                navigation.closeDrawer();
              }}
              customIconStyle={{ flex: 1, resizeMode: "contain" }}
            />
            <MenuButton
              title="About us"
              source={require("../../../assets/about.png")}
              onPress={() => {
                navigation.navigate("AboutUs");
                navigation.closeDrawer();
              }}
            />
            <MenuButton
              title="Contact Us"
              source={require("../../../assets/contact.png")}
              onPress={() => {
                navigation.navigate("Contact");
                navigation.closeDrawer();
              }}
            />
            <TouchableOpacity
              style={{ flexDirection: "row", marginLeft: 10, marginTop: 50 }}
              onPress={() => {
                clearAsyncStorage();
                navigation.navigate("login"); // Replace with your login or home screen route
              }}
            >
              <Image
                source={require("../../../assets/sidebaricons/download-4.png")}
                style={{ height: width >= 720 ? 30:20,
                  width: width >= 720 ? 30:20,}}
              />
              <Text style={{ fontSize: width >= 720 ? 20:16,fontFamily: isFontLoaded ? 'Glory' : undefined, color: "#FFF", marginLeft: 8 }}>
                Logout
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          // If user is not logged in
          <>
            <MenuButton
              title="Sign Up"
              source={require("../../../assets/sidebaricons/download-4.png")}
              onPress={() => {
                navigation.navigate("login");
                navigation.closeDrawer();
              }}
            />

            <MenuButton
              title="About us"
              source={require("../../../assets/about.png")}
              onPress={() => {
                navigation.navigate("AboutUs");
                navigation.closeDrawer();
              }}
            />
            <MenuButton
              title="Contact Us"
              source={require("../../../assets/contact.png")}
              onPress={() => {
                navigation.navigate("Contact");
                navigation.closeDrawer();
              }}
            />
          </>
        )}

        <View></View>
        <View
          style={{
            position: "absolute",
            bottom: 20,
            alignItems: "center",
            width: "100%",
            right: 20,
          }}
        >
          <Image
            source={require("../../../assets/sidebaricons/image_98.png")}
            style={{  height: width >= 720 ? 200:161,
              width: width >= 720 ? 200:161, }}
          />
          <Text style={{ color: "rgba(255, 255, 255, 1)", fontSize: width >= 720 ? 15:12,fontFamily: isFontLoaded ? 'Glory' : undefined, }}>
            Design By SYNDELL Inc.
          </Text>
        </View>
      </View>
    </View>
  );
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
  isLoggedIn: PropTypes.bool.isRequired, // Add prop type for isLoggedIn
};
