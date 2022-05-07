import {StyleSheet, Dimensions} from 'react-native'
import {  theme } from 'galio-framework';
import { nowTheme } from '@constants';

const { width, height } = Dimensions.get('window');
const cardWidth = (width / 2) * 0.87;
const cardHeight = height * 0.59;
export const sizeConstant =
  Platform.OS === 'ios'
    ? Dimensions.get('window').height < 670
      ? 12
      : 14
    : Dimensions.get('window').height < 870
      ? 11.5
      : 15;

export const makeStyles = ()=> 
  StyleSheet.create({
    Card: {
      backgroundColor: 'white',
      flex:1,
      marginHorizontal: 5,
      padding: 10,
      paddingVertical: theme.SIZES.BASE,
      borderRadius: 5,
      marginBottom: '5%',
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
      fontSize:
        Platform.OS === 'ios'
          ? Dimensions.get('window').height < 670
            ? 12
            : 14
          : Dimensions.get('window').height < 870
            ? 11.5
            : 15,
      color: nowTheme.COLORS.ORANGE,
    },
  
    buttonAdd: {
      top:10,
      flexDirection:'row',
      justifyContent: 'center',
    },
  })