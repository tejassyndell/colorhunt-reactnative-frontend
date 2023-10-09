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
} from "react-native";
import MenuBackArrow from "../../components/menubackarrow/menubackarrow";
import { SendMail } from "../../api/api";
import ButtomNavigation from "../../components/AppFooter/ButtomNavigation";
import ResponsiveImage from "react-native-responsive-image";
import * as Font from "expo-font";

export default function Contact(props) {
  const { navigation } = props;
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [buttonWidth, setButtonWidth] = useState(153);
  const [buttonFontSize, setButtonFontSize] = useState(18);
  const headerHeight =
    Platform.OS === "android" ? (width >= 720 ? 120 : 100) : 120;
  const { width, height } = Dimensions.get("window");
  const numberOfLines = width >= 720 ? 5 : 4;
  const lineHeight = width >= 720 ? 30 : 25;
  const multilineHeight = numberOfLines * lineHeight;

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

  const handleSubmit = async () => {
    console.log("Hello", username, email, subject, message);
    if (!username || !email || !subject || !message) {
      setShowValidationErrors(true);
      return;
    } else {
      setShowValidationErrors(false);
      Alert.alert("Success", "Thank you! We will contact you soon.", [
        { text: "OK", onPress: () => console.log("Alert dismissed") },
      ]);
      mail();
      setusername("");
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
              fontFamily: isFontLoaded ? 'Glory' : undefined,
              fontWeight: 700,
              width: "100%",
            }}
          >
            Contact us
          </Text>
        </View>
      ),
      headerStyle: {
        height: headerHeight, // Increase the header height here
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
      fontFamily: isFontLoaded ? 'Glory' : undefined,
      fontWeight: 700,
    },
  });
  const windowWidth = Dimensions.get("window").width;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 0.7 }}
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={true}
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
          <Image
            source={require("../../../assets/ContactPagePNG/contact.png")}
            style={{
              marginTop: 15,
              width: "100%",
              resizeMode: "contain",
              height: "100%",
            }}
          />
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
                fontFamily: isFontLoaded ? 'Glory' : undefined,

                height: width >= 720 ? 70 : 40,
              }}
            />
            {showValidationErrors && !username && (
              <Text style={{ color: "red", fontSize: 10,fontFamily: isFontLoaded ? 'Glory' : undefined, marginLeft: 10 }}>
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
                fontFamily: isFontLoaded ? 'Glory' : undefined,
                height: width >= 720 ? 70 : 40,
              }}
            />
            {showValidationErrors && !email && (
              <Text style={{ color: "red", fontSize: 10,fontFamily: isFontLoaded ? 'Glory' : undefined, marginLeft: 10 }}>
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
                fontFamily: isFontLoaded ? 'Glory' : undefined,
              }}
            />
            {showValidationErrors && !subject && (
              <Text style={{ color: "red", fontSize: 10,fontFamily: isFontLoaded ? 'Glory' : undefined, marginLeft: 10 }}>
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
                fontFamily: isFontLoaded ? 'Glory' : undefined,
              }}
            />
            {showValidationErrors && !message && (
              <Text style={{ color: "red", fontSize: 10,fontFamily: isFontLoaded ? 'Glory' : undefined, marginLeft: 10 }}>
                This field is required
              </Text>
            )}
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: width >= 720 ? 100 : 60,
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
  );
}
