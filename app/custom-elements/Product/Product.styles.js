import { StyleSheet, Dimensions } from 'react-native'
import { theme } from 'galio-framework';
import { nowTheme } from '@constants';

const { width, height } = Dimensions.get('window');
const cardWidth = (width / 2) * 0.87;
const cardHeight = height * 0.59;

export const makeStyles = () =>
  StyleSheet.create({
    Card: {
      backgroundColor: nowTheme.COLORS.WHITE,
      width: '47%',
      alignItems: 'center',
      borderRadius: 5,
      padding: theme.SIZES.BASE,
      margin:5,
    },
    image: {
      width: cardWidth * 0.9,
      height: cardHeight * 0.3,
      resizeMode: 'contain'
    },
    priceGrayText: {
      fontSize: 13,
    },
    price: {
      fontFamily: 'montserrat-bold',
      fontSize: 12,
      color: nowTheme.COLORS.ORANGE,
    },
    contentNameProduct: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: 'space-between'
    },
    contentSku: {
      flexDirection: "row",
      alignItems: "center",
    }
  })