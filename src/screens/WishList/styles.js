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
        width:'98%',
        position:'absolute',
        zIndex: 2,
        marginRight:120

       
      },
      icon: {
        width:'100%',
        fontSize: 20,
        textAlign:'right',
        color:'red',
        paddingRight:10,
        paddingTop:10
       
        // Add other icon styling here
      },
    
   
  
  

});

export default styles;
