import React, { useState, useEffect, useMemo } from 'react';
import { FlatList } from 'react-native';

import { useSelector } from 'react-redux';
import Product from '@custom-elements/Product';
import { makeStyles } from './ListProduct.styles'
import { useGetProducts } from '@core/hooks/Products'
import ButtonLoadingMore from '@custom-elements/ButtonLoadingMore'
import Filters from './components/Filters'

const ListProducts = ({ categorySelected, allProducts }) => {
  const clientFriendly = useSelector((state) => state.productsReducer.clientFriendly)
  const [dataProducts, setDataProducts] = useState([])
  const [optionsProducts, setOptionsProducts] = useState({
    page: 1,
  });

  const {
    data: products,
    refetch,
    isLoading } = useGetProducts(optionsProducts)
  const styles = makeStyles()

  useEffect(() => {
    refetch();
  }, [optionsProducts])

  useEffect(() => {
    const updateListProducts = (newProducts) => {
      if (!newProducts) {
        return
      }

      if (dataProducts.length > 0) {
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

  const memoizedValue = useMemo(() => renderItem, [dataProducts])

  const handleLoadingMore = () => {
    const { page } = optionsProducts;
    setOptionsProducts({
      page: page + 1
    });
  }

  const getButtonLoadingMore = () => {
    if (dataProducts.length < 5) {
      return null
    }
    return <ButtonLoadingMore
      loading={isLoading}
      handleLoadMore={handleLoadingMore}
    />
  }

  return (
    <>
      <Filters />
      <FlatList
        data={dataProducts}
        renderItem={memoizedValue}
        keyExtractor={(item, index) => `${item.sku}-${index}`}
        numColumns={2}
        contentContainerStyle={styles.container}
        refreshing={isLoading}
        ListFooterComponent={getButtonLoadingMore}
      />
    </>

  );
};

export default ListProducts;
