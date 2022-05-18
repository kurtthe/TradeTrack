import React, { useEffect, useState, useMemo } from 'react';
import { View, FlatList, Text} from 'react-native'
import debounce from "lodash.debounce";

import Search from '@custom-elements/Search';
import { useGetProducts } from '@core/hooks/Products'

import { makeStyles } from './SearchProducts.styles'
import Product from '@custom-elements/Product';
import { useSelector } from 'react-redux';
import ButtonLoadingMore from '@custom-elements/ButtonLoadingMore'

export const SearchProducts = () => {
  const clientFriendly = useSelector((state) => state.productsReducer.clientFriendly)
  const [dataProducts, setDataProducts] = useState([])
  const [empty, setEmpty] = useState(true)
  const [keeData, setKeepData] = useState(false)
  const [optionsProducts, setOptionsProducts] = useState({
    page: 1,
    search: ''
  });

  const {
    data: products,
    refetch,
    isLoading } = useGetProducts(optionsProducts)

  const styles = makeStyles()

  useEffect(() => {
    if(optionsProducts.search){
      refetch();
    }
  }, [optionsProducts])

  useEffect(() => {
    const updateListProducts = (newProducts) => {
      if (!newProducts) {
        return
      }

      if (keeData) {
        setDataProducts([...dataProducts, ...newProducts])
        return
      }
      setDataProducts(newProducts)
    }
    updateListProducts(products?.body)
  }, [products?.body])

  const handleLoadingMore = () => {
    const { page } = optionsProducts;
    setOptionsProducts({
      ...optionsProducts,
      page: page + 1
    });
    setKeepData(true)
  }

  const getButtonLoadingMore = () => {
    if (!dataProducts || dataProducts?.length < 5) {
      return null
    }
    return <ButtonLoadingMore
      loading={isLoading}
      handleLoadMore={handleLoadingMore}
    />
  }

  const changeSearchText = (text) => {
    setKeepData(false)
    setOptionsProducts({
      ...optionsProducts,
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

  const memoizedValue = useMemo(() => renderItem, [dataProducts])

  const renderNotFound = () => {
    return (
      <View style={styles.notfound}>
        <Text style={styles.textNotFount}>
          No results found for search.
        </Text>
      </View>
    );
  };

  return (
    <>
      <Search
        placeholder="What are you looking for?"
        onChangeText={debouncedOnChange}
        style={styles.search}
        inputStyle={styles.searchInput}
      />
        {!empty && <FlatList
          data={dataProducts}
          renderItem={memoizedValue}
          keyExtractor={(item, index) => `${item.sku}-${index}`}
          numColumns={2}
          contentContainerStyle={styles.container}
          ListFooterComponent={getButtonLoadingMore}
          ListEmptyComponent={renderNotFound}
        />}
    </>

  );
}
