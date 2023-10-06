import React from "react";
import { TouchableHighlight, Image, Text, View } from "react-native";
import styles from "./styles";

export default function MenuButton(props) {
  const { title, onPress, source } = props;

  return (
    <TouchableHighlight onPress={onPress} style={styles.btnClickContain} underlayColor="rgba(128, 128, 128, 0.1)">
      <View style={styles.btnContainer}>
        <Image source={source} style={styles.btnIcon} />
        <Text style={styles.btnText}>{title}</Text>
      </View>
    </TouchableHighlight>
  );
}
