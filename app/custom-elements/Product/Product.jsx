import React, { memo, useState, useEffect } from 'react';
import { Image, TouchableWithoutFeedback, View, TouchableOpacity } from 'react-native';

import { Button } from '@components';
import { Block, Text } from 'galio-framework';
import { useNavigation } from '@react-navigation/native';

import { nowTheme } from '@constants';
import { FormatMoneyService } from '@core/services/format-money.service';
import { updateProducts } from '@core/module/store/cart/cart';
import { ProductCart } from '@core/services/product-cart.service';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, sizeConstant } from './Product.styles';
import FavoriteIcon from '../FavoriteIcon';
import IconTopSell from '../IconTopSell';

const Product = (props) => {
  const cartProducts = useSelector((state) => state.productsReducer.products);
  const dispatch = useDispatch();
  const productCart = ProductCart.getInstance(cartProducts);
  const formatMoney = FormatMoneyService.getInstance();
  const [added, setProductAdded] = useState(false);
  const styles = makeStyles();
  const navigation = useNavigation();

  useEffect(() => {
    const addedProduct = cartProducts.some((element) => element.id === props.product.id);
    setProductAdded(addedProduct);
  }, [cartProducts]);

  const onAddPressed = async (productItem) => {
    if (productItem.price.cost_price < 0) {
      props.handleNewPrice && (await props.handleNewPrice(props.product.id));
    }
    const priceProduct = props.myPrice ? productItem.price.rrp : productItem.price.cost_price;

    const addProduct = {
      ...productItem,
      price: parseFloat(priceProduct).toFixed(2),
      myPrice: props.myPrice,
    };
    const productAdd = productCart.addCart(addProduct);
    dispatch(updateProducts(productAdd));
  };

  const onProductPressed = async (productItem) => {
    if (productItem.cost_price < 0) {
      props.handleNewPrice && (await props.handleNewPrice(props.product.id));
    }
    navigation?.navigate('Product', {
      hideMyPrice: props.myPrice,
      product: productItem,
      headerTitle: 'Product',
      updateProducts: props.updateList,
    });
  };

  const showPriceProduct = () => {
    if (props.product.cost_price > 0) {
      return <Text style={styles.price}>{formatMoney.format(props.product.price.cost_price)}</Text>;
    }
    return (
      <TouchableOpacity
        style={{ width: '100%', alignItems: 'center' }}
        onPress={() => props.handleNewPrice(props.product.id)}
      >
        <MaterialIcons name="autorenew" size={20} color={nowTheme.COLORS.LIGHTGRAY} />
      </TouchableOpacity>
    );
  };

  return (
    <Block key={`Card-${props.product.name}`} style={styles.Card}>
      <TouchableWithoutFeedback onPress={() => onProductPressed(props.product)}>
        <Image style={styles.image} source={{ uri: props.product.cover_image }} />
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => onProductPressed(props.product)}>
        <Block flex space="between" style={{ paddingBottom: 7 }}>
          <View style={styles.contentSku}>
            <Text color={nowTheme.COLORS.LIGHTGRAY} size={sizeConstant}>
              SKU
            </Text>
            <Text color={nowTheme.COLORS.INFO} size={sizeConstant}>
              {` ${props.product.sku}`}
            </Text>
            <IconTopSell product={props.product} />
          </View>
          <View style={styles.contentNameProduct}>
            <Text
              style={{ fontFamily: 'montserrat-regular', marginRight: 0, paddingVertical: 0 }}
              size={15}
            >
              <FavoriteIcon product={props.product} size={15} hideNoFavorite={true} />
              {props.product.name}
            </Text>
          </View>
          <Block row style={{ width: '100%' }}>
            <Block flex>
              <Text color={nowTheme.COLORS.LIGHTGRAY} style={styles.priceGrayText}>
                Price:{' '}
              </Text>
              <Text style={styles.price}>
                {formatMoney.format(props.product.price.retail_price)}
              </Text>
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
                    {props.product.price.cost_price < 0 ? 'Get Price ' : 'My Price'}
                  </Text>
                  {showPriceProduct()}
                </Block>
              </>
            )}
          </Block>
        </Block>
      </TouchableWithoutFeedback>
      <Block>
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

export default memo(Product);
