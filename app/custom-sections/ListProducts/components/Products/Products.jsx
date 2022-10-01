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
  getAllPages,
  toggleLoading
} from '@core/module/store/filter/filter';
import Restricted from '@custom-elements/Restricted';

export const Products = () => {
  const dispatch = useDispatch();

  const clientFriendly = useSelector((state) => state.productsReducer.clientFriendly)
  const dataProducts = useSelector((state) => state.filterReducer.products)
  const categorySelected = useSelector((state) => state.filterReducer.categorySelected)
  const favoriteFilter = useSelector((state) => state.filterReducer.onlyFavourites)
  const isLoading = useSelector((state) => state.filterReducer.isLoading)
  const restricted = useSelector((state) => state.filterReducer.restricted)
  const page = useSelector((state) => state.filterReducer.page)
  
  const [loadingMoreData, setLoadingMoreData] = useState(false)
  const [showLoadingMore, setShowLoadingMore] = useState(false)

  const {
    data: products,
    refetch,
  } = useGetProducts({
    page,
    category_id: categorySelected,
    only_favourite: favoriteFilter
  })
  const styles = makeStyles()

  useEffect(() => {
    dispatch(toggleLoading(true))
    refetch()}, [])

  useEffect(() => {
    setLoadingMoreData(true)
    setTimeout(() => refetch(), 600);
  }, [page, categorySelected, favoriteFilter])

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
    dispatch(toggleLoading(!newProducts))
  }

  useEffect(() => {
    updateListProducts(products?.body)
  }, [products?.body])

  const renderItem = ({ item }) => {
    return (<Product
      product={item}
      myPrice={clientFriendly}
      updateList={() => refetch()}
    />
    )
  }

  const memoizedValue = useMemo(() => renderItem, [dataProducts, clientFriendly, categorySelected, favoriteFilter, isLoading])

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

  if(restricted) {
    return(
      <Restricted />
    )
  }

  if(!restricted &&isLoading && dataProducts.length === 0){
    return(
    <View style={styles.contentLoading}>
      <LoadingComponent size='large' />
    </View>
    )
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

    </>
  );
};