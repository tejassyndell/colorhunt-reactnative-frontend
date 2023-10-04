import { StyleSheet } from "react-native";
import { RecipeCard } from "../../AppStyles";

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
        paddingRight:10
      },
      producticones: {
        // Add your styles for the container view here
        width:'20%',
        position:'absolute',
        resizeMode:'contain',
        zIndex: 2,
        right:15,
        top:15
        // marginRight:120
      },
      icon: {
        width:'100%',
        fontSize: 20,
        textAlign:'right',
        color:'red',
        // Add other icon styling here
      },
      disabledIcon: {
        width:'100%',
        color:'black',
        fontSize: 20,
        textAlign:'right',
        // Add styles for disabled icon here
      },
      container: {
        margin: 15,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        width: "90%",
    
      },
      searchBar__unclicked: {
        padding: 10,
        flexDirection: "row",
        width: "95%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
      },
      searchBar__clicked: {
        padding: 10,
        flexDirection: "row",
        width: "80%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "space-evenly",
      },
      input: {
        fontSize: 20,
        marginLeft: 10,
        width: "90%",
      },
      loader: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
      }
  

});

export default styles;
