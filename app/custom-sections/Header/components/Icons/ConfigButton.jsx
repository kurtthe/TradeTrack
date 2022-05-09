import React from 'react';
import { TouchableOpacity } from 'react-native'
import { makeStyles } from './styles'
import { Ionicons } from '@expo/vector-icons';

const ConfigButton = ({ isWhite, style, navigation }) => {
  const styles = makeStyles()

  return (
    <TouchableOpacity style={{ zIndex: 300, left: 0 }}>
      <Ionicons name="ellipsis-vertical-sharp" color={'#828489'} size={25} />
    </TouchableOpacity>
  );
}