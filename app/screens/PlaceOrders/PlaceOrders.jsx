import React from 'react';
import { Block } from 'galio-framework';
import {styles} from './PlaceOrders.styles'
import {useSelector, useDispatch} from 'react-redux';
import { clearProducts } from '@core/module/store/cart/cart';
import DetailOrders from '@custom-sections/place-order/DetailsOrders';
import {JobsForm, DeliveryForm, StoreForm} from './components'

const PlaceOrders = () => {
  const dispatch = useDispatch()
  const cartProducts = useSelector((state)=> state.productsReducer.products)
  const userEmail = useSelector((state)=> state.loginReducer.email)

  const placeOrderHandler = () => {

  }

  return (
    <Block flex center style={styles.cart}>
      <Block center>
        <JobsForm />
        <DeliveryForm />
        <StoreForm />
        <DetailOrders
          cartProducts={cartProducts}
          orderHandler={placeOrderHandler}
        />
      </Block>
    </Block>
  );
}

export default PlaceOrders;
