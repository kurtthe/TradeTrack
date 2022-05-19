import React, { useEffect, useState, createRef, useCallback } from 'react';
import { View } from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import FilterButton from '@components/FilterButton';
import { AlertService } from '@core/services/alert.service';

import { makeStyles } from './Filters.styles'
import { cardInfo } from '../../../CategoriesProducts/CategoriesProducts.model'
import { getCategoriesService } from '@core/hooks/Categories'
import ListRadioButton from '../ListRadioButton'
import { nowTheme } from '@constants';

export const FilterProducts = ({
  categorySelected,
  pageProducts,
  onSelectCategory,
}) => {
  const [alertService] = useState(new AlertService())
  const [categoryParentSelected, setCategoryParentSelected] = useState(categorySelected.id)
  const [categoryActive, setCategoryActive] = useState(categorySelected?.name !== cardInfo.name)
  const [subCategoryActive, setSubCategoryActive] = useState(false)
  const [noSubCategoriesFound, setNoSubCategoriesFound] = useState(false)
  const [radioButtonsCategories, setRadioButtonsCategories] = useState([])
  const [radioButtonsSubCategories, setRadioButtonsSubCategories] = useState([])
  const [productsCategory, setProductsCategory] = useState([])
  const [productsSubCategory, setProductsSubCategory] = useState([])

  const [isLoading, setIsLoading] = useState(true)

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
      onSelectCategory(category.products)
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
      setRadioButtonsSubCategories(serializeData)
      setNoSubCategoriesFound(serializeData?.length === 0)
      return
    }
    setRadioButtonsCategories(serializeData)
  }, [categoryParentSelected, sortNameCategories])

  const loadCategories = async () => {
    const categories = await getCategoriesService({
      page: pageProducts,
    })
    categorySelected === '' && setIsLoading(false)
    categoriesToRadioButton(categories?.body)
  }

  const loadSubCategories = () => {
    const categories = getCategoriesService({
      page: pageProducts,
      parent_category_id: categoryParentSelected
    })
    setIsLoading(false)
    categoriesToRadioButton(categories?.body, true)
  }

  useEffect(() => {
    loadCategories()
  }, [])

  useEffect(() => {
    loadSubCategories()
  }, [categoryParentSelected])

  const handleShowCategories = () => {
    if (categorySelected?.name === cardInfo.name && !isLoading) {
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

    setCategoryParentSelected(optionSelected.id)
    setCategoryActive(true)
    setProductsCategory(optionSelected?.products)
    actionSheetRef.current?.setModalVisible(false);
  };

  const onPressRadioButtonSubCategory = (options) => {
    const optionSelected = getCategoriesForSelected(options)

    setSubCategoryActive(true)
    setProductsSubCategory(optionSelected.products)
    actionSheetRef2.current?.setModalVisible(false);
  }

  const clearFilterSelected = (listData = []) => {
    return listData.map((item) => ({
      ...item,
      selected: false,
    }));
  };

  const handleResetFilter = () => {
    if (categorySelected !== '') {
      setSubCategoryActive(false)
      setRadioButtonsSubCategories(clearFilterSelected(radioButtonsSubCategories));
      setNoSubCategoriesFound(false)
      setProductsSubCategory([])
      onSelectCategory(productsCategory)
      return
    }

    setSubCategoryActive(false)
    setRadioButtonsSubCategories(clearFilterSelected(radioButtonsSubCategories));
    setNoSubCategoriesFound(false)
    setProductsSubCategory([])
    onSelectCategory([], true)
    setCategoryActive(false)
    setRadioButtonsCategories(clearFilterSelected(radioButtonsCategories));
    setCategoryParentSelected(null)

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

