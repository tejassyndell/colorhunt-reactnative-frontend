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
  RefreshControl,
  Keyboard,
} from "react-native";
import MenuBackArrow from "../../components/menubackarrow/menubackarrow";
import { SendMail } from "../../api/api";
import ButtomNavigation from "../../components/AppFooter/ButtomNavigation";
import * as Font from "expo-font";
import Loader from "../../components/Loader/Loader";
import Contactsvg from "../../jssvgs/Contactsvg";
import { loadCustomFont } from "../../loadCustomFont";

export default function Contact(props) {
  const { navigation } = props;
  const [username, setusername] = useState("");
  const [validusername, setvalidusername] = useState(false);
  const [email, setEmail] = useState("");
  const [showValidationemail, setShowValidationemail] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showValidationErrors, setShowValidationErrors] = useState(false);

  const { width, height } = Dimensions.get("window");

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
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    // Simulate a delay to hide the loading indicator after 3 seconds (adjust as needed)
    const delay = 1000; // 3 seconds

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);
  const fonttype = async () => {
    const status = await loadCustomFont();
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
    fonttype();
    loadCustomFont();
  }, []);

  const handleSubmit = async () => {
    // console.log("Hello", username, email, subject, message);
    if (!username || !email || !subject || !message) {
      setShowValidationErrors(true);
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      // Use emailRegex to test the email
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
              fontFamily: "GloryBold",
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
      fontSize: width >= 720 ? 30 : 23,
      fontFamily: "GlorySemiBold",
    },
  });
  const windowWidth = Dimensions.get("window").width;
  const handleusername = (val) => {
    const isValid = /^[a-zA-Z ]*$/.test(val);
    setusername(val);

    if (!isValid) {
      setvalidusername(true);
    } else {
      setvalidusername(false);
    }
  };
  const handleEmailChange = (text) => {
    setEmail(text);
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
    if (isValidEmail) {
      setShowValidationemail(false);
    } else {
      setShowValidationemail(true);
    }
    // Show validation error if the email is empty or invalid
  };

  return (
    <>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#FFFFFF",
          }}
        >
          <Loader />
        </View>
      ) : (
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: "white" }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={{
                alignItems: "center",
                borderTopColor: "#828282",
                // width: height >= 844 ? "40%" : "60%",
                height: height >= 844 ? "30%" : "20%",
                // marginLeft: "20%",
                // marginRight: "20%",
              }}
            >
              <Contactsvg />
            </View>
            <ScrollView
              contentContainerStyle={{ flexGrow: 0.7 }}
              keyboardShouldPersistTaps="handled"
              showsHorizontalScrollIndicator={true}
            >
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
                    onChangeText={(val) => {
                      handleusername(val);
                    }}
                    style={{
                      borderWidth: 1,
                      borderRadius: 5,
                      padding: 10,
                      margin: 5,
                      fontSize: width >= 720 ? 30 : 15,
                      fontFamily: "GloryRegular",
                      height: width >= 720 ? 70 : 40,
                    }}
                  />
                  {showValidationErrors &&
                    !username &&
                    validusername == false && (
                      <Text
                        style={{
                          color: "red",
                          fontSize: 12,
                          fontFamily: "GloryRegular",
                          marginLeft: 10,
                        }}
                      >
                        This field is required
                      </Text>
                    )}
                  {validusername && (
                    <Text
                      style={{
                        color: "red",
                        fontSize: 12,
                        fontFamily: "GloryRegular",
                        marginLeft: 10,
                      }}
                    >
                      {username == ""
                        ? " This field is required"
                        : "This field is required only characters."}
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
                    onChangeText={(val) => handleEmailChange(val)}
                    style={{
                      borderWidth: 1,
                      borderRadius: 5,
                      padding: 10,
                      margin: 5,
                      fontSize: width >= 720 ? 30 : 15,
                      fontFamily: "GloryRegular",
                      height: width >= 720 ? 70 : 40,
                    }}
                  />
                  {showValidationErrors &&
                    !email &&
                    showValidationemail == false && (
                      <Text
                        style={{
                          color: "red",
                          fontSize: 12,
                          fontFamily: "GloryRegular",
                          marginLeft: 10,
                        }}
                      >
                        This field is required
                      </Text>
                    )}
                  {showValidationemail && (
                    <Text
                      style={{
                        color: "red",
                        fontSize: 12,
                        fontFamily: "GloryRegular",
                        marginLeft: 10,
                      }}
                    >
                      {email == ""
                        ? "This field is required"
                        : "Please use a valid email address"}
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
                      fontFamily: "GloryRegular",
                    }}
                  />
                  {showValidationErrors && !subject && (
                    <Text
                      style={{
                        color: "red",
                        fontSize: 12,
                        fontFamily: "GloryRegular",
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
                      fontFamily: "GloryRegular",
                    }}
                  />
                  {showValidationErrors && !message && (
                    <Text
                      style={{
                        color: "red",
                        fontSize: 12,
                        fontFamily: "GloryRegular",
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
            <View
              style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
            >
              <ButtomNavigation navigation={navigation} page="contactus" />
            </View>
          </KeyboardAvoidingView>
        </View>
      )}
    </>
  );
}
