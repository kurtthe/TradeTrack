import React from 'react';
import { Image, TouchableWithoutFeedback, ImageBackground, View } from 'react-native';
import { Block, Text } from 'galio-framework';

import { makeStyles } from './CategoryItem.styles'
const CategoryItem = ({ title,
  image,
  onPress }) => {

  const styles = makeStyles()

  const imageStyles = [styles.horizontalImage];
  const titleStyles = [styles.cardTitle];
  const cardContainer = [styles.card, styles.shadow];
  const imgContainer = [
    styles.imageContainer,
    styles.verticalStyles,
    styles.shadow
  ];


  return (
    <TouchableWithoutFeedback onPress={onPress && onPress()}>
      <Block card flex style={cardContainer}>
        <View style={imgContainer}>
          <Image resizeMode="cover" source={image} style={imageStyles} />
        </View>
        <Block flex space="between">
          <Block flex>
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
          </Block>

        </Block>
      </Block>
    </TouchableWithoutFeedback>
  );
}

export default CategoryItem;
