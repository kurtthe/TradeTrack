import {StyleSheet} from 'react-native'
import { nowTheme } from '@constants';
import { theme } from 'galio-framework';

export const makeStyles = ()=> 
StyleSheet.create({
  contentProducts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  container: { 
    backgroundColor:nowTheme.COLORS.BACKGROUND,
    paddingVertical:  theme.SIZES.BASE
  }
})