import React, { useState } from 'react';

import Filters from './components/Filters'
import Products from './components/Products';

const ListProducts = ({ categorySelected }) => {
  const [productsFiltered, setProductsFiltered] = useState([])

  const handleChangeCategory = (dataProducts, reset = false) => {
    if (reset) {
      setProductsFiltered([])
      return
    }
    setProductsFiltered(dataProducts)
  }

  return (
    <>
      <Filters
        categorySelected={categorySelected}
        onSelectCategory={(products, reset) => handleChangeCategory(products, reset)}
      />
      <Products
        productsFiltered={productsFiltered}
      />
    </>
  );
};

export default ListProducts;
