import React from 'react';
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

export const DownloadButton = (props) => {
  return (
    <TouchableOpacity style={{ zIndex: 300, left: 15 }} onPress={() => props.onPress()}>
      <Ionicons name="download" color={'#0E3A90'} size={25} />
    </TouchableOpacity>
  )
};