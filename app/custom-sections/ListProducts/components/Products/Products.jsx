import React, { useState, useEffect, useMemo } from 'react';
import { FlatList } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import Product from '@custom-elements/Product';
import { makeStyles } from './Products.styles'
import { useGetProducts } from '@core/hooks/Products'
import ButtonLoadingMore from '@custom-elements/ButtonLoadingMore'
import {
  getProducts,
  nextPage,
  getAllPages,
} from '@core/module/store/filter/filter';
import Restricted from '@custom-elements/Restricted';

export const Products = () => {
  const dispatch = useDispatch();

  const clientFriendly = useSelector((state) => state.productsReducer.clientFriendly)
  const dataProducts = useSelector((state) => state.filterReducer.products)
  const categorySelected = useSelector((state) => state.filterReducer.categorySelected)
  const favoriteFilter = useSelector((state) => state.filterReducer.onlyFavourites)
  const restricted = useSelector((state) => state.filterReducer.restricted)
  const page = useSelector((state) => state.filterReducer.page)

  const [loadingMoreData, setLoadingMoreData] = useState(false)
  const [showLoadingMore, setShowLoadingMore] = useState(false)

  const {
    data: products,
    refetch,
    isLoading: loadingProducts
    } = useGetProducts({
    page,
    category_id: categorySelected,
    only_favourite: favoriteFilter
  })
  const styles = makeStyles()

  useEffect(() => {
    setLoadingMoreData(true)
    setTimeout(()=> refetch(), 500)
  }, [page, categorySelected, favoriteFilter])

  useEffect(() => {
    if (products?.headers && products?.headers['x-pagination-page-count']) {
      const currentlyTotal = parseInt(page)
      const newTotalPages = parseInt(products?.headers['x-pagination-page-count'])

      setShowLoadingMore(currentlyTotal < newTotalPages);
      if (currentlyTotal !== newTotalPages) {
        dispatch(getAllPages(newTotalPages))
      }
    }
  }, [products?.headers, page])

  useEffect(() => {
    if(products?.body?.length){
      dispatch(getProducts(products?.body))
      setLoadingMoreData(false)
    }
  }, [products?.body])

  const renderItem = ({ item }) => {
    return (<Product
      product={item}
      myPrice={clientFriendly}
      updateList={() => refetch()}
    />
    )
  }
  //const memoizedValue = useMemo(() => renderItem, [dataProducts, clientFriendly, categorySelected, favoriteFilter, loadingProducts])
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

  console.log("dataProducts::", dataProducts.length)
  console.log("categorySelected::", categorySelected)

  return (
    <>
      {restricted && <Restricted />}
        <FlatList
          onRefresh={() => refetch()}
          refreshing={loadingProducts}
          data={dataProducts}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.sku}-${index}`}
          numColumns={2}
          contentContainerStyle={styles.container}
          ListFooterComponent={getButtonLoadingMore}
        />
    </>
  );
};
