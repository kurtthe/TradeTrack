import { StyleSheet, Dimensions, Platform } from 'react-native'
import { theme } from 'galio-framework';
import nowTheme from "@constants/Theme";
const { width } = Dimensions.get("screen");

export const makeStyles = () => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  content: {
    marginBottom: 62
  },
  introImageStyle: {
    width: 130,
    height: 47,
    resizeMode: 'stretch',
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
    lineHeight: 22,
    marginTop: 50
  },
  labelEmail: {
    color: nowTheme.COLORS.PRETEXT,
    marginLeft: 0,
    fontFamily: 'montserrat-regular',
    fontSize: 14
  },

  contentFooter: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  contentBody: {},
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 3,
    fontFamily: 'montserrat-bold',
    fontSize: 16,
    backgroundColor: nowTheme.COLORS.INFO
  },
  textHelp: {
    textDecorationLine: 'underline',
    color: '#0E3A90',
    fontFamily: 'montserrat-bold',
    fontSize: 15,
    textAlign: 'center',
  },
  contentHelp: {
    marginVertical: 39
  },
  textToLogin: {
    color: '#444857',
    fontSize: 15,
  },
  contentBackLogin: {
    flexDirection: 'row',
    marginBottom: 36
  }
});