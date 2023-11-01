import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  RefreshControl
} from "react-native";
import { ActivityIndicator } from "react-native";
import MenuBackArrow from "../../components/menubackarrow/menubackarrow";
import { SendMail } from "../../api/api";
import ButtomNavigation from "../../components/AppFooter/ButtomNavigation";
import ResponsiveImage from "react-native-responsive-image";
import * as Font from "expo-font";
import Loader from "../../components/Loader/Loader"
import Contactsvg from "../../jssvgs/Contactsvg";

export default function Contact(props) {
  const { navigation } = props;
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [buttonWidth, setButtonWidth] = useState(153);
  const [buttonFontSize, setButtonFontSize] = useState(18);
  const { width, height } = Dimensions.get("window");

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


  const headerHeight =
    Platform.OS === "android"
      ? width >= 720
        ? 120
        : 100
      : height >= 720
      ? 110
      : 70;
  const numberOfLines = width >= 720 ? 5 : 4;
  const lineHeight = width >= 720 ? 30 : 25;
  const multilineHeight = numberOfLines * lineHeight;

  const [isFontLoaded, setIsFontLoaded] = useState(false);

  useEffect(() => {
    // Simulate a delay to hide the loading indicator after 3 seconds (adjust as needed)
    const delay = 1000; // 3 seconds

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

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



  const handleSubmit = async () => {
    console.log("Hello", username, email, subject, message);
    if (!username || !email || !subject || !message) {
      setShowValidationErrors(true);
      return;
    } 
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!emailRegex.test(email)) { // Use emailRegex to test the email
      setShowValidationErrors(true);
      return;
    } else {
      setShowValidationErrors(false);
      Alert.alert("Success", "Thank you! We will contact you soon.", [
        { text: "OK", onPress: () => console.log("Alert dismissed") },
      ]);
      mail();
      setUsername("");
      setEmail("");
      setSubject("");
      setMessage("");
    }
  };
  

  const mail = async () => {
    console.log(username, email, subject, message);
    const data = {
      username,
      email,
      subject,
      message,
    };
    try {
      const result = await SendMail(data);
      if (result.status === 200) {
        const data = result.data;
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
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
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: width >= 720 ? 35 : 25,
              fontFamily: isFontLoaded ? "Glory" : undefined,
              fontWeight: "700",
              width: "100%",
            }}
          >
            Contact us
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

  const styles = StyleSheet.create({
    submitButton: {
      backgroundColor: "black",
      borderRadius: 6.711,
      width: width >= 720 ? 220 : 120,
      height: width >= 720 ? 80 : 47,
      justifyContent: "center",
    },
    submitText: {
      color: "white",
      textAlign: "center",
      fontSize: width >= 720 ? 30 : 20,
      fontFamily: isFontLoaded ? "Glory" : undefined,
      fontWeight: "700",
    },
  });
  const windowWidth = Dimensions.get("window").width;

  return (
    <>{isLoading ? (
      <View style={{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#FFFFFF"
      }}>
         <Loader/>
      </View>
    ) : (
     
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "white" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      
      <ScrollView
        contentContainerStyle={{ flexGrow: 0.7 }}
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View
          style={{
            alignItems: "center",
            borderTopColor: "#828282",
            width: "60%",
            height: "30%",
            marginLeft: "20%",
            marginRight: "20%",
          }}
        >
          {/* <Image
            source={require("../../../assets/ContactPagePNG/contact.png")}
            style={{
              marginTop: 15,
              width: "100%",
              resizeMode: "contain",
              height: "100%",
            }}
          /> */}
          <Contactsvg/>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "90%",
            marginLeft: "5%",
            marginRight: "5%",
          }}
        >
          <View
            style={{
              marginBottom: 5,
              height: width >= 720 ? 100 : 60,
              width: "100%",
            }}
          >
            <TextInput
              placeholder="User Name"
              value={username}
              onChangeText={setusername}
              style={{
                borderWidth: 1,
                borderRadius: 5,
                padding: 10,
                margin: 5,
                fontSize: width >= 720 ? 30 : 15,
                fontFamily: isFontLoaded ? "Glory" : undefined,

                height: width >= 720 ? 70 : 40,
              }}
            />
            {showValidationErrors && !username && (
              <Text
                style={{
                  color: "red",
                  fontSize: 12,
                  fontFamily: isFontLoaded ? "Glory" : undefined,
                  marginLeft: 10,
                }}
              >
                This field is required
              </Text>
            )}
          </View>
          <View
            style={{
              marginBottom: 5,
              height: width >= 720 ? 100 : 60,
              width: "100%",
            }}
          >
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={{
                borderWidth: 1,
                borderRadius: 5,
                padding: 10,
                margin: 5,
                fontSize: width >= 720 ? 30 : 15,
                fontFamily: isFontLoaded ? "Glory" : undefined,
                height: width >= 720 ? 70 : 40,
              }}
            />
            {showValidationErrors && !email && (
              <Text
                style={{
                  color: "red",
                  fontSize: 12,
                  fontFamily: isFontLoaded ? "Glory" : undefined,
                  marginLeft: 10,
                }}
              >
                This field is required
              </Text>
            )}
            {showValidationErrors && email && (
              <Text
                style={{
                  color: "red",
                  fontSize: 12,
                  fontFamily: isFontLoaded ? "Glory" : undefined,
                  marginLeft: 10,
                }}
              >
                Email Not Valid
              </Text>
            )}
          </View>
          <View
            style={{
              marginBottom: 5,
              height: width >= 720 ? 100 : 60,
              width: "100%",
            }}
          >
            <TextInput
              placeholder="Subject"
              value={subject}
              onChangeText={setSubject}
              style={{
                borderWidth: 1,
                borderRadius: 5,
                padding: 10,
                margin: 5,
                height: width >= 720 ? 70 : 40,
                fontSize: width >= 720 ? 30 : 15,
                fontFamily: isFontLoaded ? "Glory" : undefined,
              }}
            />
            {showValidationErrors && !subject && (
              <Text
                style={{
                  color: "red",
                  fontSize: 12,
                  fontFamily: isFontLoaded ? "Glory" : undefined,
                  marginLeft: 10,
                }}
              >
                This field is required
              </Text>
            )}
          </View>
          <View
            style={{
              marginBottom: 5,
              height: width >= 720 ? 80 : 60,
              width: "100%",
            }}
          >
            <TextInput
              placeholder="Message"
              editable
              multiline
              numberOfLines={numberOfLines}
              maxLength={100}
              value={message}
              onChangeText={setMessage}
              style={{
                borderWidth: 1,
                borderRadius: 5,
                paddingLeft: 8,
                paddingBottom: 70,
                margin: 5,
                height: multilineHeight,
                fontSize: width >= 720 ? 30 : 15,
                fontFamily: isFontLoaded ? "Glory" : undefined,
              }}
            />
            {showValidationErrors && !message && (
              <Text
                style={{
                  color: "red",
                  fontSize: 12,
                  fontFamily: isFontLoaded ? "Glory" : undefined,
                  marginLeft: 10,
                }}
              >
                This field is required
              </Text>
            )}
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: height >= 720 ? 90 : 45,
            }}
          >
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
        <ButtomNavigation navigation={navigation} page="contactus" />
      </View>
    </KeyboardAvoidingView>
    )}</>
  );
}
