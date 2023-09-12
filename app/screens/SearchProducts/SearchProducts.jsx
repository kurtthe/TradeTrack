import React, { useEffect, useState, useMemo, useCallback} from 'react';
import { View, FlatList, Text } from 'react-native'
import debounce from "lodash.debounce";

import Search from '@custom-elements/Search';
import { useGetProducts } from '@core/hooks/Products'

import { makeStyles } from './SearchProducts.styles'
import Product from '@custom-elements/Product';
import { useSelector } from 'react-redux';
import ButtonLoadingMore from '@custom-elements/ButtonLoadingMore'
import LoadingComponent from '@custom-elements/Loading';
import { nowTheme } from '@constants';

export const SearchProducts = ({route}) => {
  const { text: textSearchHome } = route.params

  const categorySelected = useSelector((state) => state.filterReducer.categorySelected)
  const clientFriendly = useSelector((state) => state.productsReducer.clientFriendly)
  const [dataProducts, setDataProducts] = useState([])
  const [textSearch, setTextSearch]= useState()
  const [empty, setEmpty] = useState(true)
  const [keeData, setKeepData] = useState(false)
  const [showLoadingMore, setShowLoadingMore] = useState(false)
  const [loadingData, setLoadingData] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [optionsProducts, setOptionsProducts] = useState({
    page: 1,
    search: textSearchHome || '',
    category_id: categorySelected
  });

  const {
    data: products,
    refetch
  } = useGetProducts(optionsProducts)


  const styles = makeStyles()

  useEffect(() => {
    optionsProducts.page === 1 && setLoadingData(true)
    optionsProducts.page > 1 && setLoadingMore(true)
    refetch();
  }, [optionsProducts.page,optionsProducts.search, optionsProducts.category_id ])

  useEffect(() => {
    setLoadingData(true)
    setTextSearch(textSearchHome)
    debouncedOnChange(textSearchHome)
  }, [textSearchHome])

  useEffect(() => {
    const updateListProducts = (newProducts) => {
      setLoadingData(false)
      setLoadingMore(false)

      if (keeData) {
        setDataProducts([...dataProducts, ...newProducts])
        return
      }
      setDataProducts(newProducts)
    }
    updateListProducts(products?.body)
  }, [products])

  useEffect(() => {
    if(!products?.headers){
      return
    }
    setShowLoadingMore(optionsProducts.page < products?.headers['x-pagination-page-count'])
  }, [products?.headers, optionsProducts.page])

  useEffect(() => {
    debouncedOnChange(textSearch)
  }, [textSearch]);

  const changeText = (text) => {
    setKeepData(false)
    setOptionsProducts({
      ...optionsProducts,
      page: 1,
      search: text
    })
    setEmpty(text === '')
  }

  const handleLoadingMore = () => {
    const { page } = optionsProducts;
    setOptionsProducts({
      ...optionsProducts,
      page: page + 1
    });
    setKeepData(true)
  }

  const getButtonLoadingMore = () => {
    if (showLoadingMore && dataProducts && dataProducts?.length > 10) {
      return <ButtonLoadingMore
        loading={loadingMore}
        handleLoadMore={handleLoadingMore}
      />
    }
    return null
  }

  const debouncedOnChange = useCallback(
    debounce(changeText , 300),
    [],
  );

  const renderItem = ({ item }) => {
    return (<Product
      product={item}
      myPrice={clientFriendly}
    />
    )
  }
  const memoizedValue = useMemo(() => renderItem, [dataProducts, clientFriendly])

  const renderNotFound = () => {
    return (
      <View style={styles.notfound}>
        <Text style={styles.textNotFount}>
          No results found for search.
        </Text>
      </View>
    );
  };

  const putContent = () => {
    if (loadingData) {
      return (
        <View style={{flex: 1}}>
          <LoadingComponent size='large' />
        </View>
      )
    }
    return <FlatList
      data={dataProducts}
      renderItem={memoizedValue}
      keyExtractor={(item, index) => `${item.sku}-${index}`}
      numColumns={2}
      contentContainerStyle={styles.container}
      ListFooterComponent={getButtonLoadingMore}
      ListEmptyComponent={renderNotFound}
    />
  }

  return (
    <View style={{flex: 1, backgroundColor: nowTheme.COLORS.BACKGROUND}}>
      <Search
        placeholder="What are you looking for?"
        onChangeText={setTextSearch}
        value={textSearch}
        style={styles.search}
        inputStyle={styles.searchInput}
      />
      {!empty && putContent()}
    </View>

  );
}
