import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '@screens/THome';
import Search from '@screens/Search';
import InvoiceDetails from '@screens/InvoiceDetail';

import { screensRoute } from './ConfigRoutes';

const Stack = createStackNavigator();

function HomeStack() {
  const screens = [
    {
      name: 'Home',
      component: Home,
      colorBackground: '#FFFFFF',
      header: {
        title: 'Home',
        search: true,
      }
    },
    {
      name: 'Search',
      component: Search,
      colorBackground: '#FFFFFF',
      header: {
        title: 'Search',
        back: true,
      }
    },
    {
      name: 'InvoiceDetails',
      component: InvoiceDetails,
      colorBackground: '#FFFFFF',
      header: {
        title: 'Invoice Details',
        back: true,
      }
    },
  ];

  return (
    <Stack.Navigator mode="card" headerMode="screen" initialRouteName="Home">
      {screensRoute(Stack, screens)}
    </Stack.Navigator>
  );
}

export default HomeStack;
