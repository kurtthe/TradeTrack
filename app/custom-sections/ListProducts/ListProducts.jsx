import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';

import { useSelector } from 'react-redux';
import Product from '@custom-elements/Product';
import Loading from '@custom-elements/Loading';
import { makeStyles } from './ListProduct.styles'
import { useGetProducts } from '@core/hooks/Products'

const ListProducts = ({ categorySelected, allProducts }) => {
  const clientFriendly = useSelector((state) => state.productsReducer.clientFriendly)
  const [optionsProducts, setOptionsProducts] = useState({
    'page': 1,
    'per-page': 20,
  });

  const {
    data: products,
    refetch,
    isLoading } = useGetProducts(optionsProducts)
  const styles = makeStyles()


  if (isLoading) {
    return (<Loading />)
  }

  const renderItem = ({ item }) => {
    return (<Product
      product={item}
      myPrice={clientFriendly}
      handleNewPrice={props.handleNewPrice}
      isLoadingNewPrice={props.isLoadingNewPrice}
    />
    )
  }

  console.log("=>products", products)

  return (
    <FlatList
      data={dataProducts}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item.sku}-${index}`}
      numColumns={2}
    />
  );
};

export default ListProducts;
