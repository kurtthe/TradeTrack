import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Block } from 'galio-framework';

import Product from '@custom-elements/Product';
import SkeletonProduct from '@custom-elements/skeletons/Product';

const ListProducts = (props) => {
  const putProducts = () => {
    if (props.data.length === 0 && !props.isEmpty) {
      return (
        <>
          <SkeletonProduct />
          <SkeletonProduct />
          <SkeletonProduct />
          <SkeletonProduct />
          <SkeletonProduct />
          <SkeletonProduct />
        </>
      );
    }

    return props.data.map((item) => 
      <Product 
        key={item.id} 
        product={item} 
        myPrice={props.myPrice} 
        handleNewPrice={props.handleNewPrice} 
        isLoadingNewPrice={props.isLoadingNewPrice}
      />);
  };

  return (
    <ScrollView horizontal={false} style={{ bottom: 10 }}>
      <Block style={styles.contentProducts}>{putProducts()}</Block>
    </ScrollView>
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
