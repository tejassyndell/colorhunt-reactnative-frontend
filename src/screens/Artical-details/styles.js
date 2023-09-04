import { StyleSheet, Dimensions } from 'react-native';

const { width: viewportWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // zIndex:0
        overflow:"scroll",
        height:"100%"
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: "100%"
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        width: viewportWidth,
        height: 300
    },
    artical_name: {
        width: "100%",

    },
 
    productDetails: {
        paddingBottom: 0,
        paddingLeft: 5,
        paddingRight: 0,
        paddingTop: 1,
        position: 'absolute',
        height:'auto',
        width: "100%",
        bottom:0,
        zIndex: 2,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        top: "52%", // You can use a percentage for positioning if needed
        elevation: 50,
        shadowOffset: { width: 0, height: -3 }, // Offset the shadow upwards
        shadowColor: 'black', // Specify a shadow color
        shadowOpacity: 0.5, // Set the shadow opacity within the valid range (0-1)
        shadowRadius: 5,
      },
      
    product_detail: {
        display: "flex",
        width: "95%",
        height:'auto',
        paddingTop: "3%",
        flexDirection:"row",
    },
    product_detail_sec: {
        marginRight: "5%",
        width: "50%"
    },
    size_label: {
        fontSize: 15,
        fontWeight: 600,
        color: "black",
        marginLeft: "2%"
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
        elevation: 5,
        marginLeft: "1%",
        overflow:"scroll"
    },
    size: {
        width: 40,
        height: 39,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: "#b3a8a8",
        borderRadius: 100,
        color: "black",
        fontWeight: 400,
        marginLeft: 8,
        padding: 4
    },
    size_a: {
        marginTop: 3,
        textAlign: "center"
    },
    product_detail_sec2: {
        width: "50%",
        
    },
    size_label1: {
        fontSize: 15,
        fontWeight: 600,
        color: "black",
        marginLeft: "2%"
    },
    size_container2: {
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#ded6d6",
        borderRadius: 12,
        backgroundColor: "#f4f4f4",
        padding: 12,
        display: "flex",
        justifyContent: "center",
        width: "98%",
        elevation: 5,
        shadowColor: "#0000004d",
        shadowOffset: 0,
        shadowOpacity: 4
    }, size_options: {
        paddingLeft:14,
        display: "flex",
        fontSize: 18,
        fontWeight: 500
    },
    size_p: {
        marginTop: 0,
        marginBottom: "1%",
        fontSize: 18,
        textAlign: "center"
    },
    product_detail_sec3: {
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        alignContent:"center",
        width: "100%",
    },
    container_grid:{
        width:"100%"
    },
    head_grid: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height:30
    },
    color_Text:{
        width:"31%",
        textAlign:"left"
    },
    available_Text:{
        width:"37%",
        textAlign:"left"
    },
    qty_Text:{
        width:"31%",
        textAlign:"left"
    },
    color_box_Text:{ width:"31%",paddingRight:20},
    available_box_Text:{ width:"37%"},
    qty_box_Text:{ width:"31%",display:"flex",paddingLeft:20},
    color_div: {
        width: "31%",
        textAlign: "left"
    },

    color_title: {
        width: "100%",
        fontSize: 15,
        fontWeight: 600,
        color: "black",
    },
    available_div: {
        width: "37%",
        textAlign: "left"
    },
    available_title: {
        width: "100%",
        fontSize: 15,
        fontWeight: 600,
        color: "black",
        marginLeft: 2
    },
    qty_div: {
        width: "31%",
        textAlign: "left"
    },
    qty_title: {
        width: "100%",
        fontSize: 15,
        fontWeight: 600,
        color: "black",
        marginLeft: 20
    },
    body_main_con:{
        display:"flex",
        width:"100%",
    },
    row: {
        display: "flex",
        flexWrap:"wrap",
        flexDirection:"row",
        width:"100%",
        marginBottom:10
    },
    color_box_div: {
        width: "31%",
    },
    color_box: {
        width: '98%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#ded6d6',
        backgroundColor: 'white',
        borderRadius: 10,
        height: 40,
        justifyContent: 'center',
        textAlign: "center",
        alignItems: 'center',
        paddingVertical: 7, // Equivalent to padding: 7px 0px;
    },
    available_box_div: {
        width: "37%",
        paddingLeft:12,
        paddingRight:12
    },
    available_box: {
        width: '98%',
        shadowColor: '#00000017',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 2,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: "center",
        paddingVertical: 7,
        paddingHorizontal: 0,
        borderWidth: 1,
        borderColor: '#ded6d6',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    qty_box_div: {
        width: "31%",
        maxWidth:"100%",
        display: "flex",
        flexDirection:"row"
    },
    // row:{
    //     flexShrink:0,
    //     maxWidth:"100%"
    // },
    qty_box: {
        width: '98%',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 2, // Use elevation to simulate box-shadow
        justifyContent: 'center', // Align content vertically
        alignItems: 'center', // Center content horizontally
        // paddingTop: 7,
        // paddingBottom:7,
        paddingLeft:0,
        paddingStart:0,
        textAlign:"center",
        height:40,
        borderWidth: 1,
        borderColor: '#ded6d6',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    top_row:{
        display:"flex",
        flexDirection:"row",
        width:"100%",
       
    },
    box1:{
        width:"33%",
        height:40,
        paddingTop:1
       
    },
    box1_btn:{
        textAlign:"left",
        borderRadius:10,
        paddingBottom:0,backgroundColor:"white",
        borderWidth:1,
        borderStyle:"solid",
        borderColor:"#0000004d",
        marginHorizontal:0,
        // height:"100%",
        paddingBottom:3,
       marginVertical:0
    },
    box1_btn_text:{
        fontSize:25,
        textAlign:"center"
    },
    box2:{
        width:"33%",
        height:"96%",
        display:"flex",
        justifyContent:"center",
        alignContent:"center"
    },
    box3:{
        width:"33%",
        marginLeft:5,
        height:40,
        paddingTop:1
    },
    box3_btn:{
        borderWidth:1,
        borderStyle:"solid",
        borderColor:"#0000004d",
        textAlign:"right",
        borderRadius:10,
        backgroundColor:"white",
        marginHorizontal:0,
        // height:"100%",
        paddingBottom:3,
        marginLeft:-3,
        marginRight:3
    },

    article_ratio_Section:{
        display:"flex",
        flexDirection:"row",
        width:"100%",
        
    },
    article_ratio_container:{
        width:"45%",
        marginTop:10,
        height:40,
        alignItems:'center'
        
    },
    articallabel:{
        fontWeight:600,
        marginLeft:"3%",
    },
    article_content_r:{
        width:"98%",
        elevation:5,
        fontSize:18,
        fontWeight:500,
        borderColor:"#ded6d6",
        borderWidth:1,
        borderStyle:"solid",
        borderRadius:10,
        height:53,
        paddingHorizontal:0,
        paddingVertical:10,
        backgroundColor:"#f4f4f4"
    },
    article_ratio_content:{
        textAlign:"left",
        textAlign:"center",
        marginTop:10
    },
    article_rate_container:{
        width:"40%",
        textAlign:"left",
        marginLeft:"13%",
        marginTop:10
    },
    article_rate_content:{
        textAlign:"right",
        textAlign:"center",
        marginTop:10
    },
    articallabel1:{
        fontWeight:500,
        marginLeft:"5%"
    },
    total_price_container:{
        width:"95%",
        display:"flex",
        flexDirection:"row",
        marginTop:"11%",
        position:"relative",
        top:0,
        marginBottom:30
    },
    main_total_div:{
        width:"30%"
    },
    addto_card_container:{
        width:"50%",
        marginLeft:"24%"
    },
    addto_cart_btn:{
        backgroundColor:"black",
        borderRadius:10,
        paddingHorizontal:20,
        paddingVertical:10
    },
    loader: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
});

export default styles;
