import { StyleSheet, Dimensions } from "react-native";
import { color } from "react-native-reanimated";

const { width, height } = Dimensions.get("window");
console.log(typeof width);
const styles = StyleSheet.create({
  btnClickContain: {
    flexDirection: "row",
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  btnContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 30,
  },
  btnIcon: {
    height: 20,
    width: 20,
  },
  btnText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#fff",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  producticones: {
    // Add your styles for the container view here
    width: "20%",
    position: "absolute",
    // resizeMode: "contain",
    zIndex: 2,
    right: width >= 720 ? 50 : 30,
    top: 15,
  },
  icon: {
    width: "100%",
    fontSize: width >= 720 ? 35 : 20,
    textAlign: "right",
    color: "red",

    // Add other icon styling here
  },
  disabledIcon: {
    width: "100%",
    color: "black",
    fontSize: width >= 720 ? 35 : 20,
    textAlign: "right",

    // Add styles for disabled icon here
  },
  fastconimage: {
    // Adjust the height for tablets
    flex: 1,
    width: "100%",
    // resizeMode: "cover",
    borderRadius: 10,
  },

  fastconimage1: {
    width: width >= 720 ? 300 : 155, // Adjust the width for tablets
    height: width >= 720 ? 280 : 190,
    borderColor: "gray",
    shadowColor: "gray",
    shadowOpacity: 0.9,
    shadowRadius: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    elevation: 10,
    shadowOffset: {
      width: 0,
      height: 0,
    },

    contener2: {
      flex: 1,
      width: width >= 720 ? 300 : 155, // Adjust the width for tablets
      height: width >= 720 ? 280 : 190,
      alignItems: "center",
      marginLeft: 10,
      marginRight: 5,
      borderRadius: 10,
    },
  },
});

export default styles;
