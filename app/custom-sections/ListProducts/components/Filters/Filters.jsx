import React, { useEffect, useState, createRef, useCallback } from 'react';
import { View } from 'react-native';
import { Text } from 'galio-framework';
import ActionSheet from 'react-native-actions-sheet';
import FilterButton from '@components/FilterButton';
import { AlertService } from '@core/services/alert.service';

import { makeStyles } from './Filters.styles'
import { cardInfo } from '../../../CategoriesProducts/CategoriesProducts.model'
import { useGetCategories, useGetSubCategories } from '@core/hooks/Categories'
import ListRadioButton from '../ListRadioButton'
import { nowTheme } from '@constants';


export const FilterProducts = ({
  getProducts,
  categorySelected,
  pageProducts
}) => {
  const [alertService] = useState(new AlertService())
  const [categoryParentSelected, setCategoryParentSelected] = useState(undefined)
  const [categoryActive, setCategoryActive] = useState(false)
  const [subCategoryActive, setSubCategoryActive] = useState(false)
  const [noSubCategoriesFound, setNoSubCategoriesFound] = useState(false)
  const [radioButtonsCategories, setRadioButtonsCategories] = useState([])
  const [radioButtonsSubCategories, setRadioButtonsSubCategories] = useState([])

  const [optionsProducts, setOptionsProducts] = useState({
    page: pageProducts,
  });

  const actionSheetRef = createRef();
  const actionSheetRef2 = createRef();

  const styles = makeStyles()

  const {
    isLoading,
    data: listCategories,
  } = useGetCategories(optionsProducts)

  const {
    data: listSubCategories,
    refetch
  } = useGetSubCategories(categoryParentSelected?.id)

  console.log("=>listCategories", listCategories?.headers)

  const sortNameCategories = (x, y) => {
    const first = x.name?.toLowerCase();
    const second = y.name?.toLowerCase();

    if (first < second) {
      return -1;
    }
    if (first > second) {
      return 1;
    }
    return 0;
  }

  const categoriesToRadioButton = (categoriesList, callback) => {
    const serializeData = categoriesList
      ?.sort(sortNameCategories)
      ?.map((category) => ({
        ...category,
        color: nowTheme.COLORS.INFO,
        labelStyle: { fontWeight: 'bold' },
        label: category.name,
        value: category.name,
        containerStyle: styles.styleRadio,
        selected: false,
      }));
    callback(serializeData)
  };

  useEffect(() => {
    categoriesToRadioButton(listCategories?.body, setRadioButtonsCategories)
  }, [listCategories?.body])

  useEffect(() => {
    categoriesToRadioButton(listSubCategories?.body, setRadioButtonsSubCategories)
  }, [listSubCategories?.body])

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading categories...</Text>
      </View>
    )
  }

  const handleShowCategories = () => {
    if (categorySelected?.name === cardInfo.name) {
      actionSheetRef.current?.setModalVisible();
    }
  }

  const handleShowSubCategories = () => {
    if (noSubCategoriesFound) {
      alertService.show('Alert!', 'No sub categories found');
      return;
    }
    actionSheetRef2.current?.setModalVisible();
  }

  const getSubCategories = () => {

  }

  const getCategoriesForSelected = (options, forName = false) => {
    options.forEach((option) => {
      if (forName && forName === option.label) {
        setCategoryParentSelected(option)
      }

      if (option.selected) {
        setCategoryParentSelected(option)
      }
    })

  }

  const onPressRadioButtonCategory = (options) => {
    const { optionSelected } = getCategoriesForSelected(options)

    getProducts(optionSelected?.products);
    actionSheetRef.current?.setModalVisible(false);
  };

  const onPressRadioButtonSubCategory = () => null

  return (
    <>
      <View style={styles.container}>
        <View style={styles.contentFilters}>
          <FilterButton
            text={'Category'}
            onPress={() => handleShowCategories()}
            isActive={categoryActive}
          />
          {categoryActive && (
            <>
              <FilterButton
                text='Sub Category'
                onPress={() => handleShowSubCategories()}
                isActive={subCategoryActive}
              />
              <FilterButton
                text='Clear'
                onPress={() => null}
                icon={require('@assets/nuk-icons/png/2x/clear.png')}
              />
            </>
          )}
        </View>
      </View>

      <ActionSheet ref={actionSheetRef} headerAlwaysVisible>
        <ListRadioButton
          onChange={(option) => onPressRadioButtonCategory(option)}
          options={radioButtonsCategories}
        />
      </ActionSheet>

      <ActionSheet ref={actionSheetRef2} headerAlwaysVisible>
        <ListRadioButton
          onChange={(option) => onPressRadioButtonSubCategory(option)}
          options={radioButtonsSubCategories}
        />
      </ActionSheet>
    </>
  );
}

