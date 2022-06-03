import React, { useState } from 'react';

import Filters from './components/Filters'
import Products from './components/Products';

const ListProducts = ({ categorySelected }) => {
  const [productsFiltered, setProductsFiltered] = useState([])
  const [pageProducts, setPagesProducts] = useState(1)

  const handleChangeCategory = (dataProducts, reset = false) => {
    if (reset) {
      setProductsFiltered([])
      setPagesProducts(1)
      return
    }
    setProductsFiltered(dataProducts)
  }

  const handleLoadingMore = () => {
    setPagesProducts(pageProducts + 1)
  }

  return (
    <>
      <Filters
        categorySelected={categorySelected}
        onSelectCategory={(products, reset) => handleChangeCategory(products, reset)}
        pageProducts={pageProducts}
      />
      <Products
        productsFiltered={productsFiltered}
        onLoadingMore={handleLoadingMore}
      />
    </>
  );
};

export default ListProducts;
