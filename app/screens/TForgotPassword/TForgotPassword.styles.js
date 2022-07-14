import {StyleSheet} from 'react-native'
import nowTheme from "@constants/Theme";

export const makeStyles = () => StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around"
  },
  socialConnect: {
    backgroundColor: nowTheme.COLORS.WHITE,
    marginHorizontal: 2.5,
    top: 30
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderColor: "rgba(136, 152, 170, 0.3)"
  },

  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 3,
    bottom: (Platform.OS === 'ios') ? ((Dimensions.get('window').height < 670) ? 10 : 20) : (Dimensions.get('window').height < 870) ? 1 : 20
  },

  introImageStyle: {

    width: (Platform.OS === 'ios') ? ((Dimensions.get('window').height < 670) ? wp('37%') : wp('40%')) : (Dimensions.get('window').height < 870) ? wp('29%') : wp('40%'),
    height: (Platform.OS === 'ios') ? ((Dimensions.get('window').height < 670) ? hp('10%') : hp('40%')) : (Dimensions.get('window').height < 870) ? hp('29%') : hp('40%'),
    resizeMode: 'contain',

  },

  icon: {
    position: "absolute",
    right: 10,
    top: 20,

  },
});