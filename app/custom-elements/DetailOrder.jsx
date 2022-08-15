import React from 'react';
import { FormatMoneyService } from '@core/services/format-money.service';
import { StyleSheet, Platform } from 'react-native';
import { Block, Text } from 'galio-framework';
import { nowTheme } from '@constants/index';

const formatMoney = FormatMoneyService.getInstance();

const DetailOrder = (props) => {

  if (!props?.order) {
    return null
  }

  const price = props.order?.myPrice ? props.order.rrp : props.order.cost_price;

  return (
    <Block style={{ top: 5 }}>
      <Text style={styles.grayTextSKU}> SKU {props.order.sku}</Text>
      <Text numberOfLines={2} style={styles.receiptText}>
        {props.order.name}
      </Text>
      <Block row style={{ justifyContent: 'space-between' }}>
        <Text style={styles.grayText}>
          {props.order.quantity} x {formatMoney.format(price)}
        </Text>
        <Text style={styles.detailPrice}>{formatMoney.format(price * props.order.quantity)}</Text>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  receiptText: {
    paddingVertical: 10,
    width: '80%',
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
});

export default DetailOrder;
