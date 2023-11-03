import React from 'react';
import { TouchableHighlight, Image, Text, View } from 'react-native';
import styles from './styles';

export default function ViewIngredientsButton (props) {
    return (
      <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={props.onPress}>
        <View style={styles.container}>
          <Text style={styles.text}>View Ingredients</Text>
        </View>
      </TouchableHighlight>
    );
}


