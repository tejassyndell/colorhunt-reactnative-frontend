import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  Dimensions,
  Platform,
  StatusBar,
  ScrollView,
  RefreshControl,
} from "react-native";
import styles from "./style2";
import { Profiledata } from "../../api/api";
import { ActivityIndicator } from "react-native";
import { useLayoutEffect } from "react";
import MenuBackArrow from "../../components/menubackarrow/menubackarrow";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ButtomNavigation from "../../components/AppFooter/ButtomNavigation";
import { TouchableOpacity } from "react-native-gesture-handler";
import Svg, { G, Circle, Path } from "react-native-svg";
export default function Userprofile(props) {
  const { navigation } = props;
  const [Profile, setprofile] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { width, height } = Dimensions.get("window");
  // const fontSize = width > 400 ? 18 : 16; // Adjust the font size based on screen width
  const marginTop = height > 800 ? 30 : 20; // Adjust the margin top based on screen height
  const headerHeight =
    Platform.OS === "android"
      ? width >= 720
        ? 110
        : 80
      : height >= 844
      ? 110
      : 65;

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);

    // Add any logic here that you want to execute when the user triggers a refresh.
    // For example, you can reload data or perform any other action.

    // Simulate a delay to hide the loading indicator after 3 seconds (adjust as needed)
    const delay = 3000; // 3 seconds

    setTimeout(() => {
      setIsLoading(false);
      setRefreshing(false);
    }, delay);
  };

  useEffect(() => {
    fetchprofiledata();
  }, []);
  const fetchprofiledata = async () => {
    try {
      let partyData = await AsyncStorage.getItem("UserData");
      partyData = JSON.parse(partyData);
      console.log(partyData);
      const data = { party_id: partyData[0].Id };
      const response = await Profiledata(data);
      setprofile(response.data);
      setIsLoading(false);
      setRefreshing(false);
    } catch (err) {
      console.log(err, "error in fetching data");
    }
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        // <MenuBackArrow
        //   onPress={() => {
        //     navigation.goBack();
        //   }}
        // />
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <View style={{ marginLeft: 10 }}>
            {/* <Image
              source={require("../../../assets/menubar.png")}
              style={{
                width: width >= 720 ? 50 : 35,
                height: width >= 720 ? 50 : 35,
              }}
            /> */}
            <Svg
              width={width >= 720 ? 50 : 35}
              height={width >= 720 ? 50 : 35}
              viewBox="0 0 35 35"
              fill="none"
              {...props}
            >
              <G id="menu bar">
                <G id="arrow">
                  <Circle cx={17.5} cy={17.5} r={17.5} fill="white" />
                  <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.16 17.993V17.639C18.15 16.235 18.07 14.982 17.92 14.188C17.92 14.173 17.76 13.386 17.66 13.124C17.5 12.745 17.21 12.423 16.85 12.219C16.56 12.074 16.2599 12 15.9399 12C15.6899 12.012 15.28 12.137 14.99 12.242L14.74 12.336C13.13 12.978 10.04 15.077 8.84998 16.36L8.76001 16.45L8.38 16.87C8.13 17.191 8 17.585 8 18.008C8 18.387 8.11998 18.766 8.34998 19.072C8.41998 19.171 8.53 19.298 8.63 19.406L9.01001 19.803C10.31 21.124 13.13 22.978 14.6 23.592C14.6 23.606 15.5099 23.986 15.9399 24H16C16.66 24 17.28 23.621 17.6 23.009C17.69 22.841 17.77 22.513 17.84 22.225L17.95 21.681C18.08 20.807 18.16 19.465 18.16 17.993ZM24.5 19.518C25.33 19.518 26 18.839 26 18C26 17.162 25.33 16.483 24.5 16.483L20.8 16.81C20.15 16.81 19.62 17.342 19.62 18C19.62 18.658 20.15 19.191 20.8 19.191L24.5 19.518Z"
                    fill="black"
                  />
                </G>
              </G>
            </Svg>
          </View>
        </TouchableOpacity>
      ),
      headerTitle: () => null, // Remove the header title
      headerStyle: {
        height: headerHeight,
        backgroundColor: "black",
      },
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <>
          <StatusBar
            barStyle="light-content"
            // dark-content, light-content and default
            hidden={false}
            //To hide statusBar
            backgroundColor="black"
            //Background color of statusBar only works for Android
            translucent={false}
            //allowing light, but not detailed shapes
            networkActivityIndicatorVisible={true}
          />
          <View style={{ flex: 1 }}>
            <ScrollView
              contentContainerStyle={{ flexGrow: 0.7 }}
              keyboardShouldPersistTaps="handled"
              showsHorizontalScrollIndicator={true}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              <View style={styles.TopContainer}>
                <TouchableHighlight>
                  <View style={styles.Profile}>
                    <Image
                      source={require("../../../assets/Profileicon/Mainprofile.png")}
                      style={{
                        width: width >= 720 ? 200 : 120,
                        height: width >= 720 ? 200 : 120,
                      }}
                    />
                  </View>
                </TouchableHighlight>
              </View>
              {Profile.map((item) => (
                <View
                  style={{ ...styles.BottomContainer, marginTop }}
                  key={item.Id}
                >
                  <View style={styles.hello}>
                    <Text style={{ ...styles.text }}>{item.Name}</Text>
                  </View>
                  <View style={{ ...styles.hello, marginTop }}>
                    <Text style={{ ...styles.text }}>{item.Address}</Text>
                  </View>
                  <View style={{ ...styles.hello, marginTop }}>
                    <Text style={{ ...styles.text }}>{item.PhoneNumber}</Text>
                  </View>
                  <View style={{ ...styles.hello2, marginTop }}>
                    <View style={styles.abc}>
                      <Text style={{ ...styles.text }}>{item.City}</Text>
                    </View>
                    <View style={styles.abc}>
                      <Text style={{ ...styles.text }}>{item.State}</Text>
                    </View>
                  </View>
                  <View style={{ ...styles.hello2, marginTop }}>
                    <View style={styles.abc}>
                      <Text style={{ ...styles.text }}>{item.Country}</Text>
                    </View>
                    <View style={styles.abc}>
                      <Text style={{ ...styles.text }}>{item.PinCode}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
            <View
              style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
            >
              <ButtomNavigation navigation={navigation} page="profile" />
            </View>
          </View>
        </>
      )}
    </>
  );
}
