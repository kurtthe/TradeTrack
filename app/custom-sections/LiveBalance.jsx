import React from 'react';
import { ImageBackground, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Block, theme, Text } from 'galio-framework';

import { nowTheme } from '@constants';
import { FormatMoneyService } from '@core/services/format-money.service';
import { withNavigation } from '@react-navigation/compat';
import { useSelector } from 'react-redux'

const formatMoney = FormatMoneyService.getInstance();
const { width } = Dimensions.get('screen');

const LiveBalance = (props) => {
  const balance = useSelector((state) => state.liveBalanceReducer);

  return (
    <Block flex card center shadow style={styles.category}>
      <ImageBackground
        source={{
          uri: 'https://live.staticflickr.com/65535/51227105003_e18d28b6ce_c.jpg',
        }}
        style={[styles.imageBlock, { width: width - theme.SIZES.BASE * 0.1, height: 162 }]}
        imageStyle={{
          width: width - theme.SIZES.BASE * 0.1,
          height: 162,
        }}
      >
        <Block style={styles.categoryTitle}>
          {props.company || balance.restricted ? (
            <Text size={28} bold color={theme.COLORS.WHITE}>
              {balance.company}
            </Text>
          ) : (
            <>
              <Text
                color={nowTheme.COLORS.TIME}
                style={{ fontFamily: 'montserrat-bold', paddingLeft: 0 }}
                size={14}
              >
                Balance
              </Text>
              <Block
                row
                middle
                space="between"
                style={{ marginBottom: theme.SIZES.BASE, paddingLeft: 0, paddingRight: 6 }}
              >
                <Text size={28} bold color={theme.COLORS.WHITE}>
                  {formatMoney.format(balance.total)}
                </Text>
              </Block>
              <Block row middle space="between" style={styles.bottomView}>
                <Text size={14} bold color={theme.COLORS.WHITE} style={{ left: 0 }}>
                  {' '}
                  Overdue Balance{' '}
                </Text>
                <Text size={14} bold color={theme.COLORS.WHITE} style={{ left: 0 }}>
                  {' '}
                  {formatMoney.format(balance.overdue)}{' '}
                </Text>
              </Block>
            </>
          )}
        </Block>
      </ImageBackground>
    </Block>
  );
};

const styles = StyleSheet.create({
  bottomView: {
    padding: 10.5,
    position: 'absolute',
    bottom: 0,
    width: width,
    backgroundColor: 'rgba(75, 106, 170, 0.5)',

  },
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: 0,
    borderWidth: 0,
  },
  categoryTitle: {
    height: '100%',
    paddingHorizontal: 13,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
  },
});

export default withNavigation(LiveBalance);
