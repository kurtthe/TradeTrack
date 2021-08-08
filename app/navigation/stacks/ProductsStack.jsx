import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import Products from '@screens/TProduts';

import Category from '@screens/Category';
import Product from "@screens/Product";
import Search from '@screens/Search';
import {screensRoute} from './ConfigRoutes'

const Stack = createStackNavigator();

function ProductsStack() {

  const screens = [
    {
      name: 'Products',
      component: Products,
      title: 'Products',
      colorBackground: '#FFFFFF',
    },
    {
      name: 'Category',
      component: Category,
      title: 'Category',
      colorBackground: '#FFFFFF'
    },
    {
      name: 'Product',
      component: Product,
      title: 'Product',
      colorBackground: '#FFFFFF'
    },
    {
      name: 'Search',
      component: Search,
      title: 'Search',
      colorBackground: '#FFFFFF'
    }
  ];

  return (
    <Stack.Navigator mode="card" headerMode="screen">
      {screensRoute(Stack, screens)}
    </Stack.Navigator>
  );
}

export default ProductsStack
