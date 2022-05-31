import { StyleSheet, Dimensions } from 'react-native'
import { nowTheme } from '@constants';

const { width } = Dimensions.get('window');

export const makeStyles = () =>
  StyleSheet.create({
    container: {
      padding: 5,
      width: width,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: nowTheme.COLORS.BACKGROUND,
    },
    contentFilters: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      flexWrap: 'wrap',
    },
    styleRadio: {
      paddingVertical: 3,
      paddingHorizontal: 10,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
    },
  });