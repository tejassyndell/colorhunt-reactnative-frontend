import { StyleSheet, Dimensions } from "react-native";

const { width: viewportWidth } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // zIndex: 0,
    overflow: "scroll",
    height: "100%",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    width: viewportWidth,
    height: 300,
  },
  artical_name: {
    width: "100%",
  },

  productDetails: {
    paddingBottom: 0,
    paddingLeft: 12,
    paddingRight: 6,
    paddingTop: 1,
    position: "absolute",
    height: "auto",
    width: "100%",
    bottom: 0,
    zIndex: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    top: "47%", // You can use a percentage for positioning if needed
    elevation: 50,
    shadowOffset: { width: 0, height: 0 }, // Offset the shadow upwards
    shadowColor: "#000000", // Specify a shadow color
    shadowOpacity: 0.9, // Set the shadow opacity within the valid range (0-1)
    shadowRadius: 5,
  },

  product_detail: {
    display: "flex",
    width: "95%",
    height: "auto",
    paddingTop: "5%",
    flexDirection: "row",

  },
  product_detail_sec: {
    marginRight: "5%",
    width: "50%",

  },
  size_label: {
    fontSize: 15,
    fontWeight: 600,
    color: "black",
    marginLeft: "2%",
    marginBottom: 6,
  },
  size_container1: {
    display: "flex",
    flexDirection: "row",
    height: 53,
    borderColor: "#ded6d6",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 12,
    backgroundColor: "#f4f4f4",
    paddingTop: 6,
    paddingRight: 11,
    paddingBottom: 4,
    paddingLeft: 0,
    justifyContent: "center",
    alignItems: "center",
    width: "98%",
    elevation: 2,
    shadowColor: "gray",
    shadowOpacity: 0.5,
    marginLeft: "1%",
  },
  size: {
    width: 40,
    height: 39,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#b3a8a8",
    borderRadius: 100,
    color: "black",
    fontWeight: 400,
    marginLeft: 8,
    padding: 4,
  },
  size_a: {
    marginTop: 3,
    textAlign: "center",
    color: "rgba(0, 0, 0, 0.60)",
    fontWeight: 600,
  },
  product_detail_sec2: {
    width: "50%",
  },
  size_label1: {
    fontSize: 15,
    fontWeight: 600,
    color: "black",
    marginLeft: "18%",
    marginBottom: 6,
  },
 
  size_options: {
    paddingLeft: 8,
    display: "flex",
    flexDirection:"row",
    fontSize: 18,
    fontWeight: 500,
  },
  size_p: {
    marginTop: 0,
    marginBottom: "1%",
    fontSize: 13,
    color: "rgba(0, 0, 0, 0.60)",
    textAlign: "center",
    fontWeight: 600,
  },
  product_detail_sec3: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    width: "100%",
  },
  container_grid: {
    width: "100%",
  },
  head_grid: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: 30,
  },
  color_Text: {
    width: "31%",
    textAlign: "left",
  },
  available_Text: {
    width: "37%",
    textAlign: "left",
  },
  qty_Text: {
    width: "31%",
    textAlign: "left",
  },
  color_box_Text: {
    width: "31%",
    display:"flex",
    paddingHorizontal: 10, elevation: 2,
    shadowColor: "gray",
    shadowOpacity: 1,
    borderWidth: 1,
    borderColor: "#ded6d6",
    backgroundColor: "white",
    borderRadius: 10,
    height: 40,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    paddingVertical: 7,
    marginRight:10
  },
  available_box_Text: {
    width: "34%",
    display:"flex",
    paddingHorizontal: 10, elevation: 2,
    shadowColor: "gray",
    shadowOpacity: 1,
    borderWidth: 1,
    borderColor: "#ded6d6",
    backgroundColor: "white",
    borderRadius: 10,
    height: 40,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    paddingVertical: 7,
  },
  color_div: {
    width: "31%",
    textAlign: "left",
  },

  product_detail: {
    display: "flex",
    width: "95%",
    height: "auto",
    paddingTop: 12,
    flexDirection: "row",
  },
  product_detail_sec: {
    marginRight: "5%",
    width: "50%",
  },
 
  size: {
    width: 40,
    height: 39,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#b3a8a8",
    borderRadius: 100,
    color: "black",
    fontWeight: 400,
    marginLeft: 8,
    padding: 4,
  },
  size_a: {
    marginTop: 3,
    textAlign: "center",
    color: "rgba(0, 0, 0, 0.60)",
    fontWeight: 600,
  },
  product_detail_sec2: {
    width: "50%",
  },
  size_container2: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#ded6d6",
    borderRadius: 12,
    backgroundColor: "#f4f4f4",
    // padding: 12,
    display: "flex",
    height: 52,
    justifyContent: "center",
    alignContent:"center",
    alignItems:"center",
    width: "80%",
    elevation: 2,
    marginStart: 32,
    shadowColor: "gray",
    shadowOpacity: 0.5
  },

  size_p: {
    marginTop: 0,
    marginBottom: "1%",
    fontSize: 13,
    color: "rgba(0, 0, 0, 0.60)",
    textAlign: "center",
    fontWeight: 600,
  },
  product_detail_sec3: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    width: "100%",
  },
  container_grid: {
    width: "100%",
  },
  head_grid: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: 30,
  },
  color_Text: {
    width: "31%",
    textAlign: "left",
  },
  available_Text: {
    width: "37%",
    textAlign: "left",
  },
  qty_Text: {
    width: "31%",
    textAlign: "left",
  },
  qty_box_Text: { width: "31%", display: "flex", paddingLeft: 20  },
  color_div: {
    width: "31%",
    textAlign: "left",
  },

  color_title: {
    width: "100%",
    fontSize: 15,
    fontWeight: 600,
    color: "black",
  },
  available_div: {
    width: "37%",
    textAlign: "left",
  },
  available_title: {
    width: "100%",
    fontSize: 15,
    fontWeight: 600,
    color: "black",
    marginLeft: 2,
  },
  qty_div: {
    width: "31%",
    textAlign: "left",
  },
  qty_title: {
    width: "100%",
    fontSize: 15,
    fontWeight: 600,
    color: "black",
    marginLeft: 20,
  },
  body_main_con: {
    display: "flex",
    width: "100%",
  },
  row: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    width: "100%",
    marginTop: 2,
    marginBottom: 5,
  },
  color_box_div: {
    width: "31%",
  },
  color_box: {
    width: "100%",
    color: "rgba(0, 0, 0, 0.60)",
    textAlign:"center",
    fontWeight: 600
  },
  available_box_div: {
    width: "100%",
  },
  available_box: {
    width: "100%",
    textAlign: "center",
    fontWeight: 600,
  },
  qty_box_div: {
    width: "31%",
    maxWidth: "100%",
    display: "flex",
    flexDirection: "row",
  },
  // row:{
  //     flexShrink:0,
  //     maxWidth:"100%"
  // },
  qty_box: {
    width: "100%",
    shadowColor: "gray",
    shadowOpacity: 0.5,
    elevation: 2, // Use elevation to simulate box-shadow
    justifyContent: "center", // Align content vertically
    alignItems: "center", // Center content horizontally
    // paddingTop: 7,
    // paddingBottom:7,
    paddingLeft: 0,
    paddingStart: 0,
    textAlign: "center",
    height: 40,
    borderWidth: 1,
    borderColor: "#ded6d6",
    backgroundColor: "#FFF",
    borderRadius: 10,
    borderTopRightRadius:2,
    borderBottomRightRadius:2
  },
  top_row: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    // backgroundColor:"#FFF",
    // borderWidth: 1,
    // borderStyle: "solid",
    // borderColor: "#0000002d",
    // borderRadius:10,
    // elevation:2,
    // shadowColor:"gray",
    // shadowOpacity:0.5
  },
  box1: {
    width: "44%",
    height: 40,
    borderRadius: 10,
  },
  box1_btn: {
    textAlign: "left",
    borderRadius: 10,
    paddingBottom: 0,
    backgroundColor: "white",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#0000004d",
    marginHorizontal: 0,
    paddingBottom: 3,
    marginVertical: 0,
    width:"100%",
    height:'100%'
  },
  box1_btn_text: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: 600,
  },
  box2: {
    width: "44%",
    height: "96%",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  },
  box3: {
    width: "44%",
    height: 40,
    borderRadius: 10,
  },
  box3_btn: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#0000004d",
    textAlign: "right",
    borderRadius: 10,
    backgroundColor: "white",
    marginHorizontal: 0,
    paddingBottom: 3,
    width:"100%",
    height:'100%'
  },

  article_ratio_Section: {
    display: "flex",
    flexDirection: "row",
    width: "98%",
    marginHorizontal:4
  },
  article_ratio_container: {
    width: "45%",
    marginTop: 10,
    height: 40,
  },
  articallabel: {
    fontWeight: 600,
    marginLeft: 0.5,
    textAlign: "left",
  },
  article_content_r: {
    width: "80.5%",
    elevation: 2,
    shadowOpacity:0.5,
    shadowColor: "gray",
    fontSize: 18,
    fontWeight: 500,
    borderColor: "#ded6d6",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
    paddingTop: 13,
    height: 53,
    justifyContent: "center",
    paddingHorizontal: 0,
    paddingVertical: 10,
    backgroundColor: "#f4f4f4",
    color: "#626262",
    marginTop:10
  },
  article_ratio_content: {
    textAlign: "center",
  },
  article_rate_container: {
    width: "40%",
    textAlign: "left",
    marginLeft: "13%",
    marginTop: 10,
  },
  article_rate_content: {
    textAlign: "center",
  },
  articallabel1: {
    fontWeight: 500,
    marginLeft: 0.5,
  },
  total_price_container: {
    width: "95%",
    display: "flex",
    flexDirection: "row",
    marginTop: "11%",
    position: "relative",
    top: 0,
    marginLeft:6,
    marginBottom: 5,
  },
  main_total_div: {
    width: "30%",
  },
  addto_card_container: {
    width: 208,
    height: 50,
    marginLeft: "16%",
  },
  addto_cart_btn: {
    backgroundColor: "black",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Transparent background with some opacity
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: Dimensions.get("window").width - 30, // Adjust the width with margins
    height: Dimensions.get("window").height - 10, // Adjust the height with margin
    marginLeft: 15,
    marginRight: 15,
  },

  closeButton: {
    position: "absolute",
    top: 30,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default styles;
