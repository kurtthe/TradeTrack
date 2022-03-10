import React from 'react';
import { Block, Button, Text } from 'galio-framework';
import { StyleSheet, Dimensions } from 'react-native';
import ListCart from '@custom-sections/ListCart'
import { nowTheme } from '@constants/index';

const { width } = Dimensions.get("screen");

const OrdersBought = ({ route }) => {
  const { products } = route.params

  console.log("=0<products", products?.items)

  return (
    <Block style={styles.container}>
      <ListCart cartProducts={products?.items} messageCartEmpty='No have products in this order' />
      {(products?.items?.length > 0) ? (<Block style={styles.footer}>
        <Button
          shadowless
          color={nowTheme.COLORS.INFO}
          onPress={() => this.onCheckoutPressed()}
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