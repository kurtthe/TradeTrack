import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '@screens/THome';
import SearchHome from '@screens/SearchInvoice';
import InvoiceDetails from '@screens/InvoiceDetail';
import Allinvoice from '@screens/Allinvoice';
import AllNews from '@screens/AllNews';
import Store from '@screens/TStores';

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
      name: 'SearchHome',
      component: SearchHome,
      colorBackground: '#FFFFFF',
      header: {
        title: 'Invoices',
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
    {
      name: 'Allinvoice',
      component: Allinvoice,
      colorBackground: '#FFFFFF',
      header: {
        title: 'Invoices',
        back: true,
      }
    },
    {
      name: 'AllNews',
      component: AllNews,
      colorBackground: '#FFFFFF',
      header: {
        title: 'News',
        back: true,
      }
    },
    {
      name: 'Store',
      component: Store,
      colorBackground: '#FFFFFF',
      header: {
        title: 'Stores',
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
