import { StyleSheet, Dimensions } from 'react-native';

const { width: viewportWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1
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
        display: "flex",
        paddingBottom: 0,
        paddingLeft: 5,
        paddingRight: 0,
        paddingTop: 1,
        position: "absolute",
        height: "100%",
        width: "100%",
        backgroundColor: "#ffffff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        // bottom: 0,
        top:410,
        elevation: 50,
        shadowOffset: { width: "100%", height: -3 }, // Offset the shadow upwards
        shadowColor: 'red',
        shadowOpacity: 5,
        shadowRadius: 5

    },
    product_detail: {
        display: "flex",
        width: "95%",
        paddingTop: "3%",
        flexDirection:"row"
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
        marginLeft: "1%"
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
        width: "50%"
    },
    size_label1: {
        fontSize: 15,
        fontWeight: 600,
        color: "black",
        marginLeft: "2%"
    },
    size_container2: {
        height: 53,
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
        width: "95%",
        marginTop: "4%"
    },
    // container_grid:{
    //     width:"100%"
    // },
    head_grid: {
        display: "flex",
        flexDirection: "row",
        width: "100%"
    },
    color_div: {
        width: "31%",
        float: "left"
    },

    color_title: {
        width: "100%",
        fontSize: 15,
        fontWeight: 600,
        color: "black",
    },
    available_div: {
        width: "37%",
        float: "left"
    },
    available_title: {
        width: "100%",
        fontSize: 15,
        fontWeight: 600,
        color: "black",
        marginLeft: 12
    },
    qty_div: {
        width: "31%",
        float: "left"
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
    },
    color_box_div: {
        width: "31%"
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
        width: "37%"
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
        display: "flex"
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
        height: 40,
        justifyContent: 'center', // Align content vertically
        alignItems: 'center', // Center content horizontally
        paddingVertical: 7,
        paddingHorizontal: 0,
        textAlign:"center",
        borderWidth: 1,
        borderColor: '#ded6d6',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    top_row:{
        display:"flex",
        width:"100%"
    },
    box1:{
        width:"33%"
    },
    box1_butn:{
        float:"left",
        borderRadius:10,
        marginTop:-8,
        marginRight:-1,
        marginBottom:5,
        marginLeft:-1,
        paddingLeft:10,
        paddingRight:10,
        paddingTop:0,
        paddingBottom:0,backgroundColor:"white",
        fontSize:25,
        borderWidth:1,
        borderStyle:"solid",
        borderColor:"#0000004d"
    },
    box2:{
        width:"33%"
    },
    box3:{
        width:"33%",
        marginLeft:5
    },
    box1_butn:{
        borderWidth:1,
        borderStyle:"solid",
        borderColor:"#0000004d",
        float:"right",
        borderRadius:10,
        marginTop:-8,
        marginRight:-1,
        marginBottom:5,
        marginLeft:0,
        paddingLeft:9,
        paddingRight:9,
        paddingTop:0,
        paddingBottom:0,
        backgroundColor:"white",
        fontSize:25
    }
});

export default styles;
