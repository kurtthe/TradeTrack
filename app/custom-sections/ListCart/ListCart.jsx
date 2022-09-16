import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native'
import ProductCart from '@custom-elements/ProductCart';
import { Block, Text, Button } from 'galio-framework';
import { nowTheme } from '@constants/index';

import { makeStyles } from './ListCart.styles'
import { useSelector } from 'react-redux';
import EmptyCart from '@custom-elements/EmptyCart';
import { ProductCart as ProductCartService } from '@core/services/product-cart.service';

export const ListCart = ({ onCheckoutPressed, orderTotal, bought, products }) => {
  const styles = makeStyles()
  const [valueTotal, setValueTotal] = useState('0')

  const cartProducts = useSelector((state) => state.productsReducer.products);
  const clientFriendly = useSelector((state) => state.productsReducer.clientFriendly);

  useEffect(()=>{
    const orderTotal = () => {
      const productCartService = ProductCartService.getInstance(cartProducts);
      const total = productCartService.totalOrder();
      setValueTotal(total)
    };
    orderTotal()
  },[cartProducts])

  const renderProducts = ({ item }) => <ProductCart product={item} bought={bought} />;


  const renderFooter = () => {
    if (!cartProducts || cartProducts.length === 0) {
      return null;
    }
    const titleOrder = clientFriendly ? 'Total RRP (ex-GST) ' : 'Total (ex-GST)';

    return (
      <Block row style={styles.detailOrders}>
        {!bought && (
          <>
            <Text style={{ fontWeight: 'bold' }}>{`${titleOrder}: ${valueTotal}`}</Text>
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
          </>
        )}
      </Block>
    );
  };

  return (
    <>
      <FlatList
        data={bought ? products : cartProducts}
        renderItem={renderProducts}
        keyExtractor={(item, index) => `${index}-${item.id}`}
        ListEmptyComponent={<EmptyCart />}
        style={styles.container}
      />
      {renderFooter()}
    </>
  )
}

