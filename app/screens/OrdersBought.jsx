import React, { useState } from 'react';
import { Block, Button, Text } from 'galio-framework';
import { StyleSheet } from 'react-native';
import ListCart from '@custom-sections/ListCart'
import { nowTheme } from '@constants/index';
import { ProductCart } from '@core/services/product-cart.service';
import { updateProducts } from '@core/module/store/cart/cart';
import { useSelector, useDispatch } from 'react-redux';

const OrdersBought = ({ route }) => {
  const productsInCart = useSelector((state) => state.productsReducer.products);
  const dispatch = useDispatch();

  const productCart = ProductCart.getInstance(productsInCart);
  const { products } = route.params

  const handleAddCart = () => {
    const newProducts = productCart.addMultipleCart(products?.items)
    console.log("=>newProducts",newProducts)
    dispatch(updateProducts(newProducts))
  }

  return (
    <Block style={styles.container}>
      <ListCart cartProducts={products?.items} messageCartEmpty='No have products in this order' bought={true} />
      {(products?.items?.length > 0) ? (<Block style={styles.footer}>
        <Button
          shadowless
          color={nowTheme.COLORS.INFO}
          onPress={() => handleAddCart()}
        >
          <Text size={18} color={nowTheme.COLORS.WHITE}>
            Add to cart
          </Text>
        </Button>
      </Block>) : null}

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