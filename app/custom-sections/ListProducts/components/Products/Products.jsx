import React, { useState, useEffect, useMemo } from 'react';
import { FlatList, Text, View } from 'react-native';

import { useSelector } from 'react-redux';
import Product from '@custom-elements/Product';
import { makeStyles } from './Products.styles'
import { useGetProducts } from '@core/hooks/Products'
import ButtonLoadingMore from '@custom-elements/ButtonLoadingMore'
import LoadingComponent from '@custom-elements/Loading';

export const Products = ({ productsFiltered, onLoadingMore }) => {
  const clientFriendly = useSelector((state) => state.productsReducer.clientFriendly)
  const [keeData, setKeepData] = useState(false)
  const [dataProducts, setDataProducts] = useState([])
  const [loadingMoreData, setLoadingMoreData] = useState(false)
  const [optionsProducts, setOptionsProducts] = useState({
    page: 1,
  });
  const [showLoadingMore, setShowLoadingMore] = useState(false)

  const {
    data: products,
    refetch,
    isLoading } = useGetProducts(optionsProducts)
  const styles = makeStyles()

  useEffect(() => {
    setLoadingMoreData(true)
    refetch();
  }, [optionsProducts])

  useEffect(() => {
    setShowLoadingMore(optionsProducts.page < products?.headers['x-pagination-page-count'])
  }, [products?.headers, optionsProducts.page])

  useEffect(() => {
    const updateListProducts = (newProducts) => {
      setLoadingMoreData(false)
      
      if (productsFiltered.length > 0) {
        setDataProducts(productsFiltered)
        return
      }

      if (keeData) {
        setDataProducts([...dataProducts, ...newProducts])
        return
      }

      setDataProducts(newProducts)
    }
    updateListProducts(products?.body)
  }, [products?.body, productsFiltered])

  const renderItem = ({ item }) => {
    return (<Product
      product={item}
      myPrice={clientFriendly}
    />
    )
  }

  const memoizedValue = useMemo(() => renderItem, [dataProducts, clientFriendly])

  const handleLoadingMore = () => {
    if(onLoadingMore){
      onLoadingMore()
      return
    }
    
    const { page } = optionsProducts;
    setOptionsProducts({
      page: page + 1
    });
    setKeepData(true)
  }

  const getButtonLoadingMore = () => {
    if (showLoadingMore && dataProducts && dataProducts?.length > 10) {
      return <ButtonLoadingMore
        loading={loadingMoreData}
        handleLoadMore={handleLoadingMore}
      />
    }
    return null
  }

  const renderNotFound = () => {
    return (
      <View style={styles.notfound}>
        <Text style={styles.textNotFount}>
          No results found for filter selected.
        </Text>
      </View>
    );
  };

  if (isLoading) {
    return <LoadingComponent />
  }

  return (
    <FlatList
      data={dataProducts}
      renderItem={memoizedValue}
      keyExtractor={(item, index) => `${item.sku}-${index}`}
      numColumns={2}
      contentContainerStyle={styles.container}
      ListFooterComponent={getButtonLoadingMore}
      ListEmptyComponent={renderNotFound}
    />
  );
};
