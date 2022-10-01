import React from 'react';
import { useSelector } from 'react-redux';

import { StyleSheet, View, Dimensions } from 'react-native';
import { theme, Text, Block } from 'galio-framework';
import { nowTheme } from '@constants';
import GrayLine from '@components/GrayLine';
import { FormatMoneyService } from '@core/services/format-money.service';
import BalanceDetail from '@custom-elements/BalanceDetail';
import Restricted from '../custom-elements/Restricted';

const formatMoney = FormatMoneyService.getInstance();
const { width } = Dimensions.get('screen');

const Balance = () => {
  const balance = useSelector((state) => state.liveBalanceReducer);

  const renderDetailOrdersAS = () => {
    const dateBalance = `${balance.updated}`.split(' ');

    const orders = [
      {
        title: 'Accurate as of',
        value: dateBalance[0],
        date: true,
      },
      {
        title: 'Current Month',
        value: balance.current,
      },
      {
        title: '30 Day Balance',
        value: balance.thirty_day,
      },
      {
        title: 'Overdue Amount',
        value: balance.overdue,
      },
    ];

    return orders.map((orders, index) => (
      <View key={index} style={{ top: -25 }}>
        <BalanceDetail key={index} item={orders} />
      </View>
    ));
  };

  if (balance.restricted) {
    return (
     <Block style={{ padding: theme.SIZES.BASE, top: 0 }}>
     </Block>
    )
  }
 

  return (
    <View style={{ height: 'auto', paddingHorizontal: 15 }}>
      <View style={styles.detailOrders}>
        <Text style={{ fontWeight: 'bold', fontSize: 16, top: -5 }}>Balance Details</Text>
      </View>
      {renderDetailOrdersAS()}

      <GrayLine style={{ width: '100%', alignSelf: 'center', top: -30 }} />
      <Block row style={{ justifyContent: 'space-between', bottom:15}}>

          <Text size={15}>Total Due</Text>
          <Text
            size={16}
            color={nowTheme.COLORS.INFO}
            style={{ fontWeight: Platform.OS == 'android' ? 'bold' : '600' }}
          >
            {formatMoney.format(balance.total)}
          </Text>
          </Block>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.SIZES.BASE,
    marginBottom: theme.SIZES.BASE,
  },
  detailOrders: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width,
    height: 'auto',
    marginVertical: theme.SIZES.BASE * 0.3,
    top: -10,
  },
  receiptText: {
    fontSize: 13,
    width: '60%',
    color: nowTheme.COLORS.SECONDARY,
  },
});

export default Balance;
