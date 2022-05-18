import React, { useState, useEffect, useMemo } from 'react';
import { FlatList, Text, View } from 'react-native';

import { useSelector } from 'react-redux';
import Product from '@custom-elements/Product';
import { makeStyles } from './Products.styles'
import { useGetProducts } from '@core/hooks/Products'
import ButtonLoadingMore from '@custom-elements/ButtonLoadingMore'
import LoadingComponent from '@custom-elements/Loading';

export const Products = ({ categorySelected }) => {
  const clientFriendly = useSelector((state) => state.productsReducer.clientFriendly)
  const [keeData, setKeepData] = useState(false)
  const [dataProducts, setDataProducts] = useState([])
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
    refetch();
  }, [optionsProducts])

  useEffect(() => {
    setShowLoadingMore(optionsProducts.page < products?.headers['x-pagination-page-count'])
  }, [products?.headers, optionsProducts.page])

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

  const renderItem = ({ item }) => {
    return (<Product
      product={item}
      myPrice={clientFriendly}
    />
    )
  }

  const memoizedValue = useMemo(() => renderItem, [dataProducts, clientFriendly])

  const handleLoadingMore = () => {
    const { page } = optionsProducts;
    setOptionsProducts({
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

  const renderNotFound = () => {
    return (
      <View style={styles.notfound}>
        <Text style={styles.textNotFount}>
          No found products.
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
