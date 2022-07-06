import { StyleSheet, Dimensions, Platform } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width } = Dimensions.get('screen');

export const makeStyles = () => StyleSheet.create({
  container_empty: {
    height: hp('60%'),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
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