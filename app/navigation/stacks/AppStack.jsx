import React from 'react';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeStack from './HomeStack'
import AccountStack from './AccountStack'
import CartStack from './CartStack'
import ProductsStack from './ProductsStack'
import TradeTrakStack from './TradeTrakStack'

import {ConfigRouteMain} from './ConfigMainTabRoutes'

const MainTab = createBottomTabNavigator();

function AppStack() {
  const screens = [
    {
      name: 'Home',
      component: HomeStack,
      typeIcon: 'Ionicons',
      icon: 'home',
      title: 'Home'
    },
    {
      name: 'Products',
      component: ProductsStack,
      typeIcon: 'Ionicons',
      icon: 'file-tray-stacked',
      title: 'Products'
    },
    {
      name: 'Cart',
      component: CartStack,
      typeIcon: 'Ionicons',
      icon: 'cart',
      title: 'Cart',
      
    },
    {
      name: 'Account',
      component: AccountStack,
      typeIcon: 'MaterialIcons',
      icon: 'request-quote',
      title: 'Account'
    },
    {
      name: 'Job Management',
      component: TradeTrakStack,
      typeIcon: 'MaterialIcons',
      icon: 'business-center',
      title: 'Trade Trak'
    },
  ];

  return (
    <MainTab.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      activeTintColor: '#0E3A90',
    }}
    >
      {ConfigRouteMain(MainTab, screens)}
    </MainTab.Navigator>
  );
}

export default AppStack
