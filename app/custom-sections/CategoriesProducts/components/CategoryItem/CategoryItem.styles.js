import { StyleSheet } from 'react-native';
import { theme } from 'galio-framework';

export const makeStyles = () =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.COLORS.WHITE,
      marginVertical: 8,
      marginHorizontal: 5,
      borderWidth: 0,
      marginBottom: 4,
      flex: 1,
    },
    cardTitle: {
      fontFamily: 'montserrat-bold',
    },
    horizontalImage: {
      height: 122,
      width: 'auto',
      resizeMode: "cover"
    },
    horizontalStyles: {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0
    },
    shadow: {
      shadowColor: '#8898AA',
      shadowOffset: { width: 2, height: 3 },
      shadowRadius: 3,
      shadowOpacity: 0.2,
      elevation: 2
    },
    imageBlock: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 9,
      paddingVertical: 7,
      height: 48
    }
  });