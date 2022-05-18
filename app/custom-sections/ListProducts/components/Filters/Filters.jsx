import React, { useEffect, useState, createRef, useCallback } from 'react';
import { View } from 'react-native';
import { Text } from 'galio-framework';
import ActionSheet from 'react-native-actions-sheet';
import FilterButton from '@components/FilterButton';
import { AlertService } from '@core/services/alert.service';

import { makeStyles } from './Filters.styles'
import { cardInfo } from '../../../CategoriesProducts/CategoriesProducts.model'
import ListRadioButton from '../ListRadioButton'
import { nowTheme } from '@constants';


export const FilterProducts = ({
  getProducts,
  categorySelected,
  pageProducts
}) => {
  const [categoryActive, setCategoryActive] = useState(categorySelected?.name !== cardInfo.name)

  const styles = makeStyles()

  return (
    <>
      <View style={styles.container}>
        <View style={styles.contentFilters}>
          <FilterButton
            text={'Category'}
            onPress={() => handleShowCategories()}
            isActive={categoryActive}
          />
        
        </View>
      </View>
    </>
  );
}

