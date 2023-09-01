import React from 'react';

import {View} from 'react-native'
import Filters from './components/Filters'
import Products from './components/Products';
import { nowTheme } from '@constants';

const ListProducts = () => (
  <View style={{ backgroundColor: nowTheme.COLORS.BACKGROUND, flex: 1}}>
    <Filters />
    <Products />
  </View>
);

export default ListProducts;
