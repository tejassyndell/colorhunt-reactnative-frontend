import React, { useEffect, useLayoutEffect, useState } from "react";
import { Text, View, Dimensions } from "react-native";

import MenuBackArrow from "../../components/menubackarrow/menubackarrow";

import Loader from "../../components/Loader/Loader";

export default function Aboutus(props) {
  const { navigation } = props;
  const [isLoading, setIsLoading] = useState(true);
  const { width, height } = Dimensions.get("window");
  useEffect(() => {
    // Simulate a delay to hide the loading indicator after 3 seconds (adjust as needed)
    const delay = 1000; // 3 seconds

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  const headerHeight =
    Platform.OS === "android"
      ? width >= 720
        ? 110
        : 80
      : height >= 844
      ? 110
      : 65;

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
            flexDirection: "row",
            alignItems: "center",
            alignContent: "center",
            paddingLeft: "10%",
            width: width >= 720 ? "95%" : "100%",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: width >= 720 ? 35 : 25,

              fontWeight: "700",
              width: "100%",
            }}
          >
            AboutUs
          </Text>
        </View>
      ),
      headerRight: () => <View />,
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
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FFF",
          }}
        >
          <Text style={{ fontSize: 20 }}>Coming Soon</Text>
        </View>
      )}
    </>
  );
}
