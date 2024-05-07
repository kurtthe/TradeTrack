import React from 'react';
import { TouchableOpacity, View, Platform } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import Icon from '@components/Icon';
import { nowTheme } from '@constants';

import { FormatMoneyService } from '@core/services/format-money.service';
import { validateEmptyField } from '@core/utils/validate-empty-field';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { makeStyles } from './Invoice.styles';

export const Invoice = (props) => {
  const navigation = useNavigation();
  const styles = makeStyles()
  
  let dateInvoice = validateEmptyField(props.invoice.invoice_date);

  if (dateInvoice !== 'N/A') {
    dateInvoice = moment(dateInvoice).format('YYYY-MM-DD');
  }

  const formatMoney = FormatMoneyService.getInstance();

  const handleShowDetails = () => {
    navigation.navigate('InvoiceDetails', {
      invoice: props.invoice.id,
      nameRouteGoing: !props.isAccount ? false : 'AccountInvoice',
    });
  };

  return (
    <>
    <TouchableOpacity onPress={() => handleShowDetails()} style={styles.container}>
      <Block row>
        <Block flex style={{ paddingRight: 3, paddingLeft: 15 }}>
          <Block row space="between" style={{ height: 20 }}>
            <Block row>
              <Text
                color={nowTheme.COLORS.DEFAULT}
                style={{ fontFamily: nowTheme.FONT.primaryBold }}
                size={14}
              >
                {props.invoice.type} No
              </Text>
              <Text
                color={nowTheme.COLORS.INFO}
                style={{ fontFamily: nowTheme.FONT.primaryBold, left: 10 }}
                size={14}
              >
                {validateEmptyField(props.invoice.order_number)}
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
                {validateEmptyField(dateInvoice)}
              </Text>
            </Block>
          </Block>

          <Block row justifyContent="space-between" style={{ top: 8 }}>
            <Text
              color={nowTheme.COLORS.HEADER}
              size={13}
              style={{ fontFamily: nowTheme.FONT.primaryRegular }}
            >
              {validateEmptyField(props.invoice.description)}
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
            <View style={props.invoice.type !== 'Invoice' ? styles.bg_purple : styles.bg_green}>
              <Text
                style={{ fontFamily: nowTheme.FONT.primaryRegular, textAlign: 'center' }}
                size={theme.SIZES.BASE * 0.8}
                color={
                  props.invoice.type !== 'Invoice'
                    ? nowTheme.COLORS.PURPLEINVOICE
                    : nowTheme.COLORS.SUCCESS
                }
              >
                {validateEmptyField(props.invoice.type)}
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
    </TouchableOpacity>
    {Platform.OS === 'ios' && <Block style={styles.line} />}
    </>
  );
};
