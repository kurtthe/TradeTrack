import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Block } from 'galio-framework';

import Product from '@custom-elements/Product';
import Loading from '@custom-elements/Loading';

const ListProducts = (props) => {
  const [dataProducts, setDataProducts] = useState([])

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


  const putProducts = () => (
    <FlatList
      data={dataProducts}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      ListEmptyComponent={<Loading />}
      numColumns={2}
    />
  );

  return (
    <Block style={styles.contentProducts}>{putProducts()}</Block>
  );
};

const styles = StyleSheet.create({
  contentProducts: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  }
})

export default ListProducts;
