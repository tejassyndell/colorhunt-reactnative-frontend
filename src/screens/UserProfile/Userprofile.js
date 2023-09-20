import React, { useEffect, useState } from "react";
import { Text, View, Image, TouchableHighlight, Dimensions } from "react-native";
import styles from "./style2";
import { Profiledata } from "../../api/api";
import { useLayoutEffect } from "react";
import MenuBackArrow from "../../components/menubackarrow/menubackarrow";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ButtomNavigation from "../../components/AppFooter/ButtomNavigation";
export default function Userprofile(props) {
  const { navigation } = props;
  const [Profile, setprofile] = useState([]);
  const { width, height } = Dimensions.get("window");
  const fontSize = width > 400 ? 18 : 16; // Adjust the font size based on screen width
  const marginTop = height > 800 ? 30 : 20; // Adjust the margin top based on screen height
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
    } catch (err) {
      console.log(err, "error in fetching data");
    }
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: 'black', // Change the background color to black
      },
      headerLeft: () => (
        // <MenuBackArrow
        //   onPress={() => {
        //     navigation.goBack();
        //   }}
        // />
        <View onPress={()=>{navigation.goBack()}} style={{marginLeft:10}}>
          <Image source={require("../../../assets/menubar.png")} />
        </View>
      ),
      headerTitle: () => null, // Remove the header title
    });
  }, []);
  
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.TopContainer}>
        <TouchableHighlight>
          <View style={styles.Profile}>
            <Image
              source={require("../../../assets/Profileicon/Frame_1171274903.png")}
            />
          </View>
        </TouchableHighlight>
      </View>
      {Profile.map((item) => (
        <View style={{ ...styles.BottomContainer, marginTop }} key={item.Id}>
          <View style={styles.hello}>
            <Text style={{ ...styles.text, fontSize }}>{item.Name}</Text>
          </View>
          <View style={{ ...styles.hello, marginTop }}>
            <Text style={{ ...styles.text, fontSize }}>{item.Address}</Text>
          </View>
          <View style={{ ...styles.hello, marginTop }}>
            <Text style={{ ...styles.text, fontSize }}>{item.PhoneNumber}</Text>
          </View>
          <View style={{ ...styles.hello2, marginTop }}>
            <View style={styles.abc}>
              <Text style={{ ...styles.text, fontSize }}>{item.City}</Text>
            </View>
            <View style={styles.abc}>
              <Text style={{ ...styles.text, fontSize }}>{item.State}</Text>
            </View>
          </View>
          <View style={{ ...styles.hello2, marginTop }}>
            <View style={styles.abc}>
              <Text style={{ ...styles.text, fontSize }}>{item.Country}</Text>
            </View>
            <View style={styles.abc}>
              <Text style={{ ...styles.text, fontSize }}>{item.PinCode}</Text>
            </View>
          </View>
        </View>
      ))}
      <View
        style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
      >
        <ButtomNavigation navigation={navigation} />
      </View>
    </View>
  );
}
