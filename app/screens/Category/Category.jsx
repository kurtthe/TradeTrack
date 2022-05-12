import React, { useState, useEffect } from 'react';

import { Block } from 'galio-framework';
import ListData from '@custom-sections/ListData';

import { GeneralRequestService } from '@core/services/general-request.service';
import { endPoints } from '@shared/dictionaries/end-points';
import LoadingComponent from '@custom-elements/Loading';
import { makeStyles } from './Category.styles'
import { connect } from 'react-redux';
import Product from '@custom-elements/Product';
import {
  ALL_PRODUCTS_FILTER,
  PRODUCT_CATEGORY
} from '@shared/dictionaries/typeDataSerialize'

const Category = ({ route, clientFriendly, handleNewPrice, isLoadingNewPrice }) => {
  const { allProducts, category } = route.params

  const [generalRequest] = useState(GeneralRequestService.getInstance());
  const [urlProducts, setUrlProducts] = useState(undefined);
  const [isAllProducts, setIsAllProducts] = useState(false);
  const styles = makeStyles()


  const getUrlProducts = async () => {
    if (!category.hasOwnProperty('id')) {
      const getIdSuppliers = await generalRequest.get(endPoints.suppliers);
      return endPoints.products.replace(':id', getIdSuppliers.id)
    }
    return endPoints.subcategories.replace(':codeCategoryId', category.id)
  }

  useEffect(() => {

    const initServices = async () => {
      const newUrl = await getUrlProducts();
      setUrlProducts(newUrl)
      setIsAllProducts(allProducts)
    }

    initServices()
  }, [category])


  if (urlProducts === '' || urlProducts === undefined) {
    return <LoadingComponent />;
  }

  const renderItems = ({ item }) => {
    return (<Product
      product={item}
      myPrice={clientFriendly}
      handleNewPrice={handleNewPrice}
      isLoadingNewPrice={isLoadingNewPrice}
    />
    )
  }

  return (
    <Block style={styles.container} flex center >
      <ListData
        perPage={20}
        categorySelected={category}
        filters={'products'}
        endpoint={urlProducts}
        renderItems={renderItems}
        typeData={isAllProducts ? ALL_PRODUCTS_FILTER : PRODUCT_CATEGORY}
        numColumns={2}
      />
    </Block>
  );
}

const mapStateToProps = (state) => ({
  clientFriendly: state.productsReducer.clientFriendly,
});

export default connect(mapStateToProps)(Category);
