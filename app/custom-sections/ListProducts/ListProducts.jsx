import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';

import Product from '@custom-elements/Product';
import Loading from '@custom-elements/Loading';
import { makeStyles } from './ListProduct.styles'

const ListProducts = (props) => {
  const [dataProducts, setDataProducts] = useState([])
  const styles = makeStyles()

  useEffect(() => {
    const serialize = () => {
      if (!props.isAllProducts) {
        let data = []
        props.data?.forEach((dataProduct) => {
          if (dataProduct.products?.length > 0) {
            data = [...dataProduct.products]
          }
        });
        setDataProducts(data)
        return
      }
      setDataProducts(props.data)
    }

    serialize()
  }, [props.isAllProducts, props.data])

  const renderItem = ({ item }) => {
    return (<Product
      product={item}
      myPrice={props.myPrice}
      handleNewPrice={props.handleNewPrice}
      isLoadingNewPrice={props.isLoadingNewPrice}
    />
    )
  }

  return (
    <FlatList
      data={dataProducts}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      ListEmptyComponent={<Loading />}
      numColumns={2}
    />
  );
};

export default ListProducts;
