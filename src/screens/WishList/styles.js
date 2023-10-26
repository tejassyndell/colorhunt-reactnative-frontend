import { Dimensions, StyleSheet } from "react-native";
import { RecipeCard } from "../../AppStyles";
const { height, width } = Dimensions.get("window");
const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 60,
    backgroundColor: "#fff", // Set your desired background color
  },
  backIcon: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  profileContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    paddingRight: 10,
  },
  producticones: {
    // Add your styles for the container view here
    width: "20%",
    position: "absolute",
    resizeMode: "contain",
    zIndex: 2,
    right: width >= 720 ? 10 : 15,
    top: 12,
  },
  icon: {
    width: "100%",
    fontSize: 20,
    textAlign: "right",
    color: "red",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
