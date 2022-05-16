import { StyleSheet, Dimensions } from 'react-native'
import { theme } from 'galio-framework';
import { nowTheme } from '@constants';

const { width, height } = Dimensions.get('window');

const cardWidth = (width / 2) * 0.87;
const cardHeight = height * 0.59;

export const makeStyles = () =>
  StyleSheet.create({
    container: {
      padding: 5,
      width: width,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor:nowTheme.COLORS.BACKGROUND,
    },
    contentFilters: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      flexWrap: 'wrap',
    },
    Card: {
      backgroundColor: 'white',
      width: cardWidth,
      marginHorizontal: '2%',
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 7 },
      shadowRadius: 10,
      shadowOpacity: 0.2,
      padding: 10,
      paddingVertical: theme.SIZES.BASE,
      borderRadius: 5,
      marginBottom: '5%',
    },
    image: {
      width: cardWidth * 0.9,
      height: cardHeight * 0.3,
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
    addButton: {
      width: '100%',
      height: 40,
      backgroundColor: 'rgba(14, 58, 144, 0.1)',
      borderRadius: 5,
    },
    button: {
      marginBottom: theme.SIZES.BASE,
      width: width * 0.9,
    },
    buttonAdd: {
      width:
        Platform.OS === 'ios'
          ? Dimensions.get('window').height < 670
            ? width - 240
            : width - 265
          : Dimensions.get('window').height < 870
            ? width - 220
            : width - 300,
      top: 10,
    },
    search: {
      height: 40,
      width: width - 32,
      marginHorizontal: 12,
      borderRadius: 30,
      borderColor: nowTheme.COLORS.BORDER,
      marginBottom: theme.SIZES.BASE * 4,
    },
    searchInput: {
      color: 'black',
      fontSize: 16,
    },
    styleRadio: {
      paddingVertical: 3,
      paddingHorizontal: 10,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
    },
  });