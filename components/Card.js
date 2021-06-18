import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import { StyleSheet, Image, TouchableWithoutFeedback, ImageBackground, Dimensions } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

import { nowTheme } from '../constants';
const { width } = Dimensions.get("screen");

class Card extends React.Component {
  render() {
    const {
      navigation,
      item,
      horizontal,
      full,
      style,
      ctaColor,
      imageStyle,
      ctaRight,
      titleStyle,
      productCard
    } = this.props;

    const imageStyles = [full ? styles.fullImage : styles.horizontalImage, imageStyle];
    const titleStyles = [styles.cardTitle, titleStyle];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [
      styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow
    ];

    const title = () => {
      return productCard ?
        <ImageBackground 
          source={{
            uri: 'https://live.staticflickr.com/65535/51227105003_e18d28b6ce_c.jpg',
          }}
          style={[
            styles.imageBlock,
            { width: '100%', height: '100%' }
          ]}
          imageStyle={{
            width: '100%',
            height: '100%'
          }}
        >
          <Text
            style={titleStyles}
            size={14}
            color={'white'}
          >
            {item.title}
          </Text>
        </ImageBackground>
      :
        <Text
            style={{ fontFamily: 'montserrat-regular' }}
            size={14}
            style={titleStyles}
            color={nowTheme.COLORS.SECONDARY}
          >
            {item.title}
        </Text>
    }

    return (
      <Block row={horizontal} card flex style={cardContainer}>
        <TouchableWithoutFeedback style={imgContainer}>
          <Image resizeMode="cover" source={{uri: item.image}} style={imageStyles} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback >
          <Block flex space="between" style={styles.cardDescription}>
            <Block flex>
              {title()}
              {item.subtitle && 
                <Block flex center>
                  <Text
                    style={{ fontFamily: 'montserrat-regular' }}
                    size={32}
                    color={nowTheme.COLORS.BLACK}
                  >
                    {item.subtitle}
                  </Text>
                </Block>
              }
              {item.description && 
                <Block flex center>
                  <Text
                    style={{ fontFamily: 'montserrat-regular', textAlign: 'left', padding: 10 }}
                    size={14}
                    color={"#858C9C"}
                  >
                    {item.description}
                  </Text>
                </Block>
              }
              {item.body &&
                <Block flex left>
                  <Text
                    style={{ fontFamily: 'montserrat-regular' }}
                    size={12}
                    color={nowTheme.COLORS.TEXT}
                  >
                    {item.body}
                  </Text>
                </Block>
              }
              {item.price &&
                <Block flex left>
                  <Text
                    style={styles.itemPrice}
                  >
                    {item.price}
                  </Text>
                </Block>
              }
            </Block>
            {item.cta &&
              <Block right={ctaRight ? false : true}>
                <Text
                  style={styles.articleButton}
                  size={12}
                  muted={!ctaColor}
                  color={ctaColor || nowTheme.COLORS.ACTIVE}
                  bold
                >
                  {item.cta}
                </Text>
              </Block>
            }
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  }
}

Card.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
  ctaRight: PropTypes.bool,
  titleStyle: PropTypes.any,
  textBodyStyle: PropTypes.any,
  productCard: PropTypes.bool
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 4
  },
  cardTitle: {
    fontFamily: 'montserrat-bold',
    paddingHorizontal: 9,
    paddingTop: 7,
    paddingBottom: 15
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden'
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 122,
    width: 'auto'
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  fullImage: {
    height: 215
  },
  shadow: {
    shadowColor: '#8898AA',
    shadowOffset: { width: 2, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    elevation: 2
  },
  articleButton: {
    fontFamily: 'montserrat-bold',
    paddingHorizontal: 9,
    paddingVertical: 7
  },
  itemPrice: {
    fontFamily: 'montserrat-regular',
    fontSize: 12,
    paddingHorizontal: 9,
    color: nowTheme.COLORS.PRIMARY
  }
});

export default withNavigation(Card);
