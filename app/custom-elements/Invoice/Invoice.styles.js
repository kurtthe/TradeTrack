import {StyleSheet} from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { nowTheme } from '@constants';

export const makeStyles = () => StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flex: 1,
    paddingVertical: 10,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 0.1,
    elevation: 2,
    height: 'auto',
    borderRadius: 3,
    marginBottom: 5,
  },
  line: {
    borderBottomWidth: 2,
    borderBottomColor: 'lightgrey',
    alignSelf: 'center',
    width: '95%',
    marginTop: 14,
  },
  bg_green: {
    width: wp('20%'),
    height: 25,
    backgroundColor: '#ecf8ee',
    borderRadius: 30,
    marginTop: 20,
    justifyContent: 'center',
    alignContent: 'center',
    left: -1,
  },
  bg_purple: {
    width: wp('20%'),
    height: 25,
    backgroundColor: '#eff1f7',
    borderRadius: 30,
    marginTop: 20,
    justifyContent: 'center',
    alignContent: 'center',
    left: -1,
  },
});
