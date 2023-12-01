import React from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import ArButton from './Button';
import LoadingComponent from '@custom-elements/Loading';
import {AntDesign} from '@expo/vector-icons';

import nowTheme from '@constants/Theme';

const FilterButton = ({text, icon, onPress, isActive, isLoading, nameIcon, sizeIcon, disabled, selected})=> {
    return (
      <ArButton small color={selected?'info': 'white'} style={styles.button} onPress={onPress} disabled={disabled}>
        {isLoading && <LoadingComponent size='small'/>}
        {icon && <Image style={styles.icon} source={icon}/>}
        {nameIcon && <AntDesign name={nameIcon} size={sizeIcon||30} color={nowTheme.COLORS.INFO}/>}
        {isActive && <Image style={styles.image} source={require('../../assets/category.png')}/>}
        <Text style={[styles.text, selected && { color: 'white'}]}>{text}</Text>
      </ArButton>
    );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  image: {
    marginRight: 5,
    height: 18,
    width: 18,
  },
  text: {
    fontSize: 12,
    color: nowTheme.COLORS.LIGHTGRAYTEXT,
  },
  icon: {
    maxWidth: 25,
    maxHeight: 25,
    margin: 5,
  },
});

export default FilterButton;
