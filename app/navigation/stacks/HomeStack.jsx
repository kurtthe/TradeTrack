import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '@screens/THome';
import SearchHome from '@screens/SearchInvoice';
import InvoiceDetails from '@screens/InvoiceDetail';
import Allinvoice from '@screens/Allinvoice';
import AllNews from '@screens/AllNews';
import Store from '@screens/TStores';
import EstimatorRoof from '@screens/EstimatorRoof';
import AppFeedback from '@screens/AppFeedback';
import App from '@screens/AppFeedback2';
import BookTrakDemo from '@screens/BookTrakDemo';

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
        title: 'Details',
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
    {
      name: 'Estimator',
      component: EstimatorRoof,
      colorBackground: '#FFFFFF',
      header: {
        back: true,
      }
    },
    {
      name: 'AppFeedback',
      component: AppFeedback,
      colorBackground: '#FFFFFF',
      header: {
        back: true,
      }
    },
    {
      name: 'BookTrakDemo',
      component: BookTrakDemo,
      colorBackground: '#FFFFFF',
      header: {
        back: true,
      }
    },
    {
      name: 'AppFeedback2',
      component: App,
      colorBackground: '#FFFFFF',
      header: {
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
