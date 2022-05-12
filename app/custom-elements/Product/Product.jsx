import React, { useState, useEffect } from 'react';
import {
  Image,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
} from 'react-native';

import { Button } from '@components';
import { Block, Text } from 'galio-framework';
import { withNavigation } from '@react-navigation/compat';

import { nowTheme } from '@constants';
import { FormatMoneyService } from '@core/services/format-money.service';
import { updateProducts } from '@core/module/store/cart/cart';
import { ProductCart } from '@core/services/product-cart.service';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, sizeConstant } from './Product.styles'


const Product = (props) => {
  const cartProducts = useSelector((state) => state.productsReducer.products);
  const dispatch = useDispatch()
  const [productCart] = useState(ProductCart.getInstance(cartProducts))
  const [formatMoney] = useState(FormatMoneyService.getInstance());
  const [added, setProductAdded] = useState(false)
  const styles = makeStyles()

  useEffect(() => {

    const initServices = () => {
      const addedProduct = cartProducts.some((element) => element.id === props.product.id);
      setProductAdded(addedProduct);
    }
    initServices()
  }, [cartProducts])


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
    <Block key={`Card-${props.product.name}`} style={styles.Card}>
      <TouchableWithoutFeedback onPress={() => onProductPressed(props.product)}>
        <Image
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
      <Block style={styles.buttonAdd}>
        <Button
          color="warning"
          textStyle={{ fontFamily: 'montserrat-bold', fontSize: 16, color: '#0E3A90' }}

          onPress={() => onAddPressed(props.product)}
          disabled={added ? true : false}
        >
          {added ? 'Added' : 'Add'}
        </Button>
      </Block>
    </Block>
  );
};


export default withNavigation(Product);
