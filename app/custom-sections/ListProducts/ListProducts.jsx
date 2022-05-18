import React from 'react';

import Filters from './components/Filters'
import Products from './components/Products';

const ListProducts = ({ categorySelected }) => {
  return (
    <>
      <Filters
        categorySelected={categorySelected}
      />
      <Products categorySelected={categorySelected} />
    </>

  );
};

export default ListProducts;
