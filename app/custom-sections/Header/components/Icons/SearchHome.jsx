import React from 'react';
import { TouchableOpacity, Keyboard } from 'react-native'
import { makeStyles } from './styles'
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { useDispatch } from 'react-redux';
import { clearProducts } from '@core/module/store/cart/cart';

export const SearchHome = ({  style, navigation }) => {
  const styles = makeStyles()
  const dispatch = useDispatch()


  return(
  <TouchableOpacity
    style={([styles.button, style], { zIndex: 300 })}
    onPress={async () => {
      await SecureStore.deleteItemAsync('data_user');
      Keyboard.dismiss();
      navigation.navigate('Login');
      dispatch(clearProducts())
    }}
  >
    <Ionicons name="log-out-outline" color={'#828489'} size={28} />
  </TouchableOpacity>
)};
