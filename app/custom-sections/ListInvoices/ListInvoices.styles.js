import { StyleSheet } from 'react-native'
import { nowTheme } from '@constants';

export const makeStyles = () => StyleSheet.create({
  card: {
    backgroundColor: nowTheme.COLORS.WHITE,
    marginTop: 10,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  cardHeader: {
    justifyContent: 'center',
    height: '4%',
  },
  textSeeAll: {
    fontSize: 15,
    fontFamily: 'montserrat-regular',
    right: 15,
    color: nowTheme.COLORS.HEADER
  },
  textTransactions: {
    fontSize: 18,
    fontFamily: 'montserrat-bold',
    color: '#363C4A'
  },
  cardContent: {
    paddingLeft: 15,
    top: 10,
    height: 20
  }
});
