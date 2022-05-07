import {StyleSheet, Dimensions} from 'react-native'
import { theme } from 'galio-framework';
import nowTheme from '@constants/Theme';

const { width } = Dimensions.get('screen');

export const makeStyles = ()=> 
StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 5,
  },
  content: {
    backgroundColor: nowTheme.COLORS.BACKGROUND,
  },
  contentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: width - theme.SIZES.BASE * 2,
    textAlign: 'center',
  },
  notfound: {
    padding: 15,
    marginVertical: theme.SIZES.BASE * 2,
  },
})