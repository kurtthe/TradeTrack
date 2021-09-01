import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import PropTypes from 'prop-types';
import { Block, Text, theme } from 'galio-framework';
import Icon from '@components/Icon';
import { nowTheme } from '@constants';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { withNavigation } from '@react-navigation/compat';
import { FormatMoneyService } from '@core/services/format-money.service';

const Invoice = (props) => {
  const dateInvoice = `${props.invoice.invoice_date}`.split(' ');

  const formatMoney = FormatMoneyService.getInstance();

  const handleShowDetails = () => {
    props.navigation.navigate('InvoiceDetails', { invoice: props.invoice.id });
  };

  return (
    <Block style={styles.container}>
      <TouchableWithoutFeedback onPress={() => handleShowDetails()}>
        <Block row>
          <Block flex style={{ paddingRight: 3, paddingLeft: 15 }}>
            <Block row space="between" style={{ height: 20,  }}>
              <Block row>
                <Text
                  color={nowTheme.COLORS.DEFAULT}
                  style={{ fontFamily: nowTheme.FONT.primaryBold }}
                  size={14}
                >
                  Invoice
                </Text>
                <Text
                  color={nowTheme.COLORS.INFO}
                  style={{ fontFamily: nowTheme.FONT.primaryBold, left: 10 }}
                  size={14}
                >
                  {props.invoice.order_number}
                </Text>
              </Block>
              <Block row>
                <Text
                  color={nowTheme.COLORS.TIME}
                  style={{
                    fontFamily: nowTheme.FONT.primaryRegular,
                    paddingRight: 10,
                  }}
                  size={14}
                >
                  {dateInvoice[0]}
                </Text>
              </Block>
            </Block>

            <Block row  justifyContent="space-between" style={{top:8}}>
              <Text
                color={nowTheme.COLORS.HEADER}
                size={13}
                style={{ fontFamily: nowTheme.FONT.primaryRegular,  }}
              >
                {props.invoice.description}
              </Text>
              <Icon
                style={{ left: -20 }}
                size={14}
                color={nowTheme.COLORS.LIGHTGRAY}
                name="right"
                family="AntDesign"
              />
            </Block>
            <Block row>
              <View style={(props.invoice.type !== 'Invoice')? styles.bg_purple:styles.bg_green}>
                <Text
                  style={{ fontFamily: nowTheme.FONT.primaryRegular, textAlign: 'center' }}
                  size={theme.SIZES.BASE * 0.8}
                  color={(props.invoice.type !== 'Invoice')? nowTheme.COLORS.PURPLEINVOICE: nowTheme.COLORS.SUCCESS}
                >
                  {props.invoice.type}
                </Text>
              </View>
            </Block>
            <Block bottom>
              <Text
                style={{ fontFamily: nowTheme.FONT.primaryBold, marginTop: -22.5, left: -12 }}
                size={theme.SIZES.BASE * 1}
                color={nowTheme.COLORS.HEADER}
              >
                {formatMoney.format(props.invoice.total_amount)}
              </Text>
            </Block>
          </Block>
        </Block>
      </TouchableWithoutFeedback>
    </Block>
  );
};

Invoice.propTypes = {
  body: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: nowTheme.COLORS.WHITE,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 0.1,
    elevation: 2,
    zIndex: 2,
    height: 'auto',
    borderRadius: 3,
    marginBottom: 5,
  },

  bg_green: {
    width: wp('20%'),
    height: 25,
    backgroundColor: '#ecf8ee',
    borderRadius: 30,
    marginTop: 20,
    justifyContent: 'center',
    alignContent: 'center',
    left:-1
  },
  bg_purple: {
    width: wp('20%'),
    height: 25,
    backgroundColor: '#eff1f7',
    borderRadius: 30,
    marginTop: 20,
    justifyContent: 'center',
    alignContent: 'center',
    left:-1
  },
});

export default withNavigation(Invoice);
