import React from 'react';
import { Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Text } from 'galio-framework';

import { makeStyles } from './CategoryItem.styles'
const CategoryItem = ({ title,
  image,
  onPress }) => {

  const styles = makeStyles()

  const imageStyles = [styles.horizontalImage];
  const titleStyles = [styles.cardTitle];
  const cardContainer = [styles.card, styles.shadow];

  const handlePress = () => onPress && onPress()

  return (
    <TouchableOpacity onPress={() => handlePress()} style={cardContainer}>
      <Image source={image} style={imageStyles} />
      <ImageBackground
        source={{
          uri: 'https://live.staticflickr.com/65535/51227105003_e18d28b6ce_c.jpg',
        }}
        style={styles.imageBlock}
      >
        <Text
          style={titleStyles}
          size={14}
          color={'white'}
        >
          {title}
        </Text>
      </ImageBackground>

    </TouchableOpacity>
  );
}

export default CategoryItem;
