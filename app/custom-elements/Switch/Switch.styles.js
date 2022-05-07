import { StyleSheet } from 'react-native'
import { theme } from 'galio-framework';
import { nowTheme } from '@constants';

export const makeStyles = () => StyleSheet.create({
  switchBlock: {
    paddingVertical: theme.SIZES.BASE * 1.3,
    paddingHorizontal: theme.SIZES.BASE * 0.7,
    backgroundColor: theme.COLORS.WHITE,
    borderRadius: 8,
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontFamily: 'montserrat-bold',
    color: nowTheme.COLORS.HEADER,
  },

});