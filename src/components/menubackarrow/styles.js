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
    height:30
    
  },
  btnIcon: {
    height: 20,
    width: 20
  },
  btnText: {
    fontSize: 16,
    marginLeft: 10,
    color:'#fff'
  }
});

export default styles;
