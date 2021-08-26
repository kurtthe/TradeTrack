import React from 'react';
import { useSelector } from 'react-redux';

import { StyleSheet, View, Dimensions } from 'react-native';
import { Block, theme, Text } from 'galio-framework';
import { nowTheme } from '@constants';
import GrayLine from '@components/GrayLine';
import { FormatMoneyService } from '@core/services/format-money.service';
import Order from '@custom-elements/Order';

const formatMoney = FormatMoneyService.getInstance();
const { width } = Dimensions.get('screen');

const Balance = () => {
  const balance = useSelector((state) => state.liveBalanceReducer);

  const renderDetailOrdersAS = () => {
    const orders = [
      {
        title: 'Accurate as of',
        price: '5th May 2021',
      },
      {
        title: 'Current Month',
        price: '$15,000.00',
      },
      {
        title: '30 Day Balance',
        price: '$15,000.00',
      },
      {
        title: 'Overdue Amount',
        color: 'red',
        price: '-$2,499.88',
      },
    ];

    return orders.map((orders, index) => {
      return <Order key={index} item={orders} />;
    });
  };

  return (
    <Block>
      <View style={styles.detailOrders}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Balance Details</Text>
      </View>

      <Block row style={{ justifyContent: 'space-between', paddingTop: 20 }}>
        <Text style={styles.receiptText}>{props.item.title}</Text>
        <Text style={[styles.receiptPrice, props.item.color && { color: nowTheme.COLORS.ORANGE }]}>
          {formatMoney.format(props.item.price)}
        </Text>
      </Block>

      <GrayLine style={{ width: '100%', alignSelf: 'center' }} />
      <Block row style={{ justifyContent: 'space-between', top: 10, marginBottom: -30 }}>
        <Text size={15}>Total Due</Text>
        <Text
          size={16}
          color={nowTheme.COLORS.INFO}
          style={{ fontWeight: Platform.OS == 'android' ? 'bold' : '600' }}
        >
          {formatMoney.format(balance.total)}
        </Text>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  detailOrders: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width,
    height: '8%',
    marginVertical: theme.SIZES.BASE * 0.9,
  },
  receiptText: {
    fontSize: 13,
    width: '60%',
    color: nowTheme.COLORS.SECONDARY,
  },
});

export default Balance;
