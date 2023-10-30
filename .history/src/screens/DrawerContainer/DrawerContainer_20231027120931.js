import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import MenuButton from "../../components/MenuButton/MenuButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";

import Svg, { Circle, Rect, Path, G, Defs, ClipPath } from "react-native-svg";
import Drawerwhitelogo from "../../jssvgs/Drawerwhitelogo";
import CreateAccount from "../../components/CreateAccount/CreateAccount";
const { width, height } = Dimensions.get("window");

export default function DrawerContainer(props) {
  const { navigation, isLoggedIn, name } = props;
  const [userName, setUserName] = useState("");
  const [isCreateAccountVisible, setCreateAccountVisible] = useState(false);

  console.log(isLoggedIn);
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  const openCreateAccountModal = () => {
    console.log("done");
    setCreateAccountVisible(true);
  };

  const closeCreateAccountModal = () => {
    setCreateAccountVisible(false);
  };
  useEffect(() => {
    const loadCustomFont = async () => {
      try {
        await Font.loadAsync({
          Glory: require("../../../assets/Fonts/Glory.ttf"),
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
    <>
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
                  source={require("../../../assets/Profileicon/Profilewhite.png")}
                  style={{ width: 50, height: 50 }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: "#FFF", // Text color is white
                  height: 50, // Height of the text is 50 units
                  left: 10, // Left margin of 10 units
                  paddingTop: 12,
                  fontSize: width >= 720 ? 25 : 17, // Font size is 25 if the width is greater than or equal to 720, otherwise 17
                  fontFamily: isFontLoaded ? "Glory" : undefined, // Font family "Glory" if isFontLoaded is true, otherwise use the default font
                  fontWeight: "700", // Font weight is 700 (bold)
                  width: "60%", // Width of the text is 60% of the container
                }}
              >
                {name ? name : "Guest"}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.closeDrawer();
              }}
              style={{
                position: "absolute",
                right: 0,
                top: width >= 720 ? 75 : 30,
              }}
            >
              <Image
                source={require("../../../assets/sidebaricons/closeslider.png")}
                style={{
                  // position: "absolute",
                  // right: 0,
                  width: width >= 720 ? 30 : 20,
                  height: width >= 720 ? 30 : 20,
                }}
              />
            </TouchableOpacity>
          </View>

          {isLoggedIn ? ( // If user is logged in
            <>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  marginLeft: 10,
                  marginTop: 10,
                  width: "100%",
                }}
                onPress={() => {
                  navigation.navigate("ordershistroy");
                  navigation.closeDrawer();
                }}
              >
                {orderhistory}
                <Text
                  style={{
                    fontSize: width >= 720 ? 20 : 16,
                    fontFamily: isFontLoaded ? "Glory" : undefined,
                    color: "#FFF",
                    marginLeft: 8,
                  }}
                >
                  Orders History
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  marginLeft: 10,
                  marginTop: 25,
                  width: "100%",
                }}
                onPress={() => {
                  navigation.navigate("cart_list");
                  navigation.closeDrawer();
                }}
              >
                {/* <Image
                source={require("../../../assets/sidebaricons/download-4.png")}
                style={{
                  height: width >= 720 ? 30 : 20,
                  width: width >= 720 ? 30 : 20,
                }}
              /> */}
                {cart}
                <Text
                  style={{
                    fontSize: width >= 720 ? 20 : 16,
                    fontFamily: isFontLoaded ? "Glory" : undefined,
                    color: "#FFF",
                    marginLeft: 8,
                  }}
                >
                  Cart
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  marginLeft: 10,
                  marginTop: 25,
                  width: "100%",
                }}
                onPress={() => {
                  navigation.navigate("Wishlist");
                  navigation.closeDrawer();
                }}
              >
                {/* <Image
                source={require("../../../assets/sidebaricons/download-4.png")}
                style={{
                  height: width >= 720 ? 30 : 20,
                  width: width >= 720 ? 30 : 20,
                }}
              /> */}
                {wishlist}
                <Text
                  style={{
                    fontSize: width >= 720 ? 20 : 16,
                    fontFamily: isFontLoaded ? "Glory" : undefined,
                    color: "#FFF",
                    marginLeft: 8,
                  }}
                >
                  Wishlist
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  marginLeft: 10,
                  marginTop: 25,
                  width: "100%",
                }}
                onPress={() => {
                  navigation.navigate("Notification");
                  navigation.closeDrawer();
                }}
              >
                {/* <Image
                source={require("../../../assets/sidebaricons/download-4.png")}
                style={{
                  height: width >= 720 ? 30 : 20,
                  width: width >= 720 ? 30 : 20,
                }}
              /> */}
                {notification}
                <Text
                  style={{
                    fontSize: width >= 720 ? 20 : 16,
                    fontFamily: isFontLoaded ? "Glory" : undefined,
                    color: "#FFF",
                    marginLeft: 8,
                  }}
                >
                  Notifications
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  marginLeft: 10,
                  marginTop: 25,
                  width: "100%",
                }}
                onPress={() => {
                  navigation.navigate("AboutUs");
                  navigation.closeDrawer();
                }}
              >
                {/* <Image
                source={require("../../../assets/sidebaricons/download-4.png")}
                style={{
                  height: width >= 720 ? 30 : 20,
                  width: width >= 720 ? 30 : 20,
                }}
              /> */}
                {aboutus}
                <Text
                  style={{
                    fontSize: width >= 720 ? 20 : 16,
                    fontFamily: isFontLoaded ? "Glory" : undefined,
                    color: "#FFF",
                    marginLeft: 8,
                  }}
                >
                  About us
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ flexDirection: "row", marginLeft: 10, marginTop: 25 }}
                onPress={() => {
                  navigation.navigate("Contact");
                  navigation.closeDrawer();
                }}
              >
                {/* <Image
                source={require("../../../assets/sidebaricons/download-4.png")}
                style={{
                  height: width >= 720 ? 30 : 20,
                  width: width >= 720 ? 30 : 20,
                }}
              /> */}
                {contactus}
                <Text
                  style={{
                    fontSize: width >= 720 ? 20 : 16,
                    fontFamily: isFontLoaded ? "Glory" : undefined,
                    color: "#FFF",
                    marginLeft: 8,
                  }}
                >
                  Contact Us
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  marginLeft: 10,
                  marginTop: 50,
                  width: "100%",
                }}
                onPress={() => {
                  clearAsyncStorage();
                  navigation.navigate("login"); // Replace with your login or home screen route
                }}
              >
                {/* <Image
                source={require("../../../assets/sidebaricons/download-4.png")}
                style={{
                  height: width >= 720 ? 30 : 20,
                  width: width >= 720 ? 30 : 20,
                }}
              /> */}
                {logout}
                <Text
                  style={{
                    fontSize: width >= 720 ? 20 : 16,
                    fontFamily: isFontLoaded ? "Glory" : undefined,
                    color: "#FFF",
                    marginLeft: 8,
                  }}
                >
                  Logout
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            // If user is not logged in
            <>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  marginLeft: 10,
                  marginTop: 10,
                  width: "100%",
                }}
                onPress={openCreateAccountModal}
              >
                <Image
                  source={require("../../../assets/sidebaricons/signup.png")}
                  style={{
                    height: width >= 720 ? 30 : 20,
                    width: width >= 720 ? 30 : 20,
                  }}
                />
                <Text
                  style={{
                    fontSize: width >= 720 ? 20 : 16,
                    fontFamily: isFontLoaded ? "Glory" : undefined,
                    color: "#FFF",
                    marginLeft: 8,
                  }}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  marginLeft: 10,
                  marginTop: 25,
                  width: "100%",
                }}
                onPress={() => {
                  navigation.navigate("AboutUs");
                  navigation.closeDrawer();
                }}
              >
                {/* <Image
                source={require("../../../assets/sidebaricons/download-4.png")}
                style={{
                  height: width >= 720 ? 30 : 20,
                  width: width >= 720 ? 30 : 20,
                }}
              /> */}
                {aboutus}
                <Text
                  style={{
                    fontSize: width >= 720 ? 20 : 16,
                    fontFamily: isFontLoaded ? "Glory" : undefined,
                    color: "#FFF",
                    marginLeft: 8,
                  }}
                >
                  About us
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  marginLeft: 10,
                  marginTop: 25,
                  width: "100%",
                }}
                onPress={() => {
                  navigation.navigate("Contact");
                  navigation.closeDrawer();
                }}
              >
                {/* <Image
                source={require("../../../assets/sidebaricons/download-4.png")}
                style={{
                  height: width >= 720 ? 30 : 20,
                  width: width >= 720 ? 30 : 20,
                }}
              /> */}
                {contactus}
                <Text
                  style={{
                    fontSize: width >= 720 ? 20 : 16,
                    fontFamily: isFontLoaded ? "Glory" : undefined,
                    color: "#FFF",
                    marginLeft: 8,
                  }}
                >
                  Contact Us
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  marginLeft: 10,
                  marginTop: 60,
                  width: "100%",
                }}
                onPress={() => {
                  navigation.navigate("login");
                }}
              >
                <Image
                  source={require("../../../assets/sidebaricons/login.png")}
                  style={{
                    height: width >= 720 ? 30 : 20,
                    width: width >= 720 ? 30 : 20,
                  }}
                />
                <Text
                  style={{
                    fontSize: width >= 720 ? 20 : 16,
                    fontFamily: isFontLoaded ? "Glory" : undefined,
                    color: "#FFF",
                    marginLeft: 8,
                  }}
                >
                  Login
                </Text>
              </TouchableOpacity>
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
            {/* <Image
            source={require("../../../assets/sidebaricons/image_98.png")}
            style={{
              height: width >= 720 ? 200 : 150,
              width: width >= 720 ? 200 : 150,
            }}
          /> */}
            <Drawerwhitelogo />
            <Text
              style={{
                color: "rgba(255, 255, 255, 1)",
                fontSize: width >= 720 ? 15 : 12,
                fontFamily: isFontLoaded ? "Glory" : undefined,
              }}
            >
              Design By SYNDELL Inc.
            </Text>
          </View>
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
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
  isLoggedIn: PropTypes.bool.isRequired, // Add prop type for isLoggedIn
};

const crose = (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width >= 720 ? 30 : 20}
    height={width >= 720 ? 30 : 20}
    viewBox="0 0 35 35"
    fill="none"
  >
    <Circle cx={17.5} cy={17.5} r={17.5} fill="white" />
    <Rect
      x={12.1172}
      y={11.332}
      width={17.1429}
      height={1.71429}
      rx={0.857143}
      transform="rotate(45 12.1172 11.332)"
      fill="#212121"
    />
    <Rect
      x={10}
      y={24.2734}
      width={10.2857}
      height={1.71429}
      rx={0.857143}
      transform="rotate(-45 10 24.2734)"
      fill="#212121"
    />
    <Rect
      x={17}
      y={17.2734}
      width={10.2857}
      height={1.71429}
      rx={0.857143}
      transform="rotate(-45 17 17.2734)"
      fill="#212121"
    />
  </Svg>
);

const orderhistory = (
  <Svg width={22} height={22} viewBox="0 0 22 22" fill="none">
    <Path
      d="M4.05188 13.8929H11.1137C11.5873 12.9655 12.2834 12.1699 13.1397 11.5774H4.05188C3.89836 11.5774 3.75113 11.5164 3.64258 11.4079C3.53402 11.2993 3.47304 11.1521 3.47304 10.9985C3.47304 10.845 3.53402 10.6978 3.64258 10.5892C3.75113 10.4807 3.89836 10.4197 4.05188 10.4197H13.3133C13.4668 10.4197 13.6141 10.4807 13.7226 10.5892C13.8312 10.6978 13.8922 10.845 13.8922 10.9985C13.8946 11.0413 13.8907 11.0842 13.8806 11.1259C14.57 10.7801 15.3143 10.5568 16.0802 10.466C16.314 10.4321 16.5501 10.4166 16.7864 10.4197C16.9798 10.4193 17.1731 10.4309 17.3652 10.4544V2.89435C17.3652 2.12672 17.0603 1.39053 16.5175 0.847736C15.9747 0.30494 15.2386 0 14.471 0H2.8942C2.12661 0 1.39046 0.30494 0.847691 0.847736C0.304924 1.39053 0 2.12672 0 2.89435V15.6295C0 16.3971 0.304924 17.1333 0.847691 17.6761C1.39046 18.2189 2.12661 18.5238 2.8942 18.5238H10.6622C10.569 18.1862 10.5032 17.8417 10.4654 17.4935C10.4316 17.2596 10.4161 17.0235 10.4191 16.7872C10.4171 16.1997 10.4989 15.615 10.6622 15.0506H4.05188C3.89836 15.0506 3.75113 14.9896 3.64258 14.8811C3.53402 14.7725 3.47304 14.6253 3.47304 14.4718C3.47304 14.3182 3.53402 14.171 3.64258 14.0624C3.75113 13.9539 3.89836 13.8929 4.05188 13.8929ZM4.05188 3.47322H13.3133C13.4668 3.47322 13.6141 3.53421 13.7226 3.64277C13.8312 3.75133 13.8922 3.89857 13.8922 4.05209C13.8922 4.20562 13.8312 4.35286 13.7226 4.46141C13.6141 4.56997 13.4668 4.63096 13.3133 4.63096H4.05188C3.89836 4.63096 3.75113 4.56997 3.64258 4.46141C3.53402 4.35286 3.47304 4.20562 3.47304 4.05209C3.47304 3.89857 3.53402 3.75133 3.64258 3.64277C3.75113 3.53421 3.89836 3.47322 4.05188 3.47322ZM4.05188 6.94644H13.3133C13.4668 6.94644 13.6141 7.00743 13.7226 7.11599C13.8312 7.22455 13.8922 7.37179 13.8922 7.52531C13.8922 7.67884 13.8312 7.82608 13.7226 7.93464C13.6141 8.0432 13.4668 8.10418 13.3133 8.10418H4.05188C3.89836 8.10418 3.75113 8.0432 3.64258 7.93464C3.53402 7.82608 3.47304 7.67884 3.47304 7.52531C3.47304 7.37179 3.53402 7.22455 3.64258 7.11599C3.75113 7.00743 3.89836 6.94644 4.05188 6.94644ZM17.3652 11.6121C16.9807 11.5658 16.592 11.5658 16.2075 11.6121C14.9344 11.7545 13.7584 12.3609 12.9042 13.3156C12.05 14.2702 11.5774 15.5062 11.5768 16.7872C11.5765 16.9807 11.5881 17.174 11.6115 17.3661C11.6522 17.7615 11.7416 18.1504 11.8778 18.5238C12.1875 19.4016 12.7268 20.1804 13.4394 20.7791C14.1521 21.3779 15.0121 21.7747 15.9301 21.9285C16.8481 22.0822 17.7905 21.9871 18.6593 21.6532C19.5281 21.3193 20.2916 20.7587 20.8704 20.0297C21.4492 19.3007 21.8221 18.43 21.9503 17.508C22.0786 16.5861 21.9575 15.6466 21.5997 14.7873C21.2418 13.928 20.6603 13.1803 19.9157 12.6219C19.171 12.0635 18.2903 11.7148 17.3652 11.6121ZM17.3652 16.7872C17.3652 16.9408 17.3042 17.088 17.1957 17.1966C17.0871 17.3051 16.9399 17.3661 16.7864 17.3661H15.1077C14.9542 17.3661 14.8070 17.3051 14.6984 17.1966C14.5899 17.0880 14.5289 16.9408 14.5289 16.7872C14.5289 16.6337 14.5899 16.4865 14.6984 16.3779C14.8070 16.2694 14.9542 16.2084 15.1077 16.2084H16.2075V14.4718C16.2075 14.3182 16.2685 14.1710 16.3770 14.0624C16.4856 13.9539 16.6328 13.8929 16.7864 13.8929C16.9399 13.8929 17.0871 13.9539 17.1957 14.0624C17.3042 14.1710 17.3652 14.3182 17.3652 14.4718V16.7872Z"
      fill="white"
    />
  </Svg>
);

const wishlist = (
  <Svg
    width={21}
    height={20}
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <G id="Wishlist">
      <Path
        id="Vector"
        d="M10 18C9.84483 18 9.68965 17.9233 9.53448 17.8465C4.10345 14.0864 1.31034 10.5565 1 7.18007V6.18249C1.31034 2.8828 3.48276 1.19458 5.42241 1.04111C7.82759 0.810898 8.99138 1.57827 10 2.57585C11.0086 1.57827 12.25 0.810898 14.5776 1.04111C16.5172 1.19458 18.6897 2.8828 19 6.10576V7.10334C18.7672 10.5565 15.9741 14.0097 10.4655 17.8465C10.3103 17.9233 10.1552 18 10 18Z"
        fill="white"
      />
    </G>
  </Svg>
);

const cart = (
  <Svg
    width={21}
    height={20}
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.99121 18.4594C3.99121 17.6022 4.68515 16.9082 5.54238 16.9082C6.3894 16.9082 7.08336 17.6022 7.08336 18.4594C7.08336 19.3064 6.3894 20.0004 5.54238 20.0004C4.68515 20.0004 3.99121 19.3064 3.99121 18.4594ZM15.472 18.4594C15.472 17.6022 16.1659 16.9082 17.0231 16.9082C17.8701 16.9082 18.5641 17.6022 18.5641 18.4594C18.5641 19.3064 17.8701 20.0004 17.0231 20.0004C16.1659 20.0004 15.472 19.3064 15.472 18.4594Z"
      fill="white"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.5639 3.92828C19.1864 3.92828 19.5946 4.14259 20.0028 4.61203C20.411 5.08146 20.4824 5.755 20.3906 6.36628L19.4211 13.0608C19.2374 14.3477 18.1353 15.2958 16.8392 15.2958H5.70543C4.34815 15.2958 3.22558 14.2548 3.11332 12.9088L2.17447 1.78419L0.63349 1.51886C0.225285 1.44742 -0.0604738 1.04942 0.010962 0.641217C0.0823978 0.222808 0.480423 -0.0527293 0.898833 0.00850138L3.33273 0.375886C3.6797 0.438137 3.93483 0.72286 3.96544 1.06983L4.15934 3.35578C4.18996 3.68336 4.45531 3.92828 4.78187 3.92828H18.5639ZM12.3796 9.23392H15.2064C15.635 9.23392 15.9718 8.88694 15.9718 8.46853C15.9718 8.03992 15.635 7.70315 15.2064 7.70315H12.3796C11.951 7.70315 11.6142 8.03992 11.6142 8.46853C11.6142 8.88694 11.951 9.23392 12.3796 9.23392Z"
      fill="white"
    />
  </Svg>
);

const aboutus = (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <G id="About Us">
      <Path
        id="Vector"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.3038 12.4344V15.3231C14.3038 15.5316 14.1994 15.7262 14.0256 15.8415C14.0256 15.8415 12.6355 16.791 9.95071 16.791C7.26593 16.791 5.87578 15.8415 5.87578 15.8415C5.7019 15.7262 5.59742 15.5316 5.59742 15.3231V12.4344C5.59742 10.7189 6.98802 9.32833 8.70354 9.32833H11.1977C12.9132 9.32833 14.3038 10.7189 14.3038 12.4344ZM9.95071 3.10938C11.3647 3.10938 12.5138 4.09266 12.5138 5.67818C12.5138 6.56937 12.1232 7.46072 11.5274 8.03221C11.087 8.4549 10.5382 8.70639 9.95071 8.70639C9.3631 8.70639 8.81444 8.4549 8.37399 8.03221C7.77817 7.46072 7.38757 6.56937 7.38757 5.67818C7.38757 4.09266 8.53653 3.10938 9.95071 3.10938ZM15.2367 4.58639C16.3829 4.58639 17.3146 5.38326 17.3146 6.66848C17.3146 7.37937 17.0022 8.09012 16.5268 8.54624C16.1668 8.89176 15.7171 9.0952 15.2367 9.0952C14.7564 9.0952 14.3067 8.89176 13.9465 8.54624C13.4713 8.09012 13.1589 7.37937 13.1589 6.66848C13.1589 5.38326 14.0904 4.58639 15.2367 4.58639ZM4.66459 4.58639C5.81086 4.58639 6.74235 5.38326 6.74235 6.66848C6.74235 7.37937 6.43011 8.09012 5.95474 8.54624C5.59459 8.89176 5.14489 9.09520 4.66459 9.09520C4.18429 9.09520 3.73459 8.89176 3.37444 8.54624C2.89907 8.09012 2.58683 7.37937 2.58683 6.66848C2.58683 5.38326 3.51832 4.58639 4.66459 4.58639ZM4.36653 15.5421C2.49086 15.4765 1.5225 14.8092 1.5225 14.8092C1.34862 14.6940 1.24414 14.4994 1.24414 14.2909V12.7453C1.24414 11.03 2.63489 9.63923 4.35026 9.63923H4.97892C5.10519 9.63923 5.22966 9.64684 5.35190 9.66146C4.72847 10.4143 4.35369 11.3806 4.35369 12.4344V15.3231C4.35369 15.3968 4.35802 15.4698 4.36653 15.5421ZM14.5494 9.66146C14.6718 9.64684 14.7962 9.63923 14.9225 9.63923H15.551C17.2665 9.63923 18.6571 11.03 18.6571 12.7453V14.2909C18.6571 14.4994 18.5526 14.6940 18.3788 14.8092C18.3788 14.8092 17.4104 15.4765 15.5347 15.5421C15.5434 15.4698 15.5477 15.3968 15.5477 15.3231V12.4344C15.5477 11.3806 15.1729 10.4143 14.5494 9.66146Z"
        fill="white"
      />
    </G>
  </Svg>
);

const contactus = (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <G id="Contact Us">
      <Path
        id="Vector"
        d="M16.9776 16.4051C16.9514 15.5949 16.8989 14.8101 16.6365 14.0506C16.5577 13.8228 16.479 13.5949 16.3478 13.4177C16.1904 13.2405 15.9804 13.038 15.7443 12.9873C15.1932 12.8354 14.6684 12.7089 14.1173 12.5823C13.3038 12.3797 12.4641 12.1772 11.6506 12C11.5981 12 11.5457 12 11.4669 11.9747C11.4669 12 11.4407 12.0506 11.4407 12.0759C11.3095 12.5823 11.152 13.0886 10.9946 13.5949C10.8109 14.2025 10.5747 14.7848 10.3648 15.3924C10.3386 15.4684 10.3123 15.519 10.2861 15.5949C10.2598 15.3165 10.2074 14.962 10.1549 14.6076C10.0761 13.9494 9.97118 13.3165 9.97118 13.2911C9.99743 13.2152 10.0237 13.1392 10.0761 13.0886C10.0761 13.0886 10.0761 13.0633 10.1024 13.0633C10.1286 13.0127 10.1286 12.9873 10.1549 12.9367C10.1549 12.9114 10.1811 12.9114 10.1811 12.8861C10.2074 12.8354 10.2336 12.7848 10.2336 12.7089C10.2336 12.6582 10.2074 12.6076 10.1811 12.557V12.5316V12.5063C10.1811 12.481 10.1549 12.481 10.1549 12.4557V12.4304C10.1549 12.4051 10.1286 12.4051 10.1024 12.3797C10.0761 12.3544 10.0499 12.3544 10.0237 12.3544H8.92153C8.89529 12.3544 8.84281 12.3797 8.81657 12.4304V12.4557C8.79033 12.481 8.76409 12.5316 8.76409 12.6076C8.76409 12.6329 8.73785 12.6582 8.73785 12.7089C8.73785 12.7848 8.76409 12.8354 8.79033 12.8861V12.9114L8.81657 12.9367C8.84281 12.9873 8.84281 13.0127 8.86905 13.0633V13.0886C8.89529 13.1646 8.94778 13.2405 8.97402 13.3165C8.97402 13.3418 8.94778 13.4684 8.92153 13.6962C8.84281 14.2025 8.73785 15.0633 8.65912 15.6203C8.63288 15.5443 8.5804 15.4937 8.5804 15.4177C8.37047 14.8101 8.1343 14.2278 7.95061 13.6203C7.79316 13.1139 7.66195 12.6076 7.50451 12.1013C7.50451 12.0759 7.47826 12.0253 7.47826 12C7.39954 12 7.34706 12 7.29458 12.0253L5.09031 12.557C4.46052 12.7089 3.83073 12.8608 3.20094 13.038C2.99101 13.0886 2.78108 13.2658 2.64987 13.443L2.62363 13.4684C2.49243 13.5949 2.4137 13.8228 2.33498 14.0253C2.09881 14.7089 2.04632 15.4177 2.02008 16.1266V16.4051C1.99384 16.9114 1.91512 16.8101 2.43994 17.0127C2.57115 17.0633 2.70236 17.1139 2.83356 17.1392C3.75201 17.4177 4.69669 17.6203 5.64138 17.7468C6.55982 17.8734 7.50451 17.924 8.44919 17.9747C8.63288 17.9747 10.0761 18 10.0761 18C10.2598 18 10.4435 18 10.6272 17.9747C12.123 17.924 13.5925 17.7975 15.0357 17.4684C15.4294 17.3671 15.8492 17.2658 16.2428 17.1392C16.3741 17.0886 16.5053 17.0633 16.6365 17.0127C17.0826 16.8101 17.0038 16.9114 16.9776 16.4051ZM12.3591 6.73418C12.3591 6.88608 12.3591 7.06329 12.3329 7.21519C12.3067 7.46835 12.2804 7.74683 12.2279 8C11.6506 8.22785 11.0733 8.37975 10.4435 8.4557C10.3123 8.48101 10.1811 8.48101 10.0237 8.50633C9.99743 8.50633 9.94494 8.48101 9.91870 8.4557C9.78750 8.30380 9.63005 8.20253 9.42012 8.22785H8.79033C8.44919 8.22785 8.21302 8.45570 8.18678 8.75949C8.16054 9.08861 8.37047 9.34177 8.71160 9.39240C8.97402 9.41772 9.26267 9.41772 9.52508 9.39240C9.70877 9.39240 9.83998 9.26582 9.94494 9.11392C9.97118 9.08861 9.99743 9.03797 10.04990 9.03797C10.73220 8.98734 11.41450 8.86076 12.07050 8.63291C11.99180 8.91139 11.88680 9.18987 11.75560 9.49367C11.72930 9.51899 11.72930 9.56962 11.70310 9.59494C11.49320 10.05060 11.17830 10.43040 10.83710 10.75949C10.46980 11.11392 9.99743 11.29110 9.52508 11.26580C9.05274 11.29110 8.58040 11.11392 8.21302 10.75949L8.16054 10.70890C7.81940 10.37970 7.53075 10.02530 7.34706 9.59494C6.92720 8.70886 6.69103 7.77215 6.69103 6.78481V6.37975C6.74351 5.89873 6.87472 5.46835 7.13713 5.08861C7.37330 4.73418 7.74068 4.43038 8.21302 4.25316C8.63288 4.10127 9.07898 4.02532 9.55132 4C9.99743 4 10.44350 4.07595 10.88960 4.25316C11.83430 4.63291 12.33290 5.44304 12.41160 6.37975C12.35910 6.45570 12.35910 6.58228 12.35910 6.73418Z"
        fill="white"
      />
      <Path
        id="Vector_2"
        d="M13.9239 5.92858C13.8986 5.76727 13.8732 5.5522 13.7718 5.44466C13.7211 5.39089 13.493 5.33712 13.493 5.33712L13.3155 4.8263C12.8845 3.67025 12.1493 2.86371 11.1352 2.3529C10.6028 2.11093 10.0704 1.97651 9.53803 2.00339H9.43662C8.90423 2.00339 8.37183 2.11093 7.83944 2.3529C6.8 2.83682 6.09014 3.67025 5.65915 4.8263L5.48169 5.33712C5.48169 5.364 5.22817 5.39089 5.20282 5.44466C5.10141 5.57908 5.10141 5.79416 5.0507 5.92858C5 6.14366 5 6.38563 5 6.60071C5.02535 6.86955 5.07606 7.16529 5.15211 7.43414C5.22817 7.62233 5.32958 8.0256 5.5831 7.99872C5.70986 7.97183 5.98873 7.94495 6.14084 7.94495H6.2169C6.29296 7.94495 6.36901 7.8643 6.36901 7.75676C6.34366 7.56856 6.34366 7.40725 6.31831 7.21906C6.26761 6.81578 6.24225 6.43940 6.19155 6.03612C6.1662 5.82104 6.09014 5.57908 6.1662 5.33712C6.64789 3.67025 8.0169 2.62174 9.48732 2.7024C10.9577 2.62174 12.3268 3.67025 12.8338 5.31023C12.9099 5.52531 12.8338 5.76727 12.8085 6.00924C12.7577 6.41251 12.7324 6.7889 12.6817 7.19217C12.6563 7.38037 12.6563 7.54168 12.631 7.72987C12.631 7.81053 12.6817 7.91807 12.7831 7.91807H12.8592C12.9859 7.94495 13.2648 7.97183 13.4169 7.97183C13.6704 7.99872 13.7718 7.62233 13.8479 7.40725C13.9239 7.1384 13.9746 6.86955 14 6.57382C13.9746 6.35874 13.9746 6.14366 13.9239 5.92858Z"
        fill="white"
      />
    </G>
  </Svg>
);

const logout = (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <G id="download (1) 1">
      <Path
        id="Vector"
        d="M19.4444 10.409C19.4433 10.4112 19.4424 10.413 19.4416 10.4145L19.3763 10.4798V10.5141C19.3656 10.532 19.3559 10.5526 19.3486 10.5758C19.3397 10.589 19.3274 10.6052 19.3115 10.6238C19.2877 10.6515 19.2633 10.6762 19.2426 10.6968L15.4108 14.4037L15.4054 14.4089L15.4003 14.4144C15.0452 14.8018 14.4183 14.8134 14.0114 14.4066C13.8084 14.2035 13.7096 13.9338 13.7096 13.7083C13.7096 13.4828 13.8084 13.2131 14.0114 13.0101L15.6781 11.3434L16.1049 10.9167H15.5013H5.54297C4.97271 10.9167 4.54297 10.4869 4.54297 9.91667C4.54297 9.3464 4.97271 8.91667 5.54297 8.91667H15.543H16.1465L15.7197 8.48989L14.0531 6.82322L14.0532 6.82306L14.0452 6.81571C13.6578 6.46056 13.6462 5.83361 14.0531 5.42678L14.0532 5.42694L14.0606 5.41893C14.4157 5.03149 15.0427 5.01994 15.4495 5.42678L19.2412 9.21844C19.3073 9.28453 19.3302 9.30877 19.3472 9.33651C19.3547 9.36152 19.365 9.38354 19.3763 9.40258V9.43689L19.4495 9.51011C19.4567 9.51731 19.4624 9.52303 19.4674 9.52809C19.4717 9.54787 19.4773 9.56455 19.4821 9.57737C19.4899 9.59834 19.4993 9.61751 19.5045 9.62783C19.5088 9.65888 19.517 9.6844 19.5237 9.70236C19.5319 9.72412 19.5417 9.74393 19.5467 9.75395L19.5504 9.76897C19.5821 9.89582 19.5821 10.0208 19.5504 10.1477L19.5467 10.1627C19.5417 10.1727 19.5319 10.1925 19.5237 10.2143C19.517 10.2323 19.5088 10.2578 19.5045 10.2888C19.4993 10.2992 19.4899 10.3183 19.4821 10.3393C19.4811 10.3419 19.4801 10.3446 19.4791 10.3475C19.4626 10.3723 19.4521 10.3934 19.4459 10.4059C19.4454 10.407 19.4448 10.4081 19.4444 10.409Z"
        fill="white"
        stroke="#212121"
        stroke-width="0.5"
      />
      <Path
        id="Vector_2"
        d="M11.082 12.5007V12.2507H10.832H5.54036C4.30344 12.2507 3.29036 11.2376 3.29036 10.0007C3.29036 8.76372 4.30344 7.75065 5.54036 7.75065H10.832H11.082V7.50065V2.41732C11.082 1.07091 9.9701 -0.0410156 8.6237 -0.0410156H2.41536C1.06896 -0.0410156 -0.0429688 1.07091 -0.0429688 2.41732V17.584C-0.0429688 18.9304 1.06896 20.0423 2.41536 20.0423H8.6237C9.9701 20.0423 11.082 18.9304 11.082 17.584V12.5007Z"
        fill="white"
        stroke="white"
        stroke-width="0.5"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_317_1570">
        <Rect width="20" height="20" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
const notification = (
  <Svg width={19} height={22} viewBox="0 0 19 22" fill="none">
    <Path
      d="M17.8962 10.6097C17.0926 9.67138 16.7275 8.85827 16.7275 7.47676V7.00703C16.7275 5.20681 16.3132 4.04691 15.4124 2.887C14.024 1.08567 11.6867 0 9.39847 0H9.30124C7.06123 0 4.79713 1.03582 3.38465 2.76404C2.43459 3.9472 1.97216 5.15696 1.97216 7.00703V7.47676C1.97216 8.85827 1.63105 9.67138 0.803537 10.6097C0.194586 11.301 0 12.1895 0 13.1511C0 14.1138 0.315916 15.0255 0.950056 15.7667C1.77757 16.6552 2.94631 17.2223 4.14012 17.321C5.86841 17.5181 7.59682 17.5924 9.35041 17.5924C11.1029 17.5924 12.8313 17.4683 14.5607 17.321C15.7534 17.2223 16.9221 16.6552 17.7497 15.7667C18.3827 15.0255 18.6997 14.1138 18.6997 13.1511C18.6997 12.1895 18.5051 11.301 17.8962 10.6097Z"
      fill="white"
    />
    <Path
      d="M11.5599 18.9514C11.0099 18.8339 7.65929 18.8339 7.1093 18.9514C6.63928 19.06 6.13086 19.3125 6.13086 19.8664C6.15825 20.3948 6.46768 20.8613 6.89612 21.1571L6.89513 21.1582C7.4493 21.5901 8.09983 21.8649 8.78094 21.9636C9.14383 22.0134 9.51331 22.0112 9.88939 21.9636C10.5694 21.8649 11.2199 21.5901 11.7742 21.1582L11.7731 21.1571C12.2017 20.8613 12.511 20.3948 12.5384 19.8664C12.5384 19.3125 12.03 19.06 11.5599 18.9514Z"
      fill="white"
    />
  </Svg>
);
