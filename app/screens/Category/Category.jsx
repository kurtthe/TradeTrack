import React from 'react';
import ListProducts from '@custom-sections/ListProducts';

const Category = ({ route }) => {
  const { allProducts, category } = route.params

  return (
    <ListProducts
      allProducts={allProducts}
      categorySelected={category}
    />
  );
}

export default Category;
