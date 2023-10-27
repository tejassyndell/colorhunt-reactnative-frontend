import React from "react";
import { TouchableOpacity, Image, View, Dimensions } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles.js";
import Svg, { G, Circle, Path } from 'react-native-svg';
export default function MenuBackArrow(props) {
  const { width, height } = Dimensions.get("window");
  return (
    <View style={{ width: "100%" }}>
      <TouchableOpacity
        // style={{ flexDirection: "row", width: "100%", height: 35 }}
        onPress={props.onPress}
      >
      
        <Svg style={{ marginLeft: 10}} width={width >= 720 ? 50 : 35} height={width >= 720 ? 50 : 35} viewBox="0 0 35 35" {...props}>
          <G id="menu bar">
            <G id="arrow">
              <Circle id="Ellipse_4" cx={17.5} cy={17.5} r={17.5} fill="black" />
              <Path
                id="Vector"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.16 17.993V17.639C18.15 16.235 18.07 14.982 17.92 14.188C17.92 14.173 17.76 13.386 17.66 13.124C17.5 12.745 17.21 12.423 16.85 12.219C16.56 12.074 16.2599 12 15.9399 12C15.6899 12.012 15.28 12.137 14.99 12.242L14.74 12.336C13.13 12.978 10.04 15.077 8.84998 16.36L8.76001 16.45L8.38 16.87C8.13 17.191 8 17.585 8 18.008C8 18.387 8.11998 18.766 8.34998 19.072C8.41998 19.171 8.53 19.298 8.63 19.406L9.01001 19.803C10.31 21.124 13.13 22.978 14.6 23.592C14.6 23.606 15.5099 23.986 15.9399 24H16C16.66 24 17.28 23.621 17.6 23.009C17.69 22.841 17.77 22.513 17.84 22.225L17.95 21.681C18.08 20.807 18.16 19.465 18.16 17.993ZM24.5 19.518C25.33 19.518 26 18.839 26 18C26 17.162 25.33 16.483 24.5 16.483L20.8 16.81C20.15 16.81 19.62 17.342 19.62 18C19.62 18.658 20.15 19.191 20.8 19.191L24.5 19.518Z"
                fill="white"
              />
            </G>
          </G>
        </Svg>

      </TouchableOpacity>
    </View>
  );
}

MenuBackArrow.propTypes = {
  onPress: PropTypes.func,
};
