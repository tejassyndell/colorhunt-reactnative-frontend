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
  RefreshControl
} from "react-native";
import styles from "./style2";
import { Profiledata } from "../../api/api";
import { ActivityIndicator } from "react-native";
import { useLayoutEffect } from "react";
import MenuBackArrow from "../../components/menubackarrow/menubackarrow";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ButtomNavigation from "../../components/AppFooter/ButtomNavigation";
import { TouchableOpacity } from "react-native-gesture-handler";
export default function Userprofile(props) {
  const { navigation } = props;
  const [Profile, setprofile] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { width, height } = Dimensions.get("window");
  // const fontSize = width > 400 ? 18 : 16; // Adjust the font size based on screen width
  const marginTop = height > 800 ? 30 : 20; // Adjust the margin top based on screen height
  const headerHeight = Platform.OS === 'android' ? (width >= 720 ? 120 : 86) : 120;

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
            <Image
              source={require("../../../assets/menubar.png")}
              style={{
                width: width >= 720 ? 50 : 35,
                height: width >= 720 ? 50 : 35,
              }}
            />
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
         barStyle = "light-content"
         // dark-content, light-content and default
         hidden = {false}
         //To hide statusBar
         backgroundColor = "black"
         //Background color of statusBar only works for Android
         translucent = {false}
         //allowing light, but not detailed shapes
         networkActivityIndicatorVisible = {true}
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
              source={require("../../../assets/Profileicon/Frame_1171274903.png")}
              style={{
                width: width >= 720 ? 200 : 120,
                height: width >= 720 ? 200 : 120,
              }}
            />
          </View>
        </TouchableHighlight>
      </View>
      {Profile.map((item) => (
        <View style={{ ...styles.BottomContainer, marginTop }} key={item.Id}>
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
      <View style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
        <ButtomNavigation navigation={navigation} page="profile" />
      </View>
    </View>
    </>
      )}
      </>
  );
}
