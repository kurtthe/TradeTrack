import React, { useState, useEffect } from 'react';
import { View } from 'react-native'
import debounce from "lodash.debounce";

import { GeneralRequestService } from '@core/services/general-request.service';
import { endPoints } from '@shared/dictionaries/end-points';

import LoadingComponent from '@custom-elements/Loading';
import ListData from '@custom-sections/ListData';
import Search from '@custom-elements/Search';
import Product from '@custom-elements/Product';
import {
  ALL_PRODUCTS_FILTER,
} from '@shared/dictionaries/typeDataSerialize'
import { makeStyles } from './SearchProducts.styles'
import { useSelector } from 'react-redux';

const SearchProduct = () => {
  const [urlProducts, setUrlProducts] = useState(undefined)
  const [search, setSearch] = useState('')
  const [empty, setEmpty] = useState(true)
  const [generalRequest] = useState(GeneralRequestService.getInstance())

  const clientFriendly = useSelector((state) => state.productsReducer.clientFriendly);

  const styles = makeStyles()

  useEffect(() => {
    const initUrl = async () => {
      const getIdSuppliers = await generalRequest.get(endPoints.suppliers);
      const newUrl = endPoints.products.replace(':id', getIdSuppliers.id);
      setUrlProducts(newUrl)
    }
    initUrl()
  }, [])

  
  const changeSearchText = (text) => {
    setSearch(text)
    setEmpty(text === '')
  };
  
  const debouncedOnChange = debounce(changeSearchText, 300)
  
  const renderItems = ({ item }) => (
    <Product
      product={item}
      myPrice={clientFriendly}
    />
  )

  if (urlProducts === undefined) {
    return <LoadingComponent />;
  }

  return (
    <>
      <Search
        placeholder="What are you looking for?"
        onChangeText={debouncedOnChange}
        style={styles.search}
        inputStyle={styles.searchInput}
      />
      {(!empty) && (
        <View style={styles.contentProducts}>
          <ListData
            perPage={20}
            endpoint={`${urlProducts}&search=${search}`}
            renderItems={renderItems}
            typeData={ALL_PRODUCTS_FILTER}
            numColumns={2}
          />
        </View>
      )}
    </>

  );
}

export default SearchProduct;
