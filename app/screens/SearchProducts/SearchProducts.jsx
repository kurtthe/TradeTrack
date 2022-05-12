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
  const [baseurlProducts, setBaseUrlProducts] = useState(undefined)
  const [urlProducts, setUrlProducts] = useState(undefined)
  const [loading, setLoading] = useState(true)
  const [empty, setEmpty] = useState(true)
  const [generalRequest] = useState(GeneralRequestService.getInstance())

  const clientFriendly = useSelector((state) => state.productsReducer.clientFriendly);

  const styles = makeStyles()

  useEffect(() => {
    const initUrl = async () => {
      const getIdSuppliers = await generalRequest.get(endPoints.suppliers);
      const newUrl = endPoints.products.replace(':id', getIdSuppliers.id);
      setBaseUrlProducts(newUrl)
      setLoading(false)
    }
    initUrl()
  }, [])

  const debouncedOnChange = debounce((url) => {
    setUrlProducts(url)
    setLoading(false)
  }, 300)

  const changeSearchText = (text) => {
    setLoading(true)
    setEmpty(text === '')
    debouncedOnChange(`${baseurlProducts}&search=${text}`)
  };


  const renderItems = ({ item }) => (
    <Product
      product={item}
      myPrice={clientFriendly}
    />
  )

  const putContent = () => {
    if (loading) {
      return (
        <LoadingComponent />
      )
    }

    if (!empty) {
      return (<ListData
        perPage={20}
        endpoint={urlProducts}
        renderItems={renderItems}
        typeData={ALL_PRODUCTS_FILTER}
        numColumns={2}
      />)
    }

    return null
  }

  return (
    <View style={styles.container}>
      <Search
        placeholder="What are you looking for?"
        onChangeText={changeSearchText}
        style={styles.search}
        inputStyle={styles.searchInput}
      />
      <View style={styles.contentProducts}>
        {putContent()}
      </View>
    </View>

  );
}

export default SearchProduct;
