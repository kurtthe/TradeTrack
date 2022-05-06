import React, { useState, useEffect } from 'react';

import { Block } from 'galio-framework';
import ListData from '@custom-sections/ListData';
import ListProducts from '@custom-sections/ListProducts';

import { GeneralRequestService } from '@core/services/general-request.service';
import { endPoints } from '@shared/dictionaries/end-points';
import LoadingComponent from '@custom-elements/Loading';
import { makeStyles } from './Category.styles'
import { connect } from 'react-redux';


const Category = ({ route, clientFriendly }) => {
  const [generalRequest, setGeneralRequest] = useState(undefined);
  const [urlProducts, setUrlProducts] = useState(undefined);
  const [isAllProducts, setIsAllProducts] = useState(false);
  const styles = makeStyles()

  const getUrlProducts = async (category = null) => {
    if (!category.hasOwnProperty('id')) {
      const getIdSuppliers = await generalRequest.get(endPoints.suppliers);
      return endPoints.products.replace(':id', getIdSuppliers.id)
    }
    return endPoints.subcategories.replace(':codeCategoryId', category.id)
  }

  useEffect(() => {
    const initServices = async () => {
      const { allProducts, category } = route.params
      const requestServices = GeneralRequestService.getInstance();
      const newUrl = await getUrlProducts(category);

      setUrlProducts(newUrl)
      setIsAllProducts(allProducts)
      setGeneralRequest(requestServices)
    }
    initServices()
  }, [urlProducts, isAllProducts, generalRequest])

  if (urlProducts === '' || urlProducts === undefined) {
    return <LoadingComponent />;
  }

  return (
    <Block style={styles.container} flex center >
      <ListData
        perPage={20}
        filters={(isAllProducts) ? 'products' : null}
        endpoint={urlProducts}
        children={<ListProducts myPrice={clientFriendly} isAllProducts={isAllProducts} />}
      />
    </Block>
  );
}

const mapStateToProps = (state) => ({
  clientFriendly: state.productsReducer.clientFriendly,
});

export default connect(mapStateToProps)(Category);
