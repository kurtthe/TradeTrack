import { StyleSheet, Dimensions, Platform } from 'react-native'
import { theme } from 'galio-framework';
const { width } = Dimensions.get('window');
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import nowTheme from '@constants/Theme';

const iPhoneX = () =>
  Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);


export const makeStyles = () =>
  StyleSheet.create({
    button: {
      padding: 12,
      position: 'relative',
    },
    title: {
      width: '150%',
      fontSize: Dimensions.get('window').height < 670 ? 22 : 26,
      fontWeight: 'bold',
      fontFamily: 'montserrat-bold',
      left: wp('-12.5%'),
      textAlign: 'center',
      top: 5.5,
    },
    navbar: {
      alignItems: 'center',
      paddingBottom: theme.SIZES.BASE * 1.5,
      paddingTop: iPhoneX ? theme.SIZES.BASE * 2 : theme.SIZES.BASE,
    },
    shadow: {
      backgroundColor: theme.COLORS.WHITE,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 6,
      shadowOpacity: 0.2,
      elevation: 3,
    },
    shadowless: {
      elevation: 0,
      shadowOpacity: 0,
      shadowOffset: {
        height: 0,
      },
      shadowRadius: 0,
    },
    notify: {
      backgroundColor: nowTheme.COLORS.SUCCESS,
      borderRadius: 4,
      height: theme.SIZES.BASE / 2,
      width: theme.SIZES.BASE / 2,
      position: 'absolute',
      top: 9,
      right: 12,
    },
    header: {
      backgroundColor: theme.COLORS.WHITE,
    },
    divider: {
      borderRightWidth: 0.3,
      borderRightColor: theme.COLORS.ICON,
    },
    search: {
      height: 48,
      width: width - 32,
      marginHorizontal: 16,
      borderWidth: 1,
      borderRadius: 30,
      borderColor: nowTheme.COLORS.BORDER,
    },
    options: {
      marginBottom: 24,
      marginTop: 10,
      elevation: 4,
    },
    tab: {
      backgroundColor: theme.COLORS.TRANSPARENT,
      width: width * 0.35,
      borderRadius: 0,
      borderWidth: 0,
      height: 24,
      elevation: 0,
    },
    tabTitle: {
      lineHeight: 19,
      fontWeight: '400',
      color: nowTheme.COLORS.HEADER,
    },
    social: {
      width: theme.SIZES.BASE * 3.5,
      height: theme.SIZES.BASE * 3.5,
      borderRadius: theme.SIZES.BASE * 1.75,
      justifyContent: 'center',
    },
    introImageStyle: {
      width: 120,
      height: 120,
      resizeMode: 'contain',
    },
    image: {
      width: 27.5,
      height: 27.5,
      ...StyleSheet.absoluteFillObject,
      resizeMode: 'contain',
      marginLeft: -20,
      top: -10,
    },
  });
