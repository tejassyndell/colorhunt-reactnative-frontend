import { StyleSheet, Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");
// console.log(typeof width);

const commonStyle = {
  borderColor: "#000000",
  fontWeight: "bold",
  paddingTop: width >= 720 ? 10 : 9,
};

const androidBorder = {
  borderRightWidth: 2,
};

const iosBorder = {};

const styles = StyleSheet.create({
  fastRowContent: {
    width: width >= 720 ? 650 : 601,
    paddingLeft: 10,
    ...commonStyle,
    ...(Platform.OS === "android" ? androidBorder : iosBorder),
  },
  secondCollam: {
    width: width >= 720 ? 100 : 90,
    ...commonStyle,
    textAlign: "center",
    ...(Platform.OS === "android" ? androidBorder : iosBorder),
  },
  thurdCollam: {
    fontSize: 12.5,
    width: 100,
    ...commonStyle,
    ...(Platform.OS === "android" ? androidBorder : iosBorder),
  },
  collamGst: {
    width: 100,
    ...commonStyle,
    textAlign: "center",
    ...(Platform.OS === "android" ? androidBorder : iosBorder),
  },
  collamGst5Per: {
    width: 100,
    ...commonStyle,
    textAlign: "center",
    ...(Platform.OS === "android" ? androidBorder : iosBorder),
  },
});

export default styles;
