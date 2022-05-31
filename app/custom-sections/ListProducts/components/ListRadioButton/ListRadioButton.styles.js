import { StyleSheet, Dimensions } from 'react-native'
const { width } = Dimensions.get('window');

export const makeStyles = () =>
  StyleSheet.create({
    actionSheet: {
      height: 300,
      width: width,
    },
    listRadios:{
      paddingHorizontal: 5,
      paddingVertical: 15
    }
  })