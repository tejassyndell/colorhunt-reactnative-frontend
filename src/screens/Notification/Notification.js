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
} from "react-native";
import React, { useEffect, useState, navigation } from "react";
import MenuBackArrow from "../../components/menubackarrow/menubackarrow";
import * as Notifications from "expo-notifications";
import ButtomNavigation from "../../components/AppFooter/ButtomNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");
export default function Notification(props) {
  const { navigation } = props;
  const [token, setToken] = useState("");
  const [title, setTitle] = useState("");
  const [bodydec, setBodydec] = useState("");
  const [notificationData, setNotificationData] = useState(null);
  const { width, height } = Dimensions.get("window");

  const headerHeight =
    Platform.OS === "android" ? (width >= 720 ? 120 : 100) : 120;

  const data = [{}];

  useEffect(() => {
    //android working code
    // const getToken = async () => {
    //     try {
    //       let data =await AsyncStorage.getItem('notificationstatus')
    //       data = await JSON.parse(data)
    //       if (data.status === true) {
    //         setToken(data.token);
    //         console.log(data.token,'token2');
    //       } else {
    //         console.log('Notification permission denied');
    //       }
    //     } catch (error) {
    //       console.error('Error requesting permission:', error);
    //     }
    //   };

    getToken();
  }, []);

  const getToken = async () => {
    try {
      // Get the stored data from AsyncStorage
      const storedData = await AsyncStorage.getItem("notificationstatus");

      // Parse the stored data as JSON
      console.log(storedData, "{}{}{{{}{}{}{}{}{}{}");
      const data = JSON.parse(storedData);

      console.log(data, "token");

      if (data !== null) {
        if (data.status === true) {
          // Assuming that setToken is a function for setting the token
          setToken(data.token);
          console.log(data.token, "token2");
        } else {
          console.log("Notification permission denied");
        }
      } else {
        console.log("Notification status data is null");
      }
    } catch (error) {
      console.error("Error getting token:", error);
    }
  };

  useEffect(() => {
    getToken();
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
      },
    });
  }, []);

  const sendNotification = async () => {
    try {
      await fetch("https://colorhunt-server.sincprojects.com/getNotification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          registrationToken: token,
          title: title,
          body: bodydec,
        }),
      });
      console.log("Notification sent successfully");

      // Schedule a local notification for iOS
      if (Platform.OS === "ios") {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: title,
            body: bodydec,
          },
          trigger: { seconds: 2 },
        });
      }
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  const sendAllNotification = async () => {
    try {
      await fetch("https://colorhunt-server.sincprojects.com/getNotification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          registrationToken: token,
          title: title,
          body: bodydec,
        }),
      });
      console.log("Notification sent successfully");
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        const { title, body } = notification.request.content;
        // setNotifucationData([title,body])
        console.log(title, body);
        // Update state with notification data
        setNotificationData({ title, body });

        data.push(notificationData);
        console.log(data);
        // Display the notification in the Expo app using Expo's built-in notification UI
        Notifications.scheduleNotificationAsync({
          title: title,
          body: body,
        });
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      {notificationData && (
        <View style={styles.notificationContainer}>
          <Text style={styles.notificationTitle}>Received Notification:</Text>
          <Text style={{ width: "100%" }}>{notificationData.title}</Text>
          <Text>{notificationData.body}</Text>
        </View>
      )}
      <SafeAreaView style={{ width: "90%" }}>
        <TextInput
          style={styles.input}
          onChangeText={setTitle}
          placeholder="Title"
        />
        <TextInput
          style={styles.input}
          onChangeText={setBodydec}
          placeholder="Body"
        />
      </SafeAreaView>

      <TouchableOpacity
        style={{ backgroundColor: "gray", padding: 10, borderRadius: 5 }}
        onPress={sendNotification}
      >
        <Text style={{ color: "white" }}>Send Notification</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: "gray",
          padding: 10,
          marginTop: 20,
          borderRadius: 5,
        }}
        onPress={sendAllNotification}
      >
        <Text style={{ color: "white" }}>Send All Notification</Text>
      </TouchableOpacity>

      {/* {/ Render notification data /} */}

      <StatusBar style="auto" />
      {/* <ScrollView style={styles.scrollView}>
      <View style={styles.notificasionContenor}>
        <TouchableOpacity style={styles.contentBox}>
          <View
          style={{
            width: "20%",
            height: "auto",
            marginVertical: 8,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "gray",
            marginRight: 8,
            shadowOpacity: 1, // Increased shadow opacity
            shadowRadius: 6, // Increased shadow radius
            borderRadius: 2,
            elevation: 5, // Increased elevation
            shadowOffset: {
              width: 1,
              height: 1,
            },
          }}
          >
            <Image
            style={styles.imagesection}
            source={require("../../../assets/notification/3300422348x4641.png")}
          ></Image>

          </View>

          
          <View style={styles.contentsection}>
            <Text style={styles.detailscon}>
              Lorem ipsum dolor sit amet consectetur. Lacus pulvinar interdum
              elementum amet ornare id. Feugiat tempus.
            </Text>
            <Text style={styles.timedetails}>1m ago.</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contentBox}>
          <View
          style={{
            width: "20%",
            height: "auto",
            marginVertical: 8,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "gray",
            marginRight: 8,
            shadowOpacity: 1, // Increased shadow opacity
            shadowRadius: 6, // Increased shadow radius
            borderRadius: 2,
            elevation: 5, // Increased elevation
            shadowOffset: {
              width: 1,
              height: 1,
            },
          }}
          >
            <Image
            style={styles.imagesection}
            source={require("../../../assets/notification/3300422348x4642.png")}
          ></Image>

          </View>

          
          <View style={styles.contentsection}>
            <Text style={styles.detailscon}>
              Lorem ipsum dolor sit amet consectetur. Lacus pulvinar interdum
              elementum amet ornare id. Feugiat tempus.
            </Text>
            <Text style={styles.timedetails}>1m ago.</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contentBox}>
          <View
          style={{
            width: "20%",
            height: "auto",
            marginVertical: 8,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "gray",
            marginRight: 8,
            shadowOpacity: 1, // Increased shadow opacity
            shadowRadius: 6, // Increased shadow radius
            borderRadius: 2,
            elevation: 5, // Increased elevation
            shadowOffset: {
              width: 1,
              height: 1,
            },
          }}
          >
            <Image
            style={styles.imagesection}
            source={require("../../../assets/notification/3300422348x4644.png")}
          ></Image>

          </View>

          
          <View style={styles.contentsection}>
            <Text style={styles.detailscon}>
              Lorem ipsum dolor sit amet consectetur. Lacus pulvinar interdum
              elementum amet ornare id. Feugiat tempus.
            </Text>
            <Text style={styles.timedetails}>1m ago.</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contentBox}>
          <View
          style={{
            width: "20%",
            height: "auto",
            marginVertical: 8,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "gray",
            marginRight: 8,
            shadowOpacity: 1, // Increased shadow opacity
            shadowRadius: 6, // Increased shadow radius
            borderRadius: 2,
            elevation: 5, // Increased elevation
            shadowOffset: {
              width: 1,
              height: 1,
            },
          }}
          >
            <Image
            style={styles.imagesection}
            source={require("../../../assets/notification/3300422348x4641.png")}
          ></Image>

          </View>

          
          <View style={styles.contentsection}>
            <Text style={styles.detailscon}>
              Lorem ipsum dolor sit amet consectetur. Lacus pulvinar interdum
              elementum amet ornare id. Feugiat tempus.
            </Text>
            <Text style={styles.timedetails}>1m ago.</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contentBox}>
          <View
          style={{
            width: "20%",
            height: "auto",
            marginVertical: 8,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "gray",
            marginRight: 8,
            shadowOpacity: 1, // Increased shadow opacity
            shadowRadius: 6, // Increased shadow radius
            borderRadius: 2,
            elevation: 5, // Increased elevation
            shadowOffset: {
              width: 1,
              height: 1,
            },
          }}
          >
            <Image
            style={styles.imagesection}
            source={require("../../../assets/notification/3300422348x4642.png")}
          ></Image>

          </View>

          
          <View style={styles.contentsection}>
            <Text style={styles.detailscon}>
              Lorem ipsum dolor sit amet consectetur. Lacus pulvinar interdum
              elementum amet ornare id. Feugiat tempus.
            </Text>
            <Text style={styles.timedetails}>1m ago.</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contentBox}>
          <View
          style={{
            width: "20%",
            height: "auto",
            marginVertical: 8,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "gray",
            marginRight: 8,
            shadowOpacity: 1, // Increased shadow opacity
            shadowRadius: 6, // Increased shadow radius
            borderRadius: 2,
            elevation: 3, // Increased elevation
            shadowOffset: {
              width: 0,
              height: 0,
            },
          }}
          >
            <Image
            style={styles.imagesection}
            source={require("../../../assets/notification/3300422348x4644.png")}
          ></Image>

          </View>

          
          <View style={styles.contentsection}>
            <Text style={styles.detailscon}>
              Lorem ipsum dolor sit amet consectetur. Lacus pulvinar interdum
              elementum amet ornare id. Feugiat tempus.
            </Text>
            <Text style={styles.timedetails}>1m ago.</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contentBox}>
          <View
          style={{
            width: "20%",
            height: "auto",
            marginVertical: 8,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "gray",
            marginRight: 8,
            shadowOpacity: 1, // Increased shadow opacity
            shadowRadius: 6, // Increased shadow radius
            borderRadius: 2,
            elevation: 5, // Increased elevation
            shadowOffset: {
              width: 1,
              height: 1,
            },
          }}
          >
            <Image
            style={styles.imagesection}
            source={require("../../../assets/notification/3300422348x4641.png")}
          ></Image>

          </View>

          
          <View style={styles.contentsection}>
            <Text style={styles.detailscon}>
              Lorem ipsum dolor sit amet consectetur. Lacus pulvinar interdum
              elementum amet ornare id. Feugiat tempus.
            </Text>
            <Text style={styles.timedetails}>1m ago.</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contentBox}>
          <View
          style={{
            width: "20%",
            height: "auto",
            marginVertical: 8,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "gray",
            marginRight: 8,
            shadowOpacity: 1, // Increased shadow opacity
            shadowRadius: 6, // Increased shadow radius
            borderRadius: 2,
            elevation: 5, // Increased elevation
            shadowOffset: {
              width: 1,
              height: 1,
            },
          }}
          >
            <Image
            style={styles.imagesection}
            source={require("../../../assets/notification/3300422348x4641.png")}
          ></Image>

          </View>

          
          <View style={styles.contentsection}>
            <Text style={styles.detailscon}>
              Lorem ipsum dolor sit amet consectetur. Lacus pulvinar interdum
              elementum amet ornare id. Feugiat tempus.
            </Text>
            <Text style={styles.timedetails}>1m ago.</Text>
          </View>
        </TouchableOpacity>
      </View>
      </ScrollView> */}
      <View style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
        <ButtomNavigation navigation={navigation} page="notification" />
      </View>
    </View>
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
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginTop: 5,
  },
  imagesection: {
    resizeMode: "contain",
  },
  detailscon: {
    width: "65%",
    fontSize: 14,
    fontWeight: "600", // Corrected to string
  },
  timedetails: {
    width: "23%",
    fontSize: 14,
    fontWeight: "600", // Corrected to string
    paddingTop: "8%",
    textAlign: "right",
    paddingRight: 15,
  },
  contentsection: {
    flexDirection: "row",
  },
});
