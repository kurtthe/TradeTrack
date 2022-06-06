import React, { useEffect, useState, createRef, useCallback } from 'react';
import { View } from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import FilterButton from '@components/FilterButton';
import { AlertService } from '@core/services/alert.service';

import { makeStyles } from './Filters.styles'
import { getCategoriesService } from '@core/hooks/Categories'
import ListRadioButton from '../ListRadioButton'
import { nowTheme } from '@constants';

import {
  categorySelected,
  subCategorySelected,
  getProducts,
  resetPage,
  getAllPages
} from '@core/module/store/filter/filter';

import {
  getCategories,
  getSubCategories,
  resetCategories
} from '@core/module/store/categories/categories';

import { useSelector, useDispatch } from 'react-redux';

export const FilterProducts = () => {
  const dispatch = useDispatch();
  const listCategories = useSelector((state) => state.categoriesReducer.listCategories)
  const listSubCategories = useSelector((state) => state.categoriesReducer.listSubCategories)
  const page = useSelector((state) => state.filterReducer.page)
  const categoryParentSelected = useSelector((state) => state.filterReducer.categorySelected)

  const [alertService] = useState(new AlertService())
  console.log("=>[categorySelected]",categorySelected)
  console.log("=>[categorySelected =>]",!!categorySelected)
  const [categoryActive, setCategoryActive] = useState(categorySelected !== '')
  const [subCategoryActive, setSubCategoryActive] = useState(false)
  const [noSubCategoriesFound, setNoSubCategoriesFound] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingSubCategories, setIsLoadingSubCategories] = useState(true)

  const actionSheetRef = createRef();
  const actionSheetRef2 = createRef();

  const styles = makeStyles()

  const sortNameCategories = useCallback((x, y) => {
    const first = x.name?.toLowerCase();
    const second = y.name?.toLowerCase();

    if (first < second) {
      return -1;
    }
    if (first > second) {
      return 1;
    }
    return 0;
  }, [])

  const validateIfSelected = (category) => {
    if (categoryParentSelected === category.id) {
      dispatch(getProducts(category.products))
      setCategoryActive(true)
      return true;
    }
    return false;
  }

  const categoriesToRadioButton = useCallback((categoriesList, isSub = false) => {
    const serializeData = categoriesList
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

    if (isSub) {
      dispatch(getSubCategories(serializeData))
      setNoSubCategoriesFound(serializeData?.length === 0)
      return
    }
    dispatch(getCategories(serializeData))
  }, [categoryParentSelected, sortNameCategories])

  const setPages = (headers) => {
    dispatch(getAllPages(headers['x-pagination-page-count']))
  }

  const loadCategories = async () => {
    const categories = await getCategoriesService({
      page: page,
    })
    setIsLoading(false)
    categoriesToRadioButton(categories?.body)
    setPages(categories?.headers)
  }

  const loadSubCategories = async () => {
    const categories = await getCategoriesService({
      page: page,
      parent_category_id: categoryParentSelected
    })
    setIsLoadingSubCategories(false)
    categoriesToRadioButton(categories?.body, true)
    setPages(categories?.headers)
  }

  useEffect(() => {
    if (listCategories.length === 0) {
      loadCategories()
    }
  }, [listCategories])

  useEffect(() => {
    loadSubCategories()
    setIsLoadingSubCategories(true)
  }, [categoryParentSelected])

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

  const getCategoriesForSelected = (options) => {
    const optionSelected = options.find((option) => option.selected);

    if (optionSelected.products?.length === 0) {
      alertService.show(
        'Alert!',
        `Category ${optionSelected.name?.toLowerCase()} haven't products`,
      );
    }

    return optionSelected
  }

  const onPressRadioButtonCategory = (options) => {
    const optionSelected = getCategoriesForSelected(options);

    dispatch(categorySelected(optionSelected.id))
    dispatch(getProducts(optionSelected.products))
    dispatch(resetPage())

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
    setCategoryActive(false)
    setSubCategoryActive(false)
    dispatch(resetCategories())
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
                isLoading={isLoadingSubCategories}
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
          options={listCategories}
        />
      </ActionSheet>

      <ActionSheet ref={actionSheetRef2} headerAlwaysVisible>
        <ListRadioButton
          onChange={(option) => onPressRadioButtonSubCategory(option)}
          options={listSubCategories}
        />
      </ActionSheet>
    </>
  );
}

