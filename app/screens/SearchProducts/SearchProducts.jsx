import React, { useEffect, useState, useMemo, useCallback} from 'react';
import { View, FlatList, Text } from 'react-native'
import debounce from "lodash.debounce";

import Search from '@custom-elements/Search';
import { useGetProducts } from '@core/hooks/Products'

import { makeStyles } from './SearchProducts.styles'
import Product from '@custom-elements/Product';
import { useSelector } from 'react-redux';
import ButtonLoadingMore from '@custom-elements/ButtonLoadingMore'
import FilterButton from '@components/FilterButton';
import { nowTheme } from '@constants';
import { Block } from 'galio-framework';

export const SearchProducts = ({route}) => {
  const { text: textSearchHome } = route.params

  const categorySelected = useSelector((state) => state.filterReducer.categorySelected)
  const clientFriendly = useSelector((state) => state.productsReducer.clientFriendly)
  const [dataProducts, setDataProducts] = useState([])
  const [textSearch, setTextSearch]= useState()
  const [keeData, setKeepData] = useState(false)
  const [showLoadingMore, setShowLoadingMore] = useState(false)
  const [loadingData, setLoadingData] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [optionsProducts, setOptionsProducts] = useState({
    page: 1,
    search: textSearchHome ?? '',
    category_id: categorySelected
  });

  const {
    data: products,
    refetch,
    isFetching,
    isLoading
  } = useGetProducts(optionsProducts)


  const styles = makeStyles()

  useEffect(() => {
    setLoadingData(true)
    setTextSearch(textSearchHome)
    debouncedOnChange(textSearchHome)
  }, [textSearchHome])

  useEffect(() => {
    const delay = setTimeout(() =>{
      optionsProducts.page === 1 && setLoadingData(true)
      optionsProducts.page > 1 && setLoadingMore(true)
      refetch();
    }, 500)

    return () => {
      clearTimeout(delay)
    }
  }, [optionsProducts.page, optionsProducts.search, optionsProducts.category_id ])

  useEffect(() => {
    const updateListProducts = (newProducts) => {
      setLoadingData(false)
      setLoadingMore(false)

      if (keeData) {
        setDataProducts([...dataProducts, ...newProducts])
        return
      }
      setDataProducts(newProducts)
    }
    updateListProducts(products?.body)
  }, [products])

  useEffect(() => {
    if(!products?.headers){
      return
    }
    setShowLoadingMore(optionsProducts.page < products?.headers['x-pagination-page-count'])
  }, [products?.headers, optionsProducts.page])

  useEffect(() => {
    debouncedOnChange(textSearch)
  }, [textSearch]);

  const changeText = (text) => {
    setKeepData(false)
    setOptionsProducts({
      ...optionsProducts,
      page: 1,
      search: text
    })
  }

  const handleLoadingMore = () => {
    const { page } = optionsProducts;
    setOptionsProducts({
      ...optionsProducts,
      page: page + 1
    });
    setKeepData(true)
  }

  const getButtonLoadingMore = () => {
    if (showLoadingMore && dataProducts && dataProducts?.length > 10) {
      return <ButtonLoadingMore
        loading={loadingMore}
        handleLoadMore={handleLoadingMore}
      />
    }
    return null
  }

  const debouncedOnChange = useCallback(
    debounce(changeText , 300),
    [],
  );

  const renderItem = ({ item }) => {
    const loadingComponent = loadingData || isFetching || isLoading
    return (
        <Product
          product={item}
          myPrice={clientFriendly}
          isLoading={loadingComponent}
        />
    )
  }

  const renderNotFound = () => {

    const loadingComponent = loadingData || isFetching || isLoading

    if(loadingComponent){
      return (
        <Block height={500} row top>
          <Product
            product={{}}
            isLoading={true}
          />
          <Product
            product={{  }}
            isLoading={true}
          />
        </Block>
      )
    }
    return (
      <View style={styles.notfound}>
        <Text style={styles.textNotFount}>
          No results found for search.
        </Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: nowTheme.COLORS.BACKGROUND}}>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <View style={{width: '80%'}}>
          <Search
            placeholder="What are you looking for?"
            onChangeText={setTextSearch}
            value={textSearch}
            style={styles.search}
            inputStyle={styles.searchInput}
          />
        </View>
        <View style={{width: '15%'}}>
          {dataProducts?.length ? (<FilterButton
              text={`${dataProducts?.length}`}
              disabled={true}
            />) : '' }
          
        </View>
      </View>
      <FlatList
        data={dataProducts}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.sku}-${index}`}
        numColumns={2}
        contentContainerStyle={styles.container}
        ListFooterComponent={getButtonLoadingMore}
        ListEmptyComponent={renderNotFound}
      />
    </View>

  );
}
