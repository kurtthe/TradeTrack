import React from 'react';
import Icon from '@components/Icon';
import {
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export const BellButton = ({ isWhite, style, navigation }) => (
  <TouchableOpacity style={[styles.button, style]}>
    <Icon
      family="NowExtra"
      size={16}
      name="bulb"
      color={nowTheme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
    <Block
      middle
      style={[styles.notify, { backgroundColor: nowTheme.COLORS[isWhite ? 'WHITE' : 'PRIMARY'] }]}
    />
  </TouchableOpacity>
);

export const BasketButton = ({ isWhite, style, navigation }) => (
  <TouchableOpacity
    style={([styles.button, style], { zIndex: 300 })}
    onPress={() => {
      Keyboard.dismiss();
      navigation.navigate('Search');
    }}
  >
    <Icon family="NowExtra" size={20} name="zoom-bold2x" color={'#828489'} />
  </TouchableOpacity>
);

export const CartButton = ({ isWhite, style, navigation }) => (
  <TouchableOpacity style={([styles.button, style], { zIndex: 300, left: -10 })}>
    <Ionicons name="cart" color={'#828489'} size={25} />
  </TouchableOpacity>
);

export const ConfigButton = ({ isWhite, style, navigation }) => (
  <TouchableOpacity style={{ zIndex: 300, left: 0 }}>
    <Ionicons name="ellipsis-vertical-sharp" color={'#828489'} size={25} />
  </TouchableOpacity>
);

export const DeleteButton = ({ isWhite, style, navigation }) => (
  <TouchableOpacity style={{ zIndex: 300, left: 15 }}>
    <Ionicons name="trash-sharp" color={'#828489'} size={25} />
  </TouchableOpacity>
);

export const DownloadButton = ({ isWhite, style, navigation }) => (
  <TouchableOpacity style={{ zIndex: 300, left: 15 }}>
    <Ionicons name="download" color={'#0E3A90'} size={25} />
  </TouchableOpacity>
);