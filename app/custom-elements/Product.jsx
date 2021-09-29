import React from 'react';
import {
  Image,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  View,
  Platform,
} from 'react-native';

import { Button } from '@components';
import { Block, Text, theme } from 'galio-framework';

import { nowTheme } from '@constants';
const { width, height } = Dimensions.get('window');
const cardWidth = (width / 2) * 0.87;
const cardHeight = height * 0.59;
const sizeConstant =
  Platform.OS === 'ios'
    ? Dimensions.get('window').height < 670
      ? 12
      : 14
    : Dimensions.get('window').height < 870
    ? 11.5
    : 15;

const Product = (props) => {
  return (
    <>
      <Block key={`Card-${item.name}`} style={styles.Card}>
        <TouchableWithoutFeedback onPress={() => this.onProductPressed(item)}>
          <Image resizeMode="contain" style={styles.image} source={{ uri: item.image }} />
        </TouchableWithoutFeedback>
        <Block flex space="between" style={{ paddingBottom: 7 }}>
          <Block row>
            <Text color={nowTheme.COLORS.LIGHTGRAY} size={sizeConstant}>
              SKU
            </Text>
            <Text color={nowTheme.COLORS.INFO} size={sizeConstant}>
              {` ${item.sku}`}
            </Text>
          </Block>
          <Text
            style={{ fontFamily: 'montserrat-regular', marginRight: 5, paddingVertical: 10 }}
            size={15}
          >
            {item.name}
          </Text>
          <Block row style={{ width: '100%' }}>
            <Block flex>
              <Text color={nowTheme.COLORS.LIGHTGRAY} style={styles.priceGrayText}>
                Price:{' '}
              </Text>
              <Text style={styles.price}>{this.formatMoney.format(item.rrp)}</Text>
            </Block>
            {!this.state.hideMyPrice && (
              <>
                <View
                  style={{
                    borderWidth: 0.5,
                    marginHorizontal: 10,
                    height: '100%',
                    borderColor: nowTheme.COLORS.LIGHTGRAY,
                  }}
                ></View>
                <Block flex>
                  <Text color={nowTheme.COLORS.LIGHTGRAY} style={styles.priceGrayText}>
                    My Price
                  </Text>
                  <Text style={styles.price}>{this.formatMoney.format(item.cost_price)}</Text>
                </Block>
              </>
            )}
          </Block>
        </Block>
        <Block center>
          <Button
            color="warning"
            textStyle={{ fontFamily: 'montserrat-bold', fontSize: 16, color: '#0E3A90' }}
            style={styles.buttonAdd}
            onPress={() => this.onAddPressed(item)}
          >
            Add
          </Button>
        </Block>
      </Block>
    </>
  );
};
const styles = StyleSheet.create({
  Card: {
    backgroundColor: 'white',
    width: cardWidth,
    marginHorizontal: '2%',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 10,
    shadowOpacity: 0.2,
    padding: 10,
    paddingVertical: theme.SIZES.BASE,
    borderRadius: 5,
    marginBottom: '5%',
  },
  image: {
    width: cardWidth * 0.9,
    height: cardHeight * 0.3,
  },
  priceGrayText: {
    // paddingLeft: 2,
    fontSize: 13,
  },
  price: {
    fontFamily: 'montserrat-bold',
    fontSize:
      Platform.OS === 'ios'
        ? Dimensions.get('window').height < 670
          ? 12
          : 14
        : Dimensions.get('window').height < 870
        ? 11.5
        : 15,
    color: nowTheme.COLORS.ORANGE,
  },
  addButton: {
    width: '100%',
    height: 40,
    backgroundColor: 'rgba(14, 58, 144, 0.1)',
    borderRadius: 5,
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width * 0.9,
  },
  buttonAdd: {
    width:
      Platform.OS === 'ios'
        ? Dimensions.get('window').height < 670
          ? width - 240
          : width - 265
        : Dimensions.get('window').height < 870
        ? width - 220
        : width - 300,
    top: 10,
  },
  search: {
    height: 40,
    width: width - 32,
    marginHorizontal: 12,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: nowTheme.COLORS.BORDER,
    elevation: 0,
  },
  searchInput: {
    color: 'black',
    fontSize: 16,
  },
});
export default Product;
