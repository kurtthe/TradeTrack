import React from 'react';
import { Block } from 'galio-framework';
import { makeStyles } from './Category.styles'
import ListProducts from '@custom-sections/ListProducts';


const Category = ({ route }) => {
  const { allProducts, category } = route.params

  const styles = makeStyles()

  return (
    <Block style={styles.container} flex center >
      <ListProducts
        allProducts={allProducts}
        categorySelected={category}
      />
    </Block>
  );
}


export default Category;
