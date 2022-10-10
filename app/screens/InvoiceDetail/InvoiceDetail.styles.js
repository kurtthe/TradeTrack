import { StyleSheet, Platform, Dimensions } from 'react-native'
import { nowTheme } from '@constants/index';

const { width } = Dimensions.get('screen');

export const makeStyles = () => StyleSheet.create({
  cart: {
    width: width,
    backgroundColor: nowTheme.COLORS.BACKGROUND,
    
  },
  buttons: {
    flex: 1,
    marginTop: 10,
  },
  text: {
    fontSize: 11.5,
    paddingTop: 10,
    color: nowTheme.COLORS.PRETEXT,
  },
  grayText: {
    color: nowTheme.COLORS.PRETEXT,
    top: -7,
  },
  grayTextSKU: {
    color: nowTheme.COLORS.PRETEXT,
    top: 7,
    left: -3.5,
    fontSize: 11.5,
  },
  detailPrice: {
    fontWeight: Platform.OS == 'android' ? 'bold' : '500',
    top: -25,
  },
  receiptText: {
    paddingVertical: 10,
    width: '80%',
  },
  receiptPrice: {
    fontSize: 14,
    fontWeight: Platform.OS == 'android' ? 'bold' : '500',
  },
  totalPrices: {
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  lastCard: {
    backgroundColor: 'white',
    width: width,
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderRadius: 0,
  },
  detailOrdersBlock: {
    height: 'auto',
    alignContent: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: 'white',
    width: width,
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 5
  },
  contentTotalAmount: {
    borderWidth: 0.7,
    marginVertical: 2,
    backgroundColor: '#E8E8E8',
    borderColor: '#E8E8E8',
  },
  contentTotal: {
    justifyContent: 'space-between',
    paddingBottom: 15,
    top: 4
  },
  textTotalAmount: {
    fontWeight: Platform.OS == 'android' ? 'bold' : '600'
  },

  button_alignment: {
    paddingTop:12
  }
});

