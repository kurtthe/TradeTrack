import React, { useEffect, useState, createRef, useCallback } from 'react';
import { View } from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import FilterButton from '@components/FilterButton';
import { AlertService } from '@core/services/alert.service';

import { makeStyles } from './Filters.styles'
import { useGetCategories } from '@core/hooks/Categories'
import ListRadioButton from '../ListRadioButton'
import { nowTheme } from '@constants';

import {
  selectedCategory,
  getProducts,
  changeKeepData,
  selectedSubCategory,
  nextPage,
  getAllPages,
  reset,
  resetPage
} from '@core/module/store/filter/filter';

import { useSelector, useDispatch } from 'react-redux';
import { sortNameCategories } from './utils'

export const FilterProducts = () => {
  const dispatch = useDispatch();
  const pageProducts = useSelector((state) => state.filterReducer.page)
  const categoryParentSelected = useSelector((state) => state.filterReducer.categorySelected)

  const [alertService] = useState(new AlertService())
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [categoryActive, setCategoryActive] = useState(categoryParentSelected !== '')
  const [subCategoryActive, setSubCategoryActive] = useState(false)
  const [noSubCategoriesFound, setNoSubCategoriesFound] = useState(false)

  const actionSheetRef = createRef();
  const actionSheetRef2 = createRef();

  const styles = makeStyles()

  const {
    data: listCategories,
    isLoading } = useGetCategories();

  const validateIfSelected = (category) => {
    if (categoryParentSelected === category.id) {
      setCategoryActive(true)
      return true;
    }
    return false;
  }

  const categoriesToRadioButton = (categoriesList) => {
    return categoriesList
      ?.sort(sortNameCategories)
      ?.map((category) => ({
        ...category,
        color: nowTheme.COLORS.INFO,
        labelStyle: { fontWeight: 'bold' },
        label: category.name,
        value: category.name,
        containerStyle: styles.styleRadio,
        selected: (categoryParentSelected) ? validateIfSelected(category) : false,
      }));
  }

  const initialCategories = useCallback(() => {
    const categoriesSerialized = categoriesToRadioButton()
    setCategories(categoriesSerialized)
  }, [categoriesToRadioButton])

  useEffect(() => {
    initialCategories()
  }, [listCategories])

  const handleShowCategories = () => {
    actionSheetRef.current?.setModalVisible();
  }

  const handleShowSubCategories = () => {
    if (noSubCategoriesFound) {
      alertService.show('Alert!', 'No sub categories found');
      return;
    }
    actionSheetRef2.current?.setModalVisible();
  }

  const getSubCategories = (options) => {
    const optionSelected = options.find((option) => option.selected);

    if (optionSelected.sub_categories?.length === 0) {
      setNoSubCategoriesFound(true)
      alertService.show(
        'Alert!',
        `Category ${optionSelected.name?.toLowerCase()} haven't products`,
      );
      return []
    }

    setNoSubCategoriesFound(false)
    dispatch(categorySelected(optionSelected.id))

    const subCategoriesSerialized = categoriesToRadioButton(optionSelected.sub_categories)
    setSubCategories(subCategoriesSerialized)
  }

  const onPressRadioButtonCategory = (options) => {
    getSubCategories(options);
    setCategoryActive(true)
    actionSheetRef.current?.setModalVisible(false);
  };

  const onPressRadioButtonSubCategory = (options) => {
    const optionSelected = getCategoriesForSelected(options)

    dispatch(subCategorySelected(optionSelected.id))
    dispatch(getProducts(optionSelected.products))
    dispatch(resetPage())

    actionSheetRef2.current?.setModalVisible(false);
    setSubCategoryActive(true)
  }

  const clearFilterSelected = (listData = []) => {
    return listData.map((item) => ({
      ...item,
      selected: false,
    }));
  };

  const handleResetFilter = () => {
    setCategories(clearFilterSelected(categoryActive))
    setSubCategories(clearFilterSelected(subCategoryActive))
    
    setCategoryActive(false)
    setSubCategoryActive(false)
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.contentFilters}>
          <FilterButton
            text={'Category'}
            onPress={() => handleShowCategories()}
            isActive={categoryActive}
            isLoading={isLoading}
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
                onPress={() => handleResetFilter()}
                icon={require('@assets/nuk-icons/png/2x/clear.png')}
              />
            </>
          )}
        </View>
      </View>

      <ActionSheet ref={actionSheetRef} headerAlwaysVisible>
        <ListRadioButton
          onChange={(option) => onPressRadioButtonCategory(option)}
          options={categories}
        />
      </ActionSheet>

      <ActionSheet ref={actionSheetRef2} headerAlwaysVisible>
        <ListRadioButton
          onChange={(option) => onPressRadioButtonSubCategory(option)}
          options={subCategories}
        />
      </ActionSheet>
    </>
  );
}

