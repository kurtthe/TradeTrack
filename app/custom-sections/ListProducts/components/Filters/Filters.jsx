import React, { useEffect, useState,  useRef } from 'react';
import {View} from 'react-native';
import { BottomSheet } from 'react-native-sheet';
import FilterButton from '@components/FilterButton';
import {AlertService} from '@core/services/alert.service';

import {makeStyles} from './Filters.styles'
import {useGetCategories} from '@core/hooks/Categories'
import ListRadioButton from '../ListRadioButton'
import {nowTheme} from '@constants';

import {
  selectedCategory,
  toggleFavorites,
  reset,
  toggleLoading
} from '@core/module/store/filter/filter';

import {useSelector, useDispatch} from 'react-redux';

export const FilterProducts = () => {
  const dispatch = useDispatch();
  const categoryParentSelected = useSelector((state) => state.filterReducer.categorySelected)
  const favoriteFilter = useSelector((state) => state.filterReducer.onlyFavourites)
  const dataProducts = useSelector((state) => state.filterReducer.products)
  const isLoadingFilter = useSelector((state) => state.filterReducer.isLoading)
  const restricted = useSelector((state) => state.filterReducer.restricted)

  const alertService = new AlertService()
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [categoryActive, setCategoryActive] = useState(categoryParentSelected !== '')
  const [subCategoryActive, setSubCategoryActive] = useState(false)
  const [noSubCategoriesFound, setNoSubCategoriesFound] = useState(false)

  const bottomSheet = useRef(null)
  const bottomSheet2 = useRef(null)

  const styles = makeStyles()

  const {
    data: listCategories,
    isLoading
  } = useGetCategories();

  const validateIfSelected = (category) => {
    if (categoryParentSelected === category.id) {
      setCategoryActive(true)
      setNoSubCategoriesFound(category?.sub_categories?.length === 0)
      const subCategoriesSerialized = categoriesToRadioButton(category?.sub_categories)
      setSubCategories(subCategoriesSerialized)
      return true;
    }
    return false;
  }

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

  const categoriesToRadioButton = (categoriesList = []) => {
    return categoriesList
      ?.sort(sortNameCategories)
      ?.map((category) => ({
        ...category,
        color: nowTheme.COLORS.INFO,
        labelStyle: {fontWeight: 'bold'},
        label: category.name,
        value: category.name,
        containerStyle: styles.styleRadio,
        selected: (categoryParentSelected) ? validateIfSelected(category) : false,
      }));
  }

  const initialCategories = (categoriesGet) => {
    const categoriesSerialized = categoriesToRadioButton(categoriesGet)
    setCategories(categoriesSerialized)
  }

  useEffect(() => {
    if (listCategories?.length > 0) {
      initialCategories(listCategories)
    }
  }, [listCategories])

  const handleShowCategories = () => {
    bottomSheet.current?.show();
  }

  const handleShowSubCategories = () => {
    if (noSubCategoriesFound) {
      alertService.show('Alert!', 'No sub categories found');
      return;
    }
    bottomSheet.current?.show();
  }

  const categorySelected = (options) => {
    dispatch(reset())
    const optionSelected = options.find((option) => option.selected);
    dispatch(selectedCategory(optionSelected.id))
    return optionSelected
  }

  const onPressRadioButtonCategory = (options) => {
    const optionSelected = categorySelected(options);

    if (optionSelected.sub_categories?.length === 0) {
      setNoSubCategoriesFound(true)
      alertService.show(
        'Alert!',
        `Category ${optionSelected.name?.toLowerCase()} haven't subCategories`,
      );
      return
    }
    const subCategoriesSerialized = categoriesToRadioButton(optionSelected?.sub_categories)
    setSubCategories(subCategoriesSerialized)

    dispatch(toggleLoading(true))
    setCategoryActive(true)
    setNoSubCategoriesFound(false)
    bottomSheet.current?.hide()
  };

  const onPressRadioButtonSubCategory = (options) => {
    categorySelected(options);
    bottomSheet2.current?.hide();
    setSubCategoryActive(true)
    dispatch(toggleLoading(true))
  }

  const clearFilterSelected = (listData = []) => {
    return listData.map((item) => ({
      ...item,
      selected: false,
    }));
  };

  const handleResetFilter = () => {
    setCategories(clearFilterSelected(categories))
    setSubCategories(clearFilterSelected(subCategories))

    setCategoryActive(false)
    setSubCategoryActive(false)
    dispatch(reset())
    dispatch(toggleLoading(true))
  };

  const handleToggleFavorite = () => {
    dispatch(toggleFavorites())
    dispatch(toggleLoading(true))
  }

  if(favoriteFilter && dataProducts.length === 0 && !isLoadingFilter && categoryParentSelected !== ''){
    alertService.show(
      'Alert!',
      `There are not favorite products for this category`,
    );
  }

  if(categoryParentSelected === "Pools") return null

  if(restricted) {
    return (
    <View style={styles.container}></View>)
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.contentFilters}>
          <FilterButton
            text={'Category'}
            onPress={() => handleShowCategories()}
            isActive={categoryActive}
            isLoading={isLoading}
            disabled={isLoadingFilter}
          />

          {categoryActive && (
            <FilterButton
              text='Sub Category'
              onPress={() => handleShowSubCategories()}
              isActive={subCategoryActive}
              disabled={isLoadingFilter}
            />
          )}

          <FilterButton
            text={'Favourite'}
            onPress={() => handleToggleFavorite()}
            nameIcon={!favoriteFilter ? 'staro' : 'star'}
            sizeIcon={15}
            disabled={isLoadingFilter}
          />

          {categoryActive && (
            <FilterButton
              text=''
              onPress={() => handleResetFilter()}
              icon={require('@assets/nuk-icons/png/2x/clear.png')}
              disabled={isLoadingFilter}
            />
          )}

        </View>
      </View>

      <BottomSheet height={500} ref={bottomSheet}>
        <ListRadioButton
          onChange={(option) => onPressRadioButtonCategory(option)}
          options={categories}
        />
      </BottomSheet>

      <BottomSheet height={500} ref={bottomSheet2}>
        <ListRadioButton
          onChange={(option) => onPressRadioButtonSubCategory(option)}
          options={subCategories}
        />
      </BottomSheet>
    </>
  );
};

