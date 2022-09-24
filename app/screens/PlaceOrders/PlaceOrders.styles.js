import { StyleSheet } from 'react-native';
import { nowTheme } from '@constants/index';

export const styles = StyleSheet.create({
  cart: {
    flex: 1
  },
  text: {
    paddingTop: 10,
    color: nowTheme.COLORS.PRETEXT,
  },
  errorText: {
    paddingTop: 10,
    color: nowTheme.COLORS.ERROR,
    fontWeight: 'bold',
  },
  orderName: {
    width: 'auto',
    paddingVertical: 10,
    height: 43,
  },

});