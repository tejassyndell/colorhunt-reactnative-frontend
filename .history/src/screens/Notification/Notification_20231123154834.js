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
import { AllNotifications, updateNotification } from "../../api/api";
import {
  format,
  formatDistanceToNow,
  isToday,
  isYesterday,
  subDays,
  parseISO,
  differenceInDays,
  isBefore,
} from "date-fns";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width, height } = Dimensions.get("window");
export default function Notification(props) {
  const { navigation } = props;
  const { width, height } = Dimensions.get("window");
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [notificationalldata, setNotificationAllData] = useState([]);

  const onRefresh = () => {
    setRefreshing(true);
  };

  const headerHeight =
    Platform.OS === "android" ? (width >= 720 ? 120 : 100) : 120;
  const getpartyid = async () => {
    let partydata = await AsyncStorage.getItem("UserData");
    partydata = await JSON.parse(partydata);
    return partydata[0].Id;
  };

  const data = [{}];

  const grtNotificasionData = async () => {
    const data = {
      party_id: await getpartyid(),
    };
    try {
      const result2 = await AllNotifications({ partyid: data.party_id });
      if (result2.status === 200) {
        console.log(result2.data);
        setNotificationAllData(result2.data);
        setIsLoading(false);
        setRefreshing(false);
      }
    } catch (error) {}
  };

  // Get the navigation object

  // Call UpdateNotificationData with the navigation object

  const UpdateNotificationData = async (id) => {
    const data = {
      party_id: await getpartyid(),
      id: id,
    };

    try {
      const result2 = await updateNotification(data);
      if (result2.status === 200) {
        setIsLoading(false);
        setRefreshing(false);
        navigation.navigate("ordershistroy");
        grtNotificasionData();
        setRefreshing(false); // Reload data after navigating back
      }
    } catch (error) {
      // Handle errors as needed
    }
  };

  const baseImageUrl =
    "https://webportalstaging.colorhunt.in/colorHuntApiStaging/public/uploads/";

  useEffect(() => {
    grtNotificasionData();
  }, []);

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

  /// date formate and time

  const formatTimeDifference = (time) => {
    const notificationTime = parseISO(time);
    const now = new Date();
    const timeDifferenceInMilliseconds = now - notificationTime;
    const timeDifference = formatDistanceToNow(notificationTime, {
      addSuffix: true,
    });

    if (timeDifference.includes("minute")) {
      return "just now";
    } else if (timeDifferenceInMilliseconds < 24 * 60 * 60 * 1000) {
      // If the time difference is less than 24 hours
      const hoursAgo = Math.floor(
        timeDifferenceInMilliseconds / (60 * 60 * 1000)
      );
      return `${hoursAgo}h ago`;
    } else if (timeDifferenceInMilliseconds < 7 * 24 * 60 * 60 * 1000) {
      // If the time difference is within the last 7 days
      const daysAgo = Math.floor(
        timeDifferenceInMilliseconds / (24 * 60 * 60 * 1000)
      );
      return `${daysAgo}d ago`;
    } else {
      // For older dates, use a library to format the relative time

      return formatDistanceToNow(notificationTime, {
        addSuffix: true,
        includeSeconds: true,
      })
        .replace("minute", "m")
        .replace("hour", "h")
        .replace("day", "d")
        .replace("month", "m")
        .replace("ms", "m")
        .replace("about", "")
        .replace("ds", "d")
        .replace("year", "y");
    }
  };

  const parseTime = (time) => {
    const dateTimeParts = time.split("T");
    if (dateTimeParts.length === 2) {
      const datePart = dateTimeParts[0];
      const timePart = dateTimeParts[1];

      const dateParts = datePart.split("-");
      const timeParts = timePart.split(":");

      if (dateParts.length === 3 && timeParts.length === 3) {
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]) - 1; // Months are zero-based
        const day = parseInt(dateParts[2]);
        const hours = parseInt(timeParts[0]);
        const minutes = parseInt(timeParts[1]);
        const seconds = parseInt(timeParts[2]);

        return new Date(Date.UTC(year, month, day, hours, minutes, seconds));
      }
    }

    return null; // Return null for invalid time values
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isYesterday = (date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    );
  };

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
              {notificationalldata.map((item, index) => (
                <TouchableOpacity
                  style={styles.contentBox}
                  key={index}
                  onPress={() => {
                    UpdateNotificationData(item.id);
                    // You can add other code here if needed
                  }}
                >
                  <View
                    style={{
                      width: 60,
                      height: 60,
                      marginVertical: 2,
                      alignItems: "center",
                      justifyContent: "center",
                      shadowColor: "gray",
                      marginHorizontal: 2,
                      shadowOpacity: 3,
                      shadowRadius: 6,
                      borderRadius: 10,
                      shadowColor: "black",
                      elevation: 2,
                      shadowOffset: {
                        width: 1,
                        height: 1,
                      },
                    }}
                  >
                    {item.status === 0 && (
                      <View
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          backgroundColor: "red",
                          width: 12,
                          height: 12,
                          borderRadius: 8,
                          zIndex: 2,
                        }}
                      />
                    )}
                    <Image
                      style={styles.imagesection}
                      source={{ uri: baseImageUrl + item.image }}
                    />
                    {console.log(item.image, "imageget")}
                  </View>

                  <View style={styles.contentsection}>
                    <View
                      style={{
                        width: "62%",
                        justifyContent: "center",
                        marginStart: 8,
                      }}
                    >
                      <Text style={styles.detailscon}>{item.body}</Text>
                    </View>

                    <View
                      style={{
                        width: "30%",
                        justifyContent: "center",
                        alignItems: "flex-end",
                        paddingEnd: width >= 720 ? 0 : 20,
                      }}
                    >
                      <Text style={styles.timedetails}>
                        {formatTimeDifference(item.CreatedDate)}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
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
    flex: 1, // Set the background color to your preference
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
    width: "100%",

    alignItems: "center",
  },
  contentBox: {
    width: "95%",
    backfaceVisibility: "#FFF",
    flexDirection: "row",
    justifyContent: "space-between",
    // padding: 10,
    marginVertical: 8,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    shadowOpacity: 0.5, // Increased shadow opacity
    // borderColor: "rgba(0,0,0,0.9)",
    // elevation:0.4, // Increased elevation
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

    paddingRight: 15,
  },
  contentsection: {
    flexDirection: "row",
  },
});
