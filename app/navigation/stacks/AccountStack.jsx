import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TAccount from '@screens/TAccounts';
import Search from '@screens/Search';

import { screensRoute } from './ConfigRoutes';

const Stack = createStackNavigator();

const screens = [
  {
    name: 'AccountDetails',
    component: TAccount,
    colorBackground: '#FFFFFF',
    header: {
      title: 'Account',
      back: true,
    },
  },
  {
    name: 'Search',
    component: Search,
    colorBackground: '#FFFFFF',
    header: {
      title: 'Search',
    },
  },
];

function AccountStack() {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      {screensRoute(Stack, screens)}
    </Stack.Navigator>
  );
}

export default AccountStack;
