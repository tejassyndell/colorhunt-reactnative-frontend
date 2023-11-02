import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Keyboard,
  Button,
  Dimensions,
} from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width, height } = Dimensions.get("window");

const SearchBar = ({ clicked, searchPhrase, setSearchPhrase }) => {
  const [isLoggedin, setIsLoggedIn] = useState(false);

  const checkUserLogin = async () => {
    const token = await AsyncStorage.getItem("UserData");

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkUserLogin();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={
          clicked ? styles.searchBar__clicked : styles.searchBar__unclicked
        }
      >
        {/* {/ search Icon /} */}
        <Feather
          name="search"
          size={width >= 720 ? 30 : 20}
          color="black"
          style={{ marginLeft: 1 }}
        />
        {/* {/ Input field /} */}
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            // setClicked(true);
          }}
        />

        {/* {/ cross Icon, depending on whether the search bar is clicked or not /} */}
        {clicked && (
          <Entypo
            name="cross"
            size={20}
            color="black"
            style={{ padding: 1 }}
            onPress={() => {
              setSearchPhrase("");
            }}
          />
        )}
      </View>
      {/* {/ cancel button, depending on whether the search bar is clicked or not /} */}
      {clicked && (
        <View>
          <Button
            title="Cancel"
            onPress={() => {
              Keyboard.dismiss();
              setClicked(false);
            }}
          ></Button>
        </View>
      )}
    </View>
  );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    margin: 8,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: isLoggedIn ? (width >= 720 ? "87%" : "95%") : "96%",
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#F1F1F1",
    borderRadius: 30,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "100%",
    height: width >= 720 ? 40 : 20,
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: width >= 720 ? 25 : 15,
    height: width >= 720 ? 40 : 20,
    marginLeft: 10,
    width: "100%",
  },
});
