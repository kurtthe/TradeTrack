import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import TAccount from '@screens/TAccounts';
import Search from '@screens/Search';

import {screensRoute} from './ConfigRoutes'

const Stack = createStackNavigator();

const screens = [
  {
    name: 'Account',
    component: TAccount,
    title: 'Home',
    colorBackground: '#FFFFFF'
  },
  {
    name: 'Search',
    component: Search,
    title: 'Search',
    colorBackground: '#FFFFFF'
  }
];

function AccountStack() {
  return (
    <Stack.Navigator
      mode="card"
      headerMode="screen"
    >
      {screensRoute(Stack, screens)}
    </Stack.Navigator>
  );
}

export default AccountStack;
