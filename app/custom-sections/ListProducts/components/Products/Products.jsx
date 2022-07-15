import React, { useState, useEffect, useMemo } from 'react';
import { FlatList, Text, View } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import Product from '@custom-elements/Product';
import { makeStyles } from './Products.styles'
import { useGetProducts } from '@core/hooks/Products'
import ButtonLoadingMore from '@custom-elements/ButtonLoadingMore'
import LoadingComponent from '@custom-elements/Loading';
import {
  getProducts,
  nextPage,
  getAllPages
} from '@core/module/store/filter/filter';

export const Products = () => {
  const dispatch = useDispatch();

  const clientFriendly = useSelector((state) => state.productsReducer.clientFriendly)
  const dataProducts = useSelector((state) => state.filterReducer.products)
  const categorySelected = useSelector((state) => state.filterReducer.categorySelected)

  const page = useSelector((state) => state.filterReducer.page)

  const [loadingMoreData, setLoadingMoreData] = useState(false)
  const [showLoadingMore, setShowLoadingMore] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const {
    data: products,
    refetch,
  } = useGetProducts({
    page,
    category_id: categorySelected
  })
  const styles = makeStyles()

  useEffect(() => {
    setIsLoading(true)
    setLoadingMoreData(true)
    setTimeout(() => refetch(), 600);
  }, [page, categorySelected])

  useEffect(() => {

    if (products?.headers && products?.headers['x-pagination-page-count']) {
      const currentlyTotal = parseInt(page)
      const newTotalPages = parseInt(products?.headers['x-pagination-page-count'])

      setShowLoadingMore(currentlyTotal < newTotalPages)

      if (currentlyTotal !== newTotalPages) {
        dispatch(getAllPages(newTotalPages))
      }
    }

  }, [products?.headers, page])

  const updateListProducts = (newProducts) => {
    dispatch(getProducts(newProducts))
    setLoadingMoreData(false)
    setIsLoading(false)
  }

  useEffect(() => {
    updateListProducts(products?.body)
  }, [products?.body])

  const renderItem = ({ item }) => {
    return (<Product
      product={item}
      myPrice={clientFriendly}
      updateList = {() => refetch()}
    />
    )
  }

  const memoizedValue = useMemo(() => renderItem, [dataProducts, clientFriendly])

  const handleLoadingMore = () => {
    dispatch(nextPage())
  }

  const getButtonLoadingMore = () => {
    if (showLoadingMore) {
      return <ButtonLoadingMore
        loading={loadingMoreData}
        handleLoadMore={handleLoadingMore}
      />
    }
    return null
  }

  return (
    <>
      <FlatList
        data={dataProducts}
        renderItem={memoizedValue}
        keyExtractor={(item, index) => `${item.sku}-${index}`}
        numColumns={2}
        contentContainerStyle={styles.container}
        ListFooterComponent={getButtonLoadingMore}
      />
      {isLoading && (<View style={styles.contentLoading}>
        <LoadingComponent size='large' />
      </View>)}
    </>
  );
};