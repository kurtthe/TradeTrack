import React, { useEffect, useState, useMemo } from 'react';
import { View, FlatList, Text } from 'react-native'
import debounce from "lodash.debounce";

import Search from '@custom-elements/Search';
import { useGetProducts } from '@core/hooks/Products'

import { makeStyles } from './SearchProducts.styles'
import Product from '@custom-elements/Product';
import { useSelector } from 'react-redux';
import ButtonLoadingMore from '@custom-elements/ButtonLoadingMore'
import LoadingComponent from '@custom-elements/Loading';

export const SearchProducts = ({route}) => {
  const { text } = route.params

  const categorySelected = useSelector((state) => state.filterReducer.categorySelected)
  const clientFriendly = useSelector((state) => state.productsReducer.clientFriendly)
  const [textSearch, setTextSearch] = useState(text)
  const [dataProducts, setDataProducts] = useState([])
  const [empty, setEmpty] = useState(true)
  const [keeData, setKeepData] = useState(false)
  const [showLoadingMore, setShowLoadingMore] = useState(false)
  const [loadingData, setLoadingData] = useState(true)
  const [optionsProducts, setOptionsProducts] = useState({
    page: 1,
    search: '',
    category_id: categorySelected
  });

  useEffect(() => {
    text && changeSearchText(text)
  }, [text])

  const {
    data: products,
    refetch,
    isLoading } = useGetProducts(optionsProducts)

  const styles = makeStyles()

  useEffect(() => {
    setLoadingData(true)
    refetch();
  }, [optionsProducts.page,optionsProducts.search, optionsProducts.category_id ])

  useEffect(() => {
    const updateListProducts = (newProducts) => {
      setLoadingData(false)

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
        loading={isLoading}
        handleLoadMore={handleLoadingMore}
      />
    }
    return null
  }

  const changeSearchText = (text) => {
    setKeepData(false)
    setOptionsProducts({
      ...optionsProducts,
      page: 1,
      search: text
    })
    setEmpty(text === '')
  };

  const debouncedOnChange = debounce(changeSearchText, 300)

  const renderItem = ({ item }) => {
    return (<Product
      product={item}
      myPrice={clientFriendly}
    />
    )
  }

  const memoizedValue = useMemo(() => renderItem, [dataProducts, clientFriendly])

  const renderNotFound = () => {
    return (
      <View style={styles.notfound}>
        <Text style={styles.textNotFount}>
          No results found for search.
        </Text>
      </View>
    );
  };

  const putContent = () => {
    if (loadingData) {
      return <LoadingComponent />
    }
    return <FlatList
      data={dataProducts}
      renderItem={memoizedValue}
      keyExtractor={(item, index) => `${item.sku}-${index}`}
      numColumns={2}
      contentContainerStyle={styles.container}
      ListFooterComponent={getButtonLoadingMore}
      ListEmptyComponent={renderNotFound}
    />
  }

  return (
    <>
      <Search
        placeholder="What are you looking for?"
        onChangeText={debouncedOnChange}
        onChange = {({ nativeEvent: {text} }) => setTextSearch(text) }
        value={textSearch}
        style={styles.search}
        inputStyle={styles.searchInput}
      />
      {!empty && putContent()}
    </>

  );
}
