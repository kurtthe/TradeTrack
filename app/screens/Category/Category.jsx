import React from 'react';
import ListProducts from '@custom-sections/ListProducts';

const Category = ({ route }) => {
  const { category } = route.params

  return (
    <ListProducts
      categorySelected={category}
    />
  );
}

export default Category;
