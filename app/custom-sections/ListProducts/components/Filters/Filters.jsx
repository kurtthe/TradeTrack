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
  reset
} from '@core/module/store/filter/filter';

import { useSelector, useDispatch } from 'react-redux';

export const FilterProducts = () => {
  const dispatch = useDispatch();
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
      setNoSubCategoriesFound(category?.sub_categories?.length )
      setSubCategories(category?.sub_categories)
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

  const categoriesToRadioButton = (categoriesList=[]) => {
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

  const initialCategories = (categoriesGet) => {
    const categoriesSerialized = categoriesToRadioButton(categoriesGet)
    setCategories(categoriesSerialized)
  }

  useEffect(() => {
    if(listCategories?.length > 0){
      initialCategories(listCategories)
    }
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

    setCategoryActive(true)
    setNoSubCategoriesFound(false)
    actionSheetRef.current?.setModalVisible(false);
  };

  const onPressRadioButtonSubCategory = (options) => {
    categorySelected(options);
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
    setCategories(clearFilterSelected(categories))
    setSubCategories(clearFilterSelected(subCategories))

    setCategoryActive(false)
    setSubCategoryActive(false)
    dispatch(reset())
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

