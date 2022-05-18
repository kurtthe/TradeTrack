import React from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import ArButton from './Button';
import LoadingComponent from '@custom-elements/Loading';

import nowTheme from '@constants/Theme';

class FilterButton extends React.Component {
  render() {
    const { color, text, icon, style, onPress, isActive, isLoading, ...props } = this.props;

    return (
      <ArButton small color={'white'} style={styles.button} onPress={onPress}>
        {isLoading && <LoadingComponent size='small' />}
        {icon && <Image style={styles.icon} source={icon} />}
        {isActive && <Image style={styles.image} source={require('../../assets/category.png')} />}
        <Text style={styles.text}>{text}</Text>
      </ArButton>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  image: {
    marginRight: 5,
    height: 18,
    width: 18,
  },
  text: {
    color: nowTheme.COLORS.LIGHTGRAYTEXT,
  },
  icon: {
    maxWidth: 25,
    maxHeight: 25,
    margin: 5,
  },
});

export default FilterButton;
