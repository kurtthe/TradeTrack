import React from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text } from 'galio-framework';
import { nowTheme } from '@constants';
import { FormatMoneyService } from '@core/services/format-money.service';

const formatMoney = FormatMoneyService.getInstance();


const BalanceDetail = (props) => {

  const getValue = ()=>{
    return props.item.date ? props.item.value : formatMoney.format(props.item.value)
  }
  
  return (
    <Block row style={{ justifyContent: 'space-between', paddingTop: 20 }}>
      <Text style={styles.receiptText}>{props.item.title}</Text>
      <Text
        style={[styles.receiptPrice, props.item.color < 0 && { color: nowTheme.COLORS.ORANGE }]}
      >
        {getValue()|| 'empty'}
      </Text>
    </Block>
  );
};

const styles = StyleSheet.create({
  receiptText: {
    fontSize: 13,
    width: '60%',
    color: nowTheme.COLORS.SECONDARY,
  },
});

export default BalanceDetail;
