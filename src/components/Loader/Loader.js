import React from "react";
import { TouchableHighlight, Image, View } from "react-native";
import PropTypes from "prop-types";

export default function Loader(props) {
  return (
    <View style={{ width: "100%", height: "25%", backgroundColor: "#FFF",marginBottom:50 }}>
      <Image
        source={require("../../../assets/Loader/Newfile.gif")}
        style={{ width: "100%",height:'90%' }}
        resizeMode="contain"
      />
    </View>
  );
}
