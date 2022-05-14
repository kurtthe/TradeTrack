import { StyleSheet, Dimensions } from 'react-native'
import { theme } from 'galio-framework';

const { width } = Dimensions.get('screen');

export const makeStyles = () =>
  StyleSheet.create({
    button: {
      width: width - theme.SIZES.BASE * 2,
      textAlign: 'center',
    },
    contentButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    }
  })