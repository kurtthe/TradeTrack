import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { Ionicons } from '@expo/vector-icons';
import { nowTheme } from '@constants';
import { FormatMoneyService } from '@core/services/format-money.service';

const { width } = Dimensions.get('screen');

const formatMoney = FormatMoneyService.getInstance();

const Statement = (props) => {
  const dateStatement = `${props.statement.created_date}`.split(' ');

  
  return (
    <Block style={styles.container}>
        <Block row>
          <Block flex style={{ paddingRight: 3, paddingLeft: 15 }}>
            <Block row space="between" style={{ height: 20, paddingTop: 0 }}>
              <Block row>
                <Text
                  color={nowTheme.COLORS.DEFAULT}
                  style={{ fontFamily: 'montserrat-bold' }}
                  size={15.5}
                >
                  Statement
                </Text>
                
              </Block>
              <Block row>
                <Text
                  color={nowTheme.COLORS.TIME}
                  style={{
                    fontFamily: 'montserrat-regular',
                    paddingRight: 10,
                  }}
                  size={14}
                >
                  {dateStatement[0]}
                </Text>
              </Block>
            </Block>

            <Block row justifyContent="space-between">
              <Text
                color={nowTheme.COLORS.HEADER}
                size={15}
                style={{ fontFamily: 'montserrat-regular', marginTop: 20 }}
              >
               
              </Text>

              <Ionicons
                style={{ left: -10, }}
                name="eye"
                color={nowTheme.COLORS.LIGHTGRAY}
                size={20}
              />
            </Block>
            <Block row style={{ marginTop: -10 }}></Block>
            <Block bottom>
              <Text
                style={{ fontFamily: 'montserrat-bold', marginTop: 0, left: -12 }}
                size={theme.SIZES.BASE * 1}
                color={nowTheme.COLORS.HEADER}
              >
                {formatMoney.format(props.statement.new)}
              </Text>
            </Block>
          </Block>
        </Block>
    </Block>
  );
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
    width:width
  },
});

export default Statement;
