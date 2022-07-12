import React from 'react';
import { FlatList } from 'react-native'
import ProductCart from '@custom-elements/ProductCart';
import { Block, Text, Button } from 'galio-framework';
import { nowTheme } from '@constants/index';

import { makeStyles } from './ListCart.styles'
import { useSelector } from 'react-redux';
import EmptyCart from '@custom-elements/EmptyCart';

export const ListCart = ({ onCheckoutPressed, orderTotal, bought }) => {
  const styles = makeStyles()

  const cartProducts = useSelector((state) => state.productsReducer.products);
  const clientFriendly = useSelector((state) => state.productsReducer.clientFriendly);

  const renderProducts = ({ item }) => <ProductCart product={item}  bought={bought} />;


  renderFooter = () => {
    if (!cartProducts || cartProducts.length === 0) {
      return null;
    }
    const titleOrder = clientFriendly ? 'Total RRP (ex-GST) ' : 'Total (ex-GST)';

    return (
      <Block row style={styles.detailOrders}>
        <Text style={{ fontWeight: 'bold' }}>{`${titleOrder}: ${orderTotal()}`}</Text>

        <Button
          shadowless
          style={{ left: 10 }}
          color={nowTheme.COLORS.INFO}
          onPress={() => onCheckoutPressed && onCheckoutPressed()}
        >
          <Text size={18} color={nowTheme.COLORS.WHITE}>
            Checkout
          </Text>
        </Button>
      </Block>
    );
  };

  return (
    <>
      <FlatList
        data={cartProducts}
        renderItem={renderProducts}
        keyExtractor={(item, index) => `${index}-${item.id}`}
        ListEmptyComponent={<EmptyCart />}
        style={styles.container}
      />
      {renderFooter()}
    </>
  )
}

