import {Dimensions, StyleSheet} from 'react-native'
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
    padding: 5
  },
  notfound:{
    padding: 15,
    marginVertical: theme.SIZES.BASE * 2,
  },
  textNotFount:{
    fontFamily: 'montserrat-regular',
    fontSize: 18,
    color: nowTheme.COLORS.TEXT
  },
  contentLoading: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:nowTheme.COLORS.BACKGROUND,
    padding: 10,
    flex: 1,
  }
})