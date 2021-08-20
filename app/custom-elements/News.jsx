import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import {
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { nowTheme } from '@constants';

const News = (props) => {
  const cardContainer = [styles.card, styles.shadow];
  const imgContainer = [
    styles.imageContainer,
    styles.verticalStyles,
    styles.shadow
  ];

  return (
    <TouchableWithoutFeedback onPress={() => props.onPress()}>
      <Block card flex style={cardContainer}>
        <View style={imgContainer}>
          <Image
            resizeMode="cover"
            source={{ uri: props.news.preview.image }}
            style={styles.fullImage}
          />
        </View>
        <Block flex space="between" style={styles.cardDescription}>
          <Block flex>
            <Text
              style={{ fontFamily: nowTheme.FONT.primaryRegular }}
              size={14}
              style={styles.cardTitle}
              color={nowTheme.COLORS.SECONDARY}
            >
              {props.news.preview.title}
            </Text>
          </Block>
          <Block flex center>
            <Text
              style={{ fontFamily: nowTheme.FONT.primaryRegular, textAlign: 'left', padding: 10 }}
              size={14}
              color={'#858C9C'}
            >
              {props.news.preview.description}
            </Text>
          </Block>
        </Block>
      </Block>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 4,
  },
  cardTitle: {
    fontFamily: nowTheme.FONT.primaryBold,
    paddingHorizontal: 9,
    paddingTop: 7,
    paddingBottom: 10,
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  fullImage: {
    height: 215,
  },
  shadow: {
    shadowColor: '#8898AA',
    shadowOffset: { width: 2, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    elevation: 2,
  },
  articleButton: {
    fontFamily: nowTheme.FONT.primaryBold,
    paddingHorizontal: 9,
    paddingVertical: 7,
  },
  itemPrice: {
    fontFamily: nowTheme.FONT.primaryRegular,
    fontSize: 12,
    paddingHorizontal: 9,
    color: nowTheme.COLORS.PRIMARY,
  },
  imageBlock: {
    width: '100%',
    height: '100%',
  },
});

export default withNavigation(News);
