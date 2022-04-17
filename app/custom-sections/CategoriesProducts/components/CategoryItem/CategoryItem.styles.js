import { StyleSheet } from 'react-native';
import { nowTheme } from '@constants';
import { theme } from 'galio-framework';

export const makeStyles = () =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.COLORS.WHITE,
      marginVertical: theme.SIZES.BASE,
      marginHorizontal: 5,
      borderWidth: 0,
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