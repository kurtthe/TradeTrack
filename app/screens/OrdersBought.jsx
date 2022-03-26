import React, { useState, useEffect } from 'react';
import { Block, Button, Text } from 'galio-framework';
import { StyleSheet } from 'react-native';
import ListCart from '@custom-sections/ListCart'
import { nowTheme } from '@constants/index';
import { ProductCart } from '@core/services/product-cart.service';
import { updateProducts } from '@core/module/store/cart/cart';
import { useSelector, useDispatch } from 'react-redux';
import Toast from '@core/services/toast.service';

const OrdersBought = ({ route }) => {
  const productsInCart = useSelector((state) => state.productsReducer.products);
  const clientFriendly = useSelector((state) => state.productsReducer.clientFriendly);

  const [productOrder, setProductOrder] = useState([])
  const dispatch = useDispatch();

  const productCart = ProductCart.getInstance(productsInCart);
  const { products } = route.params

  useEffect(() => {
    const mappingData = () => {
      const dataProduct = products?.items?.map((item) => {
        const priceProduct = clientFriendly ? item.rrp : item.cost_price;
        return { ...item.product, myPrice: clientFriendly, price: priceProduct, quantity:1 }
      })
      setProductOrder(dataProduct)
    }
    mappingData()
  }, [products?.items])

  const handleAddCart = () => {
    const newProducts = productCart.addMultipleCart(productOrder)
    dispatch(updateProducts(newProducts))
    Toast.show('Products added!')
  }

  return (
    <Block style={styles.container}>
      <ListCart cartProducts={productOrder} messageCartEmpty='No have products in this order' bought={true} />
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