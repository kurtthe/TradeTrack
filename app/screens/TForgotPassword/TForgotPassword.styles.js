import { StyleSheet, Dimensions, Platform } from 'react-native'
import { theme } from 'galio-framework';
import nowTheme from "@constants/Theme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const makeStyles = () => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10
  },
  contentLogo: {

  },
  introImageStyle: {
    width: "29%",
    resizeMode: 'contain',
  },
  textTitle: {
    fontSize: (Platform.OS === 'ios') ? ((Dimensions.get('window').height < 670) ? 20 : 22) : (Dimensions.get('window').height < 870) ? 20 : 26,
    color: "#2E2F33",
    fontFamily: 'montserrat-bold',
    textAlign: 'left'
  },
  subTitle: {
    color: nowTheme.COLORS.PRETEXT,
    fontSize: (Platform.OS === 'ios') ? ((Dimensions.get('window').height < 670) ? 18 : 20) : (Dimensions.get('window').height < 870) ? 18 : 20,
    fontFamily: 'montserrat-regular',
  }
});