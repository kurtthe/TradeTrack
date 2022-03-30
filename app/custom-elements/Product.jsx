import React from 'react';
import {
  Image,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  View,
  Platform,
  TouchableOpacity,
} from 'react-native';

import { Button } from '@components';
import { Block, Text, theme } from 'galio-framework';
import { withNavigation } from '@react-navigation/compat';

import { nowTheme } from '@constants';
import { FormatMoneyService } from '@core/services/format-money.service';
import { updateProducts } from '@core/module/store/cart/cart';
import { ProductCart } from '@core/services/product-cart.service';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';

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
  const cartProducts = useSelector((state) => state.productsReducer.products);
  const productCart = ProductCart.getInstance(cartProducts);
  const dispatch = useDispatch();

  const onAddPressed = async (productItem) => {
    if (productItem.cost_price < 0) {
      props.handleNewPrice && await props.handleNewPrice(props.product.id)
    }
    const addProduct = {
      ...productItem,
      myPrice: props.myPrice,
    };
    const productAdd = productCart.addCart(addProduct);
    dispatch(updateProducts(productAdd))
  };

  const onProductPressed = async (productItem) => {
    if (productItem.cost_price < 0) {
      props.handleNewPrice && await props.handleNewPrice(props.product.id)
    }
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
          <Image
            resizeMode="contain"
            style={styles.image}
            source={{ uri: props.product.cover_image }}
          />
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => onProductPressed(props.product)}>
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
                      {props.product.cost_price < 0 ? 'Get Price ' : 'My Price'}
                    </Text>
                    {props.product.cost_price > 0 ?
                      <Text style={styles.price}>
                        {formatMoney.format(props.product.cost_price)}
                      </Text> :
                      <TouchableOpacity
                        style={{ width: '100%', alignItems: 'center' }}
                        onPress={() => props.handleNewPrice(props.product.id)}>
                        <MaterialIcons
                          name="autorenew"
                          size={20}
                          color={nowTheme.COLORS.LIGHTGRAY}
                        />
                      </TouchableOpacity>
                    }
                  </Block>
                </>
              )}
            </Block>
          </Block>
        </TouchableWithoutFeedback>
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
});

export default withNavigation(Product);
