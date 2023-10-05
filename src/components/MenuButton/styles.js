import { StyleSheet,Dimensions } from 'react-native';
import { color } from 'react-native-reanimated';
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  btnClickContain: {
    flexDirection: 'row',
    padding: 5,
    marginTop: width >= 720 ? 10:5,
    marginBottom: width >= 720 ? 10:5
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height:30
    
  },
  btnIcon: {
    height: width >= 720 ? 30:20,
    width: width >= 720 ? 30:20,
    resizeMode:'contain'
  },
  btnText: {
    fontSize: width >= 720 ? 20:16,
    marginLeft: 10,
    color:'#fff'
  }
});

export default styles;
