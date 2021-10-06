import React, { useState } from 'react';
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
import { withNavigation } from '@react-navigation/compat';

import { nowTheme } from '@constants';
import { FormatMoneyService } from '@core/services/format-money.service';
import { connect } from 'react-redux';
import { updateProducts } from '@core/module/store/cart/cart';
import { ProductCart } from '@core/services/product-cart.service';

const formatMoney = FormatMoneyService.getInstance();

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
  const productCart = new ProductCart(props.cartProducts);

  const onAddPressed = (productItem) => {
    const priceProduct = props.myPrice ? productItem.rrp : productItem.cost_price;

    const addProduct = {
      ...productItem,
      quantity: 1,
      price: priceProduct,
      cantSend: false,
    };

    productCart.addCart(addProduct, props.updateProducts);
  };

  const onProductPressed = (productItem) => {
    props.navigation?.navigate('Product', {
      hideMyPrice: props.myPrice,
      product: productItem,
      headerTitle: 'Product',
    });
  };

  return (
    <>
      <Block key={`Card-${props.product.name}`} style={styles.Card}>
        <TouchableWithoutFeedback onPress={() => onProductPressed(props.product)}>
          <Image resizeMode="contain" style={styles.image} source={{ uri: props.product.image }} />
        </TouchableWithoutFeedback>
        <Block flex space="between" style={{ paddingBottom: 7 }}>
          <Block row>
            <Text color={nowTheme.COLORS.LIGHTGRAY} size={sizeConstant}>
              SKU
            </Text>
            <Text color={nowTheme.COLORS.INFO} size={sizeConstant}>
              {` ${props.product.sku}`}
            </Text>
          </Block>
          <Text
            style={{ fontFamily: 'montserrat-regular', marginRight: 5, paddingVertical: 10 }}
            size={15}
          >
            {props.product.name}
          </Text>
          <Block row style={{ width: '100%' }}>
            <Block flex>
              <Text color={nowTheme.COLORS.LIGHTGRAY} style={styles.priceGrayText}>
                Price:{' '}
              </Text>
              <Text style={styles.price}>{formatMoney.format(props.product.rrp)}</Text>
            </Block>
            {props.myPrice ? null : (
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
                  <Text style={styles.price}>{formatMoney.format(props.product.cost_price)}</Text>
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
            onPress={() => onAddPressed(props.product)}
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

const mapStateToProps = (state) => ({
  cartProducts: state.productsReducer.products,
});

const mapDispatchToProps = { updateProducts };

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(Product));
