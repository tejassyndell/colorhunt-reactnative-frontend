import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    TopContainer: {
        backgroundColor: 'black',
        color: 'white',
        height: '30%',
        justifyContent:'center',
        alignItems:'center',
        paddingBottom:60
    },
    Button: {
        height: 35,
        width: 35
    },
    Image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    Profile: {
        height: 100,
        width: 100,
    },
    BottomContainer: {
        marginTop: 20,
        marginHorizontal: 10,
        fontWeight: 600,
    },
    text: {
        color:"rgba(0, 0, 0, 0.5)",
        fontSize: 18,
        fontWeight:600,
    },
    hello:{
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        marginTop: 30
    },
    hello2: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30
    },
    abc: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        flex: 1,
        width: '50%',
        marginHorizontal: 5
    }
})

export default styles