import React, { useEffect, useState, createRef } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import { Block, Text } from 'galio-framework';
import ActionSheet from 'react-native-actions-sheet';
import FilterButton from '@components/FilterButton';
import { nowTheme } from '@constants';
import RadioGroup from 'react-native-radio-buttons-group';
import { GeneralRequestService } from '@core/services/general-request.service';
import { endPoints } from '@shared/dictionaries/end-points';
import LoadingComponent from '@custom-elements/Loading';
import { AlertService } from '@core/services/alert.service';
import {
  ALL_PRODUCTS_FILTER,
} from '@shared/dictionaries/typeDataSerialize'
import { makeStyles } from './FilterProducts.styles'

const { width } = Dimensions.get('window');


const FilterProducts = ({ getProducts, categorySelected }) => {
  const actionSheetRef = createRef();
  const actionSheetRef2 = createRef();

  const styles = makeStyles()

  const [alertService] = useState(new AlertService())
  const [generalRequest] = useState(GeneralRequestService.getInstance())

  const [radioButtonsCategories, setRadioButtonsCategories] = useState([])
  const [radioButtonsSubCategories, setRadioButtonsSubCategories] = useState([])
  const [categoryActive, setCategoryActive] = useState(false)
  const [subCategoryActive, setSubCategoryActive] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedSubCategory, setSelectedSubCategory] = useState(null)
  const [loadingCategories, setLoadingCategories] = useState(true)
  const [noCategoriesFound, setNoCategoriesFound] = useState(false)
  const [noSubCategoriesFound, setNoSubCategoriesFound] = useState(false)

  const categoriesToRadioButton = (categories) => {
    return categories
      .sort(sortNameCategories)
      .map((category) => ({
        ...category,
        color: nowTheme.COLORS.INFO,
        labelStyle: { fontWeight: 'bold' },
        label: category.name,
        value: category.name,
        containerStyle: styles.styleRadio,
        selected: false,
      }));
  };

  const getCategories = async () => {
    const getCategoriesResponse = await generalRequest.get(endPoints.categories);
    const getOptionsCategories = categoriesToRadioButton(getCategoriesResponse);

    const serializeData = getOptionsCategories.map((optionCategory) => ({
      ...optionCategory,
      selected: categorySelected?.name === optionCategory.label || false
    }))

    if (!!categorySelected && categorySelected.hasOwnProperty('name')) {
      getCategoriesForSelected(getOptionsCategories, categorySelected.name)

    }

    setRadioButtonsCategories(serializeData)
    setLoadingCategories(false)
    setNoCategoriesFound(getOptionsCategories?.length === 0)

  };

  useEffect(() => {
    getCategories();
  }, [])


  const sortNameCategories = (x, y) => {
    const firts = x.name?.toLowerCase();
    const second = y.name?.toLowerCase();

    if (firts < second) {
      return -1;
    }
    if (firts > second) {
      return 1;
    }
    return 0;
  }

  const getCategoriesForSelected = async (options, forName = false) => {
    const optionSelected = options.find((option) => !forName ? option.selected : forName === option.label);

    const url = endPoints.subcategories.replace(':codeCategoryId', optionSelected?.id);
    const getSubCategories = await generalRequest.get(url);
    const subcategories = categoriesToRadioButton(getSubCategories);

    setSelectedCategory(optionSelected)
    setCategoryActive(true)
    setRadioButtonsSubCategories(subcategories)
    setNoSubCategoriesFound(getSubCategories.length === 0)
    setSelectedSubCategory(null)
    setSubCategoryActive(false)
    setLoadingCategories(false)

    return {
      optionSelected,
      subcategories
    }
  }

  const onPressRadioButtonCategory = async (options) => {
    setLoadingCategories(true)
    const { optionSelected } = getCategoriesForSelected(options)

    getProducts && getProducts(optionSelected?.products, ALL_PRODUCTS_FILTER);
    actionSheetRef.current?.setModalVisible(false);
  };

  const onPressRadioButtonSubCategory = (options) => {
    const optionSelected = options.find((option) => option.selected);

    setSelectedSubCategory(optionSelected)
    setSubCategoryActive(true)

    if (optionSelected?.products.length === 0) {
      alertService.show(
        'Alert!',
        `Category ${optionSelected?.name?.toLowerCase()} haven't products`,
      );
      return;
    }

    getProducts && getProducts(optionSelected?.products,);
    actionSheetRef2.current?.setModalVisible(false);
  };

  const clearFilterSelected = (listData = [], idSelected) => {
    return listData.map((item) => {
      if (item.id === idSelected) {
        return {
          ...item,
          selected: false,
        };
      }

      return item;
    });
  };

  const handleResetFilter = () => {

    clearFilterSelected(radioButtonsCategories, selectedCategory?.id);
    clearFilterSelected(
      radioButtonsSubCategories,
      selectedSubCategory?.id,
    );

    setRadioButtonsCategories([])
    setRadioButtonsSubCategories([])
    setCategoryActive(false)
    setSubCategoryActive(false)
    setSelectedCategory(null)
    setSelectedSubCategory(null)
    setLoadingCategories(true)
    setNoCategoriesFound(false)
    setNoSubCategoriesFound(false)

    getProducts && getProducts([], ALL_PRODUCTS_FILTER);
  };

  if (loadingCategories) {
    return (
      <View style={styles.container}>
        <Text>Loading categories...</Text>
      </View>)
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.contentFilters}>
          <FilterButton
            text={'Category'}
            onPress={() => {
              actionSheetRef.current?.setModalVisible();
              if (radioButtonsCategories.length <= 0) {
                getCategories()
              }
            }}
            isActive={categoryActive}
          />
          {categoryActive && (
            <>
              <FilterButton
                text={'Sub Category'}
                onPress={() => {
                  if (noSubCategoriesFound) {
                    alertService.show('Alert!', 'No sub categories found');
                    return;
                  }
                  actionSheetRef2.current?.setModalVisible();
                }}
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
        <Block style={{ height: 300, padding: 5, paddingBottom: 40 }}>
          {noCategoriesFound ? (
            <Text> No categories found </Text>
          ) : (
            <ScrollView style={{ width: width }}>
              <RadioGroup
                radioButtons={radioButtonsCategories}
                color={nowTheme.COLORS.INFO}
                onPress={pick => onPressRadioButtonCategory(pick)}
              />
            </ScrollView>
          )}
        </Block>
      </ActionSheet>

      <ActionSheet ref={actionSheetRef2} headerAlwaysVisible>
        <Block style={{ height: 250, padding: 5, paddingBottom: 40 }}>
          {noSubCategoriesFound ? (
            <Text> No subcategories found </Text>
          ) : (
            <ScrollView style={{ width: width }}>
              <RadioGroup
                radioButtons={radioButtonsSubCategories}
                color={nowTheme.COLORS.INFO}
                onPress={(pick) => onPressRadioButtonSubCategory(pick)}
              />
            </ScrollView>
          )}
        </Block>
      </ActionSheet>
    </>
  );
}



export default FilterProducts;
