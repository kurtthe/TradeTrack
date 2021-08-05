import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import Home from '../screens/THome';
import Search from '../screens/Search';
import InvoiceDetails from '../screens/InvoiceDetail';
import {screensRoute} from './configRoutes'

const Stack = createStackNavigator();

function HomeStack() {

  const screens = [
    {
      name: 'Home',
      component: Home,
      title: 'Home',
      colorBackground: '#FFFFFF'
    },
    {
      name: 'Search',
      component: Search,
      title: 'Search',
      colorBackground: '#FFFFFF'
    },
    {
      name: 'InvoiceDetails',
      component: InvoiceDetails,
      title: 'Invoice Details',
      colorBackground: '#FFFFFF'
    }
  ];

  return (
    <Stack.Navigator mode="card" headerMode="screen" initialRouteName="Home">
      {screensRoute(Stack, screens)}
    </Stack.Navigator>
  );
}

export default HomeStack
