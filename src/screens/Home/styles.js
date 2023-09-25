import { StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';

const styles = StyleSheet.create({
  btnClickContain: {
    flexDirection: 'row',
    padding: 5,
    marginTop: 5,
    marginBottom: 5
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height:30,
    
  },
  btnIcon: {
    height: 20,
    width: 20
  },
  btnText: {
    fontSize: 16,
    marginLeft: 10,
    color:'#fff'
  },
  loader:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
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
    paddingRight:15,
    paddingTop:15
    // Add other icon styling here
  },
  disabledIcon: {
    width:'100%',
    color:'black',
    fontSize: 20,
    textAlign:'right',
    paddingRight:15,
    paddingTop:15
    // Add styles for disabled icon here
  },
});

export default styles;
