import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('screen');

export const makeStyles = () =>
  StyleSheet.create({
    container: { paddingBottom: 30, width, paddingHorizontal:5 },
    content: { paddingVertical: 8, }
  })