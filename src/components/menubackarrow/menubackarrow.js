import React from "react";
import { TouchableOpacity, Image, View, Dimensions } from "react-native";
import styles from "./styles.js";

export default function MenuBackArrow(props) {
  const { width, height } = Dimensions.get("window");
  return (
    <View style={{ width: "100%" }}>
      <TouchableOpacity
        onPress={props.onPress}
      >
        <Image
          style={{
            marginLeft: 10,
            width: width >= 720 ? 50 : 35,
            height: width >= 720 ? 50 : 35,
          }}
          source={require("../../../assets/arrow.png")}
        />
      </TouchableOpacity>
    </View>
  );
}
