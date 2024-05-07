import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import Products from '@screens/TProduts';

import Category from '@screens/Category';
import Product from "@screens/Product";
import SearchProducts from '@screens/SearchProducts';
import {screensRoute} from './ConfigRoutes'

const Stack = createStackNavigator();

function ProductsStack() {

  const screens = [
    {
      name: 'Products',
      component: Products,
      colorBackground: '#FFFFFF',
      header:{
        title: 'Products ',
      }
    },
    {
      name: 'Category',
      component: Category,
      title: 'Category',
      colorBackground: '#FFFFFF',
      header:{
        title: 'Products',
      }
    },
    {
      name: 'Product',
      component: Product,
      colorBackground: '#FFFFFF',
      header:{
        title: 'Product',
      }
    },
    {
      name: 'SearchProducts',
      component: SearchProducts,
      colorBackground: '#FFFFFF',
      header:{
        title: 'Products  ',
      }
    }
  ];

  return (
    <Stack.Navigator mode="card" headerMode="screen">
      {screensRoute(Stack, screens)}
    </Stack.Navigator>
  );
}

export default ProductsStack
