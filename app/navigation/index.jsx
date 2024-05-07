import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AppStack from './stacks/AppStack';
import AuthStack from './stacks/OnboardingStack'

import { screensRoute } from './stacks/ConfigRoutes';

const Stack = createStackNavigator();

export default function AppRoute() {
  const screens = [
    {
      name: 'AppStack',
      component: AppStack,
      title: '',
      colorBackground: '#FFFFFF',
      header: false,
      headerTransparent: false,
    },
    {
      name: 'AuthStack',
      component: AuthStack,
      title: '',
      colorBackground: '#FFFFFF',
      header: false,
      headerTransparent: false,
    },
  ];
  return (
    <Stack.Navigator mode="card" headerMode="none" initialRouteName="AuthStack">
      {screensRoute(Stack, screens)}
    </Stack.Navigator>
  );
}
