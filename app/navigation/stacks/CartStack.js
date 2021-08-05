import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Cart from '../screens/Cart';
import PlaceOrders from '../screens/PlaceOrders';
import orderPlaced from '../screens/OrderPlaced';
import Example from '../screens/DatePicker';
import { screensRoute } from './configRoutes';

const Stack = createStackNavigator();

function CartStack() {
  const screens = [
    {
      name: 'Cart',
      component: Cart,
      title: 'Cart',
      colorBackground: '#FFFFFF',
    },
    {
      name: 'PlaceOrders',
      component: PlaceOrders,
      title: 'Place Orders',
      colorBackground: '#FFFFFF',
    },
    {
      name: 'DatePicker',
      component: Example,
      title: 'DatePicker',
      colorBackground: '#FFFFFF',
    },
    {
      name: 'OrderPlaced',
      component: orderPlaced,
      title: '',
      colorBackground: '#FFFFFF',
    },
  ];

  return (
    <Stack.Navigator mode="card" headerMode="screen">
      {screensRoute(Stack, screens)}
    </Stack.Navigator>
  );
}

export default CartStack;
