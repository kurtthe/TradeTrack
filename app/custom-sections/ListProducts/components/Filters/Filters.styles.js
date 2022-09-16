import { StyleSheet, Dimensions } from 'react-native'
import { nowTheme } from '@constants';

export const makeStyles = () =>
  StyleSheet.create({
    container: {
      padding: 5,
      width: Dimensions.get('window').width,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: nowTheme.COLORS.BACKGROUND,
    },
    contentFilters: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      flexWrap: 'nowrap',
    },
    styleRadio: {
      paddingVertical: 3,
      paddingHorizontal: 10,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
    },
  });