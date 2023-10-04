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

export default function Contact(props) {
  const { navigation } = props;
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [inputWidth, setInputWidth] = useState();
  const [inputHeight, setInputHeight] = useState();
  const [buttonWidth, setButtonWidth] = useState(153);
  const [buttonFontSize, setButtonFontSize] = useState(18);
  const headerHeight = Platform.OS === 'android' ? (width >= 720 ? 120 : 100) : 120;
  const numberOfLines = 4;
  const lineHeight = 25;
  const multilineHeight = numberOfLines * lineHeight;

  useEffect(() => {
    const screenWidth = Dimensions.get("window").width;
    let inputWidth = screenWidth * 0.9;
    let inputHeight = 40;
    let buttonWidth = 153;
    let buttonFontSize = 18;

    if (screenWidth >= 720) {
      inputWidth = screenWidth * 0.6;
      inputHeight = 60;
      buttonWidth = screenWidth * 0.4;
      buttonFontSize = 30;
    }

    setInputWidth(inputWidth);
    setInputHeight(inputHeight);
    setButtonWidth(buttonWidth);
    setButtonFontSize(buttonFontSize);
  }, []);

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const aspectRatio = 239 / 234;
  const maxWidth = 0.6 * screenWidth;
  const maxHeight = 0.6 * screenHeight;

  let imageWidth = maxWidth;
  let imageHeight = maxWidth / aspectRatio;

  if (imageHeight > maxHeight) {
    imageHeight = maxHeight;
    imageWidth = maxHeight * aspectRatio;
  }

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
              fontSize: 25,
              fontWeight: 700,
              width: "100%",
            }}
          >
            Contact us
          </Text>
        </View>
      ),
      headerStyle: {
        height: headerHeight // Increase the header height here
    },

    });
  }, []);

  const styles = StyleSheet.create({
    submitButton: {
      backgroundColor: "black",
      borderRadius: 6.711,
      width: buttonWidth,
      height: 47,
      justifyContent: "center",
    },
    submitText: {
      color: "white",
      textAlign: "center",
      fontSize: buttonFontSize,
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
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={{
            alignItems: "center",
            borderTopColor: "#828282",
            borderTopWidth: 1,
          }}
        >
          <ResponsiveImage
            source={require("../../../assets/ContactPagePNG/contact.png")}
            initWidth={imageWidth.toString()}
            initHeight={imageHeight.toString()}
            style={{ marginTop: 15 }}
          />
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View>
            <View>
              <View style={{ marginBottom: 5, height: 60 }}>
                <TextInput
                  placeholder="User Name"
                  value={username}
                  onChangeText={setusername}
                  style={{
                    borderWidth: 1,
                    borderRadius: 5,
                    padding: 10,
                    margin: 5,
                    width: inputWidth,
                    height: inputHeight,
                  }}
                />
                {showValidationErrors && !username && (
                  <Text style={{ color: "red", fontSize: 10, marginLeft: 10 }}>
                    This field is required
                  </Text>
                )}
              </View>
              <View style={{ marginBottom: 5, height: 60 }}>
                <TextInput
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  style={{
                    borderWidth: 1,
                    borderRadius: 5,
                    padding: 10,
                    margin: 5,
                    width: inputWidth,
                    height: inputHeight,
                  }}
                />
                {showValidationErrors && !email && (
                  <Text style={{ color: "red", fontSize: 10, marginLeft: 10 }}>
                    This field is required
                  </Text>
                )}
              </View>
              <View style={{ marginBottom: 5, height: 60 }}>
                <TextInput
                  placeholder="Subject"
                  value={subject}
                  onChangeText={setSubject}
                  style={{
                    borderWidth: 1,
                    borderRadius: 5,
                    padding: 10,
                    margin: 5,
                    width: inputWidth,
                    height: inputHeight,
                  }}
                />
                {showValidationErrors && !subject && (
                  <Text style={{ color: "red", fontSize: 10, marginLeft: 10 }}>
                    This field is required
                  </Text>
                )}
              </View>
              <View style={{ marginBottom: 5, height: multilineHeight }}>
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
                    width: inputWidth,
                    height: multilineHeight,
                  }}
                />
                {showValidationErrors && !message && (
                  <Text style={{ color: "red", fontSize: 10, marginLeft: 10 }}>
                    This field is required
                  </Text>
                )}
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 30,
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
          </View>
        </View>
      </ScrollView>
      <View style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
        <ButtomNavigation navigation={navigation} page="contactus" />
      </View>
    </KeyboardAvoidingView>
  );
}
