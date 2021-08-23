import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Cart from '@screens/Cart';
import PlaceOrders from '@screens/PlaceOrders';
import orderPlaced from '@screens/OrderPlaced';
import Example from '@screens/DatePicker';
import { screensRoute } from './ConfigRoutes';

const Stack = createStackNavigator();

function CartStack() {
  const screens = [
    {
      name: 'Cart',
      component: Cart,
      title: 'Cart1',
      colorBackground: '#FFFFFF',
      header:{
        title: 'Cart',
      }
    },
    {
      name: 'PlaceOrders',
      component: PlaceOrders,
      title: 'Place Orders',
      colorBackground: '#FFFFFF',
      header:{
        title: 'Place Orders',
      }
    },
    {
      name: 'DatePicker',
      component: Example,
      title: 'DatePicker',
      colorBackground: '#FFFFFF',
      header:{
        title: 'DatePicker',
      }
    },
    {
      name: 'OrderPlaced',
      component: orderPlaced,
      colorBackground: '#FFFFFF',
      header:{
        title: '',
      }
    },
  ];

  return (
    <Stack.Navigator mode="card" headerMode="screen">
      {screensRoute(Stack, screens)}
    </Stack.Navigator>
  );
}

export default CartStack;
