import React from 'react';
import { TouchableOpacity } from 'react-native'
import { makeStyles } from './styles'
import { Ionicons } from '@expo/vector-icons';


export const CartButton = ({ isWhite, style, navigation }) => {
  const styles = makeStyles()

  return (
    <TouchableOpacity style={([styles.button, style], { zIndex: 300, left: -10 })}>
      <Ionicons name="cart" color={'#828489'} size={25} />
    </TouchableOpacity>
  )
};