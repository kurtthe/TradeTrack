import React from 'react';
import { TouchableOpacity } from 'react-native'
import { makeStyles } from './styles'
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';

export const SearchHome = ({  style, navigation }) => {
  const styles = makeStyles()
  return(
  <TouchableOpacity
    style={([styles.button, style], { zIndex: 300 })}
    onPress={async () => {
      await SecureStore.deleteItemAsync('data_user');
      Keyboard.dismiss();
      navigation.navigate('Login');
    }}
  >
    <Ionicons name="log-out-outline" color={'#828489'} size={28} />
  </TouchableOpacity>
)};