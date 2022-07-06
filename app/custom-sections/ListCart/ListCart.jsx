import React from 'react';
import { FlatList } from 'react-native'
import ProductCart from '@custom-elements/ProductCart';
import SimpleButton from '@components/SimpleButton';
import { Ionicons } from '@expo/vector-icons';
import { Block, Text, Button } from 'galio-framework';
import { nowTheme } from '@constants/index';

import {
  selectedCategory,
} from '@core/module/store/filter/filter';
import { makeStyles } from './ListCart.styles'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

export const ListCart = ({ messageCartEmpty, onCheckoutPressed, orderTotal }) => {
  const dispatch = useDispatch()
  const styles = makeStyles()
  const navigation = useNavigation();

  const cartProducts = useSelector((state) => state.productsReducer.products);
  const clientFriendly = useSelector((state) => state.productsReducer.clientFriendly);

  const renderProducts = ({ item }) => <ProductCart product={item} />;

  const handleBrowseProducts = () => {
    dispatch(selectedCategory(''))
    navigation.navigate('Products', {
      screen: 'Category'
    })
  }

  const renderEmpty = () => {
    return (
      <Block style={styles.container_empty}>
        <Ionicons name="cart" color={'#828489'} size={60} />
        <Text style={{ fontFamily: 'montserrat-regular', fontSize: 24 }} color={'#000'}>
          {messageCartEmpty || 'Your cart is empty!'}
        </Text>
        <Block style={{ top: 100 }} middle >
          <SimpleButton onPress={() => handleBrowseProducts()}>
            Browse products
          </SimpleButton>
        </Block>
      </Block>
    );
  }

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
        ListEmptyComponent={renderEmpty}
        style={styles.container}
      />
      {renderFooter()}
    </>
  )
}


