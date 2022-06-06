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

export const Products = ({ onLoadingMore }) => {
  const dispatch = useDispatch();

  const clientFriendly = useSelector((state) => state.productsReducer.clientFriendly)
  const dataProducts = useSelector((state) => state.filterReducer.products)

  const page = useSelector((state) => state.filterReducer.page)
  const pagesTotal = useSelector((state) => state.filterReducer.pagesTotal)

  const [loadingMoreData, setLoadingMoreData] = useState(false)
  const [showLoadingMore, setShowLoadingMore] = useState(false)

  const {
    data: products,
    refetch,
    isLoading } = useGetProducts({
      page
    })
  const styles = makeStyles()

  useEffect(() => {
    setLoadingMoreData(true)
    refetch();
  }, [page])

  useEffect(() => {
    console.log("=>page < pagesTotal", page < pagesTotal)
    console.log("=>page", page)
    console.log("=>pagesTotal", pagesTotal)

    setShowLoadingMore(page < pagesTotal)
    if (pagesTotal !== products?.headers['x-pagination-page-count']) {
      dispatch(getAllPages(products?.headers['x-pagination-page-count']))
    }
  }, [products?.headers, page])

  const updateListProducts = (newProducts) => {
    dispatch(getProducts(newProducts))
  }

  useEffect(() => {
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
    if (onLoadingMore) {
      onLoadingMore()
      return
    }

    dispatch(nextPage())
  }

  const getButtonLoadingMore = () => {
    if (showLoadingMore) {
      console.log("=> button loading more")
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
