import React from 'react';
import { connect  } from 'react-redux';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeStack from './HomeStack'
import AccountStack from './AccountStack'
import CartStack from './CartStack'
import ProductsStack from './ProductsStack'
import TradeTrakStack from './TradeTrakStack'

import {ConfigRouteMain} from './ConfigMainTabRoutes'

const MainTab = createBottomTabNavigator();

function AppStack(props) {

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
      badge: {
        textBadge: props.cartProducts.length
      }
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
      title: 'Trak'
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

const mapStateToProps = (state) => ({
  cartProducts: state.productsReducer.products
});

export default connect(mapStateToProps)(AppStack)
