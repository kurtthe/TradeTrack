import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import { StyleSheet, Image, TouchableWithoutFeedback, ImageBackground, Dimensions, View } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

import { nowTheme } from '@constants';
const { width } = Dimensions.get("screen");

class Cardd extends React.Component {
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
      categoryCard,
      onPress
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
      return categoryCard ?
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
      <TouchableWithoutFeedback onPress={() => categoryCard && onPress()}>
        <Block row={horizontal} card flex style={cardContainer}>
          <>
            <View style={imgContainer}>
              <Image resizeMode="contain" source={{uri: item.image}} style={imageStyles} />
            </View>
            <Block flex space="between" style={!categoryCard && styles.cardDescription}>
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
                {item.description && !categoryCard && 
                  <Block flex center>
                    <Text
                      style={{ fontFamily: 'montserrat-regular', textAlign: 'left', padding: 10, bottom:10 }}
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
              {item.cta && !categoryCard &&
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
          </>
        </Block>
      </TouchableWithoutFeedback>
    );
  }
}

Cardd.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
  ctaRight: PropTypes.bool,
  titleStyle: PropTypes.any,
  textBodyStyle: PropTypes.any,
  categoryCard: PropTypes.bool,
  onPress: PropTypes.any
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 4,
    borderRadius:0
  },
  cardTitle: {
    fontFamily: 'montserrat-bold',
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 10
  },
  cardDescription: {
    //padding: theme.SIZES.BASE / 2
  },
  imageContainer: {
    borderRadius: 0,
    alignContent:'center',
    justifyContent:'center'
  },
  horizontalImage: {
    height: 120,
    width: '92.5%',
    left:9.5,
    top:4.6
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
    height: 215,
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
    paddingVertical: 2.5,
    bottom:7
  },
  itemPrice: {
    fontFamily: 'montserrat-regular',
    fontSize: 12,
    paddingHorizontal: 9,
    color: nowTheme.COLORS.PRIMARY
  },
  imageBlock: {
    width: '100%',
    height: '100%'
  }
});

export default Cardd;
