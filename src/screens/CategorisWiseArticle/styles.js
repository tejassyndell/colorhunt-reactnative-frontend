import { StyleSheet } from "react-native";

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
      },
      loader:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
      },
      producticones: {
        // Add your styles for the container view here
        width:'20%',
        position:'absolute',
        resizeMode:'contain',
        zIndex: 2,
        right:3,
        top:15
      },
      icon: {
        width:'100%',
        fontSize: 20,
        color:'red',
        
        // Add other icon styling here
      },
      disabledIcon: {
        width:'100%',
        color:'black',
        fontSize: 20,
    
        // Add styles for disabled icon here
      },
   
  
  

});

export default styles;
