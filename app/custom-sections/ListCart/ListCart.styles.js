import { StyleSheet, Dimensions, Platform } from 'react-native'

const { width } = Dimensions.get('screen');

export const makeStyles = () => StyleSheet.create({
  detailOrders: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 7 },
    elevation: 2,
    shadowRadius: 10,
    shadowOpacity: 0.3,
  },
  container: {
    width: width,
    height: Platform.OS == 'ios' ? '80%' : '84%'
  }
});