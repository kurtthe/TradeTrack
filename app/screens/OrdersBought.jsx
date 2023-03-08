import React, { useState, useEffect } from 'react';
import { Block, Button, Text } from 'galio-framework';
import { StyleSheet } from 'react-native';
import ListCart from '@custom-sections/ListCart'
import { nowTheme } from '@constants/index';
import { ProductCart } from '@core/services/product-cart.service';
import { updateProducts } from '@core/module/store/cart/cart';
import { updatePreOrder } from '@core/module/store/cart/preCart';
import { useSelector, useDispatch } from 'react-redux';

const OrdersBought = ({ route }) => {
  const productsInCart = useSelector((state) => state.productsReducer.products);
  const clientFriendly = useSelector((state) => state.productsReducer.clientFriendly);
  const productsToCart = useSelector((state) => state.preCartReducer.products);

  const dispatch = useDispatch();

  const productCart = ProductCart.getInstance(productsInCart);
  const { products } = route.params

  useEffect(() => {
    const mappingData = () => {
      const dataProduct = products?.items?.map((item) => {

        const priceProduct = clientFriendly ? item.rrp : item.cost_price;
        return {
          ...item.product,
          myPrice: clientFriendly,
          price: priceProduct,
          quantity: item?.item?.default_quantity || 1
        }
      })
      dispatch(updatePreOrder(dataProduct))
    }
    mappingData()
  }, [products?.items])

  const handleAddCart = () => {
    const newProducts = productCart.addMultipleCart(productsToCart)
    dispatch(updateProducts(newProducts))
  }

  return (
    <Block style={styles.container}>
      <ListCart products={productsToCart} messageCartEmpty='No have products in this order' bought={true} />
      {(productsToCart?.length > 0) && (
        <Block style={styles.footer}>
          <Button
            shadowless
            color={nowTheme.COLORS.INFO}
            onPress={() => handleAddCart()}
          >
            <Text size={18} color={nowTheme.COLORS.WHITE}>
              Add to cart
            </Text>
          </Button>
        </Block>
      )
      }

    </Block>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
})

export default OrdersBought