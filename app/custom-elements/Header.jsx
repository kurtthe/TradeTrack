import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
  Keyboard,
  Image,
  View,
} from 'react-native';


const Header = (props)=> {

  return(
    <View>
      <Text>{props.title || 'Prueba'}</Text>
    </View>
  )
}

export default Header;
