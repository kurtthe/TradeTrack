import React from 'react';
import { TouchableOpacity, Keyboard } from 'react-native'
import Icon from '@components/Icon';
import { makeStyles } from './styles'

export const SearchAccount = ({  style, navigation }) => {
  const styles = makeStyles()

  return (
    <TouchableOpacity
      style={([styles.button, style], { zIndex: 300 })}
      onPress={() => {
        Keyboard.dismiss();
        navigation.navigate('Search');
      }}
    >
      <Icon family="NowExtra" size={20} name="zoom-bold2x" color={'#828489'} />
    </TouchableOpacity>
  )
}