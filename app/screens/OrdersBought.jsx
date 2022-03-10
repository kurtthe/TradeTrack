import React from 'react';
import { Block } from 'galio-framework';
import { StyleSheet } from 'react-native';
import ListCart from '@custom-sections/ListCart'

const OrdersBought = ({ route }) => {
  const { products } = route.params

  return (
    <Block style={styles.container}>
      <ListCart cartProducts={products} messageCartEmpty='No have products in this order' />
    </Block>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default OrdersBought