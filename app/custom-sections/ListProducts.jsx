import React from 'react';
import { ScrollView } from 'react-native';
import { Block, theme } from 'galio-framework';

import Product from '@custom-elements/Product';
import SkeletonProduct from '@custom-elements/skeletons/Product';

const ListProducts = (props) => {
  const putProducts = () => {
    if (props.data.length === 0) {
      return (
        <>
          <SkeletonProduct />
          <SkeletonProduct />
          <SkeletonProduct />
        </>
      );
    }

    return props.data.map((item, index) => <Product key={index} product={item} />);
  };

  return (
    <ScrollView horizontal={false} style={{ bottom: 10 }}>
      <Block style={{ left: theme.SIZES.BASE / 2 }}>{putProducts()}</Block>
    </ScrollView>
  );
};

export default ListProducts;
