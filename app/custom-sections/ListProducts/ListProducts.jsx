import React, { useState } from 'react';

import Filters from './components/Filters'
import Products from './components/Products';
import LoadingComponent from '@custom-elements/Loading';

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
      {
        (categorySelected.id !== '' && productsFiltered.length === 0) ?
          <LoadingComponent /> :
          <Products
            productsFiltered={productsFiltered}
          />
      }
    </>

  );
};

export default ListProducts;
