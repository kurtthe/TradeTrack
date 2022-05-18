import React, { useEffect, useState, createRef, useCallback } from 'react';
import { View } from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import FilterButton from '@components/FilterButton';
import { AlertService } from '@core/services/alert.service';

import { makeStyles } from './Filters.styles'
import { cardInfo } from '../../../CategoriesProducts/CategoriesProducts.model'
import { useGetCategories } from '@core/hooks/Categories'
import ListRadioButton from '../ListRadioButton'
import { nowTheme } from '@constants';
import LoadingComponent from '@custom-elements/Loading';

export const FilterProducts = ({
  categorySelected,
  pageProducts,
  onSelectCategory,
  onSelectSubCategory
}) => {
  const [alertService] = useState(new AlertService())
  const [categoryParentSelected, setCategoryParentSelected] = useState(categorySelected.id)
  const [categoryActive, setCategoryActive] = useState(categorySelected?.name !== cardInfo.name)
  const [subCategoryActive, setSubCategoryActive] = useState(false)
  const [noSubCategoriesFound, setNoSubCategoriesFound] = useState(false)
  const [radioButtonsCategories, setRadioButtonsCategories] = useState([])
  const [radioButtonsSubCategories, setRadioButtonsSubCategories] = useState([])

  const [optionsProducts, setOptionsProducts] = useState({
    page: pageProducts,
    parent_category_id: categoryParentSelected
  });

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

  const categoriesToRadioButton = useCallback((categoriesList) => {
    const serializeData = categoriesList
      ?.sort(sortNameCategories)
      ?.map((category) => ({
        ...category,
        color: nowTheme.COLORS.INFO,
        labelStyle: { fontWeight: 'bold' },
        label: category.name,
        value: category.name,
        containerStyle: styles.styleRadio,
        selected: (categoryParentSelected) ? categoryParentSelected === category.id : false,
      }));

    if (categoryParentSelected) {
      setRadioButtonsSubCategories(serializeData)
      setNoSubCategoriesFound(serializeData.length === 0)
      return
    }
    setRadioButtonsCategories(serializeData)
  }, [categoryParentSelected, sortNameCategories])

  useEffect(() => {
    categoriesToRadioButton(listCategories?.body)
  }, [listCategories?.body, categoriesToRadioButton])

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

  const getCategoriesForSelected = (options) => {
    const optionSelected = options.find((option) => !forName ? option.selected : forName === option.label);

    if (optionSelected?.products.length === 0) {
      alertService.show(
        'Alert!',
        `Category ${optionSelected?.name?.toLowerCase()} haven't products`,
      );
    }
    
    return optionSelected
  }

  const onPressRadioButtonCategory = (options) => {
    const optionSelected = getCategoriesForSelected(options);

    setOptionsProducts({
      ...optionsProducts,
      parent_category_id: optionSelected.id
    })
    setCategoryParentSelected(optionSelected.id)
    setCategoryActive(true)
    onSelectCategory(optionSelected)
    actionSheetRef.current?.setModalVisible(false);
  };

  const onPressRadioButtonSubCategory = (options) => {
    const optionSelected = getCategoriesForSelected(options)

    setSubCategoryActive(true)
    onSelectSubCategory(optionSelected)
    actionSheetRef2.current?.setModalVisible(false);
  }

  const clearFilterSelected = (listData = []) => {
    return listData.map((item) => ({
      ...item,
      selected: false,
    }));
  };

  const handleResetFilter = () => {
    setSubCategoryActive(false)
    setRadioButtonsSubCategories(clearFilterSelected(radioButtonsSubCategories));
    setNoSubCategoriesFound(false)

    if (categorySelected.name === cardInfo.name) {
      setCategoryActive(false)
      setRadioButtonsCategories(clearFilterSelected(radioButtonsCategories));
      setCategoryParentSelected(null)
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <LoadingComponent />
      </View>
    )
  }

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

