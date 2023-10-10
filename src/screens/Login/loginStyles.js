// LoginStyles.js
import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const { width, height } = Dimensions.get("window");
const logoSize = Math.min(width, height) * 0.4;

const loginStyles = {
  container1: {
    flex: 1,
    padding: 20,
  },
  backgroundImage1: {
    flex: 1,
    resizeMode: "stretch",
    width: "100%",
  },
  contentContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
  },
  title: {
    color: "white",
    fontSize: windowWidth * 0.07,
    fontWeight: "700",
    marginBottom: "2%",
  },
  subtitle: {
    color: "#FFFFFF",
    fontSize: windowWidth * 0.04,
    fontWeight: "700",
    marginBottom: 80,
  },
  input: {
    flex: 1,
    fontSize: width >= 720 ? 35 : 20,
    height: width >= 720 ? 80 : 50,
    paddingLeft: 5,
    backgroundColor: "white",
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    color: "#000000",
  },
  otpContainer: {
    height: "auto",
    flexDirection: "row",
    width: width >= 720 ? 400 : "60%",
    marginBottom: "10%",
    justifyContent: "space-between",
  },
  otpInput: {
    width: width >= 720 ? 90 : 47,
    justifyContent: "space-between",
    height: width >= 720 ? 90 : 50,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    fontSize: width >= 720 ? 40 : 23,
    borderRadius: 7,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#212121",
    width: width >= 720 ? 220 : 148,
    height: width >= 720 ? 70 : 50,
    borderRadius: 10,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
    right: 0,
  },
  buttonText: {
    color: "white",
    fontSize: width >= 720 ? 40 : 23,
    fontWeight: "700",
    textAlign: "center",
  },
  phoneIcon: {
    height: width >= 720 ? 35 : 20,
    width: width >= 720 ? 35 : 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    height: width >= 720 ? 80 : 10,
    borderColor: "gray",
    borderRadius: 7,
    marginBottom: windowHeight * 0.046,
    justifyContent: "center",
  },
  phoneIconContainer: {
    height: width >= 720 ? 80 : 50,
    width: width >= 720 ? 80 : 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 7,
    borderRightWidth: 3,
    borderColor: "#212121",
  },
  loginLogoContainer: {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: [{ translateX: -logoSize / 2 }, { translateY: -logoSize / 2 }],
  },
  loginLogo: {
    resizeMode: "contain",
  },
  imagebox: {
    flex: 1,
  },
};

export default loginStyles;
