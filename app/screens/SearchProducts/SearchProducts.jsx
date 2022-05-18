import React, { useState } from 'react';
import { View } from 'react-native'
import debounce from "lodash.debounce";

import ListProducts from '@custom-sections/ListProducts';
import Search from '@custom-elements/Search';

import { makeStyles } from './SearchProducts.styles'

export const SearchProducts = () => {
  const [empty, setEmpty] = useState(true)
  const [textSearch, setTextSearch] = useState(true)

  const styles = makeStyles()

  
  const changeSearchText = (text) => {
    setTextSearch(text)
    setEmpty(text === '')
  };

  const debouncedOnChange = debounce(changeSearchText, 300)

  return (
    <View style={styles.container}>
      <Search
        placeholder="What are you looking for?"
        onChangeText={debouncedOnChange}
        style={styles.search}
        inputStyle={styles.searchInput}
      />
      <View style={styles.contentProducts}>
        {!empty && (
          <ListProducts
            textSearch={textSearch}
            showFilter={false}
          />
        )}
      </View>
    </View>

  );
}
