import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Cart from '@screens/Cart';
import PlaceOrders from '@screens/PlaceOrders';
import OrderPlaced from '@screens/OrderPlaced';
import OrdersBought from '@screens/OrdersBought';
import Example from '@screens/DatePicker';
import { screensRoute } from './ConfigRoutes';

const Stack = createStackNavigator();

function CartStack() {
  const screens = [
    {
      name: 'Cart',
      component: Cart,
      title: 'Cart',
      colorBackground: '#FFFFFF',
      header:{
        title: 'Online Orders',
      }
    },
    {
      name: 'PlaceOrders',
      component: PlaceOrders,
      title: 'Checkout',
      colorBackground: '#FFFFFF',
      header:{
        title: 'Checkout',
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
      component: OrderPlaced,
      colorBackground: '#FFFFFF'
    },
    {
      name: 'OrderBought',
      component: OrdersBought,
      colorBackground: '#FFFFFF',
      header: {
        title: 'Account',
      },
    },
  ];

  return (
    <Stack.Navigator mode="card" headerMode="screen">
      {screensRoute(Stack, screens)}
    </Stack.Navigator>
  );
}

export default CartStack;
