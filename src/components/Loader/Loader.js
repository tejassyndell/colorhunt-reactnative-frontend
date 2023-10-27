import React from "react";
import { TouchableHighlight, Image,View } from "react-native";
import PropTypes from "prop-types";


export default function Loader(props) {
  return (
    <View style={{width:'50%',height:'25%',backgroundColor:'#FFF'}}>
         <Image
          source={require("../../../assets/Loader/Newfile.gif")}
          style={{width:'100%',}}
          resizeMode="contain"
        />
       </View>
  );
}


