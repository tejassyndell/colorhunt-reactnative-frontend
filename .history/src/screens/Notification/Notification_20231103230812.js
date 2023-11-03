import { StatusBar } from "expo-status-bar";
import { useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Platform,
  Dimensions,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState, navigation } from "react";
import MenuBackArrow from "../../components/menubackarrow/menubackarrow";
import ButtomNavigation from "../../components/AppFooter/ButtomNavigation";
import { Timeline } from "react-native-calendars";
import Loader from "../../components/Loader/Loader";

const { width, height } = Dimensions.get("window");
export default function Notification(props) {
  const { navigation } = props;
  const { width, height } = Dimensions.get("window");
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const headerHeight =
    Platform.OS === "android" ? (width >= 720 ? 120 : 100) : 120;

  const data = [{}];

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Set isLoading to false after 2 seconds
    }, 2000); // 2000 milliseconds = 2 seconds
  }, []);

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setIsLoading(false);
      setRefreshing(false); // Set isLoading to false after 2 seconds
    }, 2000);

    // Add any logic here that you want to execute when the user triggers a refresh.
    // For example, you can reload data or perform any other action.

    // Simulate a delay to hide the loading indicator after 3 seconds (adjust as needed)
    // 3 seconds
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <MenuBackArrow
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerTitle: () => (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 25,
              fontWeight: 700,
              width: "100%",
            }}
          >
            Notification
          </Text>
        </View>
      ),
      headerStyle: {
        height: headerHeight, // Increase the header height here
        elevation: 0, // Remove the shadow on Android
        shadowOpacity: 0, // Remove the shadow on iOS
      },
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#FFF",
          }}
        >
          <Loader />
        </View>
      ) : (
        <View style={styles.container}>
          {/* {/ Render notification data /} */}

          <StatusBar style="auto" />
          <ScrollView
            style={styles.scrollView}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View style={styles.notificasionContenor}>
              <TouchableOpacity style={styles.contentBox}>
                <View
                  style={{
                    width: 60,

                    height: 60,
                    marginVertical: 8,
                    alignItems: "center",
                    justifyContent: "center",

                    marginRight: 8,
                    borderWidth: 1,
                  }}
                >
                  <Image
                    style={styles.imagesection}
                    source={require("../../../assets/notification/resize1.jpg")}
                  />
                </View>

                <View style={styles.contentsection}>
                  <View
                    style={{
                      width: "65%",
                      height: "100%",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={styles.detailscon}>
                      Lorem ipsum dolor sit amet consectetur. Lacus pulvinar
                      interdum
                    </Text>
                  </View>

                  <View
                    style={{
                      width: 120,
                      height: "100%",
                      justifyContent: "center",
                      textAlign: "right",
                    }}
                  >
                    <Text style={styles.timedetails}>1m ago.</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
            <ButtomNavigation navigation={navigation} page="notification" />
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    height: "86%",
    backgroundColor: "white", // Set the background color to your preference
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    marginTop: 12,
    marginBottom: 12,
    width: "100%",
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  notificationContainer: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    width: "96%",
    marginLeft: "1%",
  },
  notificationTitle: {
    fontWeight: "bold",
  },
  notificasionContenor: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  contentBox: {
    height: "auto",
    width: "95%",
    backfaceVisibility: "#FFF",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginTop: 5,
    // shadowOpacity: 0.5, // Increased shadow opacity
    // borderColor: "rgba(0,0,0,0.9)",
    elevation: 0.4, // Increased elevation
  },
  imagesection: {
    width: "100%",
    height: "100%",
  },
  detailscon: {
    fontSize: 14,
    fontWeight: "600",
    // Corrected to string
  },
  timedetails: {
    fontSize: 14,
    fontWeight: "600", // Corrected to string
    alignItems: "flex-end",
    width: "100%",

    paddingRight: 15,
  },
  contentsection: {
    flexDirection: "row",
  },
});
