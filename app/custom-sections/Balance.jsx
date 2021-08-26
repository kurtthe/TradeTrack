import React from 'react';
import { useSelector } from 'react-redux';

import { StyleSheet, View, Dimensions } from 'react-native';
import { Block, theme, Text } from 'galio-framework';
import { nowTheme } from '@constants';
import GrayLine from '@components/GrayLine';
import { FormatMoneyService } from '@core/services/format-money.service';
import BalanceDetail from '@custom-elements/BalanceDetail';

const formatMoney = FormatMoneyService.getInstance();
const { width } = Dimensions.get('screen');

const Balance = () => {
  const balance = useSelector((state) => state.liveBalanceReducer);

  const renderDetailOrdersAS = () => {
  const dateBalance = `${balance.updated}`.split(' ')

    
    const orders = [
      {
        title: 'Accurate as of',
        price: dateBalance[0],
      },
      {
        title: 'Current Month',
        price: balance.current,
      },
      {
        title: '30 Day Balance',
        price: balance.thirty_day,
      },
      {
        title: 'Overdue Amount',
        price: balance.overdue,
      },
    ];

    return orders.map((orders, index) => {
      return <BalanceDetail key={index} item={orders} />;
    });
  };

  return (
    <Block>
      <View style={styles.detailOrders}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Balance Details</Text>
      </View>
      
      {renderDetailOrdersAS()}
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
  }
});

export default Balance;
