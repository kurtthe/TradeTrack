import { StyleSheet } from 'react-native'

export const makeStyles = () =>
  StyleSheet.create({
    switchBlock: {
      paddingHorizontal: theme.SIZES.BASE * 0.7,
      backgroundColor: theme.COLORS.WHITE,
      borderRadius: 8,
    },
    textBlock: {
      width: '80%',
      paddingVertical: theme.SIZES.BASE * 1.3,
      justifyContent: 'space-between',
    },
    title: {
      fontFamily: 'montserrat-bold',
      color: nowTheme.COLORS.HEADER,
      paddingBottom: 5,
    },
    group: {
      padding: 14,
    },
  });