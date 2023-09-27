import React from "react";
import { TouchableOpacity, Image, View, Dimensions } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles.js";

export default function MenuBackArrow(props) {
  const windowwidthe = Dimensions.get("window").width;
  const windowHighte = Dimensions.get("window").height;
  const iconewidth = () => {
    if (parseInt(windowwidthe) >= 768) {
      return windowwidthe * 0.06
    }
    else {  return windowwidthe * 0.07 }
  }
  return (
    <View style={{ width: "100%" }}>
      <TouchableOpacity
        style={{ flexDirection: "row", width: "100%", height: "auto" }}
        onPress={props.onPress}
      >
        <Image
          style={{ marginLeft: 10, resizeMode: "contain", width: iconewidth(), height: windowHighte * 0.05 }}
          source={require("../../../assets/arrow.png")}
        />
      </TouchableOpacity>
    </View>
  );
}

MenuBackArrow.propTypes = {
  onPress: PropTypes.func,
};
