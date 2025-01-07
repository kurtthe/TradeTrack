import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { View, FlatList, Text, Pressable } from 'react-native';
import debounce from "lodash.debounce";

import Search from '@custom-elements/Search';
import { useGetProducts } from '@core/hooks/Products';

import { makeStyles } from './SearchProducts.styles.js';
import Product from '@custom-elements/Product';
import { useSelector, useDispatch } from 'react-redux';
import ButtonLoadingMore from '@custom-elements/ButtonLoadingMore';
import FilterButton from '@components/FilterButton';
import ListRadioButton from '../../custom-sections/ListProducts/components/ListRadioButton';
import { nowTheme } from '@constants';
import { Block } from 'galio-framework';

import { selectedCategory, reset } from '@core/module/store/filter/filter';
import { BottomSheet } from 'react-native-sheet';

import { GeneralRequestService } from '@core/services/general-request.service';
import { endPoints } from '@shared/dictionaries/end-points';
const generalRequestService = GeneralRequestService.getInstance();

export const SearchProducts = ({ route }) => {
  const { text: textSearchHome } = route.params;

  const dispatch = useDispatch();
  const categorySelected = useSelector((state) => textSearchHome ? '' : state.filterReducer.categorySelected);
  const clientFriendly = useSelector((state) => state.productsReducer.clientFriendly);

  const [dataProducts, setDataProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [textSearch, setTextSearch] = useState();
  const [keeData, setKeepData] = useState(false);
  const [showLoadingMore, setShowLoadingMore] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [optionsProducts, setOptionsProducts] = useState({
    page: 1,
    search: textSearchHome ?? '',
    category_id: categorySelected,
  });

  const { data: products, refetch, isFetching, isLoading } = useGetProducts(optionsProducts);
  const bottomSheet = useRef(null);

  const styles = makeStyles();

  useEffect(() => {
    setLoadingData(true);
    setTextSearch(textSearchHome);
    debouncedOnChange(textSearchHome);
  }, [textSearchHome]);

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const response = await generalRequestService.getWithHeaders(endPoints.categories, {});
      const categoriesData = response.body;
      initialCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoadingCategories(false);
    }
  };

  const validateIfSelected = (category) => {
    if (categoryParentSelected === category.id) {
      setCategoryActive(true);
      setNoSubCategoriesFound(category?.sub_categories?.length === 0);
      const subCategoriesSerialized = categoriesToRadioButton(category?.sub_categories);
      setSubCategories(subCategoriesSerialized);
      return true;
    }
    return false;
  };

  const handleResetFilter = () => {

    setTextSearch('');
  
    setOptionsProducts({
      ...optionsProducts,
      page: 1,
      search: '',
      category_id: null,
    });

    dispatch(reset());
  };

  const handleSearch = () => {

    setOptionsProducts({
      ...optionsProducts,
      page: 1,
      search: textSearch,
    });
    setKeepData(false);
  };

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
  };

  const categoriesToRadioButton = (categoriesList = []) => {
    return categoriesList
      ?.sort(sortNameCategories)
      ?.map((category) => ({
        ...category,
        color: nowTheme.COLORS.INFO,
        labelStyle: { fontWeight: 'bold' },
        label: category.name,
        value: category.id,
        containerStyle: styles.styleRadio,
        selected: categorySelected === category.id,
      }));
  };
  
  const initialCategories = (categoriesGet) => {
    const categoriesSerialized = categoriesToRadioButton(categoriesGet);
    setCategories(categoriesSerialized);
  
    if (categorySelected) {
      const selectedCategory = categoriesSerialized.find((cat) => cat.value === categorySelected);
      if (selectedCategory) {
        handleSelectCategory([selectedCategory]);
      }
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      optionsProducts.page === 1 && setLoadingData(true);
      optionsProducts.page > 1 && setLoadingMore(true);
      refetch();
    }, 500);

    return () => {
      clearTimeout(delay);
    };
  }, [optionsProducts.page, optionsProducts.search, optionsProducts.category_id]);

  useEffect(() => {
    const updateListProducts = (newProducts) => {
      setLoadingData(false);
      setLoadingMore(false);

      if (keeData) {
        setDataProducts([...dataProducts, ...newProducts]);
        return;
      }
      setDataProducts(newProducts);
    };
    updateListProducts(products?.body);
  }, [products]);

  useEffect(() => {
    if (!products?.headers) {
      return;
    }
    setShowLoadingMore(optionsProducts.page < products?.headers['x-pagination-page-count']);

    const totalProductsData = parseInt(products?.headers['x-pagination-total-count'], 10);
    const formattedTotalProducts = totalProductsData.toLocaleString('en-US');
    setTotalProducts(formattedTotalProducts);
  }, [products?.headers, optionsProducts.page]);

  // useEffect(() => {
  //   debouncedOnChange(textSearch);
  // }, [textSearch]);

  const changeText = (text) => {
    setKeepData(false);
    setOptionsProducts({
      ...optionsProducts,
      page: 1,
      search: text,
    });
  };

  const handleLoadingMore = () => {
    const { page } = optionsProducts;
    setOptionsProducts({
      ...optionsProducts,
      page: page + 1,
    });
    setKeepData(true);
  };

  const handleShowCategories = () => {
    bottomSheet.current?.show();
  };

  const handleSelectCategory = (options) => {
    const selectedOption = options.find((option) => option.selected);
    if (selectedOption) {
      dispatch(reset());
      dispatch(selectedCategory(selectedOption.value));
      setOptionsProducts({
        ...optionsProducts,
        page: 1,
        category_id: selectedOption.value,
      });
    }
    bottomSheet.current?.hide();
  };

  const debouncedOnChange = useCallback(debounce(changeText, 300), []);

  const renderItem = ({ item }) => {
    const loadingComponent = loadingData || isFetching || isLoading;
    return <Product product={item} myPrice={clientFriendly} isLoading={loadingComponent} />;
  };

  const renderNotFound = () => {
    const loadingComponent = loadingData || isFetching || isLoading;

    if (loadingComponent) {
      return (
        <Block height={500} row top>
          <Product product={{}} isLoading={true} />
          <Product product={{}} isLoading={true} />
        </Block>
      );
    }
    return (
      <View style={styles.notfound}>
        <Text style={styles.textNotFount}>No results found for search.</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: nowTheme.COLORS.BACKGROUND }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: '80%' }}>
        <Search
          placeholder="What are you looking for?"
          onChangeText={setTextSearch}
          value={textSearch}
          style={styles.search}
          inputStyle={styles.searchInput}
          onSubmitEditing={handleSearch}
        />
        <Pressable
          style={{
            height: 40,
            width: 40,
            position: 'absolute',
            right: 25,
          }}
          onPress={handleSearch}
        />
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.contentFilters}>
          <FilterButton
            text="Category"
            onPress={handleShowCategories}
            isLoading={loadingCategories}
            isActive={!!categorySelected}
          />
          <FilterButton
            text=""
            onPress={() => handleResetFilter()}
            icon={require('@assets/nuk-icons/png/2x/clear.png')}
            disabled={isLoading}
          />
        </View>
      </View>

      <FlatList
        data={dataProducts}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.sku}-${index}`}
        numColumns={2}
        contentContainerStyle={styles.container}
        ListHeaderComponent={() => (
          <View style={{ padding: 10, flexDirection: 'row' }}>
            <Text style={{ fontSize: 20, color: nowTheme.COLORS.INFO }}>{totalProducts + ' '}</Text>
            <Text style={{ fontSize: 20 }}>Products</Text>
          </View>
        )}
        ListFooterComponent={() => (
          showLoadingMore && (
            <ButtonLoadingMore loading={loadingMore} handleLoadMore={handleLoadingMore} />
          )
        )}
        ListEmptyComponent={renderNotFound}
      />

      <BottomSheet height={500} ref={bottomSheet}>
        <ListRadioButton
          onChange={(option) => handleSelectCategory(option)}
          options={categories}
        />
      </BottomSheet>
    </View>
  );
};