import { StyleSheet } from 'react-native'
import { theme } from 'galio-framework';
import { nowTheme } from '@constants';

export const makeStyles = () => StyleSheet.create({
  switchBlock: {
    paddingHorizontal: theme.SIZES.BASE * 0.7,
    backgroundColor: theme.COLORS.WHITE,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  textBlock: {
    width: '80%',
    paddingVertical: theme.SIZES.BASE * 1.3,
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'montserrat-bold',
    color: nowTheme.COLORS.HEADER,
  },
  group: {
    padding: 14,
  },
});