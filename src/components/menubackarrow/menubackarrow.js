import React from "react";
import { TouchableOpacity, Image,View } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles.js";

export default function MenuBackArrow(props) {
  return (
    <View style={{width:'100%'}}>
     <TouchableOpacity style={{flexDirection:"row",width:'100%',height:35}} onPress={props.onPress}>
      <Image style={{marginLeft:10,resizeMode:'contain'}} source={require("../../../assets/arrow.png")}   />
    </TouchableOpacity>
    </View>
   
  );
}

MenuBackArrow.propTypes = {
  onPress: PropTypes.func,
};