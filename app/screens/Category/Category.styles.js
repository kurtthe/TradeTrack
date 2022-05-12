import { StyleSheet, Dimensions } from 'react-native'
import { nowTheme } from '@constants';

const { width } = Dimensions.get('window');

export const makeStyles = () =>
  StyleSheet.create({
    container: {
      width: width,
      backgroundColor: nowTheme.COLORS.BACKGROUND
    }
  })