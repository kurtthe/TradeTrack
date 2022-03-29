import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import { StyleSheet, Image, TouchableWithoutFeedback, ImageBackground, View } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

import { nowTheme } from '@constants';


class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
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
    const titleStyles = [styles.cardTitle, titleStyle, {}];
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
            // uri: this.props.item.image,
            uri: 'https://live.staticflickr.com/65535/51227105003_e18d28b6ce_c.jpg',
          }}
          style={styles.imageBlock}
        >
          <Text
            style={titleStyles}
            size={14}
            color={'white'}
          >
            {this.props.item.title.toString()}
          </Text>
        </ImageBackground>
        :
        <Text
          size={14}
          style={[titleStyles, { fontFamily: 'montserrat-regular' }]}
          color={nowTheme.COLORS.SECONDARY}
        >
          {this.props.item.title.toString()}
        </Text>
    }

    return (
      <TouchableWithoutFeedback onPress={() => categoryCard && onPress()}>
        <Block row={horizontal} card flex style={cardContainer}>
          <>
            <View style={imgContainer}>
              <Image resizeMode="cover" source={{ uri: item.image }} style={imageStyles} />
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
                {this.props.item.description.toString() && !categoryCard &&
                  <Block flex center>
                    <Text
                      style={{ fontFamily: 'montserrat-regular', textAlign: 'left', padding: 10 }}
                      size={14}
                      color={"#858C9C"}
                    >
                      {this.props.item.description.toString()}
                    </Text>
                  </Block>
                }
                {this.props.item.body &&
                  <Block flex left>
                    <Text
                      style={{ fontFamily: 'montserrat-regular' }}
                      size={12}
                      color={nowTheme.COLORS.TEXT}
                    >
                      {this.props.item.body.toString()}
                    </Text>
                  </Block>
                }
                {this.props.item.price &&
                  <Block flex left>
                    <Text
                      style={styles.itemPrice}
                    >
                      {this.props.item.price.toString()}
                    </Text>
                  </Block>
                }
              </Block>
              {this.props.item.cta && !categoryCard &&
                <Block right={ctaRight ? false : true}>
                  <Text
                    style={styles.articleButton}
                    size={12}
                    muted={!ctaColor}
                    color={ctaColor || nowTheme.COLORS.ACTIVE}
                    bold
                  >
                    {this.props.item.cta.toString()}
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

Card.propTypes = {
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
    marginBottom: 4
  },
  cardTitle: {
    fontFamily: 'montserrat-bold',
    paddingHorizontal: 9,
    paddingTop: 7,
    paddingBottom: 10
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden'
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
    borderBottomLeftRadius: 0,

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
  },
  imageBlock: {
    width: '100%',
    height: '100%'
  }
});

export default withNavigation(Card);
