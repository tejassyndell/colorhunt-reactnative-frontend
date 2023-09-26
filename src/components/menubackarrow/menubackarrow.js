import React from "react";
import { TouchableOpacity, Image, View, Dimensions } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles.js";

export default function MenuBackArrow(props) {
  const windowwidthe = Dimensions.get("window").width;
  const windowHighte = Dimensions.get("window").height;
  return (
    <View style={{ width: "100%" }}>
      <TouchableOpacity
        style={{ flexDirection: "row",width: "100%", height: "auto"}}
        onPress={props.onPress}
      >
        <Image
          style={{ marginLeft: 10, resizeMode: "contain",width:windowwidthe * 0.07,height:windowHighte * 0.05 }}
          source={require("../../../assets/arrow.png")}
        />
      </TouchableOpacity>
    </View>
  );
}

MenuBackArrow.propTypes = {
  onPress: PropTypes.func,
};
